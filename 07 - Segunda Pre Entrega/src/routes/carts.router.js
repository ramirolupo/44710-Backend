import { Router } from 'express';
import * as controller from '../controllers/carts.controller.js';

const router = Router();

router.post('/', controller.getByIdPet);

router.post('/add/:idUser/:idPet', controller.addPetToUser);    

router.get('/:id', controller.getByIdPet);

export default router;
