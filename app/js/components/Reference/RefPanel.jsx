import React, {Component} from 'react';

class RefPanel extends Component {
    constructor(props){
        super(props);

        this.state = {
            isSizeFull: false,
            isSortOrder: true,
            isSortByAlph: true
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

        this.onSortOrder = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (e.currentTarget.name === "orderBtn") {
                this.setState((prevState, props) => ({isSortOrder: !prevState.isSortOrder}));
                if (this.state.isSortOrder) {
                    this.props.onSort({type:"bic", order:"ASC"});
                } else {
                    this.props.onSort({type:"bic", order:"DESC"});
                }
            } else {
                this.setState((prevState, props) => ({isSortByAlph: !prevState.isSortByAlph}));
                if (this.state.isSortByAlph) {
                    this.props.onSort({type:"name", order:"ASC"});
                } else {
                    this.props.onSort({type:"name", order:"DESC"});
                }
            }
        };

        this.onChangeFilter = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.props.onFilter({type: e.target.name, text: e.target.value});
        }
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
                <button type="button" name="orderBtn" class="ref-menu-btn btn btn-default" aria-label="Left Align"
                    onClick={this.onSortOrder}>
                    {this.state.isSortOrder ? sortOrderIconDOM : sortOrderAltIconDOM}
                </button>
                <div className="ref-bic-input ref-input" onChange={this.onChangeFilter}>
                    <input type="text" name="bic" required placeholder={"БИК"}/>
                </div>
                <button type="button" name="byAlphBtn" class="ref-menu-btn btn btn-default" aria-label="Left Align"
                    onClick={this.onSortOrder}>
                    {this.state.isSortByAlph ? sortByAlphIconDOM : sortByAlphAltIconDOM}
                </button>
                <div className="ref-name-input ref-input" onChange={this.onChangeFilter}>
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