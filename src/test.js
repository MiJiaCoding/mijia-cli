// 文件未被使用，仅用于测试库
const { program } = require("commander")
const chalk = require('chalk')
const inquirer = require('inquirer')
const ora = require('ora')
const figlet = require('figlet');



//------------ inquirer -----------

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'input',
        name: 'xinqing',
        message: "米迦同学，今天心情怎么样啊？",
        default: '一般'
    },
    {
        type: 'confirm',
        name: 'study',
        message: "今天要不要努力学习呢？",
        default: true
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    console.log(answers)
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

// ----------- figlet --------------

figlet('Hello World!!', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

figlet.text('Boo!', {
    font: 'Ghost',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});


//---------- ora -------------

// const spinner = ora('下载中...').start();

// setTimeout(() => {
// 	spinner.color = 'yellow';
// 	spinner.text = '网络较慢,请稍等。';
// }, 2000);


// setTimeout(() => {
// 	// spinner.succeed('下载成功！')
// 	spinner.fail('下载失败!')

// }, 4000);






// ----------- chalk -------------

// console.log(chalk.bold("老师好 我是米迦同学"))
// console.log(chalk.red("老师好 我是米迦同学"))
// console.log(chalk.yellow.bold.bgBlue("老师好 我是米迦同学"))


//------------ commander ------------

// // console.log(process.argv)
// program.name('mijia-cli').usage('<command> [option]')

// program.option('-v,--version')

// program
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza');

//   program
//   .command('clone <source> [destination]')
//   .description('clone a repository into a newly created directory')
//   .action((source, destination) => {
//     // console.log('clone command called');
//     console.log(source,destination)
//   });



// program.parse(process.argv)

// // const options = program.opts();
// // console.log(options);


// // console.log("我是mijia")
