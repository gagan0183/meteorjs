import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

Users = new Meteor.Collection('users');
Hist = new Meteor.Collection('history');

Meteor.subscribe('allUsers');
Meteor.subscribe('allHistories');

Template.userDetails.helpers({
  user: function() {
    return Users.findOne();
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
    Users.update(this._id,{$inc: {total: amount}});
    Hist.insert({
      value: amount,
      date: new Date().toTimeString(),
      userId: this._id
    });
  }
});