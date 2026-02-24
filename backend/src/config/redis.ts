import { createClient } from 'redis';

const redisClient = createClient({
    url: 'redis://localhost:6379',
    socket: {
        // Esta función controla cuánto esperar para reintentar
        reconnectStrategy: (retries) => {
            if (retries > 2) {
                console.log("Redis: Máximo de reintentos alcanzado. Se desactiva la reconexión.");
                return false;
            }
            return 5000;
        }
    }
});

redisClient.on('error', (err) => {
    console.log('⚠️ Redis offline (opcional)');
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (err) {
    }
};

connectRedis();

export default redisClient;