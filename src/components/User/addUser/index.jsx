import React from "react" 
import {Form,Radio,Input,DatePicker} from "antd" 

const FormItem = Form.Item 
const {TextArea} = Input
class AddUser extends React.Component{
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
        return (
            <Form layout="horizontal" >
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        getFieldDecorator("user_name")(
                            <Input placeholder="请输入用户名"/>
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        getFieldDecorator("sex",{
                            // valuePropName:"Radio"
                        })(
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {getFieldDecorator("birth")(
                            <DatePicker showTime={true} placeholder="请输入日期" format="YYYY-MM-DD" />
                        )}
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {getFieldDecorator("Area")(
                            <TextArea rows={4} />
                    )}
                </FormItem>
            </Form>
        )
    }
}
AddUser = Form.create({})(AddUser)
export default AddUser
