const router = require("express").Router();
const controler = require("./controler")
// const stg_manager = require("../utils/storage")
router.get("/all", controler.getAll)
router.get("/find", controler.searchGuitar)
router.post("/add", controler.addGuitar)
router.delete("/del/:type", controler.delGuitar)
module.exports = router;