import React, {Component} from 'react';

class RefPanel extends Component {
    constructor(props){
        super(props);

        this.state = {
            isSizeFull: false,
            isSortOrder: undefined,
            isSortByAlph: undefined
        };

        this.clickAdd = (e) => {
            this.props.onOpenChange(e.target.value)
        };

        this.onClickResize = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.setState((prevState, props) => ({isSizeFull: !prevState.isSizeFull}));
            this.props.onClickResize();
        };
    }

    render() {
        let addBtnDOM = (
            <div className="ref-btn-panel btn-group">
                <input className={"btn btn-success"} onClick={this.clickAdd}
                       type="button" value="Добавить"/>
            </div>
        );
        let sizeFullIconDOM = (<span class="glyphicon glyphicon-resize-full"></span>);
        let sizeShortIconDom = (<span className="glyphicon glyphicon-resize-small"></span>);
        let sortOrderAltIconDOM = (<span className="glyphicon glyphicon-sort-by-order-alt"></span>);
        let sortOrderIconDOM = (<span className="glyphicon glyphicon-sort-by-order"></span>);
        let sortByAlphAltIconDOM = (<span className="glyphicon glyphicon-sort-by-alphabet-alt"></span>);
        let sortByAlphIconDOM = (<span className="glyphicon glyphicon-sort-by-alphabet"></span>);
        let addButton = (this.props.panelOpen === false) ?  addBtnDOM : null;

        return (
            <div className="ref-panel-wrapper">
                <button type="button" class="ref-menu-btn btn btn-default" aria-label="Left Align">
                    {this.state.isSortOrder ? sortOrderIconDOM : sortOrderAltIconDOM}
                </button>
                <div className="ref-bic-input ref-input">
                    <input type="text" name="bic" required placeholder={"БИК"}/>
                </div>
                <button type="button" class="ref-menu-btn btn btn-default" aria-label="Left Align">
                    {this.state.isSortByAlph ? sortByAlphIconDOM : sortByAlphAltIconDOM}
                </button>
                <div className="ref-name-input ref-input">
                    <input type="text" name="name" required placeholder={"Название"}/>
                </div>
                <button type="button" class="ref-menu-btn btn btn-default" aria-label="Left Align"
                    onClick={this.onClickResize}>
                    {this.state.isSizeFull ? sizeShortIconDom : sizeFullIconDOM}
                </button>
                {addButton}
            </div>
        )
    }
}

export default RefPanel