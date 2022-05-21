import { useState } from "react";
import jobsJson from '../app-data/jobs.js';

console.log(jobsJson);

export default function Home() {
  const [openJob, setOpenJob] = useState(null);

  const openModal = (event) => {
    event.preventDefault();

    const jobHandle = event.target.href.split('#')[1];
    setOpenJob(jobHandle);
  }

  const printModal = () => {
    if (openJob !== null && openJob !== null) {
      return <>
        <div className="modal__bg"></div>
        <div className="modal modal__job">
          <h1 className="modal__job-title">{jobsJson.jobs[openJob].title}</h1>
          <div className="modal__job-main">
            <div className="modal__job-desc">
              <p>{jobsJson.jobs[openJob].desc}</p>
            </div>
            <div className="modal__job-techlist">
              <ul>
                {jobsJson.jobs[openJob].techlist.map((tech, index) => {
                  return <li key={index}>{tech}</li>
                })}
              </ul>
            </div>
          </div>
        </div>
      </>
    }
  }

  return (
    <>
      <div className="article__wrap article__post">
        <p>The idea here is to make it easier for &#123;the world&#125; to find me.</p>
        <p>I wanted to see what it would look like without intermediaries.</p>
        <p>Now, once we can see through the noise and the background radiation of the universe it&apos;s time to get some work done.</p>
        <div style={{backgroundImage: 'url(images/me.webp)'}} className="article__post-user"></div>
      </div>
      <div className="article__wrap article__post">
        <p>Recently I have been building a <a onClick={(event) => openModal(event)} className="article__pop-link" href="#bidstacker-prototype" title="Bidstacker">prototype</a> for an idea I am developing with a collegue.</p>
        <p>We are more or less trying to revolutionize the supply chain for the construction market.</p>
        <p>The technical tools I have used are next.js, react and mongoDB.</p>
        <div style={{backgroundImage: 'url(icons/wrench.png)', backgroundSize: '66% auto', backgroundColor: '#FFBF00'}} className="article__post-user"></div>
      </div>
      {printModal()}
    </>
  );
};
