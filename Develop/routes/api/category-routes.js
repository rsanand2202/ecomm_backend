const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async(req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: {model: Product}
    })
    res.status(200).json(allCategories)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async(req, res) => {
  try {
    const categoryById = await Category.findByPk(req.params.id,{
      include: {model: Product}
    })
    res.status(200).json(categoryById)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async(req, res) => {
  try {
    const createCategory = await Category.create(req.body)
    res.status(200).json(createCategory)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async(req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(updatedCategory)
  
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async(req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(deleteCategory)
  
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
