const { program } = require("commander")
const chalk = require('chalk')
const inquirer = require('inquirer')
const ora = require('ora')
const figlet = require('figlet');
const fs = require('fs-extra')
const path = require('path')
const gitClone = require('git-clone')

const projectList = require('./project')

// console.log(projectList)


// 首行提示
program.name('mijia-cli').usage('<command> [options]')
// program.name('mijia').usage('<command> [options]')


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



//--------------- 命令 -------------

program
    .command('create <app-name>')
    .description('创建一个新项目')
    .action(async function(name){
        // 创建建一个名字为name的文件夹，把模板项目代码放到这个文件夹下面
        // console.log("create app:")
        // console.log(name)
        // console.log(process.cwd()) // 执行命令的路径
        console.log(path.join(process.cwd(),name)) // 将name 拼接到执行命令路径的后面
        const targetPath = path.join(process.cwd(),name)
        if(fs.existsSync(targetPath)) {
            // 存在
            const answer = await inquirer.prompt([
                {
                    type: 'confirm',
                    message: '名字已存在，请问同学是否要覆盖之前的文件夹呢？',
                    default: false,
                    name: 'overwrite'
                }
            ])
            // console.log(answer)
            if (answer.overwrite) {
                fs.remove(targetPath)
                console.log('删除成功')
            } else {
                // 停止，返回去起一个新名字
                console.log("shit")
                return 
            }

        } else {
            console.log('项目名称可用')
        } 

        // ------------ 新建 ------------
        const res = await inquirer.prompt([
            {
                type: 'list',
                message: '同学你选什么框架去建立新项目呢？',
                name: 'type',
                choices: [
                    {
                        name:'vue',
                        value: 'vue'

                    },
                    {
                        name: 'react',
                        value: 'react'
                    }
                ]
            },
            {
                type: 'list',
                message: '同学你要用ts吗?',
                name: 'ts',
                choices: [
                    {
                        name:'是',
                        value: 'true'

                    },
                    {
                        name: '否',
                        value: 'false'
                    }
                ]
            },
            

        ])

        // console.log(res)
            // gitClone
        const key = res.type + (res.ts ? '&ts' : '')
        const spinner = ora('下载中...').start()
        spinner.color = 'yellow';
        // console.log(projectList[key])
        gitClone(projectList[key], name, { checkout: 'main'}, function(err) {
            if(err) {
                spinner.color = 'red';
                spinner.fail('下载失败')
                console.log(err)
            } else {
                spinner.color = 'green';
                spinner.succeed('下载成功')
                // 下载成功后主要要把原仓库的.git文件给删除
                fs.remove(path.join(targetPath, '.git'))

                console.log(chalk.green("\nDone,now run:\n"))
                console.log(chalk.yellow(` cd ${name}\n npm install\n npm run dev `))
                
            }
        } )
    })




// 必须要执行解析的方法！
program.parse(program.argv)


// console.log("米迦同学")
