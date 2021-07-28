import React  from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import { Form, Upload, Button } from 'antd'

const noFun = () => { };
const FormFileItem = (item = {}, defaultValue) => {
    const { required, name, label, url, extra, validator, onChange, beforeUpload, normFile, others = {} } = item;
    const rules = validator ? [{ validator }] : [{ required, message: `请上传${label}` }];
    const onChangeFun = onChange || noFun;
    const normFileFun = normFile || noFun;
    const beforeUploadFun = beforeUpload || noFun;
    return (
        <Form.Item
            key={ name }
            label={ label }
            name={ name }
            required={ required }
            initialValue={ defaultValue[name] || [] }
            extra={ extra }
            rules={rules}
            valuePropName='fileList'
            getValueFromEvent={ normFileFun }
            {...others}
        >
            <Upload
                name="files"
                action={url}
                listType="picture"
                beforeUpload={beforeUploadFun}
                onChange={onChangeFun}
                headers={{
                    authorization: `Bearer ${localStorage.getItem('access_token')}`,
                }}
            >
                <Button className="add_file_btn">
                    <CloudUploadOutlined /> 上传
                </Button>
            </Upload>
        </Form.Item>
    );
};

export default FormFileItem