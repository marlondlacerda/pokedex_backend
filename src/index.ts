import App from './app';

require('dotenv/config');

const app = new App().express;

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
