/**
 * 在写的过程中免不了在我们本地进行测试，因为本身项目为node的工具，我们可以在项目目录下执行 node bin/react-cli运行。
 * 当然在发布以后肯定不能使用该命令，
 *  此时在发布前，添加package.json中的bin对象，key为脚本执行的名字，value为执行目录，如"bin": {"build-react": "bin/react-cli"}  ，
 *  即可在输入build-react的时候等同于执行 node bin/react-cli命令，在我们全局安装脚手架的时候，bin对象里面的内容即可变成全局可执行命令。
 * 发布npm包，npm包发布非常简单，注册npm账号后本地登录即可，
 *  在项目目录下执行npm publish即可发布，注意包名不能与现有的npm里的相同、
 *  每次发布新版本的包时需要修改package.json里的版本号，发布的包只有在24小时内可以删除。
 */
const {prompt} = require('inquirer')
const program = require('commander')
const chalk = require('chalk')
const download = require('download-git-repo')
const ora = require('ora')
const fs = require('fs')
const path = require('path')

//program.parse(process.argv) 可以解析执行init 时候传入的参数， 我们可以拿到这个参数做为项目创建的目录名，如果没有传入该参数则为其设置一个默认目录名称
const option =  program.parse(process.argv).args[0] 
const defaultName = typeof option === 'string' ? option : 'react-project'
const tplList = require(`${__dirname}/../templates`)
const tplLists = Object.keys(tplList) || [];

/**
 * question 交互命令配置，数组中每一个对象都对应一个执行命令时候的一个问题
 * type 为该提问的类型，name为该问题的名字，可以在后面通过name拿到该问题的用户输入答案
 * message 为问题的提示
 * default 则为用户没输入时的默认为其提供一个答案
 * validate 方法可以校验用户输入的内容，返回true时校验通过，若不正确可以返回对应的字符串提示文案
 * transformer 为用户输入问题答案后将对应的答案展示到问题位置，需要有返回值，返回到字
 * 具体使用文档 https://github.com/SBoudrias/Inquirer.js
 */
const question = [
  {
    type: 'input',
    name: 'name',
    message: 'Project name',
    default: defaultName,
    filter(val) {
      return val.trim()
    },
    validate(val) {
      const validate = (val.trim().split(" ")).length === 1
      return validate || 'Project name is not allowed to have spaces ';
    },
    transformer(val) {
      return val;
    }
  }, {
    type: 'list',
    name: 'template',
    message: 'Project template',
    choices: tplLists,
    default: tplLists[0],
    validate(val) {
      return true;
    },
    transformer(val) {
      return val;
    }
  }, {
    type: 'input',
    name: 'description',
    message: 'Project description',
    default: 'React project',
    validate (val) {
      return true;
    },
    transformer(val) {
      return val;
    }
  }, {
    type: 'input',
    name: 'author',
    message: 'Author',
    default: 'project author',
    validate (val) {
      return true;
    },
    transformer(val) {
      return val;
    }
  }
]

/**
 * prompt 方法中then里的参数是一个对象，可以由此拿到问题由name定义的用户输入内容。
 * 根据用户输入的内容，可以对应为其生成下载模版，这里使用download-git-repo工具来下载git仓库代码
 * download 方法第一个参数为要下载代码仓库位置，如果为GitHub代码仓库只需要写用户名和项目名称即可，
 *  如'Hzy0913/react-template'即为下载该仓库master的代码，如果需要切换对应分支则在仓库地址后面加入对应分支名，如'Hzy0913/react-template#complete'。
 * download 方法第二个参数为生成下载文件的文件名，
 *  我将他保存在命令执行目录下，文件名使用用户输入的名字，如参数为'./projectName'，即可在当前执行命令目录下生成对应的文件名。
 * ora 模块可以为我们生成下载时候的旋转图标，
 *  ora方法传入的第一个参数为等待时候的提示文案并生成实例，在实例对象上调用start()方法开始出现旋转动画和提示，stop()方法停止。
 * 模版下载好以后需要为package.json文件生成用户自定义输入的内容，node的fs模块的readFile方法可以帮助我们获取生成文件的内容，writeFile则可以写入内容
 * 最后完成后可以在命令行面板上使用console方法给出一些提示内容，chalk 模块可以帮助我们美化输出内容。
 */
module.exports = prompt(question).then(({name, template, description, author}) => {
  const projectName = name;
  const templateName = template;
  const gitPlace = tplList[templateName]['place'];
  const gitBranch = tplList[templateName]['branch'];
  const spinner = ora('Downloading please wait...');
  spinner.start();
  download(`${gitPlace}${gitBranch}`, `./${projectName}`, (err) => {
    if (err) {
      console.log(chalk.red(err))
      process.exit()
    }
    fs.readFile(`./${projectName}/package.json`, 'utf8', function (err, data) {
      if(err) {
        spinner.stop();
        console.error(err);
        return;
      }
      const packageJson = JSON.parse(data);
      packageJson.name = name;
      packageJson.description = description;
      packageJson.author = author;
      var updatePackageJson = JSON.stringify(packageJson, null, 2);
      fs.writeFile(`./${projectName}/package.json`, updatePackageJson, 'utf8', function (err) {
        if(err) {
          spinner.stop();
          console.error(err);
          return;
        } else {
          spinner.stop();
          console.log(chalk.green('project init successfully!'))
          console.log(`
            ${chalk.bgWhite.black('   Run Application  ')}
            ${chalk.yellow(`cd ${name}`)}
            ${chalk.yellow('npm install')}
            ${chalk.yellow('npm start')}
          `);
        }
      });
    });
  })
})