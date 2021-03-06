const types = require('./types');
const AbstractEntityModel = require('./abstractEntityModel');

module.exports = class Order extends AbstractEntityModel {
  constructor() {
    super('order', 'order', {
      customer: new types.RelationToOne(),
      products: new types.RelationToMany(),
      employee: new types.RelationToOne(),
      delivered: new types.Boolean(),
      attachments: new types.Files(),
      importHash: new types.String(null, 255),
    });
  }
};
