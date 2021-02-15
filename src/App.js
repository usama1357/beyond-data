import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Switch } from "react-router-dom";
import AutoMLRoutes from "./Routes/AutoMLRoutes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <AutoMLRoutes />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
