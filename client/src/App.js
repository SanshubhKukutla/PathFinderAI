import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Components from './components/Components';
import Utilities from './components/Utilities';
import './components/App.css';

function App() {
  return (
    <Router>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <TopBar />
          <div className="container-fluid">
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/components" element={<Components />} />
              <Route path="/utilities" element={<Utilities />} />
              {/* Add additional routes here */}
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
