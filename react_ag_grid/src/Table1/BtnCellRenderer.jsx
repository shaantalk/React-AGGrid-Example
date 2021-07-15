import React, { Component } from "react";
import { Button, ButtonGroup } from '@material-ui/core';
import { Delete as DeleteIcon, LinkOff as LinkOffIcon } from '@material-ui/icons';
class BtnCellRenderer extends Component {
    constructor(props) {
        super(props);
        this.btnClickedHandler = this.btnClickedHandler.bind(this);
    }
    btnClickedHandler() {
        this.props.clicked(this.props.value);
    }
    render() {
        return (
            <ButtonGroup size="small" style={{ color: 'gray' }} aria-label="outlined primary button group">
                <Button ><LinkOffIcon style={{ color: 'gray' }} /></Button>
                <Button ><DeleteIcon style={{ color: 'red' }} /></Button>
            </ButtonGroup>
        );
    }
}

export default BtnCellRenderer;
