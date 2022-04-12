import './App.css';
import {Routes, Route} from 'react-router-dom'
import LandingPage from './component/LandingPage';
import Home from './component/Home';
import Details from './component/Details';
import Forms from './component/Forms';
import Generos from './component/Generos';



function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/Home'  element={<Home/>}/>
      <Route path='/Home/:id' element={<Details/>}/>
      <Route path='/Forms' element={<Forms/>}/>
      <Route path='/Genders' element={<Generos/>}/>
      <Route path="*" element={<Home/>}/>
    </Routes>
  );
}
//<div className="App">
export default App;
