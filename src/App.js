import { Route, Routes } from 'react-router-dom';
import './App.css';
import VotingApp from './Voting';
import Signup from './pages/signup';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/app/*' element={<VotingApp />} />
      </Routes>
    </div>
  );
}

export default App;
