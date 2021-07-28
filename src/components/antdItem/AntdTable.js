import React from "react";
import { Table } from 'antd'

const AntdTable = ( params = {} ) => {
    const {
        rowKey,
        tableColums,
        pagination = true,
        pageNum,
        total = 0,
        pageSize = 10,
        onShowSizeChange,
        onPageChange,
        dataSource = [],
        propRowSelection = true,
        selectedRowKeys,
        onSelectChange,
        getCheckboxProps,
        loading = false,
        title = null,
        bordered = false
    } = params;
    
    const paginationObj = pagination ? {
        current: pageNum,
        total,
        pageSize,
        showSizeChanger: true,
        showTotal: (totalNum) => {
            return <span>共{totalNum}条</span>;
        },
        onShowSizeChange,
        onChange: onPageChange,
    } : false;

    const scrollItem = tableColums.length > 6 ? { x: tableColums.length * 200 } : {};

    const rowSelection = !propRowSelection
        ? null
        : {
            selectedRowKeys,
            onChange: onSelectChange,
            getCheckboxProps,
    };
    
    return <Table
        rowKey={(record) => {
            return rowKey ? rowKey(record) : record.id;
        }}
        size="small"
        bordered={bordered}
        columns={tableColums}
        pagination={paginationObj}
        dataSource={dataSource}
        rowSelection={rowSelection}
        loading={loading}
        scroll={scrollItem}
        title={title}
    />
}

export default  AntdTable