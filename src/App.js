import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';
import Wall from './pages/Wall';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Router>
        <div >
          <Navbar className='front'/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/resume' element={<Resume />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/wall' element={<Wall />} />
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer/> 
    </>
  );
}

export default App;

