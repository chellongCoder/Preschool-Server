class DBConnector {
  constructor() {
    this.instance = null;
  }

  static getInstance(ver) {
    const options = {
      client: 'mysql',
      version: '5.7',
      connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'longvip98',
        database: 'preSchool_app'//ver == 1 ? 'braindb' : 'braindb-v2'
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
