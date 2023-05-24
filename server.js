const express = require('express');
// const { User, Service } = require('./models/models');
const next = require('next');
const sequelize = require('./utils/db');
require('dotenv').config();
const usersHandler = require('./pages/api/register');
const loginUserHandler = require('./pages/api/login');
const tokenHandler = require('./pages/api/token').tokenHandler;
const createDataService = require('./pages/api/service').createDataService;
const getDataService = require('./pages/api/service-data').getDataService;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.use('/uploads', express.static('public/uploads'));
  server.get('/api/service-data', getDataService);

  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query);
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.all('/api', (req, res) => {
    app.render(req, res, '/404', req.query);
  });

  server.post('/api/register', usersHandler.createUser);
  server.post('/api/login', loginUserHandler.loginUser);
  server.post('/api/token', tokenHandler);
  server.post('/api/service', createDataService);

  const PORT = process.env.PORT || 3000;

  const start = async () => {
    try {
      await sequelize.authenticate()
        .then(() => {
          console.log('Подключение к базе данных установлено успешно');
        })
        .catch((error) => {
          console.error('Ошибка в подлючении:', error);
        });

      await sequelize.sync()
        .then(() => {
          console.log('Все модели были успешно синхронизированы');
        })
        .catch((error) => {
          console.error('Ошибка to synchronize models with the database:', error);
        });

      server.listen(PORT, () => console.log(`::::::::...The server is running on the port: ${PORT}...::::::::`));
    } catch (err) {
      console.log('error start: ', err);
    }
  };

  start();
});
