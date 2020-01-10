let grpc = require('grpc');
var protoLoader = require("@grpc/proto-loader");
const ChatGroup = require('./domain/ChatGroup').ChatGroup;
const Message = require('./domain/Message').Message;
const GroupManagerPromise = require('./services/GroupManagerPromise').GroupManagerPromise;
const Member = require('./domain/Member').Member;

const server = new grpc.Server();
const SERVER_ADDRESS = "0.0.0.0:5001";

let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("protos/chat.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    })
);

var users = [];
var memberServer = {
  external_id: "God",
  username: "GOD"
}
var groupManager = new GroupManagerPromise();

// Receive message from client joining


function join(call, callback) {
    users.push(call);
    console.log("New User joined: " + users.length);
}
   
// Receive message from client
function send(call, callback) {
  console.log(call.request);
  let message = new Message(
    call.request.external_id,
    call.request.member,
    call.request.text,
    "",
    call.request.chatgroup,
    true
  );
  saveMessage(message);
  notifyChat(call.request);
}

function newChat(call, callback) {
  let chatGroup = new ChatGroup(call.request.external_id, call.request.members);
  saveGroup(chatGroup);
}
  
// Send message to all connected clients
function notifyChat(message) {
  users.forEach(user => {
    user.write(message);
  });
}

async function saveGroup(chatGroup){
  console.log("Paso 1");
  let idGroup = await groupManager.saveChatGroup(chatGroup).catch(e => console.log("Error al guardar grupo : ", e.message));
  let members = chatGroup.getMembers();
  
  for (let i = 0; i < members.length; i++) {
      console.log("Paso 2");
      let id = await groupManager.saveMember(members[i]).catch(e => console.log("Error al guardar miembro : ", e.message));
      console.log("Paso 3");
      await groupManager.addMemberToGroup(id, idGroup).catch(e => console.log("Error al agregar a grupo : ", e.message));
  }
}

async function saveMessage(message){
  console.log("Paso 1: guardar el mensaje");
  let group = await groupManager.getChatGroup(message.group.external_id);
  let members = group.members;
  let idMemberMessage;
  
  console.log("Paso 2: buscar a quien mando el mensaje en el objeto group");
  for (let i = 0; i < members.length; i++) {
      if(members[i].username.localeCompare(message.member.username)) {
          idMemberMessage = members[i].idMember;
      }        
  }

  console.log("Paso 3: guardar el mensaje");

  console.log(await groupManager.saveMessage(message, group.idGroup, idMemberMessage));


}
   
  // Define server with the methods and start it
  server.addService(proto.example.Chat.service, { join: join, send: send, newChat: newChat });
   
  server.bind(SERVER_ADDRESS, grpc.ServerCredentials.createInsecure());
   
  server.start();