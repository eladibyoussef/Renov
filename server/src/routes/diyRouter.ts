import { Router } from 'express';
import { createDiyTutorial, getAllDiyTutorials, getDiyTutorialById, updateDiyTutorial, deleteDiyTutorial, searchDiyTutorials } from '../controllers/diyController';

const router = Router();

router.post('/', createDiyTutorial);

router.get('/', getAllDiyTutorials);

router.get('/search', searchDiyTutorials);

router.get('/:id', getDiyTutorialById);

router.put('/:id', updateDiyTutorial);

router.delete('/:id', deleteDiyTutorial);

export default router;
