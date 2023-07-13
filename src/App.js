import logo from './logo.svg';
import './App.css';
import VersionBoard from './componenet/VersionBoard.js'
import AppTestModal from './componenet/AppTestModal.js'
import VersionAdd from './componenet/VersionAdd.js'

const App = () => {

  return (
    <div className="App">
      <div className='controlBtn'>
      <div>
        <VersionAdd />
        </div>
        <AppTestModal />
      </div>
      <VersionBoard />
    </div>
  );


}

export default App;
