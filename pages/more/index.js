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
            
            <p></p>
            <div style={{backgroundImage: 'url(/images/me.webp)'}} className="article__post-icon"></div>
        </div>
    </>
  );
};
