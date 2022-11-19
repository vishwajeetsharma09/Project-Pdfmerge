const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const {mergerpdf} =require('./merger')
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), function (req, res, next) {
    console.log(req.files)
   mergerpdf(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
   //res.send({data: req.files})
    res.redirect("https://localhost:3000/static/merged.pdf" )
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

app.listen(port, () => {
 // console.log(`Example app listening on port https://localhost${port}`)
 console.log("server listening to port "+port);
})