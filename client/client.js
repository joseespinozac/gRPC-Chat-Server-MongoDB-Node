let grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");
var readline = require("readline");
 
//Read terminal Lines
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Load the protobuf
var proto = grpc.loadPackageDefinition(
  protoLoader.loadSync("protos/chat.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  })
);
 
const REMOTE_SERVER = "0.0.0.0:5001";

var username;

var member1 = {
  external_id: 10,
  username: "Joel"
}

var member2 = {
  external_id: 11,
  username: "Beto"
}

var chatgroup = {
  external_id: 11,
  members: [member1, member2]
}

var message = {
  external_id: 11,
  member: member1,
  text: "Este es un mensaje de prueba",
  chatgroup: chatgroup
}

let client = new proto.example.Chat(
    REMOTE_SERVER,
    grpc.credentials.createInsecure()
);


function startChat() {
  let channel = client.join({member: member1});

  channel.on("data", onData);

  rl.on("line", function(text) {
    message.text = text;
    client.send(message, res => {});
  });
}

function newChat(){
  client.newChat(chatgroup);
}

function onData(message) {
    /*if(message.chatgroup.external_id != chatgroup.external_id) {
        return;
    }*/
    console.log(`${message.member.username}: ${message.text}`);
}


//startChat();
client.newChat(chatgroup, res => {});

