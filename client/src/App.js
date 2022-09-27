import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import CreateRecipe from "./components/CreateRecipe"
import DetailsPage from "./components/DetailsPage"
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage}/>
          <Route path="/home" component={Home}/>
          <Route path="/create" component={CreateRecipe}/>
          <Route exact path="/recipe/:id" component={DetailsPage}/>
        </Switch>
       
      </div>
    </BrowserRouter>
  );
}

export default App;
