import fastify from 'fastify';
import fastifyHttpProxy from 'fastify-http-proxy';
import fastifyCors from 'fastify-cors';

const server = fastify();

server.register(fastifyCors, {});

server.register(fastifyHttpProxy, {
  prefix: '/spine',
  upstream: 'https://clockwork-origins.com:19181',
});

server.listen(3000);
