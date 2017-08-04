import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

ProteinData = new Meteor.Collection('protein_data');
Hist = new Meteor.Collection('history');

ProteinData.deny({
  update: function(userId, data) {
    if(data.total < 0) 
      return true;
    return false;
  }
});

ProteinData.allow({
  insert: function(userId, data) {
    if(data.userId === userId)
      return true;
    return false;
  }
});

Meteor.subscribe('allProteinData');
Meteor.subscribe('allHistories');

Deps.autorun(function() {
  if(Meteor.user()) {
    console.log('user log in : ' + Meteor.user().profile.name);
  }
  else {
    console.log('user log out');
  }
});

Template.userDetails.helpers({
  user: function() {
    var data = ProteinData.findOne();
    if(!data) {
      data = {
        userId: Meteor.userId(),
        total: 0,
        goal: 200
      };
      ProteinData.insert(data);
    }
    return data;
  },
  lastAmount: function() {
    return Session.get('lastAmount');
  }
});

Template.history.helpers({
  historyItem: function() {
    return Hist.find({}, {sort: {date: -1}, limit: 3});
  }
});

Template.userDetails.events({
  'click #addAmount': function(e) {
    e.preventDefault();
    var amount = parseInt($('#amount').val());
    Meteor.call('proteins', amount, function(e, id) {
      if(e) {
        return alert(e.reason);
      }
    });

    Session.set('lastAmount', amount);
  },
  'click #quickSubtract': function(e) {
    e.preventDefault();
    ProteinData.update(this._id, {$inc: {total: -100}});
  }
});