import { Router } from 'express';

import {
    createApplication,
    deleteApplication,
    getApplication,
    getMyApplications,
    updateApplication,
} from '../controller/applicationsController';

const router = Router();

router.route('/applications').post(createApplication).get(getMyApplications);

router.route('/applications/:id').delete(deleteApplication).put(updateApplication).get(getApplication);

export default router;
