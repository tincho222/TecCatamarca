const express = require("express");
const router = express.Router();
//const multer = require("multer"); 
const categoriesContoller = require("../controllers/categories");
/* const check = require("../middlewares/auth");  */

/* router.get("/pruebaUser",check.auth,userContoller.pruebaUser);
router.get("/pruebasUsuario", check.auth, userContoller.pruebaUser);  */
router.post("/createCategory", categoriesContoller.createCategory);
router.get("/getCategories", categoriesContoller.getCategories);
router.get("/getCategoryById/:id", categoriesContoller.getCategoryById);
router.put("/updateCategory/:id", categoriesContoller.updateCategory);
router.delete("/deleteCategory/:id", categoriesContoller.deleteCategory);
/* router.post("/login", userContoller.login);
 router.get("/profile/:id", check.auth, userContoller.profile);
router.get("/list/:page?", check.auth, userContoller.list);

router.put("/update", check.auth, userContoller.update);
router.post("/upload", [check.auth,uploads.single("file0")], userContoller.upload);

router.get("/avatar/:file", userContoller.avatar);
router.get("/counters/:id", check.auth, userContoller.counters);   */

//exportar router
module.exports = router;
