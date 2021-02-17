import "./App.css";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import MainWindow from "./MainWindow";
import Landing from "./Landing";
function App() {
  const user = useSelector(selectUser);
  return (
    <div className="App">
      <div className="content">{user ? <MainWindow /> : <Landing />}</div>
    </div>
  );
}

export default App;
