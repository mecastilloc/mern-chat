const mongo = require("../models");

module.exports = {
  
  findByTaskId(req, res) {
    console.log(req.params.taskId)
    mongo.Chats.find({taskId: req.params.taskId})
      .then(mongoChats => res.json(mongoChats))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },

  saveChat(req, res) {
      console.log(req.body)
    mongo.Chats.create(req.body)
      .then(mongoChats => res.json(mongoChats))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  
};
