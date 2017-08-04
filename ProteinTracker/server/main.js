import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

ProteinData = new Meteor.Collection('protein_data');
Hist = new Meteor.Collection('history');

Meteor.methods({
  proteins: function(amount) {
    ProteinData.update({userId: this.userId}, {$inc: {total: amount}});
    Hist.insert({
      value: amount,
      date: new Date().toTimeString(),
      userId: this.userId
    });
  }
});

Meteor.startup(() => {

  Meteor.publish('allProteinData', function() {
    return ProteinData.find({userId: this.userId});
  });

  Meteor.publish('allHistories', function() {
    return Hist.find({userId: this.userId});
  });
  
  
  // code to run on server at startup
});