const express = require('express');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000

//middleware
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.send('King sp server running dont disturb')
})
app.listen(port, () =>{
    console.log(`King sp Server is running at ${port}`);
})