var net  = require('net');
var ByteBuffer = require('ByteBuffer');
var svrConfig = {
        host : 'localhost',
        port : 11111
};

var client = new net.Socket();

client.connect(svrConfig.port, svrConfig.host, function() {
    console.log('CONNECTED TO: ' + JSON.stringify(svrConfig));
    var req =  {'Protocol':'1001', 'ReqParam':{'Market':'1','StockCode':'00700'},'Version':'1'};
    var buff = JSON.stringify(req);
    console.log(buff);
    client.write(buff + '\n');
});

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {
    console.log('DATA: ' + data);
    // 完全关闭连接

    client.destroy();

});


// 为客户端添加“close”事件处理函数
client.on('close', function() {
    console.log('Connection closed');
});

console.log('===client===');

