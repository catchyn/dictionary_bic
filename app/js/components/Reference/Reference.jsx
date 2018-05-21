import React, {Component} from 'react'
import RefAdd from './RefAdd.jsx'
import RefPanel from './RefPanel.jsx'
import RefListRow from './RefListRow.jsx'

class Reference extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            addPanelOpen: false,
            rowFullView: false,
            isCloseRowElem: false,
            items: [],
            sort: {
                type: undefined,
                order: undefined
            },
            filter: {
                filterBIC: {
                    type: undefined,
                    text: undefined
                },
                filterName: {
                    type: undefined,
                    text: undefined
                }
            }
        };

        this.getData = (obj) => {
            const url = "http://localhost:3000/bankref";
            var path = "";

            if (this.state.sort && this.state.sort.order) {
                // Sort
                path = `_sort=${this.state.sort.type}&_order=${this.state.sort.order}`;
            }

            if (this.state.filter.filterName.text || this.state.filter.filterBIC.text) {
                // Filter
                if (this.state.filter.filterBIC.text) {
                    path = (path !== "") ? (path + "&") : path;
                    path = path + `${this.state.filter.filterBIC.type}_like=^${this.state.filter.filterBIC.text}`;
                    if (this.state.filter.filterName.text) {
                        path = path + "&";
                    }
                }
                if (this.state.filter.filterName.text) {
                    path = path + `${this.state.filter.filterName.type}_like=^${this.state.filter.filterName.text}`;
                }
            }

            path = (path !== '') ? '?' + path : '';

            fetch(url + path, {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        this.setState({
                            items: result
                        });
                    },
                    (error) => {
                        this.setState({
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
                        this.getData(this.state.sort);
                    },
                    (error) => {
                        alert('Не удалось удалить элемент списка!');
                        this.setState({
                            error
                        });
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
                this.getData(this.state.sort);
            })();
        };

        this.onAddOpenChange = () => {
            this.setState((prevState, props) => ({addPanelOpen: !prevState.addPanelOpen}));
        };

        this.onClickResize = () => {
            this.setState((prevState, props) => ({rowFullView: !prevState.rowFullView}));
        };

        this.closeAllRowElements = () => {
            this.setState((prevState, props) => ({isCloseRowElem: true}));
        };

        this.openRowElem = () => {
            this.setState((prevState, props) => ({isCloseRowElem: false}));
        };

        this.onFilter = (obj) => {
            const filter = Object.assign({}, obj);
            let newFilter = this.state.filter;
            if (obj.type === "bic") {
                newFilter.filterBIC = filter;
                this.setState({filter: newFilter}, function() {
                    this.getData();
                });
            } else {
                newFilter.filterName = filter;
                this.setState({filter: newFilter}, function() {
                    this.getData();
                });
            }

            this.closeAllRowElements();
        };

        this.onSort = (obj) => {
            let sort = Object.assign({}, obj);
            this.setState({sort: sort}, function() {
                this.getData();
            });
            this.closeAllRowElements();
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
                            <div className="ref-body">
                                <RefPanel onOpenChange={this.onAddOpenChange} panelOpen={this.state.addPanelOpen}
                                          onClickResize={this.onClickResize} onSort={this.onSort}
                                          onFilter={this.onFilter}/>
                                {refAdd}
                                <RefListRow listItems={this.state.items} editData={this.setData}
                                            onDeleteRow={this.deleteData} rowFullView={this.state.rowFullView}
                                            isCloseRowElem={this.state.isCloseRowElem} openRowElem={this.openRowElem}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reference

