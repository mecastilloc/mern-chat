const router = require("express").Router();
const chatRoutes = require("./chatRoutes");

router.use("/chat", chatRoutes);
router.use("http://localhost:5000/chat/realtime", chatRoutes)

module.exports = router;