import{
    HomeIcon,
    SearchIcon,
    LibraryIcon,
    PlusCircleIcon,
    HeartIcon,
    LogoutIcon,
} from "@heroicons/react/solid"

import React, { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import useSpotify from "../hooks/useSpotify"
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtoms"

function Sidebar() {

    const spotifyApi = useSpotify();
    const { data: session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
    
    useEffect(() => {
        
        if(spotifyApi.getAccessToken())
        {
            spotifyApi.getUserPlaylists().then((data) => {
                setPlaylists(data.body.items); 
            });
        }

    }, [session, spotifyApi]);
    

  return (
    <div className="text-gray-400 p-5 text-xs lg:text-sm border-r border-gray-400
    overflow-y-scroll h-screen scrollbar-hide bg-black md:min-w-[30%] lg:min-w-[20rem] hidden md:inline-flex pb-36">
        
        <div className="space-y-3">
            <button className="flex items-center space-x-1 hover:text-white">
                <HomeIcon className="h-5 w-5"/>
                <p>Inicio</p>
            </button>
            <button className="flex items-center space-x-1 hover:text-white">
                <SearchIcon className="h-5 w-5"/>
                <p>Buscar</p>
            </button>
            <button className="flex items-center space-x-1 hover:text-white">
                <LibraryIcon className="h-5 w-5"/>
                <p>Tu biblioteca</p>
            </button>
            <hr className="border-t-[0.1px] border-gray-400"/>

            <button className="flex items-center space-x-1 hover:text-white">
                <PlusCircleIcon className="h-5 w-5"/>
                <p>Crear Lista</p>
            </button>
            <button onClick={() => setPlaylistId(null)} className="flex items-center space-x-1 hover:text-white">
                <HeartIcon className="h-5 w-5"/>
                <p>Canciones que te gustan</p>
            </button>
            <hr className="border-t-[0.1px] border-gray-400"/>

            {playlists.map((playlist) => (
                <p key={playlist.id} onClick={() => setPlaylistId(playlist.id)} className="cursor-pointer hover:text-white"> 
                    {playlist.name}
                </p>
            ))}

        </div>
    </div>
  )
}

export default Sidebar
