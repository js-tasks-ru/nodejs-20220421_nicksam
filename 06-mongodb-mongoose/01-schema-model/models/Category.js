const mongoose = require('mongoose');
const { stringify } = require('uuid');
const connection = require('../libs/connection');

const subCategorySchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const SubCategory = connection.model('Subcategory', subCategorySchema);
const categorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  subcategories: [subCategorySchema],
});
const Category = connection.model('Category', categorySchema);

console.log(Category.schema.obj);
console.log('title', SubCategory.schema.path('title').instance);

module.exports = Category;
