import Login from './Login.js'
import './App.css'
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import MainWindow from './MainWindow';
function App() {
    const user = useSelector(selectUser);
  return (

   
    <div className="App">
      <div className="content">
      {user ? <MainWindow/> : <Login/>}
        
      </div>
    </div>
  );
}

export default App;