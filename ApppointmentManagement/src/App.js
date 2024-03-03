
import AppointnmentMain from '../src/MainAppoinment/AppoinmentMain';
import PeriodicalAppointment from '../src/Periodical/PeriodicalAppointment';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MechanicalAppointment from '../src/Mechanical/MechanicalAppointment'
import SMAppointment from './SMAppointment';
import AccidentalAppointment from '../src/Accidental/AccidentalAppointment'
import SMPeriodicalServices from '../src/SMPeriodicalServices'
function App() {
  return (

    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AppointnmentMain />} />
          <Route path="/periodical" element={<PeriodicalAppointment />} />
          <Route path="/mechanical" element={<MechanicalAppointment />} />
          <Route path="/Accidental" element={<AccidentalAppointment />} />
          <Route path="/SM" element={<SMAppointment />} />
          <Route path="/SMP" element={<SMPeriodicalServices />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

