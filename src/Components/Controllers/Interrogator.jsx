import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../store/mapToProps/mapToProps_Interrogator';
import { Button } from '../BasicComponents';
import axios from 'axios';
import PropTypes from 'prop-types';
import { fetchResults } from '../../tools/DBClientUtils/DBClientUtils';
const FontAwesome = require('react-fontawesome');



class Interrogator extends React.Component {

    async runQuery(){
        await fetchResults(this);
    }

    render() {
        return (
            <div id='interrogator'>
                <Button
                    click={this.runQuery.bind(this)}
                    buttonId='interrogator_button'
                    value={<FontAwesome name='search' size='2x' /*spin*/ style={{ textShadow: '0 1px 0 rgba(255, 255, 255, 0.7)', color: '#396f8e' }} />}
                />
                <div id='querybox_placeholder' />
            </div>
        )
    }

}

Interrogator.propTypes = {
    storeDB: PropTypes.string,
    storeMongoObject: PropTypes.string,
    storeCollection: PropTypes.string,
    storeQueryType: PropTypes.string,
    storeDBConnected: PropTypes.bool,
    storeQueryParams: PropTypes.object,
    setResultsToStore: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interrogator);
