import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import AutoMLRoutes from "./Routes/AutoMLRoutes";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <Switch>
          <AutoMLRoutes />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
