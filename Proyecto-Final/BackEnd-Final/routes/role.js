const express = require("express");
const router = express.Router();
//const multer = require("multer");
const roleContoller = require("../controllers/role");
/* const check = require("../middlewares/auth");  */

/* router.get("/pruebaUser",check.auth,userContoller.pruebaUser);
router.get("/pruebasUsuario", check.auth, userContoller.pruebaUser);  */
router.post("/createRole", roleContoller.createRole);
router.get("/listRoles/:page?", roleContoller.listRoles);
router.get("/getRoleById/:id", roleContoller.getRoleById);
router.put("/updateRole/id", roleContoller.updateRole);
router.delete("/deleteRole", roleContoller.deleteRole); /*
router.post("/upload", [check.auth,uploads.single("file0")], userContoller.upload);

router.get("/avatar/:file", userContoller.avatar);
router.get("/counters/:id", check.auth, userContoller.counters);   */

//exportar router
module.exports = router;
