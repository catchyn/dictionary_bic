import React, {Component} from 'react';
import RefAdd from './RefAdd.jsx';

class RefRow extends Component {
    constructor(props){
        super(props);

        this.state = {
            isOpen: false,
            isOpenBtn: false,
            isEdit: false
        };

        this.clickEdit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.onAddOpenChange();
        };

        this.clickDelete = (e) => {
            e.stopPropagation();
            e.preventDefault();
            this.props.onDeleteRow(this.props.item)
        };

        this.onOpenBtn = (e) => {
            e.stopPropagation();
            e.preventDefault();
            if (e.target.type !== "button") {
                this.setState((prevState, props) => ({
                    isOpenBtn: !prevState.isOpenBtn
                }));
                this.props.onOpenRowBtn(this.state.isOpenBtn);
            }
        };

        this.onAddOpenChange = () => {
            this.setState((prevState, props) => ({
                isEdit: !prevState.isEdit
            }));
        };
    }

    render() {
        let bankInfo = this.props.item;


        let btnPanelDOM = (
            <div className="row" onClick={this.onOpenBtn}>
                <div className="col-md-6">
                    <div className="ref-btn-panel btn-group">
                        <input className={"btn btn-primary"} onClick={this.clickEdit}
                               type="button" value="Редактировать"/>
                        <input className={"btn btn-danger"} onClick={this.clickDelete}
                               type="button" value="Удалить"/>
                    </div>
                </div>
            </div>
        );

        let f = () => this.state.isOpenBtn ? btnPanelDOM : null;
        let btnPanel = f();

        let editRowDOM = (
            <RefAdd listItems={this.props.listItems} onOpenChange={this.onAddOpenChange}
                    onAddItem={this.props.editData} item={bankInfo}/>
        );

        let additRowDOM = (
            <div className="ref-row-text vertical-flex">
                <blockquote>
                    <div className="corAccount">{bankInfo.corAccount}</div>
                    <div className="address">{bankInfo.address}</div>
                </blockquote>
            </div>
        );

        let rowFullView = this.props.rowFullView ? additRowDOM : null;

        let rowDOM = (
            <div className={`ref-row ${this.props.classLast} ${this.props.classFirst}`}  onClick={this.onOpenBtn}>
                <div key={bankInfo.id} className="row">
                    <div className="col-md-12">
                        <div className={`ref-row-text`}>
                            <div className="bic">{bankInfo.bic}</div>
                            <div className="name">{bankInfo.name}</div>
                        </div>
                        {rowFullView}
                    </div>
                </div>
                {btnPanel}
            </div>
        );

        if (this.state.isEdit === false ) {
            return rowDOM
        } else {
            return editRowDOM
        }

    }
}

export default RefRow