const mongoose = require("mongoose");

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(
        `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/notas`
      )
      .then(() => {
        console.log(`${process.env.MONGO_PROTOCOLO}${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/notas`);
        console.log("Conectado correctamente a la base de datos");
      })
      .catch((err) => {
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