import HttpHelper from '../../utils/http/helper';
import  * as menuConfig from '../../common/menu';
import remoteMenuData from './data';

export class AuthService {

  /**
   * 远程加载权限菜单列表
   */
  async getAuthMenus() {
    var data = await HttpHelper.delay(500, menuConfig.getMenuData(remoteMenuData));
    return data;
  }

  async getRouterData(routerConfig: any, menuData: any) {
    const flatMenuData = menuConfig.getFlatMenuData(menuData);
    return menuConfig.getRouterData(routerConfig, flatMenuData);
  }

  getRouterDataSync(routerConfig: any, menuData: any) {
    const flatMenuData = menuConfig.getFlatMenuData(menuData);
    return menuConfig.getRouterData(routerConfig, flatMenuData);
  }

  /**
   * 登录
   * 
   * @param {object} params { userName: "admin", password: "123456", type: "account" }
   * @returns { object } { status: 'error', type: 'account' }
   */
  async login(params: any) {
    let data;
    if (params.userName === 'admin' && params.password === '123456') {
      data = {
        status: 'ok'
      };
    } else {
      data = {
        status: 'error'
      };
    }

    data = {...data, data: { token: 'abcdefg', expireIn: 2522162825873 }};

    return await HttpHelper.delay(500, data);
  }
}

const authService = new AuthService();

export default authService;