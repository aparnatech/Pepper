const router = require('express').Router();
const BlogData = require('../models/blogData');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

router.get('/',(req, res) => {
    BlogData.find()
    .then(blogdata => res.json(blogdata))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/blogs',(req, res) => {
  const image = req.body.image;
  const description = req.body.description;
  const title = req.body.title;
  const date = req.body.date;
  const newBLog = new BlogData({image,description,title,date});
     newBLog.save()
     .then(response => res.json(response))
     .catch(err => console.log('err', err));
});

router.delete('/delete/:id', (req, res) => {
  console.log('lll', req.params.id);
  BlogData.findByIdAndDelete(req.params.id).then((users) => res.json(users)
)});

mongoose.set('useFindAndModify', false);
router.post('/updating/:id',  function (req, res) {

    const description = req.body.description;
    const image = req.body.image;
    const title = req.body.title;
    const id =  req.body.id;
        BlogData.findOneAndUpdate({ "_id": id }, { "$set": { "description": description, "title": title, "image": image}}).exec(function(err, data){
          if(err) {
              
              res.status(500).send(err);
          } else {
              res.status(200).send(data);
          }
        });
       });
        
module.exports = router;