import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@material-ui/core/Container";
import HomeView from "./Views/HomeView";
import CustomerDetails from "./Views/CustomerDetails";

function App() {
  return (
    <Container maxWidth="lg">
      <Router>
        <div style={{ height: 50 }}></div>
        <Switch>
          <Route path="/" component={HomeView} exact />
          <Route path="/:id" component={CustomerDetails} exact />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
