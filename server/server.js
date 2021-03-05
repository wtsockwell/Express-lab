const express = require('express')
const path = require('path')
const fs = require("fs")
const bodyParser = require('body-parser')

let app = express();

// app.use((req,res,next)=>{
//     console.log(req.originalUrl)
//     next()
// })

app.use(express.urlencoded({extended: false}))

app.post('/contact-form', (req, res) => {
    let info = {}
    fs.writeFile('../public/Info.json', JSON.stringify({Username:req.body.username, Email:req.body.email}), (err)=>{if(err)console.log(err)})
    // console.log(req.body.username)
    fs.readFile("../public/Info.json", 'utf-8', (err,data)=>{
        if(err) console.log(err)
        info = JSON.parse(data)
        res.send(`Thank you for your submission ${info.Username}, we'll contact you at ${info.Email} with information on the position.`)
    })
})

// app.get("/formsubmissions",(req,res)=>{
//     res.send(fs.readFile("../public/Info.json", 'utf-8', (err,data)=>{
//         if(err) console.log(err)
//         `Thank you for the submission of ${JSON.parse(data)}`
//     }))
// })

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000)