const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Register = require('./models/register.js');
const { result } = require('lodash');
const res = require('express/lib/response');
const { render } = require('express/lib/response');
const routes = require('./controllers/routes');

const port = process.env.PORT || 3000


//express app
const app = express();
const dbURI = 'mongodb+srv://Adarsh1:12@cluster0.8uv3w.mongodb.net/FirstDatabase?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
   .then(result =>
   {   console.log(result)
       console.log("connected to database")
       app.listen(5000)
    })
   .catch((err) => console.log(err));


app.use(routes);

//register view engine
app.set('view engine', 'ejs');

//middleware & statis files
app.use(express.static('views'));
app.use(express.urlencoded({extended: true})); //post data on terminal
app.use(morgan('dev'));

app.get('/', (req, res) => {
   res.render('index')
});
app.get('/register', (req, res) =>{
     res.render('register')
 });
 
app.post('/register', (req, res) =>{
    
      const password = req.body.password
      const cpassword = req.body.ConfirmPassword

      if(password === cpassword)
      {
         const register = new Register({
             Username: req.body.username,
             Email: req.body.email,
             Password: password,
             ConfirmPassword: cpassword
         })
         register.save()
           .then((result) =>{
            res.redirect('/');
            console.log(result)
           })
           .catch((err) =>{
             console.log(err)
           })
         
      }else{
          res.send("password not matching")
      }
    
})

app.get('/login', (req, res) =>{
  res.render('login')
})

//login check
app.post('/login', async(req, res)=>{
  try {
    const username = req.body.username
    const password = req.body.password

    const user = await Register.findOne({Username: username});
    
    if(user.Password === password){
      res.status(201).render('profile');
    }else{
      res.send("***Password not matching");
      console.log("****Password not matching!");
    }
  } catch (error) {
    console.log(error)
    res.send('invalid User!')
  }
})

app.get('/profile', (req, res) =>{
  res.render('profile',{
    Username: Username
  })
})



