import React  from "react";
import { Form, DatePicker } from 'antd'
import moment from "moment";

const noFun = () => { };
const Format = "YYYY-MM-DD";
const FormTimerItem = (item, defaultValue) => {
    const { required, validator, onChange, placeholder, name, label ,extra, disabled, others = {} } = item;
    const rules = validator ? [{ validator }] : [{ type: 'object', required, message: `请输入${label}` }];
    const placeholderStr = placeholder || `请输入${label}`;
    const onChangeFun = onChange || noFun;
    return (
        <Form.Item
            key={name}
            name={name}
            label={label}
            extra={extra}
            initialValue={defaultValue[name] ? moment(defaultValue[name]) : null}
            rules={rules}
            {...others}
        >
            <DatePicker
                className='date_picker_style'
                disabled={ disabled }
                placeholder={placeholderStr}
                onChange={(value, timer) => onChangeFun(value, timer, item)}
                format={ Format }
            />
        </Form.Item>
    );
};
export default FormTimerItem