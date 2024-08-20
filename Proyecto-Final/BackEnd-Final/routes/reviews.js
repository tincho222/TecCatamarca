const express = require("express");
const router = express.Router();
//const multer = require("multer");
const reviewsController = require("../controllers/reviews");
const check = require("../middlewares/auth");

/* router.get("/pruebaUser",check.auth,userContoller.pruebaUser);
router.get("/pruebasUsuario", check.auth, userContoller.pruebaUser);  */
router.post("/createReview", check.auth, reviewsController.createReview);
router.get("/listReviews", check.auth, reviewsController.listReviews);
router.get("/getReviewById/:id", check.auth, reviewsController.getReviewById);
router.put("/updateReview/:id", check.auth, reviewsController.updateReview);
router.delete("/deleteReview/:id", check.auth, reviewsController.deleteReview);
/* router.post("/login", userContoller.login);
 router.get("/profile/:id", check.auth, userContoller.profile);
router.get("/list/:page?", check.auth, userContoller.list);

router.put("/update", check.auth, userContoller.update);
router.post("/upload", [check.auth,uploads.single("file0")], userContoller.upload);

router.get("/avatar/:file", userContoller.avatar);
router.get("/counters/:id", check.auth, userContoller.counters);   */

//exportar router
module.exports = router;
