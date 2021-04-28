const db4 = require('../../db/connect');

interface argsFindUser {
  username: string;
}

const FIND_USER = async (_: any, { username }: argsFindUser) => {
  return await db4('users').where('username', username).first();
};

module.exports = { FIND_USER };
