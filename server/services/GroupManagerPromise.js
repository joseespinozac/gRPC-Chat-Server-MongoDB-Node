'use strict';

const mongoose = require('mongoose');
const ChatGroupMDB = require("../dataaccess/model/ChatGroupMDB");
const MemberMDB = require("../dataaccess/model/MemberMDB");
const MessageMDB = require("../dataaccess/model/MessageMDB");
const ChatGroup = require("../domain/ChatGroup").ChatGroup;
const Member = require("../domain/Member").Member;


class GroupManagerPromise{


    constructor() {
        var Members = [];
    }

    //En mantenimiento
    /*async getChatGroups(){
        let response = await ChatGroupMDB.find().
        populate('members').
        exec().catch(e => {throw response.err});

        return response;
    }*/

    async getChatGroup(external_id){
        let chatGroupMDB = await ChatGroupMDB.findOne({external_id: external_id}).
        populate('members').catch(e => {throw e});
        let members = [];
        let membersMDB = chatGroupMDB.members;
        for (let i = 0; i < membersMDB.length; i++) {
            let member = new Member(
                membersMDB[i].username,
                membersMDB[i].external_id,
                membersMDB[i]._id
            );
            members.push(member);
        }
        let chatGroup = new ChatGroup(
            chatGroupMDB.external_id,
            members,
            chatGroupMDB._id
        );
        return chatGroup;
    }

    async saveChatGroup(chatGroup){
        let newChatGroup = new ChatGroupMDB({
            external_id: chatGroup.getExternalId()
        });

        let response = await newChatGroup.save();

        if (response.err) { throw response.err;}
        else { 
            console.log(response);
            return response._id;
        }

    }

    async saveMember(member){
        console.log(member);
        let newMember = new MemberMDB({
            external_id: member.external_id,
            username: member.username
        });

        let memberFound = await MemberMDB.findOne({ username: member.username }).catch(e => {throw e});
        if(memberFound){
            console.log(memberFound);
            return memberFound._id
        } else {
            let memberSaved = await newMember.save().catch(e => {throw e});
            console.log(memberSaved);
            return memberSaved._id;
        }
        
    }

    async addMemberToGroup(idMember, idGroup){
        console.log(idMember);
        let result = await ChatGroupMDB.findOneAndUpdate(
            {_id: idGroup},
            {$push: {members: idMember}},
            {strict: false}).catch(e=>{throw e});
        console.log(result);
        return;
    }

    async saveMessage(message, idGroup, idMember){
        let newMessage = new MessageMDB({
            external_id: message.external_id,
            message: message.message,
            send: message.send,
            member: idMember,
            chatgroup: idGroup
        });

        let result = await newMessage.save().catch(e => {throw e});
        return result;
    }

}



module.exports = {GroupManagerPromise: GroupManagerPromise};

