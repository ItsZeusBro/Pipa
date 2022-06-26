import * as net from 'node:net';
import * as fs from "node:fs";
import * as path from "node:path";

class FilterShaft{
    constructor(filter, pipa_port){
      this.pipa_port = pipa_port
      this.filter = filter
    }
    filter(data){
      const buf = Buffer.from(data, 'hex');
      data = buf.toString('utf-8');
      return data;
    }
    pull(){
      const server = net.createServer(
        (pipa_socket)=>{
          pipa_socket.on('connection', () => {
            console.log("bowl shaft connected");
          })
          pipa_socket.on('end', () => {
            console.log('bowl shaft dislodged');
          });
          pipa_socket.on('data', (smoke) =>{
                this.filter._inhale(smoke)
          })
        }
      );
      server.listen(this.pipa_port, () => {
        console.log('Inhaling smoke on pipa-port:'+this.pipa_port);
      });
    } 
  }
  
  export class Filter {
    constructor(pipa_port, blow_file){
      this.blow_path = "./tmp/"+blow_file
      this.pipa_port = pipa_port
      this.mkdir(this.blow_path)
    }
  
    mkdir(blow_path, callback){
      if (!fs.existsSync(path.dirname(blow_path))){
        fs.mkdirSync(path.dirname(blow_path));
      }
      console.log("blow path:", blow_path)
      fs.writeFileSync(blow_path, "", {flag:'w'})

    }
    _inhale(smoke){
      //when you inhale, data comes through the socket, and you blow it into a path ending with a file
      this.blow_to(this.blow_path, smoke)
    }
    inhale(){
      var filter_shaft = new FilterShaft(this, this.pipa_port)
      filter_shaft.pull()
    }
    blow_to(blow_path, smoke){
      let writer = fs.createWriteStream(blow_path, {flag:'wa'}) 
      console.log(smoke)
      writer.write(smoke+'\n')
      
    }
  }
