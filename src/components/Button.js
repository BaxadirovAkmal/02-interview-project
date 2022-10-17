import React from 'react';
import {Button} from "antd";

const CButton = props => {
    return (
        <Button type={props.type}
                onClick={props.onClick}
                style={{display: "flex", alignItems: "center"}}
                className={props.className}
                disabled={props?.disabled}
                shape={props.shape}
                loading={props.loading}
        >
            {props.children}{props.title}
        </Button>
    );
};

export default CButton;