export const environment = {
  production: false,
  DJANGO5_URL: 'https://ferozfaiz.com',
  ANGULARJS_URL: 'https://angular.ferozfaiz.com',
  REACTJS_URL: 'https://reactjs.ferozfaiz.com',
  DJANGO_URL: 'https://django-rest-framework.ferozfaiz.com',
  EXPRESSJS_URL: 'https://expressjs.ferozfaiz.com',
};

export const templateGlobals = {
  title: 'Feroz Faiz',
  getPageTitle: function () {
    return this.title + ' Portfolio | ';
  },
  django5: 'Django 5',
  angularjs: 'AngularJS 16.2',
  reactjs: 'ReactJS 18.2',
  django: 'Django 4.2',
  django_rest_framework: 'Django REST Framework 3.14',
  expressjs: 'ExpressJS 4.18',
  redux: 'Redux 8.0',
  linkedin: 'https://www.linkedin.com/in/feroz-faiz/',
  github: 'https://github.com/nartix/feroz',
  email: 'feroz@hotmail.ca',
  resume: 'https://1drv.ms/f/s!Asn5wDAHILW1kbNdYaXvIEUC-lrUIQ?e=ronDfh',
  profilePicture: '/assets/images/profile-picture.png',
};
