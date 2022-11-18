const express = require('express');
const { use } = require('express/lib/application');
const path = require('path');
const app =express();
const port=3000;
const fs = require("fs")
let lista = Array

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


app.get('/a', function(req, res) {
    fs.readFile(path.join(__dirname,"public/data.txt"), "utf8", (err, data) => {
        if (err) {
            console.error(err)
        } else {
            res.send(data)
        }
        
    })
});





app.post('/', (req, res) => {
    fs.writeFile(path.join(__dirname,"public/data.txt"), JSON.stringify(req.body), (err)=>{
        if(err){
            console.log(err)
        }
    })
    res.send(req.body)
})



app.listen(port, () => console.log('Example pp listening on port ${port}!'));


