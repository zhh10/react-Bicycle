import React from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom"
import Admin from "./admin" 
import noMatch from "./pages/nomatch"
import OrderDetail from './pages/OrderDetail';
function App() {
  return (
        <Router>
            <Switch>
                <Route path="/admin" component={Admin} />
                <Redirect exact from='/' to='/admin' />
                <Route path="/order/detail/:id" component={OrderDetail} />
                <Route component={noMatch} /> 
            </Switch>
        </Router>
  );
}

export default App;
