import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import jobsJson from '@/app-data/jobs.js';

export default function JobPage() {
  const router = useRouter();
  const [openJob, setOpenJob] = useState(null);

  const openModal = (event) => {

    const jobHandle = event.target.href.split('#')[1];
    setOpenJob(jobHandle);
  }

  const closeModal = () => {
    setOpenJob(null);
  }

  if (!router.isReady) {
    return '';
  }

  return (
    <>
      <div className="jobs-page__back">
        <Link href="/jobs">
            <a>&#60;&#60; Back</a>
        </Link>
      </div>
      <div className="article__wrap jobs-page">
        <h1>{jobsJson.jobs[router.query.id].title}</h1>
        <p>{jobsJson.jobs[router.query.id].desc}</p>
      </div>
    </>
  );
};
