const express = require("express");
const router = express.Router();
const multer = require("multer"); 
const technicalContoller = require("../controllers/technicalProfiles");
const check = require("../middlewares/auth"); 
//configuracion de subida
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avatars_technical");
  },
  filename: (req, file, cb) => {
    cb(null, "avatars_technical- " + Date.now() + "-" + file.originalname);
  },
});
const uploads = multer({storage})  
//definir rutas

/* router.get("/pruebaUser",check.auth,userContoller.pruebaUser); */ 
router.get("/prueba",technicalContoller.prueba);
router.get("/getTechnicalProfiles/:page?", /* check.auth, */technicalContoller.getTechnicalProfiles);
router.post("/createTechnical", /* check.auth, */technicalContoller.createTechnicalProfile); 
router.get("/getTechnicalProfileById/:id", check.auth,technicalContoller.getTechnicalProfileById); 
router.put("/updateTechnicalProfile/:id", check.auth,technicalContoller.updateTechnicalProfile);
router.delete("/deleteTechnicalProfile/:id", check.auth,technicalContoller.deleteTechnicalProfile);
router.post("/uploadTechnicalProfile", [check.auth,uploads.single("file0")], technicalContoller.uploadTechnicalProfile);

/* router.get("/profile/:id", check.auth, userContoller.profile);
router.get("/list/:page?", check.auth, userContoller.list); */

/* router.put("/update", check.auth, userContoller.update);
router.post("/upload", [check.auth,uploads.single("file0")], userContoller.upload);

router.get("/avatar/:file", userContoller.avatar);  */
/* router.get("/counters/:id", check.auth, userContoller.counters);  */ 

//exportar router
module.exports = router;
