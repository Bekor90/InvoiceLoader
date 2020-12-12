const fs = require('fs');
const readline = require('readline');
const path = require("path");
const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

const saveDataFile = (data) => {
    try{
        const publicPath = path.resolve(__dirname, "../files");
        let logger = fs.createWriteStream(`${ publicPath }/invoice.txt`, {
            flags: 'a' // 'a' means appending
        })
        logger.write(data) // append string to your file
        return true;
    }catch (error) {
        logger.info('error save data in file invoice.txt');
        console.log('error save data');
        console.log(err);
        return false;
      }
}

const overwriteDataFile = (data) => {
    try{
        const publicPath = path.resolve(__dirname, "../files");
        let logger = fs.createWriteStream(`${ publicPath }/invoice.txt`);
        logger.write(data) // append string to your file
        return true;
    }catch (error) {
        logger.info('error overwrite data in file invoice.txt');
        console.log('error overwrite data');
        console.log(err);
        return false;
      }
}

const readDataFile = () => {
    try{
        const publicPath = path.resolve(__dirname, "../files/invoice.txt");
        /*let data = readline.createInterface({ 
             input: fs.createReadStream(`${ publicPath }/invoice.txt`)
            });*/
       // let data = 
        return fs.readFileSync(publicPath).toString().split(",");
    }catch (error) {
        logger.info('error read data in file invoice.txt');
        console.log('error read data');
        console.log(err);
        return false;
      }
}

module.exports = {
    saveDataFile,
    overwriteDataFile,
    readDataFile
}