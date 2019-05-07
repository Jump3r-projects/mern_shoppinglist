const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

//Item model
const Item = require("../../models/Item");

// @route GET api/items
// @desc get all items
// @access public
router.get("/", (req, res) => {
  Item.find()
    //sort is mongoose method, -1 is descending
    .sort({ date: -1 })
    .then(items => res.json(items));
  // .catch(err => console.log(err);)
});

// @route POST api/items
// @desc Create a item
// @access private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  //saving to database
  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete an item
// @access private
router.delete("/:id", auth, (req, res) => {
  //mongoose method to find item by ID then delete
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
