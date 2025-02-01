const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('api-artists/artists.json'); // Ajuste o caminho se necessário
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
