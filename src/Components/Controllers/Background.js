import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/mapToProps/mapToProps_Background';
import RightSlideOut from './RightSlideOut';
import JSONPretty from 'react-json-pretty';
import PropTypes from 'prop-types';


class Background extends React.Component {

    constructor(){
        super();
        this.state={
            fontSize:14
        }
    }

    increaseFont() {
        let fontSize = this.state.fontSize;
        if(fontSize<40)fontSize++;
        this.setState({fontSize});
    }

    decreaseFont() {
        let fontSize = this.state.fontSize;
        if(fontSize>8)fontSize--;
        this.setState({fontSize});
    }

    render() {
        let resultClass;
        // console.log(this.props.storeResults);
        if (this.props.storeResults) {
            resultClass = Object.keys(this.props.storeResults).length === 0 ? 'hidden' : 'show';
        }
        else resultClass = 'hidden';
        // console.log(window.location.pathname);
        return (
            <div>
                <JSONPretty ref={this.json} id='mongo_results' style={{fontSize:`${this.state.fontSize}px`}}json={this.props.storeResults} className={resultClass}></JSONPretty>
                < div className='headerTitle'>
                    <img src={require('../../images/baboon_white_monkey.png')} alt='logo' className='baboonLogo' />
                    {/* <img src={require('../../images/slideright_label.png')} alt='logo' className='baboonLogo' />v */}
                </div>
                <RightSlideOut
                    increaseFont={this.increaseFont.bind(this)}
                    decreaseFont={this.decreaseFont.bind(this)}
                    fontSize={this.state.fontSize}
                />
            </div>
        )
    }
}

Background.propTypes = {
    storeResults: PropTypes.array
};


export default connect(mapStateToProps)(Background);
