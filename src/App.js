import "antd/dist/antd.css";
import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import AutoMLRoutes from "./Routes/AutoMLRoutes";
import DataLakesRoutes from "./Routes/DataLakeRoutes/DataLakesRoutes";
import AdminRoutes from "./Routes/AdminRoutes/AdminRoutes";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div className="App">
        {/* <AdminRoutes /> */}
        <DataLakesRoutes />
        {/* <AutoMLRoutes /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
