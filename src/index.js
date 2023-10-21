import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import dbClient from './db/db-client.js';

// routes
import brandRoutes from './routes/brand-routes.js';
import productRoutes from './routes/product-routes.js';
import cartRoutes from './routes/cart-routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.get('/', (req, res) => {
  res.send('Server running');
});

dbClient
  .connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server] running on http://localhost:${port}/`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });
