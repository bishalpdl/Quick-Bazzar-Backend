const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri || 'mongodb://127.0.0.1:27017/QB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false,
    tls:true
}).then(()=>{
    console.log('db connected')
}).catch((e)=>{
    console.log(e)
})
