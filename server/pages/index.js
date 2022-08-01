"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 495:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Home),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
;// CONCATENATED MODULE: external "@heroicons/react/solid"
const solid_namespaceObject = require("@heroicons/react/solid");
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(649);
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


;// CONCATENATED MODULE: ./hooks/useSpotify.js



function useSpotify() {
    const { data: session , status  } = (0,react_.useSession)();
    (0,external_react_.useEffect)(()=>{
        if (session) {
            if (session.error === 'RefreshAccessTokenError') {
                (0,react_.signIn)();
            }
            spotify.setAccessToken(session.user.accessToken);
        }
    }, [
        session
    ]);
    return spotify;
}
/* harmony default export */ const hooks_useSpotify = (useSpotify);

// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(755);
;// CONCATENATED MODULE: ./atoms/playlistAtoms.js

const playlistIdState = (0,external_recoil_.atom)({
    key: "playlistIdState",
    default: '37i9dQZEVXbMDoHDwVN2tF'
});
const playlistState = (0,external_recoil_.atom)({
    key: "playlistState",
    default: null
});

;// CONCATENATED MODULE: ./components/Sidebar.js







function Sidebar() {
    const spotifyApi = hooks_useSpotify();
    const { data: session , status  } = (0,react_.useSession)();
    const { 0: playlists , 1: setPlaylists  } = (0,external_react_.useState)([]);
    const [playlistId, setPlaylistId] = (0,external_recoil_.useRecoilState)(playlistIdState);
    (0,external_react_.useEffect)(()=>{
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getUserPlaylists().then((data)=>{
                setPlaylists(data.body.items);
            });
        }
    }, [
        session,
        spotifyApi
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "text-gray-400 p-5 text-xs lg:text-sm border-r border-gray-400 overflow-y-scroll h-screen scrollbar-hide bg-black md:min-w-[30%] lg:min-w-[20rem] hidden md:inline-flex pb-36",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "space-y-3",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                    className: "flex items-center space-x-1 hover:text-white",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.HomeIcon, {
                            className: "h-5 w-5"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            children: "Inicio"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                    className: "flex items-center space-x-1 hover:text-white",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.SearchIcon, {
                            className: "h-5 w-5"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            children: "Buscar"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                    className: "flex items-center space-x-1 hover:text-white",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.LibraryIcon, {
                            className: "h-5 w-5"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            children: "Tu biblioteca"
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("hr", {
                    className: "border-t-[0.1px] border-gray-400"
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                    className: "flex items-center space-x-1 hover:text-white",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.PlusCircleIcon, {
                            className: "h-5 w-5"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            children: "Crear Lista"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("button", {
                    onClick: ()=>setPlaylistId(null)
                    ,
                    className: "flex items-center space-x-1 hover:text-white",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.HeartIcon, {
                            className: "h-5 w-5"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("p", {
                            children: "Canciones que te gustan"
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("hr", {
                    className: "border-t-[0.1px] border-gray-400"
                }),
                playlists.map((playlist)=>/*#__PURE__*/ jsx_runtime_.jsx("p", {
                        onClick: ()=>setPlaylistId(playlist.id)
                        ,
                        className: "cursor-pointer hover:text-white",
                        children: playlist.name
                    }, playlist.id)
                )
            ]
        })
    }));
}
/* harmony default export */ const components_Sidebar = (Sidebar);

;// CONCATENATED MODULE: external "lodash"
const external_lodash_namespaceObject = require("lodash");
var external_lodash_default = /*#__PURE__*/__webpack_require__.n(external_lodash_namespaceObject);
;// CONCATENATED MODULE: ./lib/time.js
function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = (millis % 60000 / 1000).toFixed(0);
    return seconds == 60 ? minutes + 1 + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

;// CONCATENATED MODULE: ./atoms/songAtoms.js

const currentTrackIdState = (0,external_recoil_.atom)({
    key: "currentTrackIdState",
    default: null
});
const isPlayingState = (0,external_recoil_.atom)({
    key: "isPlayingState",
    default: false
});

;// CONCATENATED MODULE: ./components/Song.js







const WebApiRequest = __webpack_require__(300), HttpManager = __webpack_require__(749);
function mostrarArtistas(artistas) {
    var i;
    var frase = "";
    for(i = 0; i < artistas.length; i++){
        if (artistas[i].name != undefined) {
            frase = frase + " " + artistas[i].name;
            if (i + 1 < artistas.length) {
                frase = frase + ",";
            }
        }
    }
    return frase;
}
function Song({ order , track , playlist  }) {
    const spotifyApi = hooks_useSpotify();
    const [currentTrackId, setCurrentTrackId] = (0,external_recoil_.useRecoilState)(currentTrackIdState);
    const [isPlaying, setIsPlaying] = (0,external_recoil_.useRecoilState)(isPlayingState);
    const playsong = async ()=>{
        setCurrentTrackId(track.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [
                track.track.uri
            ]
        });
        for(var i = order + 1; i < playlist.tracks.items.length; i++){
            spotifyApi.addToQueue(playlist.tracks.items[i].track.uri);
        }
    };
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "grid grid-cols-2 text-gray-400 py-3 px-2 hover:bg-gray-600 rounded-lg cursor-pointer",
        onClick: playsong,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex items-center space-x-4 ",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: order + 1
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        className: "h-10 w-10",
                        src: track.track.album.images[0].url
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "pr-1",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "w-36 lg:w-64 truncate text-white ",
                                children: track.track.name
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                className: "w=40 text-sm",
                                children: mostrarArtistas(track.track.artists)
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex items-center justify-between ml-auto md:ml-0",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "w-50 hidden md:inline",
                        children: track.track.album.name
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: millisToMinutesAndSeconds(track.track.duration_ms)
                    })
                ]
            })
        ]
    }));
}
/* harmony default export */ const components_Song = (Song);

