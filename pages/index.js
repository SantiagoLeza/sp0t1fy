import Head from 'next/head'
import React from 'react';
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import Player from "../components/Player"
import { getSession } from 'next-auth/react';

export default function Home() {
  return (
    <div className="bg-gray-700 h-screen overflow-hidden">
      
      <Head>
        <title>Sp0t1fy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex ">
        <Sidebar />
        <Center />
      </main>

      <div className='sticky bottom-0'>
        <Player />
      </div>
      
    </div>
  );
};

  export async function getServerSideProps( context )
  {
    const session = await getSession(context);

    return {
      props: {
        session,
      },
    };
  }