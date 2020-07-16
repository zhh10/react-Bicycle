import React from "react"
import UserForm from "../../components/User/UserForm"
import AddUser from "../../components/User/addUser"
import { Card,Button,Modal,message} from "antd"


export default class User extends React.Component{
    state = {
        addStaffShow:false,
        deleteStaffShow:false,
        editStaffShow:false,
        detailStaffShow:false,
    }
    // 查询员工 
    queryStaff = (fieldsValue)=>{
        console.log(fieldsValue)
    }
    // 创建员工函数
    addStaffCallback = ()=>{
        let value 
        this.addStaff.props.form.validateFields((err,fieldsValue)=>{
            if(err){
                message.error("发生未知错误")
            }else{
                value = fieldsValue
            }
        })
        console.log(value)
        message.success("创建成功")
        this.setState({addStaffShow:false})
        this.addStaff.props.form.resetFields() 
    }

    render(){
        return (
            <div>
                <Card>
                    <UserForm queryStaff={this.queryStaff}/>
                </Card>
                <Card>
                    <Button style={{margin:"0 10px"}} type="primary" icon="plus" 
                    onClick={()=>{
                        this.setState({addStaffShow:true})
                    }}>创建员工</Button>
                    <Button style={{margin:"0 10px"}} type="primary" icon="edit"
                    onClick={()=>{
                        this.setState({editStaffShow:true})
                    }}
                    >编辑员工</Button>
                    <Button style={{margin:"0 10px"}} type="primary" icon="profile"
                    onClick={()=>{
                        this.setState({detailStaffShow:true})
                    }}
                    >员工详情</Button>
                    <Button style={{margin:"0 10px"}} type="primary" icon="delete"
                    onClick={()=>{
                        this.setState({deleteStaffShow:true})
                    }}
                    >删除员工</Button>
                </Card>
                
                <Modal
                title="创建员工"
                visible={this.state.addStaffShow}
                onOk={this.addStaffCallback}
                onCancel={()=>{this.setState({addStaffShow:false});this.addStaff.props.form.resetFields()}}
                >
                    <AddUser wrappedComponentRef={(inst)=>{this.addStaff = inst}}/>
                </Modal>

                <Modal
                title="删除员工"
                visible={this.state.deleteStaffShow}
                onCancel={()=>{this.setState({deleteStaffShow:false})}}
                ></Modal>

                <Modal
                title="编辑员工"
                visible={this.state.editStaffShow}
                onCancel={()=>{this.setState({editStaffShow:false})}}
                ></Modal>
                
                <Modal
                title="员工详情"
                visible={this.state.detailStaffShow}
                onCancel={()=>{this.setState({detailStaffShow:false})}}
                >
                </Modal>
            </div>
        )
    }
}