import { useState } from "react";
import Link from 'next/link';
import jobsJson from '../../app-data/jobs.js';

export default function Jobs() {
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
            <p>Here are a few curated events. A few cases from history.</p>
            <div style={{backgroundImage: 'url(images/me.webp)'}} className="article__post-icon"></div>
        </div>
        <div className="article__wrap jobs-page article__post">
            <ul className="jobs-page__list">
                {Object.keys(jobsJson.jobs).map((index) => {
                    return <li key={index}>
                        <Link href={'/jobs/' + jobsJson.jobs[index].title}>
                            <a>{jobsJson.jobs[index].title}</a>
                        </Link>
                    </li>
                })}
            </ul>
            <div style={{backgroundImage: 'url(icons/robot.png)'}} className="article__post-jobs"></div>
        </div>
    </>
  );
};
