import React from 'react';
import './App.css';
import {Row,Col} from "antd"
import "./style/common.less"
import Headers from "./components/Headers"
import Footers from "./components/Footers"
import NavList from "./components/NavList"
import Home from "./pages/home"
function App() {
  return (
    <div className="App">
        <Row className="container">
            <Col span={3} className="navLeft">
                <NavList />
            </Col>
            <Col span={21} className="main">
                <Row>
                    <Headers />
                </Row>
                <Row className="content">
                    <Home />
                </Row>
                <Row>
                    <Footers />
                </Row>
            </Col>
        </Row>
    </div>
  );
}

export default App;
