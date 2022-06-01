import { useState } from "react";
import Link from 'next/link';
import jobsJson from '../../app-data/jobs.js';

export default function FreeNft() {
  const [openJob, setOpenJob] = useState(null);

  const openModal = (event) => {

    const jobHandle = event.target.href.split('#')[1];
    setOpenJob(jobHandle);
  }

  const closeModal = () => {
    setOpenJob(null);
  }

  return (
    <>
        <div className="article__wrap article__post">
            <p>Ask me for modern realtime sites made in react and next-js (like this one), wordpress CMS solutions modelled to your business and ideas, static sites (headless) or ask me to be part of your team</p>
            <p>Maybe you want your site to be a bit more decentralized and host it on ipfs (interplanetary file system), create a utility NFT for whatever you are doing or just for discussing an idea.</p>
            <p>I enjoy making accessible interfaces and user experiences. If it looks good and feels great it can take over the world.</p>
            <p><a href="mailto:parameter64@proton.me">parameter64@proton.me</a></p>
            <p><a href="tel:0046738790924">+46 73 87 909 24</a></p>
            <div style={{backgroundImage: 'url(/images/me.webp)'}} className="article__post-icon"></div>
        </div>
    </>
  );
};
