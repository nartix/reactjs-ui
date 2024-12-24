import { Link } from 'react-router-dom';

import { useGlobalState } from './../context/global-context-use.js';

const Header = () => {
  const [templateGlobals] = useGlobalState();
  const {
    django5,
    reactjs,
    angularjs,
    django_rest_framework,
    expressjs,
    title,
    DJANGO5_URL,
    ANGULARJS_URL,
    EXPRESSJS_URL,
    DJANGO_URL,
  } = templateGlobals;

  const titleShort = title.split(' ')[0];
  return (
    <>
      <nav className=' navbar navbar-expand-md navbar-light  mb-4 border-bottom'>
        <div className='container-fluid '>
          <Link to='/' className='navbar-brand fw-bold fs-3 text-secondary'>
            {titleShort}'s Portfolio
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavAltMarkup'
            aria-controls='navbarNavAltMarkup'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <ul className='navbar-nav fs-5 ms-auto'>
              <li className='nav-item mx-2'>
                <Link to='/' className='nav-link'>
                  Home
                </Link>
              </li>
              <li className='nav-item mx-2'>
                <Link to='/about' className='nav-link'>
                  About
                </Link>
              </li>
              <li className='nav-item mx-2'>
                <Link to='/ci-cd' className='nav-link'>
                  CI/CD
                </Link>
              </li>
              <li className='nav-item mx-2'>
                <Link to='/crud' className='nav-link'>
                  CRUD
                </Link>
              </li>
              <li className='nav-item dropdown mx-2'>
                <a
                  className='nav-link dropdown-toggle'
                  href='/'
                  id='navbarDropdown'
                  role='button'
                  data-bs-toggle='dropdown'
                  aria-haspopup='true'
                  aria-expanded='false'
                >
                  {reactjs}
                </a>
                <div className='dropdown-menu' aria-labelledby='navbarDropdown' style={{ maxWidth: '225px' }}>
                  <a className='dropdown-item' href={DJANGO5_URL}>
                    {django5}
                  </a>
                  <a className='dropdown-item' href={ANGULARJS_URL}>
                    {angularjs}
                  </a>
                  <a className='dropdown-item' href={EXPRESSJS_URL}>
                    API {expressjs}
                  </a>
                  <a className='dropdown-item' href={DJANGO_URL}>
                    {django_rest_framework}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
