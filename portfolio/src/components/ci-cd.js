import React, { useEffect } from 'react';

import { useGlobalState } from '../context/global-context-use';

const CiCd = () => {
  const [templateGlobals] = useGlobalState();
  useEffect(() => {
    document.title = templateGlobals.getPageTitle() + 'CI/CD';
  }, [templateGlobals]);
  return (
    <div>
      <h3 className='text-center mb-3'>
        <b>CI/CD Pipeline</b>
      </h3>
      <p className='text-justify fs-5 mb-3'>
        I built my projects with Docker. I automated the build and subsequent pushing of Docker images to Amazon Elastic Container
        Registry using GitHub Actions. I chose PostgreSQL for the database. All my projects are set up on a Kubernetes cluster
        that I manage myself, using the RKE2 Kubernetes engine. I also automated the setup of this Kubernetes cluster using
        Ansible.
      </p>
      <img src='/assets/images/ci-cd.png' className='mx-auto d-block img-fluid mb-3' alt='CI CD image' />
    </div>
  );
};

export default CiCd;
