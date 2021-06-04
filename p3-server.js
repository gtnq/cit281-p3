const{coinCount} = require("./p3-module");

const fastify = require("fastify")();
const listenIP = "localhost";
const port = 8080;
const fs=require('fs');
const http=require('http');
const { err } = require("pino-std-serializers");
const hostname='localhost';

fastify.get("/", (request, reply) => {
    fs.readFile(`${__dirname}/index.html`,(err, data)=>{
        if(err){
            console.log(err);   
            reply
                .code(500)
                .header('Content-Type','text/html')
                .end("Errorprocessingrequest");
            
        }
        else{
            
            reply
                .code(200)
                .header('Content-Type','text/html')
                .send(data)
                
            
        }
    });
});

fastify.get("/coin", (request, reply) => {
    const {denom, count } = request.query;
    
    let coinValue = coinCount({denom:parseInt(denom), count:parseInt(count)});
    //console.log(coinCount({denom:parseInt(denom), count:parseInt(denom)}));
    //console.log(denom);
    reply
      .code(200)
      .header("Content-Type", "text/html; charset=utf-8")
      .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
    
});

fastify.get("/coins", (request, reply) => {
    const {option} = request.query;
    let coinValue = '';
    switch (option){
        case '1' :
            coinValue = coinCount({denom: 5, count: 3 }, { denom: 10, count: 2 });
            reply
                .code(200)
                .header("Content-Type", "text/html; charset=utf-8")
                .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
            break;

        case '2' :
            const er = new Error();
            er.statusCode = 200
            er.message = 'invalid input'
            throw er;
            coinValue = coinCount(...coins);  
            break;

        case '3' :
            let coins = {denom:3, count: 1};
            coinValue = coinCount(coins);
            reply
                .code(200)
                .header("Content-Type", "text/html; charset=utf-8")
                .send(`<h2>Value is ${coinValue}, invalid input</h2><br /><a href="/">Home</a>`);

            break;        
    }
    //console.log(coinCount({denom:parseInt(denom), count:parseInt(denom)}));
    //console.log(denom);
    
});


fastify.listen(port,hostname,(err, address)=>{
    
    console.log(`Server running at http://${hostname}:${port}/`);
});
