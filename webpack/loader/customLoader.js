// js-loader

module.exports = function(source) { 
    // console.log(source);
    source = source.replace('test', 'newTest')
    let script = `
    export default {
        
    }`
    return source;
}