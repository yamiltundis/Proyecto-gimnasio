import express from 'express';
import { logRequest } from './middlewares/logger.middleware';
import { handleError } from './middlewares/error.middleware';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logRequest);

app.get('/', (req, res) => {
    res.send('Hola mundo desde express!')
});

app.use(handleError)

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})