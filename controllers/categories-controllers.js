const HttpError = require ('../models/http-errors');
const CategoryModel = require('../models/CategoryModel');

const getCategoryByGender = async (req, res) => {
    const categoryGender = req.params.gender;    
    const category = await CategoryModel.find({ 'gender': categoryGender},{'name': 1,_id: 0})
    if (category === null) {
        console.log('la category ne peut etre trouver avec cet id', category)
        return next(new HttpError('could not find a category'), 404);
      }
    res.json({category});
};

const addNewCategory = async (req, res, next) => {
  let category = new CategoryModel(req.body);
  category.save()
    .then(category => {
      res.status(200).json({ 'category': 'category added successfully' });
    })
    .catch(err => {
      next(new HttpError('adding new product failed'), 400);
    });
}
const updatedCategory = async (req, res, next) => {
  CategoryModel.findById(req.params.cid, function (err, category) {
    if (!category)
      res.status(404).send("data is not found");
    else
    category.name = req.body.name
    category.gender = req.body.gender
    category.save().then(category => {
      res.json('category updated!');
    })
      .catch(err => {
        next(new HttpError('updating product failed'), 400);
      });
  });
}
const deletedCategory = async (req, res, next) => {
    CategoryModel.findByIdAndDelete({_id: req.params.cid}).then(function(category){
      res.send(category);
    });
    
}

exports.getCategoryByGender = getCategoryByGender;
exports.addNewCategory = addNewCategory;
exports.updatedCategory = updatedCategory;
exports.deletedCategory = deletedCategory;