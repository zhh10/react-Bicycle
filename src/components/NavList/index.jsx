import React from "react" 
import "./index.less"
import {Menu} from "antd"
import MenuList from "../../config"
import { NavLink } from "react-router-dom"
import {connect} from "react-redux"
import {switchMenu} from "../../redux/action"
const {SubMenu} = Menu ;

class navList extends React.Component{
    state = {
        menuTreeNode:null
    }
    componentWillMount(){
        const menuTreeNode = this.renderTree(MenuList)
        this.setState({menuTreeNode})
    }
    // 点击redux
    handleClick =({item,key})=>{
        let title = item.props.children.props.children
        this.props.SwitchMenu(title)
    }
    renderTree = (data)=>{
        const menuTreeNode = data.map(item => {
            if(item.children){
                return (<SubMenu key={item.key} title={item.title}>
                            {this.renderTree(item.children)}
                        </SubMenu>)
            }else{
            return (<Menu.Item key={item.key}><NavLink to={`/admin${item.key}`}>{item.title}</NavLink></Menu.Item>)
            }
        })
        return menuTreeNode
        
    }
    render(){
        return (
            <div>
                <div className="logo">
                    <img src="/logo192.png" alt=""/>
                    <h1>Bicycle平台</h1>
                </div>
                <Menu 
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="vertical"
                theme="dark"
                onClick={this.handleClick}>
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
function mapStateToProp(state){
    return {title:state}
}
function mapDispatchToProp(dispatch){
    return {
        SwitchMenu(title){dispatch(switchMenu(title))}
    }
}

export default connect(undefined,mapDispatchToProp)(navList)