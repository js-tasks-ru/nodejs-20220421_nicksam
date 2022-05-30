const prodModel = require('../models/Product');
const mongo = require('mongoose');
const prodMapper = require('../mappers/product');
const { HttpError } = require('koa');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.productsBySubcategory = async function productsBySubcategory(
  ctx,
  next
) {
  const { subcategory } = ctx.query;

  if (!subcategory) return next();
  const out = {};
  out.products = [];
  const data = await prodModel.find({
    subcategory: mongo.Types.ObjectId(subcategory),
  });
  data.forEach((item) => out.products.push(prodMapper(item)));
  if (data.length == 0) {
    ctx.status = 404;
    ctx.body = [];
  }

  ctx.body = out;
};

module.exports.productList = async function productList(ctx, next) {
  const out = {};
  out.products = [];
  const data = await prodModel.find();
  data.forEach((item) => out.products.push(prodMapper(item)));
  if (data.length == 0) {
    ctx.status = 404;
    ctx.body = [];
    return next();
  }

  ctx.body = out;
};

module.exports.productById = async function productById(ctx, next) {
  if (!ObjectId.isValid(ctx.params.id)) {
    ctx.status = 400;
    ctx.body = '';
    return next();
  }
  const out = {};

  const res = await prodModel.findById(mongo.Types.ObjectId(ctx.params.id));
  if (res) {
    out.product = prodMapper(res);

    ctx.body = out;
  } else {
    ctx.status = 404;
    ctx.body = [];
  }
};
