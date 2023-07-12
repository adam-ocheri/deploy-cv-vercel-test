import { Router } from 'express'
import { createResume, deleteResume, getResumes, updateResume } from '../controllers/resumeController'

const router = Router()

router.route('/resumes').post(createResume).get(getResumes)
router.route('/resumes/:id').put(updateResume).delete(deleteResume)

export default router
