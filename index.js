const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config();

//middleware
app.use(express.json())
app.use(cors())

const projects = require ('./projects.json')


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6ke0m0t.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        const projectsCollection = client.db("developer-portfolio1").collection("projects");
        const blogsCollection = client.db("developer-portfolio1").collection("blogs");

        app.get('/projects', async(req, res) => {
            const query = {};
            const result = await projectsCollection.find(query).toArray();
            res.send(result)
        })

        app.get('/project/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id)}
            const result = await projectsCollection.findOne(query);
            res.send(result);
        })

        app.post('/blogs', async(req, res) => {
            const blogs = req.body;
            const result = await blogsCollection.insertOne(blogs);
            console.log(blogs);
            res.send(result)
        })
        app.get('/blogs', async(req, res) => {
            const query = {};
            const result = await blogsCollection.find(query).toArray();
            console.log(result);
            res.send(result)
        })
    }
    finally{
        
    }
}
run().catch(err => console.error(err))


app.get('/', (req, res) => {
    res.send('King sp server running dont disturb')
})
app.listen(port, () =>{
    console.log(`King sp Server is running at ${port}`);
})