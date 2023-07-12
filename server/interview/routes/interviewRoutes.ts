import { Router } from 'express';
import {
    getRandomQuestion,
    giveFeedback
} from '../controllers/interviewController'

const router = Router();

router
    .get('/ping', (req, res) => res.status(204).send(null))
    .get('/question/random', getRandomQuestion())
    .post('/answer/feedback', giveFeedback());

export default router;
