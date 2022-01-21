import './App.css';
import { options } from './components/config';
import Jspreadsheet from './components/Jspreadsheet';

function App() {
  return (
    <div>
      <Jspreadsheet options={options} />
    </div>
  );
}

export default App;
