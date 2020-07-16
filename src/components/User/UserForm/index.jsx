import React from 'react' 
import {Card,Form,Input,DatePicker,Button,message} from "antd"

const FormItem = Form.Item; 
class UserForm extends React.Component{
    // 重置功能
    resetFilter = ()=>{
        this.props.form.resetFields()
    }

    render(){
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="用户名">
                    {getFieldDecorator('user_name')(
                        <Input placeholder="请输入用户名称" />
                    )}
                </FormItem>
                <FormItem label="用户手机号"> 
                    {getFieldDecorator("user_phone")(
                        <Input placeholder="请输入用户手机号" />
                    )}
                </FormItem>
                <FormItem label="请选择入职时间">
                    {getFieldDecorator("startWork_date")(
                        <DatePicker showTime={true} placeholder="请输入日期" format="YYYY-MM-DD" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}
                    onClick={()=>{
                        this.props.form.validateFields((err,fieldsValue)=>{
                            if(err){
                                message.error("发生错误")
                            }else{
                                this.props.queryStaff(fieldsValue)
                            }
                        })
                    }}>查询</Button>
                    <Button onClick={this.resetFilter}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)
export default UserForm 