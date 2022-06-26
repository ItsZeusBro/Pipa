import * as net from 'node:net';
import * as fs from "node:fs";
import * as path from "node:path";

class BowlShaft{
    constructor(bowl_path, pipa_host, pipa_port){
      this.pipa_host = pipa_host
      this.pipa_port = pipa_port
      this.bowl_path = bowl_path
    }
  
    pull(){
          //bowl_shaft is just a socket
          const bowl_shaft = this.create_bowl_shaft()
          //when the bowl shaft (socket) connection ends
          bowl_shaft.on('end', () => {
            console.log('bowl fell off');
            process.exit();
          });
          setInterval(()=>{
            fs.readFile(this.bowl_path, (err, data) => {
              if(data){
                //socket.write is already a stream, no need to worry
                bowl_shaft.write(data, foo=>{
                  fs.truncate(this.bowl_path, baz=>{})
                });
              }
              if (err) throw err;
            }); 
          }, 500)
    }
  
    create_bowl_shaft(){
      const bowl_shaft = net.createConnection(
        {
          host: this.pipa_host, 
          port: this.pipa_port
        }, 
        ()=>{
          console.log("Pipa bowl-shaft connected:",this.pipa_port)
        }
      );
      return bowl_shaft
    }
  }
  
  export class Bowl {
    constructor(bowl_name, pipa_host, pipa_port){
      this.bowl_path = "./tmp/"+bowl_name
      this.mkdir(this.bowl_path)
      this.bowl_shaft = new BowlShaft(this.bowl_path, pipa_host, pipa_port)
    }
  
    mkdir(bowl_path, callback){
      if (!fs.existsSync(path.dirname(bowl_path))){
        fs.mkdirSync(path.dirname(bowl_path));
      }
      console.log("grabbing a bowl", bowl_path)
      fs.writeFileSync(bowl_path, "", {flag:'w', encoding:'utf-8'})
    }
    light_up(){
      //when you light up the bowl, the bowl shaft begins pulling from the bowl
      this.bowl_shaft.pull()
    }
  }
  
