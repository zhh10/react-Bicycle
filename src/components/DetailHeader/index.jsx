import React from 'react' 
import "./index.less"
export default class DetailHeader extends React.Component{

    render(){
        return (
            <div id="orderDetailHeader">
                <img className="logo" src="/logo192.png" alt=""/>
                <h1 className="text">Bicycle平台</h1>
            </div>
        )
    }
}