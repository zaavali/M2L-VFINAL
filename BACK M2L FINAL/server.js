const express = require('express');
const cors = require('cors');
const { getCookie } = require('../FRONT M2L FINAL/src/Pages/Cookie.js'); 
const userRoute = require('./routes/userroute');
const prodRoute = require('./routes/prodroute');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/api/user', userRoute);
app.use('/api/prod', prodRoute);

// Utilisez la fonction getCookie dans une route
app.get('/api/cookie', (req, res) => {
  const cookieValue = getCookie('cookieName', req);
  // Faites quelque chose avec cookieValue si nécessaire
  res.send(cookieValue); // Par exemple, vous pouvez l'envoyer en réponse
});

app.listen(4000, () => {
  console.log("Le serveur fonctionne sur le port 4000");
});