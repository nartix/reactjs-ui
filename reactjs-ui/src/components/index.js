import { useEffect } from 'react';

import { useGlobalState } from '../context/global-context-use';

const Index = () => {
  const [templateGlobals] = useGlobalState();
  const { reactjs, angularjs, django_rest_framework, expressjs, redux } = templateGlobals;

  useEffect(() => {
    document.title = templateGlobals.getPageTitle() + 'Home';
  }, [templateGlobals]);

  return (
    <div>
      <h2 className='text-center mb-4'>
        <b>Welcome to My ReactJS Project!</b>
      </h2>
      <p>
        This ReactJS/Redux project is a CRUD web application that uses a custom-built API to manage, create, read, update, delete,
        sort, and search a list of employees. The API is built using ExpressJS and PostgreSQL, and is deployed on a Kubernetes
        cluster.
      </p>

      <h4>Technologies Used on This Project:</h4>
      <ul>
        <li>
          <b>Front-End</b>: {reactjs}, {redux}, SASS Bootstrap, NodeJS
        </li>
        <li>
          <b>Back-End</b>: {expressjs}
        </li>
        <li>
          <b>Deployment & Management</b>: RKE2 Kubernetes Cluster, Ansible, PostgreSQL Cluster
        </li>
      </ul>

      <h4>Deployment Details:</h4>
      <ul>
        <li>Self-hosted, three-node Kubernetes cluster deployed on a cloud VPS using an Ansible script.</li>
        <li>PostgreSQL database cluster, with backups stored on AWS S3 Glacier using a shell script.</li>
      </ul>

      <h4>Continuous Integration/Continuous Deployment:</h4>
      <ul>
        <li>
          I've integrated a CI/CD pipeline using GitHub Actions, with seamless Docker integration, ensuring streamlined version
          control and efficient release cycles.
        </li>
      </ul>
      <h4>Other Tools & Technologies:</h4>
      <ul>
        <li>Database: PostgreSQL, backed up to AWS S3 glacier</li>
      </ul>
    </div>
  );
};

export default Index;
