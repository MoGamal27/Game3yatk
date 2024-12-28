import express from 'express'
import mainRoutes from './Routes/mainRoutes'
import globalError from './middleware/errorMiddleware'
import { AppError } from './utils/appError';






const app = express();

app.use(express.json());

app.use('/api', mainRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this route ${req.originalUrl}`, 400));
});

app.use(globalError);

app.listen(3000, () => {
    console.log('Server up and running on port: 3000');
  });