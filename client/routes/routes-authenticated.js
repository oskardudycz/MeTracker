Router.route('todos', {
    path: '/todos',
    template: 'todos',
    waitOn: function() {
        return Meteor.subscribe('userData');
    },
    onBeforeAction: function() {
        Session.set('currentRoute', 'todos');
        return this.next();
    }
});