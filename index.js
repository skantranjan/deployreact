const path = require('path');
const fastify = require('fastify')({ logger: true });
const fastifyStatic = require('@fastify/static');

// Serve static files from the React build directory
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'build'),
  prefix: '/', // optional: default is '/'
});

// Catch-all route to serve index.html for React Router
fastify.setNotFoundHandler((request, reply) => {
  reply.sendFile('index.html');
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server running at 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
