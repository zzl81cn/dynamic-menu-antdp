import store from '../index';

/**
 * 获取token
 */
export function getAuthority() {
  const token = getToken();
  // 判断token是否过期
  if (!token) { return null; }
  const ts = new Date() as any - 0;
  if (token.expireIn > ts) { return token.token; }

  return null;
}

interface IToken {
  token: string;
  expireIn: number;
}

export function setToken(token: IToken) {
  return localStorage.setItem('security.token', JSON.stringify(token));
}

export function getToken(): IToken | null {
  const tokenStr = localStorage.getItem('security.token');
  if (!tokenStr) { return null; }

  const token = JSON.parse(tokenStr);
  return token as IToken;
}

export function setTokenExpired() {
  localStorage.removeItem('security.token');
}

/**
 * 判断是否有权限
 * 由于无法获取跨域cookie，暂不支持cookie操作
 * @param {string} [authorityIdentity] 
 */
export function hasPermission(authorityIdentity?: string) {

  // 通用页面直接允许通过
  if (authorityIdentity === 'common') { return true; }

  let token = getAuthority();
  if (!authorityIdentity || !token) { return false; }

  const rootIdentity = 'root';
  // 已登录且是首页
  if (authorityIdentity === rootIdentity && token) {
    return true;
  }

  if (!store) { return false; }

  // 从redux中获取菜单
  var menus = store.getState().global.menus;
  if (!menus || menus.length <= 0) {
    return false;
  }

  return checkAuth(authorityIdentity, menus);
}

function checkAuth(identity: string, menus: Array<any>): boolean {
  if (!menus || menus.length <= 0) { return false; }
  let result = false;
  for (let i = 0; i < menus.length; i++) {
    let menu = menus[i];
    if (identity === menu.identity) { return true; }
    if (menu.children && menu.children.length) {
      result = checkAuth(identity, menu.children);
      if (result) { return true; }
    }
  }

  return false;
}
