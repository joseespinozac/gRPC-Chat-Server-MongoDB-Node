class Message {
    message;
    member;
    external_id;
    idMessage;
    group;
    send;

    constructor(external_id, member, message, idMessage, group, send){
        this.external_id = external_id;
        this.member = member; //En este caso es un Member
        this.message = message; //El texto del mensaje nadamas
        this.idMessage = idMessage;
        this.group = group;
        this.send = send;
    }

    getExternalId(){
        return this.external_id;
    }

    setExternalId(external_id){
        this.external_id = external_id;
    }
    
    getMember(){
        return this.member;
    }

    setMember(member){
        this.member = member;
    }

    getMessage(){
        return this.message;
    }
    
    setMessage(message){
        this.message = message;
    }

    getIdMessage(){
        return this.idMessage;
    }

    setIdMessage(idMessage){
        this.idMessage = idMessage;
    }

    getGroup(){
        return this.group;
    }

    setGroup(group){
        this.group = group;
    }

    isSend(){
        return this.send;
    }

    setSend(send){
        this.send = send;
    }

}

module.exports = {Message: Message};