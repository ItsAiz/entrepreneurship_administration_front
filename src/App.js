import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./Routes/Routes";
import ToolBar from './components/mdc/toolbar'

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <div className={"App"}>
      <BrowserRouter basename="/">
        <ToolBar/>
        <RoutesApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
