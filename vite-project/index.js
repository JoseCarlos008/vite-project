import express from 'express';
import cors from "cors";

import userRoutes from "./src/backend/routes/users.js";
import productRoutes from "./src/backend/routes/products.js";

const PORT = 3000;

const HOST = '0.0.0.0';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", userRoutes, productRoutes)

app.listen(PORT,HOST);