import { Router } from 'express';
import { getColleges, getCollegeById, predictColleges, saveCollege, getSavedColleges } from '../controllers/collegeController';
import { authenticateToken } from '../middlewares/auth';

const router = Router();

router.get('/colleges', getColleges);
router.get('/colleges/:id', getCollegeById);
router.post('/predict', predictColleges);

// Protected Routes
router.post('/save-college', authenticateToken, saveCollege);
router.get('/saved-colleges', authenticateToken, getSavedColleges);

export default router;
