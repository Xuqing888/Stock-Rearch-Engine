var express = require("express");
var https = require("https");
var fs = require("fs");
 
var str='{"id":"123",name:"jack",arg:11111}';
 
function onRequest(request, response){
 console.log("Request received.");
 response.writeHead(200,{"Content-Type":'text/plain','charset':'utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});//可以解决跨域的请求
 //response.writeHead(200,{"Content-Type":'application/json',   'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'PUT,POST,GET,DELETE,OPTIONS'});
 //response.write("Hello World 8888\n");
  
 str=fs.readFileSync('data.txt');
 response.write(str);
 response.end();
}
 
http.createServer(onRequest).listen(3000);
 
console.log("Server has started.port on 3000\n");
console.log("test data: "+str.toString());

// var app = express();

// app.use(express.static("./frontend"));
// app.listen(3000);

// console.log("Express app running on port 3000");

// module.export == app;

// var options = {
// 	hostname: "en.wikipedia.org",
// 	port: 443,
// 	path: "/wiki/George_Washington",
// 	method: "GET"
// };

// var req = https.request(options, function(res) {

// 	var responseBody = "";

// 	console.log("Response from server started.");
// 	console.log(`Server Status: ${res.statusCode} `);
// 	console.log("Response Headers: %j", res.headers);

// 	res.setEncoding("UTF-8");

// 	res.once("data", function(chunk) {
// 		console.log(chunk);
// 	});

// 	res.on("data", function(chunk) {
// 		console.log(`--chunk-- ${chunk.length}`);
// 		responseBody += chunk;
// 	});

// 	res.on("end", function() {
// 		fs.writeFile("george-washington.html", responseBody, function(err) {
// 			if (err) {
// 				throw err;
// 			}
// 			console.log("File Downloaded");
// 		});
// 	});

// });

// req.on("error", function(err) {
// 	console.log(`problem with request: ${err.message}`);
// });

// req.end();

