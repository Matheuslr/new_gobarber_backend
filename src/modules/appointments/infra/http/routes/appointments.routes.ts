import { Router } from 'express';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentsController';

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointentsController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticaded);
appointmentsRouter.post('/', appointentsController.create);

export default appointmentsRouter;
