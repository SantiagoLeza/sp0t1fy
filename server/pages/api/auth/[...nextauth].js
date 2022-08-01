"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 872:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _nextauth_)
});

;// CONCATENATED MODULE: external "next-auth"
const external_next_auth_namespaceObject = require("next-auth");
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/spotify"
const spotify_namespaceObject = require("next-auth/providers/spotify");
var spotify_default = /*#__PURE__*/__webpack_require__.n(spotify_namespaceObject);
;// CONCATENATED MODULE: external "spotify-web-api-node"
const external_spotify_web_api_node_namespaceObject = require("spotify-web-api-node");
var external_spotify_web_api_node_default = /*#__PURE__*/__webpack_require__.n(external_spotify_web_api_node_namespaceObject);
;// CONCATENATED MODULE: ./lib/spotify.js

const scopes = [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-follow-read', 
].join(',');
const params = {
    scope: scopes
};
const queryParamString = new URLSearchParams(params);
const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString();
const spotifyApi = new (external_spotify_web_api_node_default())({
    clientId: "a40d4180d92e438084e443d4047e417a",
    clientSecret: "7bdf335a5d89474b8b782ce25fe6a908"
});
/* harmony default export */ const spotify = (spotifyApi);


;// CONCATENATED MODULE: ./pages/api/auth/[...nextauth].js



async function refreshAccessToken(token) {
    try {
        spotify.setAccessToken(token.accessToken);
        spotify.setRefreshToken(token.refreshToken);
        const { body: refreshedToken  } = await spotify.refreshAccessToken();
        var _refresh_token;
        return {
            ...token,
            accessToken: refreshedToken.access_token,
            accessTokenExpires: Date.now + refreshedToken.expires_in * 1000,
            refreshToken: (_refresh_token = refreshedToken.refresh_token) !== null && _refresh_token !== void 0 ? _refresh_token : token.refreshToken
        };
    } catch (error) {
        console.error(error);
        return {
            ...token,
            error: "RefreshAccessTokenError"
        };
    }
}
/* harmony default export */ const _nextauth_ = (external_next_auth_default()({
    // Configure one or more authentication providers
    providers: [
        spotify_default()({
            clientId: "a40d4180d92e438084e443d4047e417a",
            clientSecret: "7bdf335a5d89474b8b782ce25fe6a908",
            authorization: LOGIN_URL
        }), 
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login'
    },
    callbacks: {
        async jwt ({ token , account , user  }) {
            if (account && user) {
                return {
                    ...token,
                    accessToken: account.access_token,
                    refreshToken: account.refresh_token,
                    username: account.providerAccountId,
                    accessTokenExpires: account.expires_at * 1000
                };
            }
            if (Date.now() < token.accessTokenExpires) {
                return token;
            }
            return await refreshAccessToken(token);
        },
        async session ({ session , token  }) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username;
            return session;
        }
    }
}));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(872));
module.exports = __webpack_exports__;

})();