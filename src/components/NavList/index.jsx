import React from "react" 
import "./index.less"
import {Menu} from "antd"
import MenuList from "../../config"
const {SubMenu} = Menu ;
export default class navList extends React.Component{
    state = {
        menuTreeNode:null
    }
    componentWillMount(){
        const menuTreeNode = this.renderTree(MenuList)
        this.setState({menuTreeNode})
    }
    renderTree = (data)=>{
        const menuTreeNode = data.map(item => {
            if(item.children){
                return (<SubMenu key={item.key} title={item.title}>
                            {this.renderTree(item.children)}
                        </SubMenu>)
            }else{
            return (<Menu.Item key={item.key}>{item.title}</Menu.Item>)
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
                theme="dark">
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}