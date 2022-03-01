const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  const Tags = await Tag.findAll({
    include: { model: Product },
  });
  return res.json(Tags);
});

router.get('/:id', async(req, res) => {
  const tag = await Tag.findOne({
    where: { id: req.params.id },
    include: { model: Product, attributes: ['product_name', 'price', 'stock'] },
    exclude: { model: Product, attributes: ['product_tag']}
  });
  return res.json(tag);
});


router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tagData => res.json(tagData))
});

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {id: req.params.id}
  }).then(tagData => res.json(`Updated name to ${req.body.tag_name}`))
});

router.delete('/:id', (req, res) => {
  Tag.destroy({where: {id: req.params.id}}).then(tagData=>res.json("tag deleted"))
});

module.exports = router;
