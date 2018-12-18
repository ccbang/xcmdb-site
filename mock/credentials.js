const getCredentials = (req, res) =>
  res.json([
    {
      id: '000000001',
      name: 'ccbang',
      description: 'ccbang description',
      owner: 'ccbang',
      remoteUser: 'root',
      remotePassword: '123456',
      machine: 50,
      sshPrivate: 'sdsdfsdfs',
      privatePassword: '123456',
      createTime: '2018-12-12 13:00',
    },
    {
      id: '000000002',
      name: 'ccbang',
      description: 'ccbang description',
      owner: 'ccbang',
      remoteUser: 'root',
      remotePassword: '123456',
      sshPrivate: 'sdsdfsdfs',
      machine: 10,
      privatePassword: '123456',
      createTime: '2018-12-12 13:00',
    },
    {
      id: '000000003',
      name: 'ccbang',
      description: 'ccbang description',
      owner: 'ccbang',
      remoteUser: 'root',
      remotePassword: '123456',
      sshPrivate: 'sdsdfsdfs',
      privatePassword: '123456',
      machine: 30,
      createTime: '2018-12-12 13:00',
    },
  ]);

export default {
  'GET /api/credentials': getCredentials,
};
