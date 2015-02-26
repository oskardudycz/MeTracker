this.Example = new Meteor.Collection('example');

Example.allow({
    insert: function(userId, doc) {},
    update: function(userId, doc, fields, modifier) {},
    remove: function(userId, doc) {},
    fetch: ['owner'],
    transform: function() {}
});

Example.deny({
    insert: function(userId, doc) {},
    update: function(userId, doc, fields, modifier) {},
    remove: function(userId, doc) {},
    fetch: ['locked'],
    transform: function() {}
});