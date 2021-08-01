import { Router } from 'express';

import productsRouter from '@modules/products/infra/http/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/passwords.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import customersRouter from '@modules/customers/infra/http/routes/customers.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

const time = new Date().toLocaleString();

routes.get('/', (req, res) => {
  res.send({ message: 'Servidor funcionando', startedAt: time });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;