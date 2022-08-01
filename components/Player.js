import { useSession } from 'next-auth/react';
import debounce from "lodash"
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtoms';
import useSpotify from '../hooks/useSpotify'
import useSongInfo from "../hooks/useSongInfo"
import { FastForwardIcon, PauseIcon, PlayIcon, ReplyIcon, RewindIcon, SwitchHorizontalIcon, VolumeUpIcon } from '@heroicons/react/solid';
import { millisToMinutesAndSeconds } from '../lib/time';

function Player() {

    const spotifyApi = useSpotify();
    const { data: session, status } = useSession();
    const [ currentTrackId, setCurrentTrackId ] = useRecoilState(currentTrackIdState);
    const [ isPlaying, setIsPlaying ] = useRecoilState(isPlayingState);
    const [isShuffled, setIsShuffled] = useState(false);
    const [ volume, setVolume ] = useState(50);
    const [ millis, setMillis ] = useState(0);

    const songInfo = useSongInfo();

    const fetchCurrentSong = () => {
        if(!songInfo)
        {
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
        else
        {
            
            spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                });
            });
        }
    };

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if(data?.body?.is_playing)
            {
                spotifyApi.pause();
                setIsPlaying(false);
            }
            else
            {
                spotifyApi.play();
                setIsPlaying(true);
            }
        })
    };

    const handleShuffle = () => {
        spotifyApi.setShuffle(!isShuffled);
        setIsShuffled(!isShuffled);
    };
    
    useEffect(() => {
        
        if(spotifyApi.getAccessToken() && !currentTrackId)
        {
            fetchCurrentSong();
            setVolume(50);
        }
        
    }, [currentTrackId, spotifyApi, session]);
    
    useEffect(() => {
        
        if(volume > 0 && volume < 100)
        {
            debouncedAdjustVoulume;
        }
        
    }, [volume]);
    
    const debouncedAdjustVoulume = useCallback(
        debounce((volume) => {
            spotifyApi.setVolume(volume).catch((err) => {});
        }, 250),
        []
        
    );

    return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white 
    grid grid-cols-3 text-xs md:text-base px-2 md:px-8'>
        <div>
            <div className='flex items-center space-x-4'>
            
                <img className='hidden md:inline h-10 w-10' src={songInfo?.album.images?.[0].url} alt=''/>

            </div>

            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
        </div>

        <div className=''>
            
            <div className='flex space-x-5 justify-center py-3'>
                <p>00:00</p>
                <input className='lg:w-[25rem]' 
                type="range" 
                value={null}
                onInputCapture={(e) => spotifyApi.seek(e.target.value)}
                min={0}
                max={songInfo?.duration_ms}
                />
                <p>{millisToMinutesAndSeconds(songInfo?.duration_ms)}</p>
            </div>
            
            <div className='flex items-center justify-evenly'>
                <SwitchHorizontalIcon
                className={'button' + (isShuffled ? ' text-green-400' : '')}
                onClick={() => handleShuffle()}
                />
                <RewindIcon onClick={() => spotifyApi.skipToPrevious()} className='button'/>

                {
                isPlaying ? 
                (<PauseIcon onClick={() => {debounce(handlePlayPause(), 500)}} className='button w-10 h-10'/>)
                :
                (<PlayIcon onClick={() => {debounce(handlePlayPause(), 500)}} className='button w-10 h-10 '/>)
                }

                <FastForwardIcon onClick={() => {spotifyApi.skipToNext(); fetchCurrentSong()}} className='button'/>
                <ReplyIcon className='button'/>

            </div>
        </div>
        

        <div className='flex items-center justify-end space-x-3 pr-5 md:space-x-4'>
            <VolumeUpIcon onClick={() => { volume > 0 && setVolume(volume - 10)}} className='button w-4 h-4'/>
            <input className='w-16 md:w-28 lg:w-36' 
            type="range" 
            value={volume} 
            onChange={(e) => setVolume(Number(e.target.value))}
            min={0}
            max={100}
            />
            <VolumeUpIcon onClick={() => { volume < 100 && setVolume(volume + 10)}} className='button'/>
        </div>
    </div>
    )
}

export default Player