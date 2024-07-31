const express = require('express')
const sigupData = require('../controler/sigupData')

const router = express.Router()

 
router.post('/register', sigupData.reg)

router.post('/register/join', sigupData.regJoin)

router.post('/sign',sigupData.login);


module.exports = router