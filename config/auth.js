// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : 'your-secret-clientID-here', // your App ID
        'clientSecret'    : 'your-client-secret-here', // your App Secret
        'callbackURL'     : 'http://localhost:8080/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'         : '1043840731926-1fg0hpq267detntrh0c9kkce8rl8i4p1.apps.googleusercontent.com',
        'clientSecret'     : 'NJji75b9Ib7WPdKFhH3OsQMF',
        'apiKey'           : 'AIzaSyD_EkXfOs3aYiHQ1p8bVtk2pJPfwjm1-lQ',
        'callbackURL'      : 'http://localhost:8080/auth/google/callback' // 'http://server.happdev.com/auth/google/callback'
    },
};
