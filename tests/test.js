var ftnn = require('../lib/sdk');

ftnn.getPrice('700',function(err, data){
    if (err) console.log(err);
    console.log(data);
});

