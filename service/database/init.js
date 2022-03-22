const mongoose = require('mongoose');
//console.log(mongoose)
mongoose.connect('mongodb://175.178.49.124/douban').then(()=>{
        console.log('success')
})
mongoose.connection.once('open', () => {
        console.log('connect success !')
})