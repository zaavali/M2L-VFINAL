require('dotenv').config({ path: '../../M2L-VFINAL/BACK M2L FINAL/' });

const express = require('express');
const cors = require('cors');
const { getCookie } = require('../FRONT M2L FINAL/src/Pages/Cookie.js'); 
const userRoute = require('./routes/userroute');
const prodRoute = require('./routes/prodroute');
const commandeRoute = require ('./routes/commandesroute.js');
const cookieParser = require('cookie-parser');


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/api/user', userRoute);
app.use('/api/prod', prodRoute);
app.use('/api/commande', commandeRoute);

app.get('/api/cookie', (req, res) => {
  const cookieValue = getCookie('cookieName', req);
 
  res.send(cookieValue); 
});

module.exports = app.listen(4000, () => {
  console.log("Serveur à l'écoute", process.env.DB_DTB);
});