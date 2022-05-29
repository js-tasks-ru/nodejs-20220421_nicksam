const mapper = require('../mappers/product');
const modelProd = require('../models/Product');

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const { query } = ctx.query;
  // const result = modelProd.aggregate([
  //   { $match: { $text: { $search: query } } },
  //   { $sort: { score: { $meta: 'textScore' } } },
  // ]);
  const out = {};
  out.products = [];

  const result = await modelProd
    .find({ $text: { $search: query } }, { score: { $meta: 'textScore' } })
    .sort({ score: { $meta: 'textScore' } });
  if (result.length == 0) {
    ctx.body = out;
    return next();
  }
  result.forEach((item) => out.products.push(mapper(item)));
  ctx.body = out;
};
