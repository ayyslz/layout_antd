import { message } from "antd";

export const uploadUrl = 'https://dev-crmjava-api.suuyuu.cn/file/upload';

export const JPG = 'image/jpeg';
export const PNG = 'image/png';
export const docxType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const versionValidator = (rule, value) => {
    try {
        if (/^[0-9]+.[0-9]+.[0-9]+$/g.test(value)) {
            return Promise.resolve();
        } else {
            return Promise.reject('版本号不正确！');
        }
    } catch (err) {
        return Promise.reject(err);
    }
}

export const fileValidator = (rule, value) => {
    try {
        if ( value?.length ) {
            return Promise.resolve();
        } else {
            return Promise.reject('请上传！');
        }
    } catch (err) {
        return Promise.reject(err);
    }
};

export const normFile = e => {
    const { fileList = [] } = e || {};
    const fileArr = Array.isArray(e) ? e : fileList;
    // 此处进行 文件类型 过滤
    const newFileList = fileArr.filter(item => item.type === JPG || item.type === PNG);
    return newFileList;
};

export const beforeUploadImgFile = (file) => {
    const isJpgOrPng = file.type === JPG || file.type === PNG;
    const isLt2M = file.size / 1024 / 1024 < 80;
    if (!isJpgOrPng) {
        message.error('请上传jpeg/png格式图片');
        return false
    }
    if (!isLt2M) {
        message.error('图片大小超过80M');
        return false
    }
    return true;
}

export const docxNormFile = e => {
    const { fileList = [] } = e || {};
    const fileArr = Array.isArray(e) ? e : fileList;
    // 此处进行 文件类型 过滤
    const newFileList = fileArr.filter(item => item.type === docxType );
    return newFileList;
};

export const beforeUploadDocxFile = (file) => {
    const isJpgOrPng = file.type === docxType;
    if (!isJpgOrPng) {
        message.error('请上传docx格式文件');
        return false
    }
    return true;
}