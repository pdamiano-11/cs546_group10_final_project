const mapRoutes = require('./map');
const memoryRoutes = require('./memory');
const userRoutes = require('./user');

const constructorMethod = (app) => {
  app.use('/map', mapRoutes);
  app.use('/memory', memoryRoutes);
  app.use('/user', userRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;