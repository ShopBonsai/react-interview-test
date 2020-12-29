import passport from 'passport';
const { Strategy: GoogleTokenStrategy } = require('passport-google-token');
require('dotenv').config();

// GOOGLE STRATEGY
const GoogleTokenStrategyCallback = (
    accessToken,
    refreshToken,
    profile,
    done
) =>
    done(null, {
        accessToken,
        refreshToken,
        profile,
    });

passport.use(
    new GoogleTokenStrategy(
        {
            clientID:
                '1057747297021-a6jjec4ohpsjr4gnc523afpes0nuuup4.apps.googleusercontent.com',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
        GoogleTokenStrategyCallback
    )
);

export const authenticateGoogle = (req, res): Promise<any> =>
    new Promise((resolve, reject) => {
        passport.authenticate(
            'google-token',
            { session: false },
            (err, data, info) => {
                if (err) reject(err);
                resolve({ data, info });
            }
        )(req, res);
    });
