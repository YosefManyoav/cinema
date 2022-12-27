import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './containers/HomePage';
import Movies from './containers/Movies';
import SingUp from './containers/SingUp';
import EditMovie from './containers/EditMovie';
import Members from './containers/Members';
import NewMovie from './containers/NewMovie'



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/> 
        <Route path='/cinema' element={<Movies/>}/> 
        <Route path='/singUp' element={<SingUp/>}/> 
        <Route path='/edit/:id' element={<EditMovie/>}/> 
        <Route path='/members' element={<Members/>}/> 
        <Route path='/newMovie' element={<NewMovie/>}/> 
      </Routes>
    </div>
  );
}

export default App;
