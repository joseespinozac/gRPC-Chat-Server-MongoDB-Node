
class ChatGroup {

    members = [];
    idGroup; //No es necesario para ser almacenado, mongo lo genera automaticamente
    external_id;

    constructor(external_id, members, idGroup){
        this.external_id = external_id;
        this.idGroup = idGroup;
        members.forEach(member => {
            this.addMember(member);
        });
        console.log(this.members);
    }

    addMember(member){
        this.members.push(member);
    }

    getIdGroup(){
        return this.idGroup;
    }
    
    setIdGroup(idGroup){
        this.idGroup = idGroup;
    }

    getExternalId(){
        return this.external_id;
    }

    setExternalId(external_id){
        this.external_id = external_id;
    }

    getMembers(){
        return this.members;
    }

}

module.exports = {ChatGroup: ChatGroup};