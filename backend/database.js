const mongoose = require('mongoose');

const bookConnect = process.env.MONGODB_URI;

mongoose.connect(bookConnect, {
    useNewUrlParser: true, 
    useFindAndModify: true, 
    useUnifiedTopology: true
})
.then(db => console.log('DB is connect'))
.catch(err => console.error(err));