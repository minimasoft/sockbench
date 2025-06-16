let global_count = 0;

class miniClient {
  id: number;
  socket: WebSocket;
  private_id: string;
  constructor(id: number) {
    this.id = id;
    this.socket = new WebSocket("ws://localhost:8000/ws");
    this.socket.addEventListener("open", ()=>{this.on_connect()});
    this.socket.addEventListener("message", (event)=>{this.on_message(event.data)});
    this.socket.addEventListener("close", ()=>{this.on_close()});
    this.private_id = self.crypto.randomUUID();
  }

  on_connect() {
    this.socket.send(`{"i":"${this.private_id}","c":"register"}`);
  }

  on_message(data: string) {
    const obj = JSON.parse(data);
    if (obj.c === "public_id") {
      console.log(obj.d);
      this.socket.send(`{"i":"${this.private_id}","c":"ping"}`)
    }else if (obj.c === "pong") {
      this.socket.close();
      global_count += 1;
      if(global_count == 10000){
        console.log(`10000 register + ping in: ${(performance.now()-start).toFixed(2)} ms`);
      }
    }
  }

  on_close() {
  }

}


const start = performance.now();
if (import.meta.main) {
  for (let index = 0; index < 10000; index++) {
    const _ = new miniClient(index);
  }
}
