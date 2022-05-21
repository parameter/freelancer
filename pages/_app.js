import { SessionProvider } from "next-auth/react";
import { useRef } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import '../styles/globals.scss';
import Branding from "../components/branding";

const UseSession = ({ children }) => {
  const session = useSession()
  return children(session)
}

const pages = [
  { title: 'Parameter', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Free NFT', path: '/free-nft' },
]

function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const videoBg = useRef();

  const videoCanPlay = () => {
    console.log(videoBg.current);
    videoBg.current.play();
  }

  return <SessionProvider session={session}>
           <div className="base">
            <div className="base__page">
              <div className="base__content">
                <div className="base__bread">
                  <ul className="base__nav">
                    {pages.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link key={index} href={item.path}>
                            <a
                              className={`${
                                router.pathname === item.path
                                  ? 'current-path'
                                  : ''
                              }`}
                            >
                              {item.title}
                            </a>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                  <Component {...pageProps} />
                </div>
                <div className="base__meta">
                  <Branding />
                </div>
              </div>
            </div>
            <div className="base__video-bg">
              <video onCanPlayThrough={() => videoCanPlay()}  onCanPlay={() => videoCanPlay()} ref={videoBg} width="600" height="500" autoPlay loop muted>
                <source src="video/production-ID_666.mp4" type="video/mp4" />
                Your browser does not support the video element.
              </video>
            </div>
          </div>
         </SessionProvider>
}

export default App