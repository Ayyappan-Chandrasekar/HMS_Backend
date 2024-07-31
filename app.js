const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const dotenv =require('dotenv')
const sigup = require('./route/sigup');
const rootDir = require('./utils/rooDir');
const db = require('./models/index')

const app = express()

dotenv.config({path: path.join(rootDir, 'config', 'temp.env')})

app.use(bodyParser.json());

app.use('/sigup',sigup)
app.use(sigup)


db.sequelize.authenticate().then((req) =>{
    console.log("Database succefully creater....")
    app.listen(process.env.port,()=>{
        console.log(`Server ${process.env.port} connected successfully`)
    })
})
