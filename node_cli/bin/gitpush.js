#! /usr/bin/env node

//Git推送脚本

const util = require('util');
const exec = util.promisify(require('child_process').exec);
// const execSync = require('child_process').execSync;

// try {
//     const str1 = execSync('git status', {encoding: 'utf8'});
//     const re = str1.match(/^On branch (.+)\s/);
//     console.log('你现在所在分支：' + re[1] + '\n');
//     execSync('git add *', {encoding: 'utf8'});
//     const str2 = execSync('git commit ' + '-m '+ process.argv[2], {encoding: 'utf8'});
//     console.log(str2);
//     const str3 = execSync('git push', {encoding: 'utf8'});
//     // const str3 = execSync('git pull origin ' + re[1], {encoding: 'utf8'});
// } catch (err) {
//     console.log('execute error：');
//     console.log(err.toString());
// }

async function pushGit() {
    console.log('start-inner')
    const { stdout:str1, stderr:stderr1 } = await exec('git status', {encoding: 'utf8'});
    console.log(str1)
    if(stderr1) console.log("stderr1:",stderr1);
    const re = str1.match(/^On branch (.+)\s/);
    console.log('你现在所在分支：' + re[1] + '\n');
    await exec('git add *', {encoding: 'utf8'});
    const { stdout:str2, stderr:stderr2 } = await exec('git commit ' + '-m '+ process.argv[2], {encoding: 'utf8'});
    console.log(str2);
    if(stderr2) console.log("stderr2:",stderr1);
    await exec('git push', {encoding: 'utf8'});
    console.log('end-inner')
}

console.log('start fun')
pushGit();
console.log('end fun')