const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userroute');
const prodRoute = require('./routes/prodroute');
const commandeRoute = require('./routes/commandesroute');
const cookieParser = require('cookie-parser');
const authRoute =  require('./routes/authroute');

const app = express();
app.use(cookieParser());
app.use(express.json());
// const corsOptions = {
//   origin: (origin, callback) => {
   
//     if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true 
// };
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  }
  next();
});
app.use('/uploads', express.static('uploads'));
app.use('/api/user', userRoute);
app.use('/api/prod', prodRoute);
app.use('/api/commande', commandeRoute);
app.use('/api/auth', authRoute);
app.get('/api/cookie', (req, res) => {
  res.send(req.cookies.cookieName);
});

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});