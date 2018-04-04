import Http from '../utils/http';

export async function query() {
  return Http.request('/api/users');
}

export async function queryCurrent() {
  // const user = await Http.request('/api/current');
  return {
    userName: 'admin',
    name: 'admin',
    avatar: 'http://www.qqzhi.com/uploadpic/2014-09-23/000247589.jpg',
  };
}
