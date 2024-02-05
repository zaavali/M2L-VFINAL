
const express = require ('express')
const app = express()


const prodRoute =  require('./routes/prodroute')
const userRoute = require('./routes/userroute')



let cors = require('cors')





  app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use('/api/user' , userRoute);
app.use('/api/prod', prodRoute);

app.listen(4000, () => {
    console.log("server runs ")
})
