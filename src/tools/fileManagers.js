import OBJtoCSVConverter from './OBJtoCSVConverter';
import * as r from 'jsrsasign';
// require('jsrsasign')[RSAKey];
// var r = require('jsrsasign-util');

const downloadFile = args => {
    var data, filename, link;
    var content = args.content;
    if (content == null) return;
    // var file = new Blob([csv],{
    //     type: csv
    // });
    // if (window.navigator.msSaveOrOpenBlob) // IE10+
    //     window.navigator.msSaveOrOpenBlob(file, fileName);
    filename = args.filename || `baboon_exports${+new Date()}.${args.extension}`;

    if (/csv/i.test(args.extension)) {
        content = 'data:text/csv;charset=utf-8,' + content;
    }
    else if (/txt/i.test(args.extension)) {
        content = 'data:text;charset=utf-8,' + content;
    }
    else {
        content = 'data:text;charset=utf-8,' + content;
    }
    data = encodeURI(content);
    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
},

    validateFile = (file, { maxSize, excludeFormat }) => {
        let validationPassed = false;
        const excluded = new RegExp(excludeFormat);
        const fileSize = file.size * 0.001;
        if (fileSize <= maxSize && !excluded.test(file.type)) {
            validationPassed = true;
        }
        return validationPassed;
    },

    validateContent = (content, format) => {
        switch (format) {
            case 'sshKey':
                var rsa = new r.RSAKey();
                try {
                    rsa.readPrivateKeyFromPEMString(content);
                    return true;
                } catch (err) {
                    return false;
                }
            default: break;
        }
    },

    saveResultsToCSV = QueryResults => {
        let fileContent = OBJtoCSVConverter(QueryResults);
        console.log(fileContent);
        downloadFile({
            content: fileContent,
            extension: 'csv',
            filename: `baboon_results${+new Date()}.csv`
        });
    },

    testFileExtension = fileName => {
        var matches = fileName && fileName.match(/\.([^.]+)$/);
        if (/\.bab/.test(matches)) {
            return true;
        }
        return false;
    },

    handleFilesSelect = (component, e, resultText, saveToState, callback, type) => {
        const files = e.target.files; // FileList object
        [...files].forEach(file => {
            const reader = new FileReader();
            reader.onload = async () => {
                if (testFileExtension(file.name)) {
                    let text = reader.result;
                    let newState = JSON.parse(text);
                    console.log(newState);
                    saveFileToState(component, resultText, file, type);
                    callback(newState);
                }
                else {
                    if(saveToState!== 'false'){
                        component.setState({
                            [resultText]: '',
                            error: 'File format error: the file has to be a baboon query file [*.bab]',
                        });
                    }
                }
            };
            reader.readAsText(file);
        });
        e.target.value = '';
    },

    saveFileToState = (component, resultText, file, type) => {
        let output = [];
        console.log(file);
        output.push({
            name: file.name,
            size: Math.round(file.size * 0.001),
            type: file.type === '' || /\.bab$/.test(file.name) ? 'baboon.query.file' : 'n/a', // or json
            lastModified: file.lastModifiedDate ? file.lastModifiedDate.toLocaleDateString() : file.lastModified ? file.lastModified : 'n/a'
        })
        if(type && type === 'message'){
            component.setState({ message: { ...component.state.message, attachment: output} });
        } else {
            component.setState({
                [resultText]: '',
                error: '',
                uploadedFiles: output
            })
        }
    };

export { downloadFile, saveResultsToCSV, testFileExtension, validateFile, validateContent, handleFilesSelect, saveFileToState };
