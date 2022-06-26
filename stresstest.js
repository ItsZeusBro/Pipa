//write npm script to run server and client, and clean tmp

// start sender and reciever as background processes

//dump http POST requests to sender file continuously as fast as you can

//read from reciever file for some app frontend webpage that is served using http reciever using same class

//reciever should only accept valid JSON, and dump to buffer file, each JSON string with a newline char at the end

//Http server will read the file and see if a request is valid, if not, send it back to other reciever for processing
//Every JSON should have a unique id, so that the reciever on both ends can communicate about which message was bad


//valid post requests can be appended to some dom element which keeps a buffer and doesnt overflow

//try and add authorization server in between http server and tcp dump file

//Try to create a websocket server

//Try to create a publisher subscriber service

//Try to create a pool of TCP threads on both ends that read and dump from same files to utilize multiple cores

//Try to create an RPC Client/Server

//Then create Moira State Machine Api and Homer-Publisher Api

import * as fs from 'node:fs';
import sha256 from 'crypto-js/sha256.js';
import { open } from 'node:fs/promises';
//const stream = require('node:stream');

//console.log("sending str to buffer.from(str)==>", str, Buffer.from(str))
//console.log("writing buffer to bestie.bowl")
class StressTest{
    constructor(){
        this.hash_table=this.hash_n_write()
    }
    hash_n_write(){
        var str_hash={}
        for (var i=0; i<=10; i++){
            var buff = this.random_buff()
            //console.log(buff)
            var data = JSON.stringify(buff)
            const hash = sha256(data)
            str_hash[hash]=data
            let writer = fs.createWriteStream('./tmp/bestie.bowl', {flag:'wa'}) 
            writer.write(buff)
            
        }
    }
    validate(){

    }

    random_buff(){
        const hugeString = this.randString(this.getRandomSize(100))
        return Buffer.from(hugeString)
    }

    randString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
    }
    getRandomSize(max) {
        return Math.floor(Math.random() * max);
    }
}

var st = new StressTest()
//console.log(st.hash_table)

const fd = await open('./tmp/second_hand.smoke');
// Create a stream from some character device.
var read_stream = fd.createReadStream({encoding:'hex'});
read_stream.on('open', (res)=>{
    console.log(res)
})
read_stream.on('read', (data)=>{
    console.log(data)
})


