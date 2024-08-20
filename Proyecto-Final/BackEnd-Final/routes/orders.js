const express = require("express");
const router = express.Router();
//const multer = require("multer");
const ordersContoller = require("../controllers/orders");
 const check = require("../middlewares/auth");  

/* router.get("/pruebaUser",check.auth,userContoller.pruebaUser);
router.get("/pruebasUsuario", check.auth, userContoller.pruebaUser);  */
router.post("/createOrder",check.auth, ordersContoller.createOrder);
router.get("/listOrders", ordersContoller.listOrders);
router.get("/getOrderById/:id", ordersContoller.getOrderById);
router.put("/updateOrder/:id", ordersContoller.updateOrder);
router.delete("/deleteOrder/:id", ordersContoller.deleteOrder); 
/* router.post("/login", userContoller.login);
 router.get("/profile/:id", check.auth, userContoller.profile);
router.get("/list/:page?", check.auth, userContoller.list);

router.put("/update", check.auth, userContoller.update);
router.post("/upload", [check.auth,uploads.single("file0")], userContoller.upload);

router.get("/avatar/:file", userContoller.avatar);
router.get("/counters/:id", check.auth, userContoller.counters);   */

//exportar router
module.exports = router;
