'use strict';

const mongoose = require('mongoose');
const ChatGroupMDB = require("../dataaccess/model/ChatGroupMDB");
const MemberMDB = require("../dataaccess/model/MemberMDB");
const async = require('async');

class GroupManager{


    constructor() {
        var Members = [];
    }

    getChatGroups(_callback){
        ChatGroupMDB.find().
        populate('members').
        exec(function(err, chatgroups) {
            if(err){
                console.log(err);
                _callback(false, null);
            }
            if(chatgroups){
                console.log(chatgroups);
                _callback(true, chatgroups);
            }
                       
        });

    }

    getChatGroup(_callback){

    }

    saveChatGroup(chatGroup, _callback){
        let newChatGroup = new ChatGroupMDB({
            external_id: chatGroup.external_id
        });

        newChatGroup.save(function(err, chatgroup){
                if(err){
                    console.log(err);
                    _callback(false);
                }
                if(chatgroup){
                    console.log(chatgroup);
                    _callback(true);
                }
            }
        )
    }

    saveMember(member, chatGroupId, _callback){
        let newMember = new MemberMDB({
            external_id: member.external_id,
            username: member.username
        });

        MemberMDB.findOne(
        { username: member.username },
        (err, memberFound) => {
            if(err){
                console.log(err);
                _callback(false, null, null);
            }
            if(memberFound){
                _callback(true, member.external_id, chatGroupId);
            } else {
                newMember.save(function(err, memberAdded){
                    if(err){
                        console.log(err);
                        _callback(false, null, null);
                    } 
                    if(memberAdded){
                        console.log(memberAdded);
                        _callback(true, member.external_id, chatGroupId);
                    }
                })
            }
        });
    }

    addMemberToGroup(memberId, chatGroupId, _callback){
        console.log(memberId);
        ChatGroupMDB.findOneAndUpdate(
            {external_id: chatGroupId},
            {$push: {members: memberId}},
            {strict: false}, (err, result) => {
                if(err){
                    console.log(err);
                    _callback(false);
                }
                if(result){
                    console.log(result);
                    _callback(true);
                }
            }
        )
    }

}



module.exports = {GroupManager: GroupManager};

