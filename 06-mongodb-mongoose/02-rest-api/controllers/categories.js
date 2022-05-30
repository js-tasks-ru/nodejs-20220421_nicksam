const catModel = require('../models/Category');
const mapper = require('../mappers/category');

module.exports.categoryList = async function categoryList(ctx, next) {
  const out = {};
  out.categories = [];
  const result = await catModel.find();
  result.forEach((item) => out.categories.push(mapper(item)));

  ctx.body = out;
};
