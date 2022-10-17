import React from 'react';
import {Pagination, Table} from "antd";

const CTable = ({
                    dataSource,
                    columns,
                    onChange, paginationProps, className, rowClassName, ...props
                }) => {
    return (
        <>
            <Table
                {...props}
                dataSource={dataSource}
                columns={columns}
                onChange={onChange}
                pagination={false}
                rowClassName={rowClassName}
                className={className}
            />
            {paginationProps.pagination && (
                <div style={{display: "flex", justifyContent: "flex-end", marginTop: 20}} className="mt-8">
                    <Pagination
                        {...paginationProps}
                        showTotal={(total, range) =>
                            total && (<div>
                                Items:
                                <strong
                                    className="mr-15 ml-5">{range[0]} - {range[1]}
                                </strong>
                                Total:
                                <strong className="mr-15 ml-5">{total}</strong>
                            </div>) || null}
                        total={paginationProps.total}
                        pageSizeOptions={[10, 25, 50]}
                        onChange={(page, pageSize) => {
                            const start = page * pageSize - pageSize
                            paginationProps.onChange({page, pageSize, start})
                        }}
                    />
                </div>
            )}
        </>
    );
};

export default CTable;