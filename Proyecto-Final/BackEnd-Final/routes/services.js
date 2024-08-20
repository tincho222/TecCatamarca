const express = require("express");
const router = express.Router();
const check = require("../middlewares/auth"); 
//const multer = require("multer"); 
const serviceController = require("../controllers/services");
/* const check = require("../middlewares/auth");  */

/* router.get("/pruebaUser",check.auth,userContoller.pruebaUser);
router.get("/pruebasUsuario", check.auth, userContoller.pruebaUser);  */
router.post('/createService', check.auth,serviceController.createService);
router.get('/getServices', serviceController.getServices);
router.get('/getServiceById/:id', check.auth, serviceController.getServiceById);
router.put('/updateService/:id', check.auth, serviceController.updateService);
router.delete('/deleteService/:id', check.auth, serviceController.deleteService);
/* router.post("/login", userContoller.login);
 router.get("/profile/:id", check.auth, userContoller.profile);
router.get("/list/:page?", check.auth, userContoller.list);

router.put("/update", check.auth, userContoller.update);
router.post("/upload", [check.auth,uploads.single("file0")], userContoller.upload);

router.get("/avatar/:file", userContoller.avatar);
router.get("/counters/:id", check.auth, userContoller.counters);   */

//exportar router
module.exports = router;
