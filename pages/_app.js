import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';

const UseSession = ({ children }) => {
  const session = useSession()
  return children(session)
}

function App({ Component, pageProps: { session, ...pageProps } }) {
  return <SessionProvider session={session}>
           <Component {...pageProps} />
         </SessionProvider>
}

export default App