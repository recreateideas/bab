import React from 'react';
//import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Background, ConnectTab, QueryTab } from './Components';
import printConsoleLogo from './graphicHelpers/PrintConsoleLogo';
// import QueryTab from './Components';
import { mapStateToProps, mapDispatchToProps } from './store/mapToProps/mapToProps_App';
import ToolsTab from './Components/Sidebar/Tabs/ToolsTab';
import SettingsTab from './Components/Sidebar/Tabs/SettingsTab';
import ReactTooltip from 'react-tooltip';

const FontAwesome = require('react-fontawesome');

class SlidePage extends React.Component {

    
    componentWillMount() {
        printConsoleLogo();
        const user = JSON.parse(localStorage.getItem('user'));
        if(user){
            console.log('welcome back chimp!');
            this.props.recordUserObjectToStore(user);
        }
    }
    

    displayConnectedBadge() {
        let classProp;
        const isConnected = this.props.storeDBConnected;
        classProp = isConnected === false ? 'zeroVisibility' : 'fullVisibility';
        return classProp;
    }

    render() {

        const connectOpacity = this.displayConnectedBadge();
        // console.log('APP -> render ');
        return (
            <div>
                <Background greeting={this.props.greeting} />
                
                <div id='toggleContainer' className='toggleContainer'>
                    <input type="checkbox" id="slide" name="" value="" defaultChecked={false} />
                    <div className="container mainContainer">
               
                        <div className="sidebar">
                        <label htmlFor="slide" className="toggle">
                            <FontAwesome name='bars' /*spin*/ />{/*☰*/}
                        </label>
                            <div id="tabs" className=''>
                                {/* replace this part with a fragment? */}
                                <input type="radio" name="tabs" id="toggle-tab1" defaultChecked={true} />
                                <div className='connectIndicatorWrapper'>
                                    <FontAwesome name='check-circle' size='2x' /*spin*/ className={`connectIndicator ${connectOpacity}`} />
                                </div>
                                <label id='connectorTab' htmlFor="toggle-tab1" data-tip data-for='tooltip_connectorTab'>
                                    <FontAwesome name='plug' size='2x' /*spin*/ className='connectPlug' style={{ textShadow: '0 1px 0 rgba(255, 255, 255, 0.7)' }} />
                                </label>
                                <ReactTooltip id='tooltip_connectorTab' type='error'>
                                        <span>Connection Centre</span>
                                </ReactTooltip>
                                <input type="radio" name="tabs" id="toggle-tab2" />
                                <label htmlFor="toggle-tab2" data-tip data-for='tooltip_queryTab'>
                                    <FontAwesome name='feather' size='2x' /*spin*/ style={{ textShadow: '0 1px 0 rgba(255, 255, 255, 0.7)' }} />
                                </label>
                                <ReactTooltip id='tooltip_queryTab' type='error'>
                                        <span>Query Jungle</span>
                                </ReactTooltip>
                                <input type="radio" name="tabs" id="toggle-tab3" />
                                <label htmlFor="toggle-tab3" data-tip data-for='tooltip_toolsTab'>
                                    <FontAwesome name='flask' size='2x' /*spin*/ style={{ textShadow: '0 1px 0 rgba(255, 255, 255, 0.7)' }} />
                                </label>
                                <ReactTooltip id='tooltip_toolsTab' type='error'>
                                        <span>Potions</span>
                                </ReactTooltip>
                                <input type="radio" name="tabs" id="toggle-tab4" />
                                <label htmlFor="toggle-tab4" data-tip data-for='tooltip_settingsTab'>
                                    <FontAwesome name='cogs' size='2x' /*spin*/ style={{ textShadow: '0 1px 0 rgba(255, 255, 255, 0.7)' }} />
                                </label>
                                <ReactTooltip id='tooltip_settingsTab' type='error'>
                                        <span>Settings</span>
                                </ReactTooltip>
                                <ConnectTab />
                                <QueryTab />

                                <div id="tab3" className="tab glass">
                                    <h4>Tools</h4>
                                    <ToolsTab />
                                </div>
                                <SettingsTab />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SlidePage);
