import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import AutoMLRoutes from "./Routes/AutoMLRoutes";
import DataLakesRoutes from "./Routes/DataLakeRoutes/DataLakesRoutes";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        <DataLakesRoutes />
        <AutoMLRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
