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

        <p>Since i tried to use my brothers 8bit computer to load a 
game from a cassette-tape when I was 8 or 9 years old I was hooked on what these things can do. 
One of those times I managed to load up something called a demo where the programmers was 
showing off what they can do and the harsh sounds coming out of the TV set to max volume 
might have acctually triggered my love for experimental electronic sounds.</p>

<p>Programming is not the first things I got into. I would jump on anything that 
made a sound or allowed me to draw and animate images on the screen so when the day came to choose 
a profession I came to realize that this would allow me to experience that joy of 
creating things once again.</p>

<p>When I finished my studies I decided to go freelance and my first customers got custom CMS solutions built in PHP and mySQL. 
However, I quickly got into wordpress that helped improve the time it took to deliver something. Now my life is more about javascript and modern frontend but sometimes those worlds&nbsp;meet and it is a glory to behold.</p>



            <div style={{backgroundImage: 'url(/images/me.webp)'}} className="article__post-icon"></div>
        </div>
    </>
  );
};
