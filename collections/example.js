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

Tasks = new Mongo.Collection("tasks");

Meteor.methods({
    addTask: function (text) {
        // Make sure the user is logged in before inserting a task
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Tasks.insert({
            text: text,
            createdAt: new Date(),
            owner: Meteor.userId(),
            username: Meteor.user().username
        });
    },
    deleteTask: function (taskId) {
        var task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can delete it
            throw new Meteor.Error("not-authorized");
        }

        Tasks.remove(taskId);
    },
    setChecked: function (taskId, setChecked) {
        var task = Tasks.findOne(taskId);
        if (task.private && task.owner !== Meteor.userId()) {
            // If the task is private, make sure only the owner can check it off
            throw new Meteor.Error("not-authorized");
        }

        Tasks.update(taskId, { $set: { checked: setChecked} });
    },
    setPrivate: function (taskId, setToPrivate) {
        var task = Tasks.findOne(taskId);

        // Make sure only the task owner can make a task private
        if (task.owner !== Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Tasks.update(taskId, { $set: { private: setToPrivate } });
    }
});

if (Meteor.isServer) {
    // Only publish tasks that are public or belong to the current user
    Meteor.publish("tasks", function () {
        return Tasks.find({
            $or: [
                { private: {$ne: true} },
                { owner: this.userId }
            ]
        });
    });
}