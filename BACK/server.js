const express = require('express');
const cors = require('cors');
const userRoute = require('./routes/userroute');
const prodRoute = require('./routes/prodroute');
const commandeRoute = require('./routes/commandesroute');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:58195', 'http://192.168.1.39:3000'],
  credentials: true,
}));
app.use('/uploads', express.static('uploads'));
app.use('/api/user', userRoute);
app.use('/api/prod', prodRoute);
app.use('/api/commande', commandeRoute);

app.get('/api/cookie', (req, res) => {
  res.send(req.cookies.cookieName);
});

const PORT = process.env.PORT || 4000; 
app.listen(PORT, () => {
  console.log(`Le serveur fonctionne sur le port ${PORT}`);
});
