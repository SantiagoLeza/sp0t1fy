import React from 'react';
import useSpotify from '../hooks/useSpotify';
import { millisToMinutesAndSeconds } from "../lib/time";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtoms";
import { useRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';

const WebApiRequest = require('../node_modules/spotify-web-api-node/src/webapi-request'),
HttpManager = require('../node_modules/spotify-web-api-node/src/http-manager');

function mostrarArtistas(artistas)
{
    var i;
    var frase = "";

    for(i=0; i<artistas.length; i++)
    {
        if(artistas[i].name != undefined)
        {
            frase = frase + " " + artistas[i].name;
            if((i+1) < artistas.length)
            {
                frase = frase + ","
            }
        }
    }

    return frase;
}
function Song({order, track, playlist}) {
    
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState);
    
    const playsong = async () => {

        setCurrentTrackId(track.track.id);
        setIsPlaying(true);

        spotifyApi.play({
            uris: [track.track.uri],
        })

        for(var i = order + 1; i < playlist.tracks.items.length; i++)
        {
            spotifyApi.addToQueue(playlist.tracks.items[i].track.uri);
        }
    }

    return (
    <div className='grid grid-cols-2 text-gray-400 py-3 px-2 hover:bg-gray-600 rounded-lg cursor-pointer'
    onClick={playsong}>
        <div className='flex items-center space-x-4 '>
            <p>{order + 1}</p>
            <img className='h-10 w-10' src={track.track.album.images[0].url} />
            <div className='pr-1'>
                <p className='w-36 lg:w-64 truncate text-white '>{track.track.name}</p>
                <p className='w=40 text-sm'>{mostrarArtistas(track.track.artists)}</p>
            </div>
        </div>

        <div className='flex items-center justify-between ml-auto md:ml-0'>
            <p className='w-50 hidden md:inline'>{track.track.album.name}</p>
            <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
        </div>

    </div>
    )
}

export default Song