const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const isDirExist = require('../utils/isDirExist');
// const newProject = require('../utils/newProject');
const clone = require('../utils/clone');



// const git = require('simple-git')();
// const fs = require('fs')
// const url = require('url');


const create = async(ProjectName) => {
    let existRes = await isDirExist(ProjectName)
    const targetPath = path.join(process.cwd(),ProjectName)
    console.log(targetPath)
    if (existRes) {
        // console.log(chalk.redBright(`\n项目文件夹 ${ProjectName} 已存在，请更换项目名称\n`));
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
            // fs.remove(targetPath)
            console.log("请手动删除同名文件，再创建")
        } else {
            // 停止，返回去起一个新名字
            console.log("请更改项目名称重新创建")
            return 
        }
    } else {
        console.log('项目名称可用')
        // await newProject()
        // console.log(res)

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
        const key = res.type + (res.ts ? '&ts' : '')
        clone(ProjectName,targetPath,key)
        // newProject()
    }

}

module.exports = create
