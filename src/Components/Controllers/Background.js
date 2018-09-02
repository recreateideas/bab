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
            fontSize:14,
            displayMinified: 'hidden',
            displayPretty: 'show',
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
    toggleMinified(){
        this.state.displayPretty === 'show' ? this.setState({displayPretty: 'hidden',displayMinified: 'show'}) : this.setState({displayPretty: 'show',displayMinified: 'hidden'})
    }

    formatUglyJSON(json){
        if(json){
            let html = JSON.stringify(json);
            html = html.replace(/("|{"|,")([\d\w]+)(":)/gm,`$1<span class='json-key'>$2</span>$3`);
            html = html.replace(/(:"|\[")([\d\w]+)(")/gm,`$1<span class='json-string'>$2</span>$3`);
            html = html.replace(/(\[")([\d\w]+)(",|"\]|",")/gm,`$1<span class='json-string'>$2</span>$3`);
            html = html.replace(/(,")([\d\w]+)(",|"])/gm,`$1<span class='json-string'>$2</span>$3`);
            html = html.replace(/(,|:\[|:{|:)(\d+)/gm,`$1<span class='json-value'>$2</span>`);
            return html;
        }
        else return '';
    }

    render() {
        let resultClass,displayMinified,displayPretty;
        // console.log(this.props.storeResults);
        if (this.props.storeResults) {
            resultClass = Object.keys(this.props.storeResults).length === 0 ? 'hidden' : 'show';
        }
        else resultClass = 'hidden';
        // console.log(window.location.pathname);
        return (
            <div>
                <JSONPretty ref={this.json} id='mongo_results' space={2} style={{fontSize:`${this.state.fontSize}px`}}json={this.props.storeResults} className={`${resultClass} ${this.state.displayPretty}`}></JSONPretty>
                <div id='minifiedContainer' className={this.state.displayMinified}><p style={{fontSize:`${this.state.fontSize}px`}} dangerouslySetInnerHTML={{ __html: this.formatUglyJSON(this.props.storeResults)}}/></div>
                < div className='headerTitle'>
                    <img src={require('../../images/baboon_white_monkey.png')} alt='logo' className='baboonLogo' />
                    {/* <img src={require('../../images/slideright_label.png')} alt='logo' className='baboonLogo' />v */}
                </div>
                <RightSlideOut
                    increaseFont={this.increaseFont.bind(this)}
                    decreaseFont={this.decreaseFont.bind(this)}
                    fontSize={this.state.fontSize}
                    toggleMinified={this.toggleMinified.bind(this)}
                />
            </div>
        )
    }
}

Background.propTypes = {
    storeResults: PropTypes.array
};


export default connect(mapStateToProps)(Background);
