const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./modules/user');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));


app.set("view engine" , 'ejs');


app.get('/' , (req,res)=>{
    res.render("index");

})

//create apna user ko
app.post('/' ,async (req,res)=>{
    let {name} = req.body;
    await userModel.create({name});
    res.redirect('/see');
})


app.get('/see', async (req, res) => {
    let allUsers = await userModel.find();
    res.render('see', { user: allUsers });
});

app.get('/delete/:id' , async (req,res)=>{
    await userModel.findOneAndDelete({_id:req.params.id})
    res.redirect("/see");
})


app.get('/edit/:id', async (req, res) => {
    let user = await userModel.findOne({ _id: req.params.id });
    res.render('edit', { user });
});



app.post('/update/:id', async (req, res) => {
    let { name} = req.body;
    await userModel.findOneAndUpdate(
        { _id: req.params.id },
        { name },
        { new: true }
    );
    res.redirect('/see');
});






app.listen('3000');
