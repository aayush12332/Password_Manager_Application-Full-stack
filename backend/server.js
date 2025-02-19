const express = require('express')
const dotenv = require('dotenv')
const{MongoClient} = require('mongodb')
const bodyParser = require('body-parser')
const cors = require('cors')
dotenv.config()

const url='mongodb://localhost:27017'
const client = new MongoClient(url)

const dbname = 'passop';
const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(cors())

client.connect();
//get all passwords 
app.get('/', async(req, res) => {
  const db = client.db(dbname);
  const Collection = db.collection('passwords');
  const findRessult = await Collection.find({}).toArray()
  res.send(findRessult)
})

//save password
app.post('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbname);
  const Collection = db.collection('passwords');
  const findRessult = await Collection.insertOne(password)
  res.send({success: true,result: findRessult})

})

//delete passwords by id
app.delete('/', async(req, res) => {
  const password = req.body
  const db = client.db(dbname);
  const Collection = db.collection('passwords');
  const deleteResult = await Collection.deleteOne(password)
  res.send({success: true,result:deleteResult})

})
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
      