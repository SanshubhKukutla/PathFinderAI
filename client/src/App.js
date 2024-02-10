const React = require('react');
 
// We use Route in order to define the different routes of our application
const Route = require('react-router-dom');
const Routes = require('react-router-dom');
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Extractor from "./components/extract";

 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/extract" element={<Extractor />} />
     </Routes>
   </div>
 );
};
 
export default App;