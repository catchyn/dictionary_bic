import React, {Component} from 'react';

class RefPanel extends Component {
    constructor(props){
        super(props);

        this.clickAdd = (e) => {
            this.props.onOpenChange(e.target.value)
        };
    }

    render() {
        let addButton = null;
        if (this.props.panelOpen === false) {
            addButton = <div className="ref-btn-panel btn-group">
                            <input className={"btn btn-success"} onClick={this.clickAdd}
                                   type="button" value="Добавить"/>
                        </div>
        }

        return (
            <div className="row">
                <div className="col-md-10">

                </div>
                <div className="col-md-2">
                    {addButton}
                </div>
            </div>
        )
    }
}

export default RefPanel