const mongoose = require("mongoose");

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(
        `${process.env.MONGO_DB}`
      )
      .then(() => {
        console.log(`${process.env.MONGO_DB}`);
        console.log("Conectado correctamente a la base de datos");
      })
      .catch((err) => {
        console.log(`${process.env.MONGO_DB}`);
        console.error("Error al conectar a la base de datos", err);
      });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }
}

module.exports = Database;