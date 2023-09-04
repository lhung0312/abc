const express = require('express')
const app = express()

require('dotenv').config()

const configViewEngine = require('./config/viewEngine.js')

const webRoutes = require('./routes/web')

const connection = require('./config/database.js')

// console.log('check end: ', process.env)
const port = process.env.PORT || 8888
const hostname = process.env.HOST_NAME
console.log(hostname)


// config template engine
//config static files: img, css, js
configViewEngine(app)

//config req.body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// simple query
// connection.query(
//     'select * from Users',
//     function(err, results, fields) {
//         console.log(">>>> results = ",results); 
//         // results contains rows returned by server
//         console.log(">>>> fields = ", fields); 
//         // fields contains extra meta data about results, if available
//     }
//   );
// khai báo route
app.use('/', webRoutes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})