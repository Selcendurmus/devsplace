const express = require ('express');
const users = require ('./routes/api/users');
const profile = require ('./routes/api/profile');
const posts = require ('./routes/api/posts');



const app = express();


//Let's write our first route
app.get('/', (req,res) => res.send ('Hello'));

//use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);


const port = 5050;
app.listen (port, ()=> console.log (`server is running on port ${port}`));