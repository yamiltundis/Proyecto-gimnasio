import express from 'express';
import { logRequest } from './middlewares/logger.middleware';
import { handleError } from './middlewares/error.middleware';
import { usuarioRoutes } from './routes/usuario.routes';
import { tipoClaseRoutes } from './routes/tipoClase.routes';
import { claseEspecificaRoutes } from './routes/claseEspecifica.routes';
import { tipoMembreciaRoutes } from  './routes/tipoMembrecia.routes'
import { listaPrecioRoutes } from './routes/listaPrecio.routes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logRequest);

app.get('/', (req, res) => {
    res.send('Hola mundo desde express!')
});

app.use('/usuarios', usuarioRoutes)
app.use('/tiposClase', tipoClaseRoutes)
app.use('/clasesEspecificas', claseEspecificaRoutes)
app.use('/tiposMembrecia', tipoMembreciaRoutes)
app.use('/listasPrecios', listaPrecioRoutes)

app.use(handleError)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})