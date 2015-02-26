Router.route('dashboard', {
    path: '/dashboard',
    template: 'dashboard',
    waitOn: function() {
        return Meteor.subscribe('userData');
    },
    onBeforeAction: function() {
        Session.set('currentRoute', 'dashboard');
        return this.next();
    }
});