const modelClass = require("../utils/models");
const model = require("../models/toolsCategory");

class Controller {
  async add(req, res, next) {
    const ModelClass = new modelClass(model, req, res, next);
    await ModelClass.add();
  }

  async update(req, res, next) {
    const ModelClass = new modelClass(model, req, res, next);
    await ModelClass.update();
  }

  async delete(req, res, next) {
    const ModelClass = new modelClass(model, req, res, next);
    await ModelClass.delete();
  }

  async getSingle(req, res, next) {
    const ModelClass = new modelClass(model, req, res, next);
    await ModelClass.getSingle();
  }

  async getMany(req, res, next) {
    const ModelClass = new modelClass(model, req, res, next);
    await ModelClass.getMany();
  }
}

module.exports = new Controller();
