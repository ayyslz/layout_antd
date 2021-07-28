import React  from "react";
import { Input, Form } from 'antd'

const noFun = () => { };
const FormInputItem = (item = {}, defaultValue = {}) => {
    const { required, validator, onChange, placeholder, addonBefore, name, label, onBlurFun, extra, disabled, others = {} } = item;
    const placeholderStr = placeholder || `请输入${label}`;
    const onChangeFun = onChange || noFun;
    const rules = validator ? [{validator}] : [{ required, message: `请输入${label}` }];
    return (
        <Form.Item
            key={ name }
            label={ label }
            name={name}
            required={ required }
            initialValue={ defaultValue[name] }
            extra={extra}
            rules={ rules }
            {...others}
        >
            <Input
                addonBefore={addonBefore}
                disabled={disabled}
                onBlur={onBlurFun}
                onChange={onChangeFun}
                placeholder={placeholderStr}
            />
        </Form.Item>
    )
 }

 export default FormInputItem