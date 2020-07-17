import React from 'react';
import {Row,Col} from "antd"
import "./style/common.less"
import {Switch,Route, Redirect} from "react-router-dom"
import Headers from "./components/Headers"
import Footers from "./components/Footers"
import NavList from "./components/NavList"

import Home from "./pages/home"
import City from "./pages/City"
import Order from "./pages/Order"
import User from "./pages/User"
import BikeMap from "./pages/bikeMap"
function Admin(props) {
  return (
    <div className="App">
        <Row className="container">
            <Col span={3} className="navLeft">
                <NavList />
            </Col>
            <Col span={21} className="main" >
                <Row>
                    <Headers />
                </Row>
                <Row className="content">
                    <Switch>
                        <Route path="/admin/home" component={Home}/>
                        <Route path="/admin/city" component={City} />
                        <Route path="/admin/order" component={Order} />
                        <Route path="/admin/user" component={User} />
                        <Route path="/admin/bikeMap" component={BikeMap} />
                        <Redirect to='/admin/home' />
                    </Switch>
                </Row>
                <Row>
                    <Footers />
                </Row>
            </Col>
        </Row>
    </div>
  );
}

export default Admin;
