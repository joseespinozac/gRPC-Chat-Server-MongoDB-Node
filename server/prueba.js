'use strict';
const ChatGroup = require('./domain/ChatGroup').ChatGroup;
const GroupManager = require('./services/GroupManager').GroupManager;
const Member = require('./domain/Member').Member;

let member1 = new Member(
    "Juanito",
    "1"
)

let member2 = new Member(
    "Marco",
    "2"
)

var chatGroup = new ChatGroup(
    "2",
    [member1, member2]
);

initNewChat(chatGroup);

function initNewChat(chatGroup){
    saveChatGroup(chatGroup, function (success, errores){
        if(success){    
            console.log("Se agrego correctamente el grupo\n\n");
            console.log("Ahora hay que agregar los miembros");
        } else {
            console.log("Ocurrio un error para guardar el grupo:" + errores + "\n\n");
        }
    })
}

function saveChatGroup(chatGroup, _callback){
    let groupManager = new GroupManager();
    let errores = '';
    groupManager.saveChatGroup(chatGroup, function(success){
        if(success){
            for (let i = 0; i < chatGroup.members.length; i++) {
                groupManager.saveMember(chatGroup.members[i], chatGroup.external_id, function(success, idMember, idGroup){
                    if(success){
                        groupManager.addMemberToGroup(idMember, idGroup, function(success){
                            if(success){
                                _callback(true, null);
                            } else {
                                errores +="Error para agregar al miembro: " + chatGroup.members[i].username + "\n\n";
                                _callback(false, errores);
                                return;
                            }
                        });
                    }else{
                        errores += "No se pudo guardar al miembro: " + chatGroup.members[i].username + "\n\n";
                        _callback(false, errores);
                        return;
                    }
                });
            }
        } else {
            errores += "Error para guardar el grupo, Intentelo mas tarde";
            _callback(false, errores);
        }
    });
}

function getAllGroups(){
    let groupManager = new GroupManager();
    let groups = [];
    groupManager.getChatGroups(function(success, chatgroups){
        if(success){
            for (let i = 0; i < chatgroups.length; i++) {
                groups.push(chatgroups[i]);             
            }
            return groups;
        } else {
            console.log("Hubo un error para recuperar los grupos\n\n");
        }
    });
}




