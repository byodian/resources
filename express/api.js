require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const app = express();
const Resource = require('./models/resources');

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.send('Hello world');
})

// When the response is sent in the JSON format,
// the toJSON method of each object in the array
// is called automatically by the JSON.stringify method
app.get('/.netlify/functions/api/resources', (req, res) => {
  Resource.find({})
    .then(resources => {
      let obj = {};
      obj.resources = resources
      res.json(obj);
    })
})

app.get('/.netlify/functions/api/resources/:id', (req, res) => {
  Resource.findById(req.params.id)
    .then(resource => {
      if (resource) {
        res.json(resource);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => {
      console.log(error);
      res.status(400).send({error: 'malformatted id'});
    })
})

app.post('/.netlify/functions/api/resources', (req, res) => {
  const body = req.body;

  if (!body.title || !body.content) {
    return res.status(400).json({
      error: 'Content missing'
    });
  }

  const resource = new Resource({
    title: body.title,
    content: body.content,
    src: body.src || '',
    href: body.href || '',
    category: body.category || ''
  });


  resource.save()
    .then(saveResource => {
      res.json(saveResource);
    })
})

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

module.exports.handler = serverless(app);