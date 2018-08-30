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
        const fileSize = file.size*0.001;
        if (fileSize <= maxSize && !excluded.test(file.type)){
            validationPassed = true;
        }
        return validationPassed;
    },

    validateContent = (content, format) => {
        switch(format){
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
    };

export { downloadFile, saveResultsToCSV, testFileExtension, validateFile, validateContent };
