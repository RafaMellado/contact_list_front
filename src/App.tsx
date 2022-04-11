import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./Router/Routes";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./Layout/Header";
import { Content } from "./Layout/Content";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <div className="d-flex flex-column w-100">
        <Container>
          <Router>
            <Header></Header>

            <Content>
              <Routes />
            </Content>
          </Router>
        </Container>
      </div>
    </div>
  );
}

export default App;
