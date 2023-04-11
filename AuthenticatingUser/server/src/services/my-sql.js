const mysql = require('mysql2');
const config = require("../config");

const MySql = mysql.createConnection(config.config.db);

exports.connectMySql = (callback) => {
  MySql.connect((connectionErr) => {
    if (connectionErr) throw new Error(connectionErr.message);

    callback();
    MySql.end();
  });
};

//export default MySql;