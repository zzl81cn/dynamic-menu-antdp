import { stringify } from 'qs';
import Http from '../utils/http';

export async function queryProjectNotice() {
  return Http.request('/api/project/notice');
}

export async function queryActivities() {
  return Http.request('/api/activities');
}

export async function queryRule(params: any) {
  return Http.request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params: any) {
  return Http.request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: any) {
  return Http.request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params: any) {
  return Http.request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return Http.request('/api/fake_chart_data');
}

export async function queryTags() {
  return Http.request('/api/tags');
}

export async function queryBasicProfile() {
  return Http.request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return Http.request('/api/profile/advanced');
}

export async function queryFakeList(params: any) {
  return Http.request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params: any) {
  return Http.request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params: any) {
  return Http.request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return Http.request('/api/notices');
}
