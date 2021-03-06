import { Router } from 'express';
import { ensureAuthenticated } from '../../adms/middlewares/ensureAuthenticated';
import { HospitalController } from '../controllers/HospitalController';

const hospitalRoutes = Router();
const hospitalController = new HospitalController();

// Mostra todos os registros
hospitalRoutes.get('/', hospitalController.index);
// Mostra um registro baseado no id
hospitalRoutes.get('/:id', hospitalController.show);

hospitalRoutes.use(ensureAuthenticated);
// Cria um novo registro
hospitalRoutes.post('/', hospitalController.create);
// Edita um registro baseado no id
hospitalRoutes.put('/:id', hospitalController.update);
// Remove um registro
hospitalRoutes.delete('/:id', hospitalController.delete);

export { hospitalRoutes };
