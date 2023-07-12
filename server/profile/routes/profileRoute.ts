import { Router } from 'express';
// import { createProfile, getMyProfile, updateProfile } from '../controllers/profileController';
import { getMyProfile, updateProfile } from '../controllers/profileController';

import { getDescription } from '../controllers/ceeveeItController';

const router = Router();
// import { createProfile, getMyProfile, updateProfile } from '../controllers/profileController';

// router.route('/profile').post(createProfile).get(getMyProfile);

router.route('/profile').put(updateProfile).get(getMyProfile);
// router.route('/profile/:id').put(updateProfile).delete(deleteProfile);
router.post('/profile/description', getDescription);

export default router;
