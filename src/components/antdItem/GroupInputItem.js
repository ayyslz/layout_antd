import React  from "react";
import { Input, Select, } from 'antd'

const { Group } = Input;
const { Option } = Select;
const GroupInputItem = (...params) => {
    const [leftSelectValue, optionArr, leftValue, onSelectChange, onInputChange] = params;
    return <Group compact className="form_option1">
        <Select
            value={leftSelectValue}
            placeholder="请选择..."
            onChange={onSelectChange}
            className="form_option1_left"
        >
            {optionArr.map((item, index) => {
                return (
                    <Option key={`option_left_${index}`} value={item.name}>
                        {item.label}
                    </Option>
                );
            })}
        </Select>
        <Input
            className="form_option1_right"
            value={leftValue}
            onChange={onInputChange}
            allowClear
            placeholder="请输入..."
        />
    </Group>
}

export default GroupInputItem
    