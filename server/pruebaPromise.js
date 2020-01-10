'use strict';
const ChatGroup = require('./domain/ChatGroup').ChatGroup;
const Message = require('./domain/Message').Message;
const GroupManagerPromise = require('./services/GroupManagerPromise').GroupManagerPromise;
const Member = require('./domain/Member').Member;

let member1 = new Member(
    "Juanito",
    "1",
    ""
);

let member2 = new Member(
    "Michael",
    "3",
    ""
);

var chatGroup = new ChatGroup(
    "4",
    [member1, member2],
    ""
);

var message = new Message(
    "3",
    member2,
    "Este es un mensaje de prueba",
    "",
    chatGroup,
    false
);

var groupManager = new GroupManagerPromise();

//getGroups();
//saveGroup(chatGroup);
saveMessage(message);
//getGroup(message.getGroup().getExternalId())


async function getGroups(){
    console.log(await groupManager.getChatGroups());
}

async function getGroup(externalIdGroup){
    console.log(await groupManager.getChatGroup(externalIdGroup));
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
    let group = await groupManager.getChatGroup(message.getGroup().getExternalId());
    let members = group.getMembers();
    let idMemberMessage;
    
    console.log("Paso 2: buscar a quien mando el mensaje en el objeto group");
    for (let i = 0; i < members.length; i++) {
        if(members[i].username.localeCompare(message.getMember().getUserName())) {
            idMemberMessage = members[i].getIdMember();
        }        
    }

    console.log("Paso 3: guardar el mensaje");

    console.log(await groupManager.saveMessage(message, group.getIdGroup(), idMemberMessage));


}



