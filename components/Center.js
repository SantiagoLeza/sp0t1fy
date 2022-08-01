import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import {  playlistState, playlistIdState } from "../atoms/playlistAtoms";
import { useRecoilState } from "recoil";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs"

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500"
];

function Center()
{
    const { data: session, status} = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null);
    const [ playlistId, setPlaylistId]  = useRecoilState(playlistIdState);
    const [ playlist, setPlaylist ] = useRecoilState(playlistState);
    
    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [playlistId])

    useEffect(() => {
        spotifyApi
        .getPlaylist(playlistId)
        .then((data) => {
            setPlaylist(data.body);
        })
        .catch((err) => console.log("Error", err));

    }, [spotifyApi, playlistId])
    
    return (

        <div className="flex-grow  h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="text-white flex item-center bg-black space-x-3
                opacity-90 hover:opacity-70 cursor-pointer rounded-full p-1 pr-2 items-center"
                onClick={signOut}>
                    <img className="rounded-full w-10 h-10" src={session?.user.image} alt="" />
                    <h2>{session?.user.name}</h2>
                    <LogoutIcon className="h-5 w-5" />
                </div>
            </header>

            <section className={`flex items-end space-x-7 bg-gradient-to-b to-gray ${color} h-80 text-white p-8`}>
                <img className="h-44 w-44 shadow-2xl md:w-52 md:h-52"
                src={playlist?.images?.[0].url}
                alt="" />

                <div className="p-5 space-y-2">
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                    <div className="flex space-x-2">
                        <p className="hover:underline">{playlist?.owner.display_name}</p>
                        <p>|</p>
                        <p>{playlist?.tracks.total} canciones</p>
                    </div>
                </div>

            </section>

            <div>
                <Songs />
            </div>
        </div>

    )
}

export default Center