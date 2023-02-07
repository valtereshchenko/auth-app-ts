const tasksController = require('../controllers/tasksController')
const router = require("express").Router();
const multer = require("multer")


const upload = multer({ dest: 'uploads/' })


router.post('/', upload.single("image"), checkAuthenticated, tasksController.createTask);
router.post('/remove', checkAuthenticated, tasksController.removeTask);
//router.post('/deleteall', checkAuthenticated, tasksController.deleteAll);
router.get('/', checkAuthenticated, tasksController.getTasks);

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {    //a passport function
      return next()
    }
    res.status(401).send(); // unauthorized error
  }

module.exports = router;