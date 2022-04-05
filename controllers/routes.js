const router = require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const tasks = require('../modals/taskmodal');
router.get('/dashboard', (req, res) => {
    var mytasks ;
    tasks.find({}, (err,data) => {
         if(err){
             console.log(err);
    } if (data) {
        mytasks = data;
    }
     res.render('dashboard',{data:mytasks});  
    });
});

router.get('/course1', (req, res) =>{
    res.render('course1')
});
router.post('/add', (req, res) => {
    
    const task = req.body.task;
    tasks({ task : task }).save(function(err, doc){
        if(err){
            console.log(err);
        }
        res.redirect('/dashboard');
    });
});

router.post('/delete',(req, res) => {
    const id = req.body.id;

    tasks.findOneAndRemove({ _id: id }, (err , doc) =>{
        res.redirect('/dashboard');
    });
});

router.post('/update', (req, res) =>{
    const id = req.body.id;

    tasks.findOneAndUpdate({_id: id}, { status: true }, (err,doc) =>{
        res.redirect('/dashboard');
    });

});

module.exports = router;
