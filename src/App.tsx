import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./Router/Routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Layout/Header";
import { Content } from "./Layout/Content";

function App() {
  return (
    <div className="App">
      <div className="d-flex flex-column w-100">
        <Content>
          <Router>
            <Header></Header>

            <Routes />
          </Router>
        </Content>
      </div>
    </div>
  );
}

export default App;
