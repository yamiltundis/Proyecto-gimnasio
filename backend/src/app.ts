import express from 'express';
import { logRequest } from './middlewares/logger.middleware';
import { handleError } from './middlewares/error.middleware';
import { usuarioRoutes } from './routes/usuario.routes';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logRequest);

app.get('/', (req, res) => {
    res.send('Hola mundo desde express!')
});

app.use('/usuarios', usuarioRoutes)

app.use(handleError)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})