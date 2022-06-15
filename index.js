const express = require("express");
const app = express();
const auth = require("./routes/auth.js")
const posts = require('./routes/posts.js')
app.use(express.json());

app.use('/auth', auth);
app.use('/posts', posts)

app.get('/', (req, res)=>{
    res.send("Server is functioning")
})


app.listen(3000, ()=>{
    console.log("Server started at http://localhost:3000/")
})