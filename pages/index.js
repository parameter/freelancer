import { useState } from 'react';
import Image from 'next/image';
import jobsJson from '../app-data/jobs.js';

export default function Home() {
  const [openJob, setOpenJob] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const openJobModal = (event) => {

    const jobHandle = event.target.href.split('#')[1];
    setOpenJob(jobHandle);
  }

  const closeJobModal = () => {
    setOpenJob(null);
  }

  const printJobModal = () => {
    if (openJob !== null) {
      return <>
        <div onClick={() => closeJobModal()} className="modal__bg"></div>
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

  const copyToClipboard = (string) => {
    navigator.clipboard.writeText(string);
    setEmailCopied(true)
  }

  const printContactModal = () => {
    if (contactModalOpen !== false) {
      return <>
        <div onClick={() => closeContactModal()} className="modal__bg"></div>
        <div className="modal modal__job modal__contact">
          <div className="modal__main">
            <h1 className="modal__job-title">Get in touch!</h1>
            <div className="modal__job-main">
              <div className="modal__job-desc">
                <p>If you prefer to write me an email <br />
                  <span>
                    <a href="mailto:parameter64@proton.me">parameter64@proton.me</a>
                    <span onClick={() => copyToClipboard('parameter64@proton.me')} title="Copy to clipboad" className="modal__job-desc-clipboard">
                    <Image src='/icons/clipboard.png' alt='copy to clipboard' width={32} height={32} />
                      <span className={emailCopied === false ? 'modal__job-desc-clipboard-feedback' : 'modal__job-desc-clipboard-feedback copied'}>
                        {emailCopied === false ? 'Copy to clipboard' : 'Email address copied to clipbard'}
                      </span>
                    </span>
                  </span>
                </p>
              </div>
            </div>
            <div className="modal__job-links">
              <h2 className="modal__job-subtitle">Something else</h2>
              <ul>
                <li>Something else Get in touch!</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    }
  }

  const openContactModal = () => {
    setContactModalOpen(true);
  }

  const closeContactModal = () => {
    setContactModalOpen(false);
  }

  return (
    <>
      <div className="article__wrap article__post">
        <p>The idea here is to make it easier for &#123;the world&#125; to <a href="#contact" onClick={() => openContactModal()} className="article__pop-link">find me</a>.</p>
        <p>I wanted to see what it would look like without intermediaries.</p>
        <p>Now, once we can see through the noise and the background radiation of the universe it&apos;s time to get some work&nbsp;done.</p>
        <p>I am a developer based in Stockholm who likes electronic music &#123;insert_icon&#125; and discgolf &#123;insert_icon&#125;.</p>
        <p>As I like to try new things I hosted this site on the peer-to-peer network Interplanetary file system (ipfs). It&apos;s not hosted on an ordinary server but a more decentralized method where the data is stored and retried from multiple nodes where all users share the burden of holding a bit of data for everyone&nbsp;else.</p>
        <p>By the way, there are 15 variations of this sites graphical theme, can you find&nbsp;them?</p>
        <p>Tweek the parameters!</p>
        <div style={{backgroundImage: 'url(images/me.webp)'}} className="article__post-icon"></div>
      </div>
      <div className="article__wrap article__post">
        <p>Recently I have been building a <a onClick={(event) => openJobModal(event)} className="article__pop-link" href="#bidstacker" title="Bidstacker">product</a> for a company aiming to make a difference in the supply chain for the construction market - helping them to save time in a tight environment.</p>
        <p><a href="https://www.breakit.se/artikel/32593/klart-for-semifinal-har-ar-de-som-gar-vidare-i-shift-svart-att-valja">Bidstacker in the news</a></p>
        <div style={{backgroundImage: 'url(icons/wrench.png)', backgroundSize: '66% auto', backgroundColor: '#FFBF00'}} className="article__post-icon"></div>
      </div>
      {printContactModal()}
      {printJobModal()}
    </>
  );
};
