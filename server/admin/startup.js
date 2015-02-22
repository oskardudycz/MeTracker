/*
 Startup
 Collection of methods and functions to run on server startup.
 */
Meteor.startup(function() {
    var checkUser, createServiceConfiguration, id, user, users, _i, _len, _results;
    process.env.MAIL_URL = "Insert your own MAIL_URL from your email provider here.";
    createServiceConfiguration = function(service, clientId, secret) {
        var config;
        ServiceConfiguration.configurations.remove({
            service: service
        });
        config = {
            generic: {
                service: service,
                clientId: clientId,
                secret: secret
            },
            facebook: {
                service: service,
                appId: clientId,
                secret: secret
            },
            twitter: {
                service: service,
                consumerKey: clientId,
                secret: secret
            }
        };
        switch (service) {
            case 'facebook':
                return ServiceConfiguration.configurations.insert(config.facebook);
            case 'twitter':
                return ServiceConfiguration.configurations.insert(config.twitter);
            default:
                return ServiceConfiguration.configurations.insert(config.generic);
        }
    };

    /*
     Configure Third-Party Login Services
     Note: We're passing the Service Name, Client Id, and Secret. These values
     are obtained by visiting each of the given services (URLs listed below) and
     registering your application.
     */
    createServiceConfiguration('facebook', '1564539133786096', 'df321ad9b7af53172f4f2703d4adb7f6');
    createServiceConfiguration('github', '1753e501612cd59fa595', '1397acba951e1b958b30dfed884997d2da07f773');
    createServiceConfiguration('google', '697332780400-r7jh3on8r3u99tee1gqokl3m1n3bbvpa.apps.googleusercontent.com', 'Ov296biuVPY3lXZ1aQTBV4tg');
    createServiceConfiguration('twitter', '60hbNd8PPZy6wCvctqvxVvkwS', 'GT8MoMzNmcoRSsQCAF9cIOKZRqOFRjwD5STICy4e3ip1ZvAxvw');

    /*
     Generate Test Accounts
     Creates a collection of test accounts automatically on startup.
     */
    users = [
        {
            name: "Admin",
            email: "admin@admin.com",
            password: "password"
        }
    ];
    _results = [];
    for (_i = 0, _len = users.length; _i < _len; _i++) {
        user = users[_i];
        checkUser = Meteor.users.findOne({
            "emails.address": user.email
        });
        if (!checkUser) {
            _results.push(id = Accounts.createUser({
                email: user.email,
                password: user.password,
                profile: {
                    name: user.name
                }
            }));
        } else {
            _results.push(void 0);
        }
    }
    return _results;
});