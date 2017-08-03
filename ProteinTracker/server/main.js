import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Users = new Meteor.Collection('users');
Hist = new Meteor.Collection('history');

Meteor.startup(() => {

  Meteor.publish('allUsers', function() {
    return Users.find();
  });

  Meteor.publish('allHistories', function() {
    return Hist.find();
  });
  
  
  // code to run on server at startup
  if(Users.find().count() === 0) {
    Users.insert({
      total: 123,
      goal: 300
    });
  }

  if(Hist.find().count() === 0) {
    Hist.insert({
      value: 30,
      date: new Date().toTimeString()
    });
    Hist.insert({
      value: 111,
      date: new Date().toTimeString()
    });
  }
});
