const {
  addToLikedMedia,
  getUserLikedMedia,
  removeFromLikedMedia,
  createUser,
  addToFamilyWantToWatch,
  getUserSharedMedia,
  removeFromWantToWatch,
} = require("../controllers/UserControllers");

const router = require("express").Router();

//Individual
router.post("/add", addToLikedMedia);
router.get("/liked/:email", getUserLikedMedia);
router.put("/remove", removeFromLikedMedia);

//create a username
router.post("/create", createUser);

//Family
router.post("/addToFamily", addToFamilyWantToWatch);
router.get("/shared/:email", getUserSharedMedia);
router.put("/removeFromWantToWatch", removeFromWantToWatch);

module.exports = router;
