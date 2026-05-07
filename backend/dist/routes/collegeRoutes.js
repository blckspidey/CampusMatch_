"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collegeController_1 = require("../controllers/collegeController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/colleges', collegeController_1.getColleges);
router.get('/colleges/:id', collegeController_1.getCollegeById);
router.post('/predict', collegeController_1.predictColleges);
// Protected Routes
router.post('/save-college', auth_1.authenticateToken, collegeController_1.saveCollege);
router.get('/saved-colleges', auth_1.authenticateToken, collegeController_1.getSavedColleges);
exports.default = router;
