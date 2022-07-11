import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send(
    "<h1>Serever is running correctly.</h1><h2>Please go to <a href='./api/images'>http://localhost:3000/api/images</a></h2>"
  );
});

// start the Express server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

export default app;
