var express = require('express');
var app = express();
var https = require('https');
var cors = require('cors'); 
 var jsonResponse1;
 var jsonResponse2;
 var jsonResponse3;
 var jsonResponse4;
 var jsonResponse5;
 var jsonResponse6;
 var jsonResponse7;
 var jsonResponse8;
 var jsonResponse9;
 var jsonResponse10;
 var jsonResponse11;

app.use(cors());

// app.use(express.static('hw8/frontend'));
// app.use(express.static('frontend'));

app.get('/javascript.html', function (req, res) {
    console.log('Hello World');
    
    res.sendFile( __dirname + "/" + "javascript.html" );
// ;    console.log(global.url0)
})

app.get('/main1.css', function (req, res) {
    console.log('Hello World');
    res.sendFile( __dirname + "/" + "main1.css" );
// ;    console.log(global.url0)
})
app.get('/javascript.js', function (req, res) {
    console.log('Hello World');
    res.sendFile( __dirname + "/" + "javascript.js" );
// ;    console.log(global.url0)
})

app.get('/index.html', function (req, res) {
    console.log('Hello index');
    res.sendFile( __dirname + "/" + "index.html" );
// ;    console.log(global.url0)
})
app.get('/header.html', function (req, res) {
    console.log('Hello header');
    res.sendFile( __dirname + "/" + "header.html" );
// ;    console.log(global.url0)
})

app.get('/app.js', function (req, res) {
    console.log('Hello app');
    res.sendFile( __dirname + "/" + "app.js" );
// ;    console.log(global.url0)
})

app.get('/styles.css', function (req, res) {
    console.log('Hello styles');
    res.sendFile( __dirname + "/" + "styles.css" );
// ;    console.log(global.url0)
})

app.get('/img/facebook.png', function (req, res) {
    console.log('Hello directory');
    res.sendFile( __dirname + "/" + "img/facebook.png" );
// ;    console.log(global.url0)
})

app.get('/img/star_empty.png', function (req, res) {
    console.log('Hello home');
    res.sendFile( __dirname + "/" + "img/star_empty.png" );
// ;    console.log(global.url0)
})

app.get('/img/star_filled.png', function (req, res) {
    console.log('Hello home');
    res.sendFile( __dirname + "/" + "img/star_filled.png" );
// ;    console.log(global.url0)
})

app.get('/autocomplete.js', function (req, res) {
    console.log('Hello home');
    res.sendFile( __dirname + "/" + "autocomplete.js" );
// ;    console.log(global.url0)
})

//PRICE
app.get('/price/:input', function (req, res1) {
    console.log('ALREADY IN price');
    var input = req.params.input;
     var url1 = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol='+input+'&outputsize=full&apikey=4IMM99GXTISNOAV5';
                https.get(url1, function(res0){
                    console.log('HTTP1');
                        var body = '';

                        res0.on('data', function(chunk){
                        body += chunk;
                        });

                        res0.on('end', function(){
                            jsonResponse1 = JSON.parse(body);
                            res1.json(jsonResponse1);
                        //    console.log(jsonResponse1);
                        });

                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });
})

//SMA 
app.get('/sma/:input', function(req, res2) {
    console.log('ALREADY IN sma');
    var input = req.params.input;    
    var url2 = 'https://www.alphavantage.co/query?function=SMA&symbol='+input+'&interval=daily&time_period=10&series_type=open&apikey=4IMM99GXTISNOAV5';
    https.get(url2, function(res0){
        console.log('HTTP2');
            var body = '';

            res0.on('data', function(chunk){
            body += chunk;
            });

            res0.on('end', function(){
                jsonResponse2 = JSON.parse(body);
                // console.log(jsonResponse2);
                res2.json(jsonResponse2);
            });

    }).on('error', function(e){
        console.log("Got an error: ", e);
    });

})

//EMA
app.get('/ema/:input', function (req, res3) {
    console.log('ALREADY IN ema');
    var input = req.params.input;
    var url3 = 'https://www.alphavantage.co/query?function=EMA&symbol='+input+'&interval=daily&time_period=10&series_type=open&apikey=4IMM99GXTISNOAV5';
                https.get(url3, function(res0){
                    console.log('HTTP1');
                        var body = '';

                        res0.on('data', function(chunk){
                        body += chunk;
                        });

                        res0.on('end', function(){
                            jsonResponse3 = JSON.parse(body);
                            res3.json(jsonResponse3);
                        //    console.log(jsonResponse1);
                        });

                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });
})

//STOCH 4
app.get('/stoch/:input', function (req, res4) {
    console.log('ALREADY IN stoch');
    var input = req.params.input;
    var url4 = 'https://www.alphavantage.co/query?function=STOCH&symbol='+input+'&interval=daily&time_period=10&series_type=open&apikey=4IMM99GXTISNOAV5';
                https.get(url4, function(res0){
                    console.log('HTTP1');
                        var body = '';

                        res0.on('data', function(chunk){
                        body += chunk;
                        });

                        res0.on('end', function(){
                            jsonResponse4 = JSON.parse(body);
                            res4.json(jsonResponse4);
                        //    console.log(jsonResponse1);
                        });

                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });
})

