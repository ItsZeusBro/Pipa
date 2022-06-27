import * as net from 'node:net';
import * as fs from "node:fs";
import * as path from "node:path";
import { existsSync } from 'fs';


export class BowlClient {
  constructor(host, port, bowlname){
    this.bowlname = bowlname
    this.bowlpath = './tmp/'+this.bowlname
    this.mkdr()
    this.socket = net.createConnection({host:host, port:port})
    this.config_socket()
    this.rstream = fs.createReadStream(this.bowlpath)

    // Event: 'close'
    // Event: 'data'
    // Event: 'end'
    // Event: 'error'
    // Event: 'pause'
    // Event: 'readable'
    // Event: 'resume'

    this.rstream.on('close', ()=>{
      this.rstream.resume()
    })
    this.rstream.on('data', (data)=>{
      this.socket.write(data, ()=>{})
    })

    this.rstream.on('end', ()=>{
      this.rstream.resume()
    })
    this.rstream.on('error', ()=>{
      this.rstream.resume()
    })
    this.rstream.on('pause', ()=>{
      this.resume()
    })



  }
  config_socket(){
    this.socket.allowHalfOpen=true
    this.socket.on('close', (error)=>{
      console.log('socket closed: ', error)
    });
    this.socket.on('connect', (conn)=>{
      console.log('connection established:', conn)
    })
    this.socket.on('drain', ()=>{
      this.socket.resume()
    })
    this.socket.on('end', ()=>{
      this.socket.resume()
    })
    this.socket.on('error', (err)=>{
      console.log('Socket error:', err)
    })
    this.socket.on('timeout', ()=>{
      this.socket.resume()
    })
    this.socket.on('lookup', ()=>{
      console.log('looking up host')
    })


  }

  mkdr(){
      if (!fs.existsSync(path.dirname(this.bowlpath))){
        fs.mkdirSync(path.dirname(this.bowlpath));
      }
      console.log("grabbing a bowl", this.bowlpath)
      fs.writeFileSync(this.bowlpath, "", {flag:'a'})
  }
}
  
var bowl = new BowlClient('localhost',3000, 'new.bowl')