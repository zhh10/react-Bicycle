import React from "react"
import {Form,DatePicker,Radio,Input} from "antd"
import User from "../../../pages/User";
import moment from "moment"
const FormItem = Form.Item
const {TextArea} = Input
class EditUser extends React.Component{
    render(){
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        const UserData = this.props.UserData
        console.log(UserData)
        return (
            <Form layout="horizontal" >
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        getFieldDecorator("user_name",{
                            initialValue:UserData.username
                        })(
                            <Input/>
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        getFieldDecorator("sex",{
                            initialValue:UserData.sex
                        })(
                            <Radio.Group >
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {getFieldDecorator("birth",{
                        initialValue:moment(UserData.birthday)
                    })(
                            <DatePicker showTime={true} format="YYYY-MM-DD" />
                        )}
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {getFieldDecorator("Area",{
                        initialValue:UserData.address
                    })(
                            <TextArea rows={4} />
                    )}
                </FormItem>
            </Form>
        )
    }
}
EditUser = Form.create({})(EditUser)
export default EditUser