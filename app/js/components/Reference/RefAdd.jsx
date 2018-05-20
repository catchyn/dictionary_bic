import React, {Component} from 'react';

class RefAdd extends Component {
    constructor(props){
        super(props);

        this.clickCancel = (e) => {
            this.props.onOpenChange(e.target.value)
        };

        this.handleSubmit = (e) => {
            this.props.onAddItem(this.newItemObj)
        };

        

        this.newItemObj = {};
    }

    render() {
        return (
            <div className={`ref-add-wrapper ${this.props.listItems.length === 0 ? 'alone' : ''}`}>
               <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="ref-input name">
                                <input type="text" value={this.newItemObj.name} placeholder={"Наименование Банка"}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ref-input bic">
                                <input type="text" value={this.newItemObj.bic} placeholder={"БИК"}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="ref-input address">
                                <input type="text" value={this.newItemObj.address} placeholder={"Адрес"}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ref-input corAccount">
                                <input type="text" value={this.newItemObj.corAccount} placeholder={"Кор. счет"}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="ref-btn-panel btn-group">
                                <input className={"btn btn-success"} type="submit" value="Выполнить"/>
                                <input className={"btn btn-primary"} onClick={this.clickCancel}
                                       type="button" value="Отмена"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default RefAdd