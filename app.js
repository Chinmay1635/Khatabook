const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');



app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));


app.get("/", function(req,res){
    fs.readdir('./files', function(err,files){
        res.render("index", {files})
    })
});

app.get('/createnew', function(req,res){
    res.render("createnew");
   
})

app.post('/create', function(req,res){
    
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1; 
    let year = date.getFullYear();
    const name = `${req.body.title}_${day}-${month}-${year}.txt`;

    const data = req.body.expense;
    fs.writeFile(`./files/${name}`, data, function(err){
        if(err){
            return res.send("something went wrong");
        }
    })

   res.redirect('/');
})

app.get('/edit/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', function(err,data){
        if(err) return res.send("Something went wrong")
        res.render('edit', {data, filename:req.params.filename});

    })

})

app.post('/update/:filename', function(req,res){
    fs.writeFile(`./files/${req.params.filename}`, req.body.filedata, function(err){
        if(err) return res.send("Something went wrong");
        res.redirect('/');
    })

})

app.get('/delete/:filename', function(req,res){
    fs.unlink(`./files/${req.params.filename}`, function(err){
        if(err) return res.send("Something went wrong");
        res.redirect("/");
    })
})
app.listen(3000);