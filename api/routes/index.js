import express from 'express';
import userRouter from './user.route';
import productRouter from './product.route';
import CategoryRouter from './category.route';
import PagesRouter from './page.route';

const app = express.Router();

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/categorys', CategoryRouter);
app.use('/pages', PagesRouter);


export default app;
