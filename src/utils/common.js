export const formItemLayout = (label = 8, wrapper = 16) => {
    return {
        labelCol: {
            xs: { span: 24 },
            sm: { span: label },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: wrapper },
        },
    }
};