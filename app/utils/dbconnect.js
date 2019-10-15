class DBConnector {
  constructor() {
    this.instance = null;
  }

  static getInstance(ver) {
    const options = {
      client: 'mysql',
      version: '5.7',
      connection: {
        host: '125.212.227.42',
        port: 3336,
        user: 'root',
        password: 'toor',
        database: 'preschool_system'//ver == 1 ? 'braindb' : 'braindb-v2'
      }
    }

    if (this.instance != null)
      return this.instance;
    this.instance = require('knex')(options);
    return this.instance;
  }

}
module.exports = DBConnector;
// const con = DBConnector.getInstance(2);
// console.log(con);
