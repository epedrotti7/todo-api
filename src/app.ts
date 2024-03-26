import Fastify from 'fastify';
import db from './infrastructure/database/mongoose';
import todoRoutes from './interfaces/http/routes/todo-routes';
import { setupWebSocket } from './infrastructure/websocket';

const fastify = Fastify({ logger: true });

async function bootstrap() {
    try {

        await fastify.register(require('@fastify/swagger'), {
            routePrefix: '/documentation',
            swagger: {
                info: {
                    title: 'Test API',
                    description: 'API Todos',
                    version: '0.1.0'
                },
                externalDocs: {
                    url: 'https://swagger.io',
                    description: 'Encontre mais informações aqui'
                },
                host: 'localhost:8080',
                schemes: ['http'],
                consumes: ['application/json'],
                produces: ['application/json'],
            },
            uiConfig: {
                docExpansion: 'full',
                deepLinking: false
            },
            exposeRoute: true,
            staticCSP: true,
            transformStaticCSP: (header: string) => {
                return `${header}; connect-src 'self' http://localhost:8080 http://localhost`;
            },
        })

        fastify.register(todoRoutes, { prefix: '/api/v1/' });

        fastify.addHook('onClose', (instance, done) => {
            db.close()
                .then(() => {
                    instance.log.info('MongoDB disconnected on app termination');
                })
                .catch(err => {
                    instance.log.error('Error during disconnection', err);
                })
                .finally(() => {
                    done();
                });
        });

        await fastify.ready();
        console.log('Server ready and documentation available on http://localhost:8080/documentation');
        await fastify.listen({ port: 8080, host: '0.0.0.0' });

        setupWebSocket(fastify.server);

        console.log('Server running on http://localhost:8080');
        console.log('Documentation available on http://localhost:8080/documentation');
    } catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
}

bootstrap();
