Template.signInWithEmailModal.rendered = function() {
    return $('#sign-in-with-email').validate({
        rules: {
            emailAddress: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            emailAddress: {
                required: "Gonna need an email, there, friend!",
                email: "Is that a real email? What a trickster!"
            },
            password: {
                required: "Pop in a passwordarooni for me there, will ya?"
            }
        },
        submitHandler: function() {
            var createOrSignIn, user;
            createOrSignIn = Session.get('createOrSignIn');
            user = {
                email: $('[name="emailAddress"]').val(),
                password: $('[name="password"]').val()
            };
            if (createOrSignIn === "create") {
                return Meteor.call('validateEmailAddress', user.email, function(error, response) {
                    if (error) {
                        return alert(error.reason);
                    } else {
                        if (response.error) {
                            return alert(response.error);
                        } else {
                            return Accounts.createUser(user, function(error) {
                                if (error) {
                                    return alert(error.reason);
                                } else {
                                    return $('.modal-backdrop').hide();
                                }
                            });
                        }
                    }
                });
            } else {
                return Meteor.loginWithPassword(user.email, user.password, function(error) {
                    if (error) {
                        return alert(error.reason);
                    } else {
                        return $('.modal-backdrop').hide();
                    }
                });
            }
        }
    });
};

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