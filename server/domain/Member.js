class Member{

    username = "";
    external_id = "";
    idMember = "";

    constructor(username, external_id, idMember){
        this.username = username;
        this.external_id = external_id;
        this.idMember = idMember;
    }

    getUserName(){
        return this.username;
    }
    
    setUserName(username){
        this.username = username;
    }

    getExternalId(){
        return this.external_id;
    }

    setExternalId(external_id){
        this.external_id = external_id;
    }

    getIdMember(){
        return this.idMember;
    }

    setIdMember(idMember){
        this.idMember = idMember;
    }

}

module.exports = {Member: Member};