import { Router } from 'express';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

import ensureAuthenticaded from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentController();
const providersAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticaded);
appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providersAppointmentsController.index);

export default appointmentsRouter;
