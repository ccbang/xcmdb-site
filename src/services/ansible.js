import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryAnsibleModule(params) {
  return request(`/api/ansible/module?${stringify(params)}`);
}

export async function queryAnsibleHelp(params) {
  return request(`/api/ansible/help?${stringify(params)}`);
}
