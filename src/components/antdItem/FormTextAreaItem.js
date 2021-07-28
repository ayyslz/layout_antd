import React  from "react";
import { Input, Form, Select, DatePicker, Upload, Button } from 'antd'

const noFun = () => { };
const { TextArea } = Input;
const FormTextAreaItem = (item, defaultValue) => {
    const { required, validator, onChange, placeholder, name, label, onBlurFun, extra, disabled, others = {} } = item;
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
            <TextArea
                disabled={disabled}
                onBlur={onBlurFun}
                onChange={onChangeFun}
                placeholder={placeholderStr}
                rows={4}
            />
        </Form.Item>
    )
};

export default FormTextAreaItem