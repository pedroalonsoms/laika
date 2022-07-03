const mysql = require("mysql2/promise");

let globalConnection = undefined;

const connect = async () => {
  if (globalConnection) return globalConnection;

  globalConnection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "app",
    decimalNumbers: true,
  });

  return globalConnection;
};

module.exports = connect;
