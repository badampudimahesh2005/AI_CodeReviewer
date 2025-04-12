const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();




const aiRoutes = require('./src/routes/ai.routes');
const app = express();

app.use(express.json());
app.use(cors());


app.use('/api/ai', aiRoutes);


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});