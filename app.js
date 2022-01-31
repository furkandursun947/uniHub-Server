import express from "express";
import cors from "cors";
import db from './models/Index.js';
import router from "./routes/routes.js";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerOptions from "./swaggerOptions.js";

const app = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(express.json());
app.use(cors());
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
 
try {
    await db.sequelize.authenticate()
    console.log('Connection has been established successfully.');

} catch (error) {
    console.error('Unable to connect to the database:', error);
}
 

app.use(router);
 
const port = 8080;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));