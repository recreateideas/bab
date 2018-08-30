import React from 'react';
// import '../../css/App.css';
// import SelectInput from './BasicComponents/SelectInput';
// import TextInput from './BasicComponents/TextInput';
import { CheckBox, SelectInput } from '../BasicComponents';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps/mapToProps_Cursor';
import PropTypes from 'prop-types';

const FontAwesome = require('react-fontawesome');

class Cursor extends React.Component {

    appendCursors(e) {
        let cursor = e.target.id.split('_')[1];
        let activeCursors = this.props.storeQuery.cursors;
        const cursorsConfig = this.props.storeConfig.cursors;
        //const position = cursors.indexOf(cursor);
        e.target.checked ? activeCursors[cursor] = cursorsConfig[cursor] : delete activeCursors[cursor];
        // console.log(activeCursors);
        this.props.insertCursorInQueryToStore(activeCursors);
    }

    handleCursorFields(label) {
        // console.log(label);
        let activeCursors = this.props.storeQuery.cursors;
        if (activeCursors.hasOwnProperty(label) && activeCursors[label].value)
            return this.displayCursorFields(activeCursors, label);
        // console.log(activeCursors);
        //this.appendCursors(e.target);
    }

    recordCursorValue(e) {
        // console.log(e.target.value);
        const label = e.target.id.split('_')[1];
        let activeCursors = this.props.storeQuery.cursors;
        activeCursors[label].fieldValue = e.target.value;
        this.props.insertCursorInQueryToStore(activeCursors);
    }

    displayCursorFields(cursorObj, label) {
        const valueRange = this.props.storeConfig.selectValues[cursorObj[label].selectValues];
        let activeCursors = this.props.storeQuery.cursors;
        const select = activeCursors[label].fieldValue || valueRange[0];
        switch (cursorObj[label].valueType) {
            case 'select':
                return (
                    <div className='cursorSelect'>
                        <SelectInput
                            inputId={'cursor_' + label}
                            className={this.lineClass + ' inputSelect'}
                            change={this.recordCursorValue.bind(this)} /*this.props.changePipe*/
                            valueRange={valueRange}
                            value={select}
                        />
                    </div>
                )
            case 'text':
                return (<div></div>)
            case 'keyValuePair':
                return (<div></div>)
            default:
                return (<div></div>)
        }
    }

    renderCursors(cursor, label, index) {
        // console.log(cursor);
        return (
            <div className='flexItem' key={index}>
                <CheckBox
                    key={index}
                    label={'cursor_' + label}
                    inputId={'cursor_' + label}
                    change={this.appendCursors.bind(this)}
                    defaultChecked={false}
                    className={'querycheck'}
                />
                <div className='cursorText flexContainer'>
                    <p className='h7'>{cursor.cursorLeft}</p>

                    {this.handleCursorFields(label)}

                    <p className='h7'>{cursor.cursorRight}</p>
                </div>
            </div>
        )
    }

    render() {
        const cursors = this.props.storeConfig.cursors;
        // console.log('CURSOR: -> render');
        return (
            <div className='cursorWrapper stageWrapper'>
                <div className='cursorBadgeWrapper stageBadgeWrapper'>
                    <div id={`cursor`} className={`stageTitle cursorTitle`}><h4>Cursor</h4></div>
                    <FontAwesome name='paperclip' size='3x' /*spin*/ className={`stageIcon cursorIcon`} />
                </div>
                <div className='stage max-content appContent contentTable'>
                    <Grid className='cursorGridWrapper keysTable'>
                        <Row >
                            <Col xs={12} className='flexContainer'>
                                {Object.keys(cursors)
                                    .filter((cursor, index) => index < 3)
                                    .map((cursor, index) => this.renderCursors(cursors[cursor], cursor, index))}
                                {/*show all others..?*/}
                            </Col >
                        </Row>
                    </Grid>
                </div>
            </div>)
    }
}

Cursor.propTypes = {
    storeQuery: PropTypes.object,
    storeConfig: PropTypes.object,
    insertCursorInQueryToStore: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cursor);
