import React, {Component} from 'react';

class RefAdd extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: this.props.item && this.props.item.name,
            bic: this.props.item && this.props.item.bic,
            address: this.props.item && this.props.item.address,
            corAccount: this.props.item && this.props.item.corAccount
        };

        this.clickCancel = (e) => {
            this.props.onOpenChange(e.target.value)
        };

        this.inputNameChange = (e) => {
            this.setState({name: e.target.value});
            e.preventDefault();
        };

        this.inputBicChange = (e) => {
            this.setState({bic: e.target.value});
            e.preventDefault();
        };

        this.inputAddressChange = (e) => {
            this.setState({address: e.target.value});
            e.preventDefault();
        };

        this.inputCorAccountChange = (e) => {
            this.setState({corAccount: e.target.value});
            e.preventDefault();
        };

        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.props.onAddItem({
                id: this.props.item && this.props.item.id,
                name:this.state.name,
                bic:this.state.bic,
                address:this.state.address,
                corAccount:this.state.corAccount
            });
            this.props.onOpenChange();
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={`ref-add-wrapper ${this.props.listItems.length === 0 ? 'alone' : ''}`}>
               <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="ref-input name">
                                <input type="text" name="name" value={this.state.name} required
                                       onChange={this.inputNameChange} placeholder={"Наименование Банка"}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ref-input bic">
                                <input type="text" name="bic" value={this.state.bic} pattern={"[0-9]{9}"} required
                                       onChange={this.inputBicChange} placeholder={"БИК"}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="ref-input address">
                                <input type="text" name="address" value={this.state.address} required
                                       onChange={this.inputAddressChange} placeholder={"Адрес"}/>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="ref-input corAccount">
                                <input type="text" name="corAccount" value={this.state.corAccount} required
                                       onChange={this.inputCorAccountChange} placeholder={"Кор. счет"}/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="ref-btn-panel btn-group">
                                <input className={"btn btn-success"} type="submit" value={this.props.item ? 'Сохранить' : 'Добавить'}/>
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