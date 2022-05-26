import { SessionProvider } from "next-auth/react";
import { useRef, useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import '../styles/globals.scss';
import Branding from "../components/branding";

const UseSession = ({ children }) => {
  const session = useSession()
  return children(session)
}

const bgColors = [
  { color: '#807D74', opacity: '0.95', blend: 'color', displayColor: '#807D74'},
  { color: '#E0C572', opacity: '0.8', blend: 'hue', displayColor: '#FFBF00'},
  { color: '#AAFF00', opacity: '0.6', blend: 'hue', displayColor: '#A4ED11'}
];

const pages = [
  { title: 'Parameter', path: '/' },
  /* { title: 'About', path: '/about' }, */
  { title: 'Free NFT', path: '/free-nft' },
]

function App({ Component, pageProps: { session, ...pageProps } }) {
  const [currentBgColor, setCurrentBgColor] = useState(bgColors[0]);
  const [parameterY, setParameterY] = useState(50);
  const router = useRouter();
  const videoBg = useRef();

  const videoCanPlay = () => {
    console.log(videoBg.current);
    videoBg.current.play();
  }

  const _setCurrentBgColor = (color) => {
    setCurrentBgColor(color);
  }

  const parseBgBlendMode = (blend) => {
    console.log(parameterY);
    if (parameterY < 30) {
      return 'color-burn';
    }
    if (parameterY > 30 && parameterY < 45) {
      return 'hard-light';
    }
    if (parameterY > 44 && parameterY < 65) {
      return blend;
    }
    if (parameterY > 64 && parameterY < 77) {
      return 'lighten';
    }
    if (parameterY > 76) {
      return 'exclusion';
    }
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
                  <Branding bgColors={bgColors} currentBgColor={currentBgColor.color} setCurrentBgColor={_setCurrentBgColor} setParameterY={setParameterY} />
                </div>
              </div>
            </div>
            <div className="base__vignette"></div>
            <div style={{backgroundColor: currentBgColor.color, opacity: currentBgColor.opacity, mixBlendMode: parseBgBlendMode(currentBgColor.blend)}} className="base__video-blend-overlay"></div>
            <div className="base__video-bg">
              {process.browser === true && 
                <video onCanPlayThrough={() => videoCanPlay()}  onCanPlay={() => videoCanPlay()} ref={videoBg} width="600" height="500" autoPlay loop muted>
                  <source src={window.location.origin + '/video/production-ID_666.mp4'} type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              }
            </div>
            <footer className="base__footer">
              <ul>
                <li><a target="_blank" href="https://www.linkedin.com/in/p%C3%A4r-henriksson-80b99b1b/" title="Linkedin - Pär Henriksson">linkedin</a></li>
              </ul>
            </footer>
          </div>
        </SessionProvider>
}

export default App