;// CONCATENATED MODULE: ./components/Songs.js






function Songs() {
    const playlist = (0,external_recoil_.useRecoilValue)(playlistState);
    return(/*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "px-8 flex flex-col space-y-1 pb-28 text-white",
        children: playlist === null || playlist === void 0 ? void 0 : playlist.tracks.items.map((track, i)=>/*#__PURE__*/ jsx_runtime_.jsx(components_Song, {
                track: track,
                order: i,
                playlist: playlist
            }, track.track.id)
        )
    }));
}
/* harmony default export */ const components_Songs = (Songs);

;// CONCATENATED MODULE: ./components/Center.js









const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500"
];
function Center() {
    var ref;
    const { data: session , status  } = (0,react_.useSession)();
    const spotifyApi = hooks_useSpotify();
    const { 0: color , 1: setColor  } = (0,external_react_.useState)(null);
    const [playlistId, setPlaylistId] = (0,external_recoil_.useRecoilState)(playlistIdState);
    const [playlist, setPlaylist] = (0,external_recoil_.useRecoilState)(playlistState);
    (0,external_react_.useEffect)(()=>{
        setColor((0,external_lodash_namespaceObject.shuffle)(colors).pop());
    }, [
        playlistId
    ]);
    (0,external_react_.useEffect)(()=>{
        spotifyApi.getPlaylist(playlistId).then((data)=>{
            setPlaylist(data.body);
        }).catch((err)=>console.log("Error", err)
        );
    }, [
        spotifyApi,
        playlistId
    ]);
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex-grow h-screen overflow-y-scroll scrollbar-hide",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("header", {
                className: "absolute top-5 right-8",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "text-white flex item-center bg-black space-x-3 opacity-90 hover:opacity-70 cursor-pointer rounded-full p-1 pr-2 items-center",
                    onClick: react_.signOut,
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            className: "rounded-full w-10 h-10",
                            src: session === null || session === void 0 ? void 0 : session.user.image,
                            alt: ""
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                            children: session === null || session === void 0 ? void 0 : session.user.name
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.LogoutIcon, {
                            className: "h-5 w-5"
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                className: `flex items-end space-x-7 bg-gradient-to-b to-gray ${color} h-80 text-white p-8`,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        className: "h-44 w-44 shadow-2xl md:w-52 md:h-52",
                        src: playlist === null || playlist === void 0 ? void 0 : (ref = playlist.images) === null || ref === void 0 ? void 0 : ref[0].url,
                        alt: ""
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "p-5 space-y-2",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                                className: "text-2xl md:text-3xl xl:text-5xl font-bold",
                                children: playlist === null || playlist === void 0 ? void 0 : playlist.name
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex space-x-2",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        className: "hover:underline",
                                        children: playlist === null || playlist === void 0 ? void 0 : playlist.owner.display_name
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                        children: "|"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("p", {
                                        children: [
                                            playlist === null || playlist === void 0 ? void 0 : playlist.tracks.total,
                                            " canciones"
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                children: /*#__PURE__*/ jsx_runtime_.jsx(components_Songs, {})
            })
        ]
    }));
}
/* harmony default export */ const components_Center = (Center);

