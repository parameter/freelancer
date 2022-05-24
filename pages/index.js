import { useState } from "react";
import jobsJson from '../app-data/jobs.js';

console.log(jobsJson);

export default function Home() {
  const [openJob, setOpenJob] = useState(null);

  const openModal = (event) => {

    const jobHandle = event.target.href.split('#')[1];
    setOpenJob(jobHandle);
  }

  const closeModal = () => {
    setOpenJob(null);
  }

  const printModal = () => {
    if (openJob !== null) {
      return <>
        <div onClick={() => closeModal()} className="modal__bg"></div>
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
          <div className="modal__job-links">
            <h2 className="modal__job-subtitle">Around the net</h2>
            <ul>
              {jobsJson.jobs[openJob].links.map((link, index) => {
                return <li key={index}><a href={link.href}>{link.title}</a></li>
              })}
            </ul>
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
        <p>I am a developer based in Stockholm who likes electronic music &#123;insert_icon&#125; and discgolf &#123;insert_icon&#125;.</p>
        <p>As I like to try new things I hosted this site on the peer-to-peer network Interplanetary file system (ipfs). It&apos;s not hosted on an ordinary server but a more decentralized method where the data is stored and retried from multiple nodes where all users share the burden of holding a bit of data for everyone else.</p>
        <div style={{backgroundImage: 'url(images/me.webp)'}} className="article__post-user"></div>
      </div>
      <div className="article__wrap article__post">
        <p>Recently I have been building a <a onClick={(event) => openModal(event)} className="article__pop-link" href="#bidstacker" title="Bidstacker">product</a> for a company aiming to make a difference in the supply chain for the construction market - helping them to save time in a tight environment.</p>
        <p><a href="https://www.breakit.se/artikel/32593/klart-for-semifinal-har-ar-de-som-gar-vidare-i-shift-svart-att-valja">Bidstacker in the news</a></p>
        <div style={{backgroundImage: 'url(icons/wrench.png)', backgroundSize: '66% auto', backgroundColor: '#FFBF00'}} className="article__post-user"></div>
      </div>
      {printModal()}
    </>
  );
};
