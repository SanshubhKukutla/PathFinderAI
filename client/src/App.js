const React = require('react');
 
// We use Route in order to define the different routes of our application
const Route = require('react-router-dom');
const Routes = require('react-router-dom');
 
// We import all the components we need in our app
const NavBar = require('./components/navbar');
const RecordList = require('./components/recordList');
const Edit = require('./components/edit');
const Create = require('./components/create');
const Extraction = require('./components/extraction');
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/extraction" element={<Extraction />} />
     </Routes>
   </div>
 );
};
 
export default App;