var net  = require('net');
var config = require('../config');
var client = null;

function ftnnSvr(host, port){
    host = host || config.server.host;
    port = port || config.server.port;
    console.log(host,port);

    if (client) return;
    client = new net.Socket();
    client.connect(port, host, function() {
        console.log(`Connected. [${host}][${port}]`);
    });
} 

function getPrice(reqParam, callback){
    var req =  {
        'Protocol':'1001', 
        'ReqParam':{
            'Market':'1',
            'StockCode':'00700'
        },
        'Version': config.APIVersion
    };
    var buff = JSON.stringify(req);
    client.write(buff + '\n');
}

ftnnSvr();

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {
    console.log('DATA: ' + data);
    // 完全关闭连接

    client.destroy();

});


// 为客户端添加“close”事件处理函数
client.on('close', function() {
    console.log('Connection closed!');
});



