const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')
require('dotenv').config();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;
const cors = require('cors')
const path = require('path');


const dbURL = process.env.MONGODB_URL;

mongoose.connect(dbURL).then(()=>{console.log("mongodb connected");
}).catch(err=>console.log("mongo connection error",err))




// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true // Allow cookies to be sent and received
  }));
  
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/auth",authRouter);
app.use("/api/users",usersRouter);
app.use("/api/posts",postsRouter);
app.use("/api/comments",commentsRouter);



app.listen(PORT,()=>{console.log("app is listnening" + process.env.PORT);
})