const program = require('commander');
const path = require('path');
const figlet = require('figlet');

const commandLists = [{
    name: 'create',
    type: '<ProjectName>',
    alias: 'c',
},
{
    name: 'welcome',
    type: '<YourName>',
    alias: 'w',
}
]
// 首行提示
// program.name('mijia-cli').usage('<command> [options]')
program.name('mijia').usage('<command> [options]')


program.version(`v${require('../package.json').version}`)

// help提示
program.on('--help',function(){
    console.log(figlet.textSync('MIJIA', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 100,
        whitespaceBreak: true
    }));
})

for (let item in commandLists) {
    let actions = require(path.resolve(__dirname, `./actions/${commandLists[item].name}`))
    program.command(commandLists[item].name)
        .argument(commandLists[item].type)
        .alias(commandLists[item].alias)
        .action(
            actions
        )
}

// 必须要执行解析的方法！
program.parse(process.argv)
