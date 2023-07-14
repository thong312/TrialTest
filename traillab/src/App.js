import logo from './logo.svg';
import './App.css';
import Navigation from './component/Navigation';
import Staff from './component/Staff';
import { Route, Routes } from 'react-router-dom';
import DetailPage from './component/Detail';
import Add from './component/Add';
import Dashboard from './component/dashboard';

function App() {
  return (
    <div className="App">
     <Navigation/>
     
     <Routes>
     <Route path='/' element={<Staff/>}></Route> 
     <Route path='/add' element={<Add/>}></Route>
     <Route path='/dashboard' element={<Dashboard/>}></Route>
     <Route path='/detail/:id' element={<DetailPage/>}></Route>
     </Routes>
     
    </div>
  );
}

export default App;
