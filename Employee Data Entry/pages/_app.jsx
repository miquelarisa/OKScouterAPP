import * as React from 'react';
import '../styles/globals.css';
import { useSession } from 'next-auth/react';
import Error from './error';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }) {

  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth auth={Component.auth}>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children, auth }) {

  const { data: session, status } = useSession();

  if(session === null)
  {
    return <Error/>
  }

  else if (auth.roles.includes(session.user.role ?? "user")) {
    return children;
  }

  return <Error/>
  
}

export default MyApp
