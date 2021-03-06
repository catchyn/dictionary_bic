import React, {Component} from 'react';
import RefRow from './RefRow.jsx'

class RefListRow extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const listItems = this.props.listItems.map((item, i) => {
            return (
                <RefRow item={item}
                    classLast={i === this.props.listItems.length - 1 ? 'last-row' : ''}
                    classFirst={i === 0 ? 'first-row' : ''} listItems={this.props.listItems}
                    editData={this.props.editData} onDeleteRow={this.props.onDeleteRow}
                    onOpenRowBtn={this.openRowButton} rowFullView={this.props.rowFullView}
                    isCloseRowElem={this.props.isCloseRowElem} openRowElem={this.props.openRowElem}/>
            )
        });

        return (
            <div className="ref-rowList-wrapper">
                <div className="ref-rowList-scroll">
                    <div className="ref-row-wrapper">
                        {listItems}
                    </div>
                </div>
            </div>
        )
    }
}

export default RefListRow