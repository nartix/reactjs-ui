import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NewCRUD from './components/newcrud';
import CreateEmployee from './components/employee-create';
import EmployeeList from './components/employee-list';
import Redirecttest from './components/redirect-test';
import EditEmployee from './components/employee-edit';
import About from './components/about';
import Index from './components';
import CiCd from './components/ci-cd';
import NotFound from './components/404';
import SideBar from './components/side-bar';
import Header from './components/header';
import Footer from './components/footer';

const App = () => {
  return (
    <div className="container custom-container-width">
      <Header />
      <div className="row">
        <div className="col-sm-3">
          <SideBar />
        </div>
        <div className="col-sm-9">
          <Routes>
            <Route path="/" exact element={<Index />} />
            <Route path="/newcrud" exact element={<NewCRUD />} />
            <Route
              path="/employees/create"
              exact
              element={<CreateEmployee />}
            />
            <Route path="/crud" exact element={<EmployeeList />} />
            <Route
              path="/employees/edit/:employee_id"
              exact
              element={<EditEmployee />}
            />
            <Route path="/re" exact element={<Redirecttest />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/ci-cd" exact element={<CiCd />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
