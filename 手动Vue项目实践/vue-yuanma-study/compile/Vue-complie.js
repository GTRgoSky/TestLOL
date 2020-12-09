const compiler = require('vue-template-compiler')

const result = compiler.compile(`
  <div id="test">
    <div>
      <p>This is my vue render test</p>
    </div>
    <p>my name is {{myName}}</p>
  </div>`
)

console.log(result)
var a = new Function(result.render);
console.log(a)