//RSI 5
app.get('/rsi/:input', function (req, res5) {
    console.log('ALREADY IN rsi');
    var input = req.params.input;
    var url5 = 'https://www.alphavantage.co/query?function=RSI&symbol='+input+'&interval=daily&time_period=10&series_type=open&apikey=4IMM99GXTISNOAV5';
                https.get(url5, function(res0){
                    console.log('HTTP1');
                        var body = '';

                        res0.on('data', function(chunk){
                        body += chunk;
                        });

                        res0.on('end', function(){
                            jsonResponse5 = JSON.parse(body);
                            res5.json(jsonResponse5);
                        //    console.log(jsonResponse1);
                        });

                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });
})

//ADX 6
app.get('/adx/:input', function (req, res6) {
    console.log('ALREADY IN adx');
    var input = req.params.input;
    var url6 = 'https://www.alphavantage.co/query?function=ADX&symbol='+input+'&interval=daily&time_period=10&series_type=open&apikey=4IMM99GXTISNOAV5';
                https.get(url6, function(res0){
                    console.log('HTTP1');
                        var body = '';

                        res0.on('data', function(chunk){
                        body += chunk;
                        });

                        res0.on('end', function(){
                            jsonResponse6 = JSON.parse(body);
                            res6.json(jsonResponse6);
                        //    console.log(jsonResponse1);
                        });

                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });
})

//CCI 7
app.get('/cci/:input', function (req, res7) {
    console.log('ALREADY IN cci');
    var input = req.params.input;
    var url7 = 'https://www.alphavantage.co/query?function=CCI&symbol='+input+'&interval=daily&time_period=10&series_type=open&apikey=4IMM99GXTISNOAV5';
                https.get(url7, function(res0){
                    console.log('HTTP1');
                        var body = '';

                        res0.on('data', function(chunk){
                        body += chunk;
                        });

                        res0.on('end', function(){
                            jsonResponse7 = JSON.parse(body);
                            res7.json(jsonResponse7);
                        //    console.log(jsonResponse1);
                        });

                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });
})

//BBANDS 8
app.get('/bbands/:input', function (req, res8) {
    console.log('ALREADY IN bbands');
    var input = req.params.input;
    var url8 = 'https://www.alphavantage.co/query?function=BBANDS&symbol='+input+'&interval=daily&time_period=10&series_type=open&apikey=4IMM99GXTISNOAV5';
                https.get(url8, function(res0){
                    console.log('HTTP1');
                        var body = '';

                        res0.on('data', function(chunk){
                        body += chunk;
                        });

                        res0.on('end', function(){
                            jsonResponse8 = JSON.parse(body);
                            res8.json(jsonResponse8);
                        //    console.log(jsonResponse1);
                        });

                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });
})

//MACD 9
app.get('/macd/:input', function (req, res9) {
    console.log('ALREADY IN macd');
    var input = req.params.input;
    var url9 = 'https://www.alphavantage.co/query?function=MACD&symbol='+input+'&interval=daily&time_period=10&series_type=open&apikey=4IMM99GXTISNOAV5';
                https.get(url9, function(res0){
                    console.log('HTTP1');
                        var body = '';

                        res0.on('data', function(chunk){
                        body += chunk;
                        });

                        res0.on('end', function(){
                            jsonResponse9 = JSON.parse(body);
                            res9.json(jsonResponse9);
                        //    console.log(jsonResponse1);
                        });

                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });
})

//NEWS
app.get('/news/:input', function (req, res1) {
    console.log('ALREADY IN news');
    var input = req.params.input;
     var url1 = 'https://seekingalpha.com/api/sa/combined/'+input+'.xml';
                https.get(url1, function(res0){
                    console.log('HTTP1');
                        var body = '';

                        res0.on('data', function(chunk){
                        body += chunk;
                        });

                        res0.on('end', function(){
                          console.log(body);
                            jsonResponse1 = JSON.stringify(body);
                            
                            res1.send(jsonResponse1);
                        //   console.log(jsonResponse1);
                        });

                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });
})

app.get('/autocomplete/:input', function(req, res11){
    console.log('ALREADY IN autocomplete');
    var input = req.params.input;
    var url9 = 'https://stock-183802.appspot.com/api/autocomplete?input=' + input;
                https.get(url9, function(res0){
                    console.log('HTTP1');
                        var body = '';

                        res0.on('data', function(chunk){
                        body += chunk;
                        });

                        res0.on('end', function(){
                            jsonResponse11 = JSON.parse(body);
                            res11.json(jsonResponse11);
                        //    console.log(jsonResponse1);
                        });

                }).on('error', function(e){
                    console.log("Got an error: ", e);
                });

})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})

