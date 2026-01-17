import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.routes';
import { logRequest } from './middlewares/logger.middleware';
import { handleError } from './middlewares/error.middleware';
import { usuarioRoutes } from './routes/usuario.routes';
import { tipoClaseRoutes } from './routes/tipoClase.routes';
import { claseEspecificaRoutes } from './routes/claseEspecifica.routes';
import { tipoMembreciaRoutes } from  './routes/tipoMembrecia.routes'
import { listaPrecioRoutes } from './routes/listaPrecio.routes';
import { pagoRoutes } from './routes/pago.routes';
import { reservaRoutes } from './routes/reserva.routes';
import { asistenciaClaseRoutes } from './routes/asistenciaClase.routes';
import { asistenciaRoutes } from './routes/asistencia.routes';
import { membreciaActivaRoutes } from './routes/membreciaActiva.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logRequest);

app.use('/auth', authRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/tiposClase', tipoClaseRoutes)
app.use('/clasesEspecificas', claseEspecificaRoutes)
app.use('/tiposMembrecia', tipoMembreciaRoutes)
app.use('/listasPrecios', listaPrecioRoutes)
app.use('/pagos', pagoRoutes);
app.use('/reservas', reservaRoutes);
app.use('/asistenciasClases', asistenciaClaseRoutes);
app.use('/asistencias', asistenciaRoutes);
app.use('/membreciasActivas', membreciaActivaRoutes)

app.use(handleError)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})