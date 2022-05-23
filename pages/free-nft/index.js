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
            <p>As we all know technology is the work of the devil and the latest things are of course NFTs and the blockchain.</p>
            <p>What better use of this new technology can we think of than actually signing a contract with the devil?</p>
            <p>Make your deal here and put it on the blockchain where it can never be altered.</p>
            <div style={{backgroundImage: 'url(images/me.webp)'}} className="article__post-user"></div>
        </div>
    </>
  );
};
