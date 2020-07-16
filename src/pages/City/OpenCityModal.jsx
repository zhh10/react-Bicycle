import React from "react" 
import {Form,Select} from "antd"

const FormItem = Form.Item 
const {Option} = Select
class OpenCityModal extends React.Component{
    render(){
        const {getFieldDecorator} = this.props.form ;
        return(
            <Form layout="horizontal">
                <FormItem label="选择城市">
                    {
                        getFieldDecorator("city_id")(
                            <Select>
                                <Option value="1">北京市</Option>
                                <Option value="2">上海市</Option>
                                <Option value="3">广州市</Option>
                                <Option value="4">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式">
                    {
                        getFieldDecorator("op_mode")(
                            <Select>
                                <Option value="0">自营</Option>
                                <Option value="1">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式">
                    {
                        getFieldDecorator("car_mode")(
                            <Select>
                                <Option value="0">指定停车点</Option>
                                <Option value="1">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
OpenCityModal = Form.create({})(OpenCityModal)
export default OpenCityModal