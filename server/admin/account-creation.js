/*
 Account Creation
 Methods to call when new users are created.
 */
var determineEmail;

determineEmail = function(user) {
    var services;
    if (user.emails) {
        return user.emails[0].address;
    } else if (user.services) {
        services = user.services;
        return (function() {
            switch (false) {
                case !services.facebook:
                    return services.facebook.email;
                case !services.github:
                    return services.github.email;
                case !services.google:
                    return services.google.email;
                case !services.twitter:
                    return null;
                default:
                    return null;
            }
        })();
    } else {
        return null;
    }
};

Accounts.onCreateUser(function(options, user) {
    var userData;
    userData = {
        email: determineEmail(user),
        name: options.profile ? options.profile.name : ""
    };
    if (userData.email !== null) {
        Meteor.call('sendWelcomeEmail', userData, function(error) {
            if (error) {
                return console.log(error);
            }
        });
    }
    if (options.profile) {
        user.profile = options.profile;
    }
    return user;
});

Meteor.methods({
    sendWelcomeEmail: function(userData) {
        var emailTemplate;
        check(userData, {
            email: String,
            name: String
        });
        SSR.compileTemplate('welcomeEmail', Assets.getText('email/welcome-email.html'));
        emailTemplate = SSR.render('welcomeEmail', {
            name: userData.name !== "" ? userData.name : null,
            url: "http://localhost:3000"
        });
        return Email.send({
            to: userData.email,
            from: "The Meteor Chef - Demo <demo@themeteorchef.com>",
            subject: "Welcome aboard, team matey!",
            html: emailTemplate
        });
    }
});