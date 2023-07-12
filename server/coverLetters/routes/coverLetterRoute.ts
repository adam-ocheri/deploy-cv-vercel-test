import { Router } from 'express';

import { createCoverLetter, deleteCoverLetter, getMyCoverLetter } from '../controllers/coverLettersController';

const router = Router();

router.route('/coverLetter').post(createCoverLetter).get(getMyCoverLetter);

router.route('/coverLetter/:id').delete(deleteCoverLetter);

export default router;
