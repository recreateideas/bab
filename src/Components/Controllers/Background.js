import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/mapToProps/mapToProps_Background';
import RightSlideOut from './RightSlideOut';
import JSONPretty from 'react-json-pretty';
import PropTypes from 'prop-types';

class Background extends React.Component {

    render() {
        let resultClass;
        // console.log(this.props.storeResults);
        if (this.props.storeResults) {
            resultClass = Object.keys(this.props.storeResults).length === 0 ? 'hidden' : 'show';
        }
        else resultClass = 'hidden';
        console.log(window.location.pathname);
        return (
            <div>
                <JSONPretty id='mongo_results' json={this.props.storeResults} className={resultClass}></JSONPretty>
                < div className='headerTitle'>
                    <img src={require('../../images/baboon_white_monkey.png')} alt='logo' className='baboonLogo' />
                    {/* <img src={require('../../images/slideright_label.png')} alt='logo' className='baboonLogo' />v */}
                </div>
                <RightSlideOut/>
            </div>
        )
    }
}

Background.propTypes = {
    storeResults: PropTypes.array
};


export default connect(mapStateToProps)(Background);
