import ToDo from './components/ToDo';
import EditTask from "./components/EditTask";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'           element={<ToDo/>}/>
        <Route path="/edit/:id" element={<EditTask/>} />
      </Routes>
    </Router>
  );
}

export default App;
