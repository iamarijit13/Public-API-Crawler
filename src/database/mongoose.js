const mongoose = require('mongoose'); 
const MONGODB_URL='mongodb://127.0.0.1:27017/TaskManagerAPI-test';

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then((re)=>{
    console.log('MongoDB server connected successfully.');
}).catch((error)=>{
    console.log(error);
})
