import { Router } from 'express';
import * as papersController from '../controllers/papers.controller';

const router = Router();

// Analytics route first to avoid collision if we add /:id later
router.get('/analytics', papersController.getAnalyticsHandler);

router.get('/', papersController.getPapersHandler);
router.post('/', papersController.createPaperHandler);

export default router;
