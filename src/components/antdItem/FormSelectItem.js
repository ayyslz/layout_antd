import React  from "react";
import { Select, Form } from 'antd'

const { Option } = Select;
const noFun = () => { };
const FormSelectItem = (item = {}, defaultValue) => {
    const { required, validator, onChange, placeholder, mode, name, label, arr ,extra, disabled, others = {} } = item;
    const modeStr = mode || 'tags';
    const placeholderStr = placeholder || `请选择${label}`;
    const onChangeFun = onChange || noFun;
    const rules = validator ? [{validator}] : [{type: 'array', required, message: `请选择${label}` }];
    return (
        <Form.Item
            key={name}
            name={name}
            label={label}
            extra={extra}
            initialValue={defaultValue[name]}
            rules={rules}
            {...others}
        >
            <Select
                allowClear
                disabled={disabled}
                mode={modeStr}
                placeholder={placeholderStr}
                onChange={onChangeFun}
            >
                {arr.map(({ label, value }) => {
                    return (
                        <Option key={value} value={value}>
                            {label}
                        </Option>
                    );
                })}
            </Select>
        </Form.Item>
    );
};

export default FormSelectItem