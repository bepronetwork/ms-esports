import Mocha from 'mocha';
import delay from 'delay';

var mocha = new Mocha({});

const runTests = async () => {
    mocha.addFile('./test/socket/bet')
    .timeout(1000*60*1000)
    .run()
    .on('fail', function(test, err) {
        console.log(err);
        console.log('Test fail');
        throw new Error("ERROR IN TEST")
    })
    .on('end', async () =>  {
        console.log("All tests done with Succeess")
        process.exit(0)
    });
};


const test = async () => {
    require('../src/app.js');
    await delay(40000);
    await runTests();
}
test();