;// CONCATENATED MODULE: ./hooks/useSongInfo.js




function useSongInfo() {
    const spotifyApi = hooks_useSpotify();
    const [currentIdTrack, setCurrentIdTrack] = (0,external_recoil_.useRecoilState)(currentTrackIdState);
    const { 0: songInfo , 1: setSongInfo  } = (0,external_react_.useState)(null);
    (0,external_react_.useEffect)(()=>{
        const fetchSongInfo = async ()=>{
            if (currentIdTrack) {
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentIdTrack}`, {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                }).then((res)=>res.json()
                );
                setSongInfo(trackInfo);
            }
        };
        fetchSongInfo();
    }, [
        currentIdTrack,
        spotifyApi
    ]);
    return songInfo;
}
/* harmony default export */ const hooks_useSongInfo = (useSongInfo);

;// CONCATENATED MODULE: ./components/Player.js










function Player() {
    var ref4, ref1, ref2;
    const spotifyApi = hooks_useSpotify();
    const { data: session , status  } = (0,react_.useSession)();
    const [currentTrackId, setCurrentTrackId] = (0,external_recoil_.useRecoilState)(currentTrackIdState);
    const [isPlaying, setIsPlaying] = (0,external_recoil_.useRecoilState)(isPlayingState);
    const { 0: isShuffled , 1: setIsShuffled  } = (0,external_react_.useState)(false);
    const { 0: volume1 , 1: setVolume  } = (0,external_react_.useState)(50);
    const { 0: millis , 1: setMillis  } = (0,external_react_.useState)(0);
    const songInfo = hooks_useSongInfo();
    const fetchCurrentSong = ()=>{
        if (!songInfo) {
            spotifyApi.getMyCurrentPlayingTrack().then((data1)=>{
                var ref5, ref3;
                setCurrentTrackId((ref5 = data1.body) === null || ref5 === void 0 ? void 0 : (ref3 = ref5.item) === null || ref3 === void 0 ? void 0 : ref3.id);
                spotifyApi.getMyCurrentPlaybackState().then((data)=>{
                    var ref;
                    setIsPlaying((ref = data.body) === null || ref === void 0 ? void 0 : ref.is_playing);
                });
            });
        } else {
            spotifyApi.getMyCurrentPlayingTrack().then((data2)=>{
                var ref7, ref6;
                setCurrentTrackId((ref7 = data2.body) === null || ref7 === void 0 ? void 0 : (ref6 = ref7.item) === null || ref6 === void 0 ? void 0 : ref6.id);
                spotifyApi.getMyCurrentPlaybackState().then((data)=>{
                    var ref;
                    setIsPlaying((ref = data.body) === null || ref === void 0 ? void 0 : ref.is_playing);
                });
            });
        }
    };
    const handlePlayPause = ()=>{
        spotifyApi.getMyCurrentPlaybackState().then((data)=>{
            var ref;
            if (data === null || data === void 0 ? void 0 : (ref = data.body) === null || ref === void 0 ? void 0 : ref.is_playing) {
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };
    const handleShuffle = ()=>{
        spotifyApi.setShuffle(!isShuffled);
        setIsShuffled(!isShuffled);
    };
    (0,external_react_.useEffect)(()=>{
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    }, [
        currentTrackId,
        spotifyApi,
        session
    ]);
    (0,external_react_.useEffect)(()=>{
        if (volume1 > 0 && volume1 < 100) {
            debouncedAdjustVoulume;
        }
    }, [
        volume1
    ]);
    const debouncedAdjustVoulume = (0,external_react_.useCallback)(external_lodash_default()((volume)=>{
        spotifyApi.setVolume(volume).catch((err)=>{});
    }, 250), []);
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex items-center space-x-4",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                            className: "hidden md:inline h-10 w-10",
                            src: (ref4 = songInfo === null || songInfo === void 0 ? void 0 : songInfo.album.images) === null || ref4 === void 0 ? void 0 : ref4[0].url,
                            alt: ""
                        })
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                                children: songInfo === null || songInfo === void 0 ? void 0 : songInfo.name
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: songInfo === null || songInfo === void 0 ? void 0 : (ref1 = songInfo.artists) === null || ref1 === void 0 ? void 0 : (ref2 = ref1[0]) === null || ref2 === void 0 ? void 0 : ref2.name
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex space-x-5 justify-center py-3",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: "00:00"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                className: "lg:w-[25rem]",
                                type: "range",
                                value: null,
                                onInputCapture: (e)=>spotifyApi.seek(e.target.value)
                                ,
                                min: 0,
                                max: songInfo === null || songInfo === void 0 ? void 0 : songInfo.duration_ms
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("p", {
                                children: millisToMinutesAndSeconds(songInfo === null || songInfo === void 0 ? void 0 : songInfo.duration_ms)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex items-center justify-evenly",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.SwitchHorizontalIcon, {
                                className: 'button' + (isShuffled ? ' text-green-400' : ''),
                                onClick: ()=>handleShuffle()
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.RewindIcon, {
                                onClick: ()=>spotifyApi.skipToPrevious()
                                ,
                                className: "button"
                            }),
                            isPlaying ? /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.PauseIcon, {
                                onClick: ()=>{
                                    external_lodash_default()(handlePlayPause(), 500);
                                },
                                className: "button w-10 h-10"
                            }) : /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.PlayIcon, {
                                onClick: ()=>{
                                    external_lodash_default()(handlePlayPause(), 500);
                                },
                                className: "button w-10 h-10 "
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.FastForwardIcon, {
                                onClick: ()=>{
                                    spotifyApi.skipToNext();
                                    fetchCurrentSong();
                                },
                                className: "button"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.ReplyIcon, {
                                className: "button"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex items-center justify-end space-x-3 pr-5 md:space-x-4",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.VolumeUpIcon, {
                        onClick: ()=>{
                            volume1 > 0 && setVolume(volume1 - 10);
                        },
                        className: "button w-4 h-4"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                        className: "w-16 md:w-28 lg:w-36",
                        type: "range",
                        value: volume1,
                        onChange: (e)=>setVolume(Number(e.target.value))
                        ,
                        min: 0,
                        max: 100
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(solid_namespaceObject.VolumeUpIcon, {
                        onClick: ()=>{
                            volume1 < 100 && setVolume(volume1 + 10);
                        },
                        className: "button"
                    })
                ]
            })
        ]
    }));
}
/* harmony default export */ const components_Player = (Player);

;// CONCATENATED MODULE: ./pages/index.js







function Home() {
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "bg-gray-700 h-screen overflow-hidden",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("title", {
                        children: "Sp0t1fy"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("main", {
                className: "flex ",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(components_Sidebar, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(components_Center, {})
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "sticky bottom-0",
                children: /*#__PURE__*/ jsx_runtime_.jsx(components_Player, {})
            })
        ]
    }));
};
;
async function getServerSideProps(context) {
    const session = await (0,react_.getSession)(context);
    return {
        props: {
            session
        }
    };
}


/***/ }),

/***/ 649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 755:
/***/ ((module) => {

module.exports = require("recoil");

/***/ }),

/***/ 824:
/***/ ((module) => {

module.exports = require("superagent");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [402], () => (__webpack_exec__(495)));
module.exports = __webpack_exports__;

})();