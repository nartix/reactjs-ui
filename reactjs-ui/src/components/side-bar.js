import { useGlobalState } from '../context/global-context-use';

const SideBar = () => {
  const [templateGlobals] = useGlobalState();
  const { title, linkedin, github, resume, email, profilePicture } = templateGlobals;
  return (
    <>
      <div className="d-flex flex-column">
        <div className="p-2">
          <span className="fs-4 fw-bold">
            <img
              className="rounded-circle img-fluid d-none d-md-inline "
              src={profilePicture}
              style={{ maxWidth: '60%' }}
              alt={title}
            />
            <img
              className="rounded-circle img-fluid d-inline d-md-none"
              src={profilePicture}
              style={{ maxWidth: '50%' }}
              alt={title}
            />
          </span>
        </div>
        <div className="p-2">
          <span className="fs-3 fw-bold">{title}</span>
        </div>
      </div>
      <div className="d-flex flex-lg-column flex-sm-row mb-4">
        <div className="p-1 fs-5">
          <i className="bi bi-geo-alt-fill pe-2"></i>
          <span className="d-none d-md-inline">Toronto</span>
        </div>
        <div className="p-1 fs-5">
          <a href={`mailto:${email}`} className="text-decoration-none" target="_blank">
            <i className="bi bi-envelope-fill pe-2 link-dark"></i>
            <span className="d-none d-none d-md-inline"> Email </span>
          </a>
        </div>
        <div className="p-1 fs-5">
          <a href={linkedin} className="text-decoration-none" target="_blank">
            <i className="bi bi-linkedin pe-2 link-dark"></i>
            <span className="d-none d-none d-md-inline"> LinkedIn </span>
          </a>
        </div>
        <div className="p-1 fs-5">
          <a href={github} className="text-decoration-none" target="_blank">
            <i className="bi bi-github pe-2 link-dark"></i>
            <span className="d-none d-none d-md-inline"> GitHub </span>
          </a>
        </div>
        <div className="p-1 fs-5">
          <a href={resume} className="text-decoration-none" target="_blank">
            <i className="bi bi-file-person pe-2 link-dark"></i>
            <span className="d-none d-none d-md-inline"> Resume</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default SideBar;
