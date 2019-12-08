const router = require("express").Router();
const mongoose = require("mongoose");
const verify = require("../verify");
const schema = new mongoose.Schema({}, { strict: false });

router.get("/:collection", verify, (req, res) => {
  const collectionName = req.params.collection;
  const user = req.user;
  var collection = mongoose.model(collectionName, schema);
  // Yes, it's a valid ObjectId, proceed with `findById` call.
  collection.find({ userId: user._id }, (err, result) => {
    if (err) return console.log(err);
    res.status(200).send(result);
  });
});

router.get("/:collection/:id", verify, (req, res) => {
  const collectionName = req.params.collection;
  const user = req.user;
  const stuffId = req.params.id;
  var collection = mongoose.model(collectionName, schema);
  console.log("stuffId", stuffId);
  if (stuffId.match(/^[0-9a-fA-F]{24}$/)) {
    collection.find({ userId: user._id, _id: stuffId }, (err, result) => {
      if (err) return console.log(err);
      res.status(200).send(result);
    });
  } else {
    res.status(400).send("invalid stuffId");
  }
});

router.put("/:collection/:id", verify, (req, res) => {
  const collectionName = req.params.collection;
  const user = req.user;
  const stuffId = req.params.id;
  const userInput = req.body;
  var collection = mongoose.model(collectionName, schema);
  console.table([userInput, stuffId, user, collectionName]);
  if (stuffId.match(/^[0-9a-fA-F]{24}$/)) {
    collection.findOneAndUpdate(
      {
        userId: user._id,
        _id: stuffId
      },
      { $set: userInput },
      { new: true },
      (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.json(result);
      }
    );
  }
});

router.post("/:collection", verify, (req, res) => {
  const collectionName = req.params.collection;
  const user = req.user;
  let userInput = req.body;
  userInput.userId = user._id;
  var collection = mongoose.model(collectionName, schema);
  collection.create(userInput, (err, result) => {
    if (err) console.log(err);
    console.log(result);
    res.json(result);
  });
});

router.delete("/:collection/:id", verify, (req, res) => {
  const collectionName = req.params.collection;
  const user = req.user;
  const stuffId = req.params.id;
  let collection = mongoose.model(collectionName, schema);
  if (stuffId.match(/^[0-9a-fA-F]{24}$/)) {
    collection.findOneAndDelete(
      { userId: user._id, _id: stuffId },
      (err, result) => {
        if (err) console.log(err);
        console.log(result);
        res.send(result);
      }
    );
  }
});

module.exports = router;
