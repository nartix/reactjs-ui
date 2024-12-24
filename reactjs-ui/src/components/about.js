import { useEffect } from 'react';

import { useGlobalState } from './../context/global-context-use.js';

const About = () => {
  const [templateGlobals] = useGlobalState();
  useEffect(() => {
    document.title = templateGlobals.getPageTitle() + 'About';
  }, [templateGlobals]);

  return (
    <div>
      <h2 className='text-center'>
        <b>About</b>
      </h2>
      <br />
      <p className='fs-5'>
        Welcome to my portfolio! I'm Feroz Faiz, a dedicated and passionate computer programmer with a keen interest in
        technology's limitless possibilities. My journey in programming began with self-directed exploration, fueled by an
        insatiable curiosity about how technology can transform lives and industries. This drive led me to formalize my education
        at Seneca College.
      </p>
      <p className='fs-5'>
        Throughout my academic journey, my passion for the craft of programming drove my deep commitment to learning it. Beyond
        the classroom, I have consistently engaged with the latest industry trends and technologies.
      </p>
      <p className='fs-5'>
        Beyond this, I am a practitioner of lifelong learning, always keen to dive into the latest technological advancements and
        integrate them into my work. My drive to stay ahead in the rapidly changing tech landscape has led me to undertake
        numerous personal projects, each serving as a stepping stone toward understanding practical applications.
      </p>
      <p className='fs-5'>
        What truly excites me about software development is the opportunity to contribute to something larger than myself – to be
        part of projects that innovate, disrupt, and improve our way of life. My aim is to leverage my skills in a dynamic and
        collaborative environment where I can continue to grow, tackle challenging problems, and contribute to impactful projects.
      </p>
      <p className='fs-5'>I invite you to explore my work and get in touch. Let's build the future of technology, together.</p>
    </div>
  );
};

export default About;
