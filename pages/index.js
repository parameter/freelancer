import { useState } from 'react';
import jobsJson from '../app-data/jobs.js';

export default function Home() {
  const [openJob, setOpenJob] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [telephoneCopied, setTelephoneCopied] = useState(false);

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
            <div className="modal__desc modal__job-desc">
              {jobsJson.jobs[openJob].desc.map((string, index) => {
                return <p key={index}>{string}</p>
              })}
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

  const copyToClipboard = (string, type) => {
    navigator.clipboard.writeText(string);
    if (type === 'email') {
      setEmailCopied(true);
    }
    if (type === 'telephone') {
      setTelephoneCopied(true);
    }
  }

  const printContactModal = () => {
    if (contactModalOpen !== false) {
      return <>
        <div onClick={() => closeContactModal()} className="modal__bg"></div>
        <div className="modal modal__job modal__contact">
          <div className="modal__main">
            <h1 className="modal__job-title">Get in touch!</h1>
            <div className="modal__job-main">
              <div className="modal__desc modal__contact-desc">
                <p>If you prefer to write me an email <br />
                  <span>
                    <a className="modal__job-desc-mailto" href="mailto:parameter64@proton.me">parameter64@proton.me</a>
                    <span onClick={() => copyToClipboard('parameter64@proton.me', 'email')} title="Copy to clipboad" className="modal__job-desc-clipboard">
                      <div className="modal__clipboard-icon">&nbsp;</div>
                      <span className={emailCopied === false ? 'modal__job-desc-clipboard-feedback' : 'modal__job-desc-clipboard-feedback copied'}>
                        {emailCopied === false ? 'Copy to clipboard' : 'Email address copied to clipboard'}
                      </span>
                    </span>
                  </span>
                  Or give me a call 
                  <span>
                    <a href="tel:+46738790924">+46 73 87 909 24</a>
                    <span onClick={() => copyToClipboard('0046738790924', 'telephone')} title="Copy to clipboad" className="modal__job-desc-clipboard">
                      <div className="modal__clipboard-icon">&nbsp;</div>
                      <span className={telephoneCopied === false ? 'modal__job-desc-clipboard-feedback' : 'modal__job-desc-clipboard-feedback copied'}>
                        {telephoneCopied === false ? 'Copy to clipboard' : 'Telephone number copied to clipboard'}
                      </span>
                    </span>
                  </span>
                </p>
              </div>
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
    setEmailCopied(false)
    setTelephoneCopied(false);
  }

  return (
    <>
      <article className="article__wrap article__post">
        <h3 className="article__meta-title">Intro | parameter64 | Pär Henriksson</h3>
        <h1 class="article__h1">developer / programmer / konsultant</h1>
        <p>The idea here is to make it easier for &#123;the world&#125; to <a href="#contact" onClick={() => openContactModal()} className="article__pop-link">find me</a>.</p>
        <p>I wanted to see what it would look like without intermediaries. 
        So now, once we can see through the noise and the background radiation of the universe it&apos;s time to get some work&nbsp;done.</p>
        <p>I am a developer based in Stockholm who likes electronic music &#123;insert_icon&#125; and discgolf &#123;insert_icon&#125;.</p>
        <h3 className="article__meta-title">social digitalization</h3>
        <p>As I like to try new things I hosted this site on the peer-to-peer network Interplanetary file system (ipfs). It&apos;s not hosted on an ordinary server but a more decentralized method where the data is stored and retrieved from multiple nodes where all users share the burden of holding a bit of data for everyone&nbsp;else.</p>
        <p>By the way, there are 15 variations of this sites graphical theme, can you find&nbsp;them?</p>
        <p>Tweek the parameters!</p>
        <ul className="article__links article__links--tech">
          <li>nextjs/reactjs</li>
          <li>nodejs</li>
          <li>ipfs</li>
          <li>portfolio</li>
        </ul>
        <div style={{backgroundImage: 'url(/images/me.webp)'}} className="article__post-icon"></div>
      </article>
      <article className="article__wrap article__post">
        <p>Recently I have been developing a <a onClick={(event) => openJobModal(event)} className="article__pop-link" href="#bidstacker" title="Bidstacker">product</a> aiming to make a difference in the supply chain for the construction market - helping them to save time in a tight environment.</p>
        <ul className="article__links article__links--tech">
          <li>nextjs/reactjs</li>
          <li>nodejs</li>
          <li>mongodb</li>
          <li>css/bem</li>
        </ul>
        <ul className="article__links">
          <li>
            <h3>bidstacker in the news</h3>
            <a href="https://www.breakit.se/artikel/32593/klart-for-semifinal-har-ar-de-som-gar-vidare-i-shift-svart-att-valja">breakit.se</a>
          </li>
        </ul>
        <div style={{backgroundImage: 'url(icons/wrench.png)', backgroundSize: '66% auto', backgroundColor: '#FFBF00'}} className="article__post-icon"></div>
      </article>
      <article className="article__wrap article__post">
        <p>Trupayers needed an update to their <a onClick={(event) => openJobModal(event)} className="article__pop-link" href="#credit-score-api-integration" title="Credit score API integration">API integrations</a> checking applying customers credit score.</p>
        <p>I helped them to update their forms with new fields, updated the backend, made sure the frontend is accessible and all fields are validated correctly.</p>
        <ul className="article__links article__links--tech">
          <li>PHP</li>
          <li>Javascript</li>
          <li>Wordpress</li>
          <li>API</li>
          <li>CURL</li>
        </ul>
        <div style={{backgroundImage: 'url(icons/wrench.png)', backgroundSize: '66% auto', backgroundColor: '#FFBF00'}} className="article__post-icon"></div>
      </article>
      <article className="article__wrap article__post">
        <p>While working for the academedia cooperation I built their schools a way to create and publish forms for collecting leads. I made so that they can be configured to post to a few different CRM and made sure the rendered frontend was accessible and GDPR compliant.</p>
        <p>The job was part of a bigger job I helped plan and execute where we built a super-theme for wordpress for quickly launching new sites. The form-<a onClick={(event) => openJobModal(event)} className="article__pop-link" href="#react-form-builder-and-CRM-integrations" title="React form builder and CRM integration">builder</a> was programmed in react and hosted on an admin page powered by a plugin.</p>
        <p>Apart from developing we also maintained alot of old sites we took home to our new inhouse dev-apartment but the first new one I built for them and that also became the prototype for the above mentioned WP-theme was praktiska.se</p>
        <ul className="article__links article__links--tech">
          <li>reactjs</li>
          <li>PHP</li>
          <li>Wordpress</li>
          <li>Javascript</li>
          <li>API</li>
          <li>frontend</li>
          <li>accessibility</li>
        </ul>
        <ul className="article__links">
          <li>
            <h3>One site I made during this time</h3>
            <a target="_blank" rel="noreferrer" href="https://praktiska.se/">praktiska.se</a>
          </li>
        </ul>
        <div style={{backgroundImage: 'url(icons/wrench.png)', backgroundSize: '66% auto', backgroundColor: '#FFBF00'}} className="article__post-icon"></div>
      </article>
      {printContactModal()}
      {printJobModal()}
    </>
  );
};

