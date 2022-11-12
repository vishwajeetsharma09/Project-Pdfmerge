const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')
const merger = require('merger')
const upload = multer({ dest: 'uploads/' })
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "template/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), function (req, res, next) {
    console.log(req.files)
    merger(path.join(__dirname, req.files[0].path),path.join(__dirname, req.files[1].path))
    res.redirect("https://localhost:3000/")
    // res.send({data: req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

app.listen(port, () => {
  console.log(`Example app listening on port https://localhost${port}`)
})