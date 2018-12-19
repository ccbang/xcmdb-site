const getGeneral = (req, res) =>
  res.json([
    {
      id: '001',
      name: 'ssh_password',
      value: '123456',
      description: 'description',
      status: 1,
    },
    {
      id: '002',
      name: 'ssh_user',
      value: 'ccbang',
      description: 'description',
      status: 0,
    },
    { id: '003', name: 'ssh_port', value: '22', description: 'description', status: 1 },
    {
      id: '004',
      name: 'ssh_key',
      value: '/data/a.pem',
      description: 'description',
      status: 0,
    },
    {
      id: '005',
      name: 'ssh_password',
      value: '123456',
      description: 'description',
      status: 1,
    },
    {
      id: '006',
      name: 'ssh_password',
      value: '123456',
      description: 'description',
      status: 0,
    },
    {
      id: '007',
      name: 'ssh_password',
      value: '123456',
      description: 'description',
      status: 1,
    },
    {
      id: '008',
      name: 'ssh_password',
      value: '123456',
      description: 'description',
      status: 1,
    },
    {
      id: '009',
      name: 'ssh_password',
      value: '123456',
      description: 'description',
      status: 0,
    },
    {
      id: '010',
      name: 'ssh_password',
      value: '123456',
      description: 'description',
      status: 1,
    },
  ]);
const getHosts = (req, res) =>
  res.json([
    {
      id: '001',
      ip: '192.168.2.183',
      group: {
        id: '001',
        variables: [{ name: 'ssh_key', value: '/data/a.pem' }],
      },
      variables: [{ name: 'ssh_key', value: '/data/b.pem' }],
    },
    {
      id: '002',
      ip: 'www.ccbang.com',
      group: {
        id: '001',
        variables: [{ name: 'ssh_key', value: '/data/a.pem' }],
      },
      variables: [{ name: 'ssh_key', value: '/data/b.pem' }],
    },
    {
      id: '003',
      ip: '192.168.2.88',
      group: {
        id: '001',
        variables: [{ name: 'ssh_key', value: '/data/a.pem' }],
      },
      variables: [{ name: 'ssh_key', value: '/data/b.pem' }],
    },
  ]);
const getGroup = (req, res) =>
  res.json([
    {
      id: '001',
      name: 'group1',
      variables: [
        { name: 'ssh_key', value: '/data/a.pem' },
        { name: 'ssh_key1', value: '/data/a.pem' },
        { name: 'ssh_key2', value: '/data/a.pem' },
        { name: 'ssh_key3', value: '/data/a.pem' },
        { name: 'ssh_key4', value: '/data/a.pem' },
        { name: 'ssh_key5', value: '/data/a.pem' },
      ],
      machine: 100,
      description: 'group desctiption',
    },
  ]);

export default {
  'GET /api/inventories/general': getGeneral,
  'GET /api/inventories/group': getGroup,
  'GET /api/inventories/hosts': getHosts,
};
