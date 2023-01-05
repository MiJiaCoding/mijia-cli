const chalk = require('chalk');
module.exports = async (name) => {
    console.log(chalk.blue(`感谢你的使用`), chalk.white.bgYellow.bold(`${name}`));
    console.log(chalk.yellow(`米迦的github:https://github.com/MiJiaCoding`));
    console.log(chalk.red(`凡心所向，素履所往，生如逆旅，一苇以航`));
}