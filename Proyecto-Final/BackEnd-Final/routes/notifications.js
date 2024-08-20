const express = require("express");
const router = express.Router();
//const multer = require("multer");
const notificationsController = require("../controllers/notifications");
 const check = require("../middlewares/auth");  

/* router.get("/pruebaUser",check.auth,userContoller.pruebaUser);
router.get("/pruebasUsuario", check.auth, userContoller.pruebaUser);  */    
router.post("/createNotification", check.auth, notificationsController.createNotification);
router.get("/getNotifications/:user_id", check.auth, notificationsController.getNotifications);
router.put("/markAsRead/:id", check.auth, notificationsController.markAsRead);
router.delete("/deleteNotification/:id", check.auth, notificationsController.deleteNotification);
/* router.post("/login", userContoller.login);
 router.get("/profile/:id", check.auth, userContoller.profile);
router.get("/list/:page?", check.auth, userContoller.list);

router.put("/update", check.auth, userContoller.update);
router.post("/upload", [check.auth,uploads.single("file0")], userContoller.upload);

router.get("/avatar/:file", userContoller.avatar);
router.get("/counters/:id", check.auth, userContoller.counters);   */

//exportar router
module.exports = router;
