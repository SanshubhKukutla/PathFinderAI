import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/Sidebar"; // Import Sidebar component
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Extractor from "./components/extract";

const App = () => {
  return (
    <div className="d-flex" id="wrapper">
      <Sidebar /> {/* Add Sidebar component */}
      <div id="page-content-wrapper">
        <Navbar />
        <div className="container-fluid">
          <Routes>
            <Route exact path="/" element={<RecordList />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/create" element={<Create />} />
            <Route path="/extract" element={<Extractor />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
