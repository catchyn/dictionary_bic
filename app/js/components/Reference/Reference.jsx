import React, {Component} from 'react'
import RefRow from './RefRow.jsx'
import RefAdd from './RefAdd.jsx'
import RefPanel from './RefPanel.jsx'

class Reference extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            addPanelOpen: false,
            items: []
        };

        this.getData = () => {
            fetch("../db/db.json", {
                method: "GET"
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        this.setState({
                            isLoaded: true,
                            items: result.bankRef
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

        this.setData = (obj) => {
            (async () => {
                const rawResponse = await fetch('../db/db.json', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                });
                const content = await rawResponse.json();
                console.log(content);
            })();
        };

        this.onAddOpenChange = () => {
            this.setState((prevState, props) => ({
                addPanelOpen: !prevState.addPanelOpen
            }));
        };

        this.onAddItem = () => {

        }

    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const listItems = this.state.items.map((item, i) => {
            return (
                <RefRow data={item}
                         classLast={i === this.state.items.length - 1 ? 'last-row' : ''}
                         classFirst={i === 0 ? 'first-row' : ''}/>
            );
        });

        let refAdd = null;
        if (this.state.addPanelOpen === true) {
            refAdd = <RefAdd listItems={listItems} onOpenChange={this.onAddOpenChange}
                onAddItem={this.setData}/>
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="reference-wrapper">
                            <h2>Справочник банков</h2>
                            <div className="ref-panel-wrapper">
                            <RefPanel onOpenChange={this.onAddOpenChange} panelOpen={this.state.addPanelOpen}/>
                            </div>
                            {refAdd}
                            <div className="ref-row-wrapper">
                                {listItems}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Reference

