import { parse } from 'url';
import dataHelp from './ansibleHelp';

const getAnsible = (req, res) => res.json(['reboot', 'net_put', 'template']);

const getTemplate = (req, res) =>
  res.json([
    { id: '001', name: 'tempalte 1', module: 'net_put', fields: {} },
    { id: '002', name: 'tempalte 2', module: 'win_security_policy', fields: {} },
    { id: '003', name: 'tempalte 3', module: 'aos_asn_pool', fields: {} },
    { id: '004', name: 'tempalte 4', module: 'znode', fields: {} },
  ]);

const getHelp = (req, res, u) => {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  const result = dataHelp.find(item => item.name === params.name);
  return res.json(result || {});
};
export default {
  'GET /api/ansible/module': getAnsible,
  'GET /api/ansible/template': getTemplate,
  'GET /api/ansible/help': getHelp,
};
