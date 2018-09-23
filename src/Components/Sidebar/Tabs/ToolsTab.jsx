import React from 'react';
import Tool from '../../Controllers/Tool';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../store/mapToProps/mapToProps_ToolsTab';
import { downloadFile, saveResultsToCSV, handleFilesSelect } from '../../../tools/fileManagers';
import PropTypes from 'prop-types';

class ToolsTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            message: ''
        }
    }


    componentWillMount() {
        this.fileAPICheck();
    }
    
    fileAPICheck() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            console.log('File APIs fully supported in this browser!');
            this.setState({
                message: '',
                error: '',
            });
        } else {
            console.log('Attention: The File APIs are not fully supported in this browser.');
            this.setState({
                error: 'The File APIs are not fully supported in this browser.Something went wrong',
                message: ''
            });
        }
    }

    handleFilesSelect(e){
        handleFilesSelect(this,e, 'message',this.props.applyLoadedStateQueryToStore);
    }

    saveQuery() {
        let fullState = this.props.storeAllState;
        const fileContent = this.prepareStateForExport(fullState);
        if(fileContent){
            downloadFile({
                content: fileContent,
                extension: 'bab',
                filename: `baboon_query${+new Date()}.bab`
            });
        }
        // console.log(fileContent);
    }

     prepareStateForExport(object) {
        let fullState = Object.assign({},object);
        if (fullState) {
            // delete fullState.config;
            delete fullState.greeting;
            delete fullState.isDBConnected;
            delete fullState.DBcollections;
            delete fullState.connectionMessage;
            delete fullState.db;
            delete fullState.mongo_results;
            delete fullState.user;
            return JSON.stringify(fullState);
        }
    };

    saveResults(){
        saveResultsToCSV(this.props.storeQueryResults);
    }

    render() {
        return (
            <div>
                <div>
                    <h6 className='error'> {this.state.error} </h6>
                    <h6> {this.state.message} </h6>
                </div>
                <div className='featureContainer'>
                    <ul id='toolListUploadDownload'>
                        <li className='toolListItem'>
                            <Tool
                                toolType='simple'
                                buttonIcon='file-export'
                                toolId='CSVExporter'
                                description='Export results to CSV'
                                click={this.saveResults.bind(this)}
                                toolContainerID=''
                            />
                        </li>
                        <li className='toolListItem'>
                            <Tool
                                toolType='simple'
                                buttonIcon='save'
                                toolId='QuerySaver'
                                description='Save query to file'
                                click={this.saveQuery.bind(this)}
                                toolContainerID=''
                            />
                        </li>
                        <li className='toolListItem'>
                            <Tool
                                toolType='inputFile'
                                buttonIcon='file-upload'
                                toolId='QueryLoader'
                                description='Load query from file'
                                inputID='Queryfile'
                                change={this.handleFilesSelect.bind(this)}
                                uploadedFiles={this.state.uploadedFiles}
                                toolContainerID='uploadedQueryContainer'
                                classTool='uploadedFilesContainer'
                            />
                        </li>
                        <li className='toolListItem'>
                            <Tool
                                toolType='simple'
                                buttonIcon='history'
                                toolId='QueryHistory'
                                description='Browse query history (this session only)'
                                click={this.QueryHistory.bind(this)}
                                toolContainerID='queryHistoryContainer'
                            />
                        </li>
                    </ul><br />
                    <ul id='toolListMixed'>
                        <li className='toolListItem'>
                        <Tool
                            buttonIcon='toolbox'
                            toolId='EditConfig'
                            description='Edit config.json'
                            click={this.EditConfig.bind(this)}
                            toolContainerID='configJsonContainer'
                        />
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    QueryHistory() {
        console.log('QueryHistory');
    }

    EditConfig() {
        console.log('EditConfig');
    }

}

ToolsTab.propTypes={
    storeAllState: PropTypes.object,
    storeQueryResults: PropTypes.array,
    applyLoadedStateQueryToStore: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToolsTab);
