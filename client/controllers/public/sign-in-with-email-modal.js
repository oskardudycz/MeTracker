Template.signInWithEmailModal.events({
    'click .btn-create-account': function() {
        return Session.set('createOrSignIn', 'create');
    },
    'click .btn-sign-in': function() {
        return Session.set('createOrSignIn', 'signin');
    },
    'submit form': function(e) {
        return e.preventDefault();
    }
});