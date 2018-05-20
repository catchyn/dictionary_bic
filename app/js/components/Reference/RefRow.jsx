import React, {Component} from 'react';

class RefRow extends Component {
    constructor(props){
        super(props);

        this.state = {
            isOpen: true
        };
    }

    render() {
        const bankInfo = this.props.data;
        return (
            <div key={bankInfo.id} className="row">
                <div className="col-md-12">
                    <div className={`ref-row ${this.props.classLast} ${this.props.classFirst}`}>
                        {bankInfo.name}  {bankInfo.bic}
                    </div>
                </div>
            </div>
        )
    }
}

export default RefRow