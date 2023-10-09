import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewAppointmentsPatients from './pages/Doctor/ViewAppointmentsPatients'
export default function App() {

  return (
    <Router>
        <Routes >
          <Route path="/" element={< ViewAppointmentsPatients/>}></Route>
        </Routes>
    </Router>
          
  );
}

