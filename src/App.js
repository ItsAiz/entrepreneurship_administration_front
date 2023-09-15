import { BrowserRouter } from 'react-router-dom';
import RoutesApp from './Routes/Routes';

function App() {
  return (
    <div className={'App'}>
      <BrowserRouter basename='/'>
        <RoutesApp />
      </BrowserRouter>
    </div>
  );
};

export default App;