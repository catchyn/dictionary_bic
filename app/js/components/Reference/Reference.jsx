import React, {Component} from 'react'
import RefAdd from './RefAdd.jsx'
import RefPanel from './RefPanel.jsx'
import RefListRow from './RefListRow.jsx'

class Reference extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            addPanelOpen: false,
            rowFullView: false,
            items: []
        };

        this.getData = () => {
            fetch("http://localhost:3000/bankref", {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        this.setState({
                            isLoaded: true,
                            items: result
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        };

        this.deleteData = (obj) => {
            if (obj.id === undefined) {
                return;
            }
            fetch(`http://localhost:3000/bankref/${obj.id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        this.getData();
                    },
                    (error) => {
                        alert('Не удалось удалить элемент списка!')
                    }
                )
        };

        this.setData = (obj) => {
            var url = "http://localhost:3000/bankref/";
            var method = 'POST';
            if (obj.id) {
                url += obj.id;
                method = 'PUT';
            }
            (async () => {
                const rawResponse = await fetch(url, {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                });
                const content = await rawResponse.json();
                this.getData();
            })();
        };

        this.onAddOpenChange = () => {
            this.setState((prevState, props) => ({addPanelOpen: !prevState.addPanelOpen}));
        };

        this.onClickResize = () => {
            this.setState((prevState, props) => ({rowFullView: !prevState.rowFullView}));
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {

        let refAdd = null;
        if (this.state.addPanelOpen === true) {
            refAdd = <RefAdd listItems={this.state.items} onOpenChange={this.onAddOpenChange}
                onAddItem={this.setData}/>
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="reference-wrapper">
                            <h2>Справочник банков</h2>
                            <RefPanel onOpenChange={this.onAddOpenChange} panelOpen={this.state.addPanelOpen}
                                      onClickResize={this.onClickResize}/>
                            {refAdd}
                            <RefListRow listItems={this.state.items} editData={this.setData}
                                        onDeleteRow={this.deleteData} rowFullView={this.state.rowFullView}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reference

