const git = require('simple-git')();
const fs = require('fs')
const url = require('url');
const ora = require('ora')
const path = require('path');
const chalk = require('chalk')
const projectList = require('../project')

function clone (projectName,targetPath,key) {
    // this.gitURL = 'https://github.com/MiJiaCoding/vue-template.git';
    this.gitURL = projectList[key]

    const githubName = 'MiJiaCoding'
    const localURL = url.parse(this.gitURL);

    // const localRepoName = (localURL.path)
    // .replace('/','')
    // .replace(githubName,'')
    // .replace('/','')
    // .replace('.git','')
    
    // this.localPath = `./${localRepoName}`;
    this.localPath = projectName;
    this.options = ['--depth', '1'];

    const spinner = ora('下载中...').start()
    spinner.color = 'yellow';

    this.callback = (err) => {
        if(err) {
            spinner.color = 'red';
            spinner.fail('下载失败')
            console.log(err)
        } else {
            spinner.color = 'green';
            spinner.succeed('下载成功')
            // 下载成功后主要要把原仓库的.git文件给删除
            // fs.remove(path.join(targetPath, '.git'))
            
            // 可能会没权限
            // fs.unlink(`${targetPath}/app3.git`,function(err){
            //     if(err){
            //         return console.error(err)
            //     }
            //     console.log('删除成功！')
            // })
            console.log(chalk.green("\nDone,now run:\n"))
            console.log(chalk.yellow(` cd ${projectName}\n npm install\n npm run dev `))
        }
    }
    
    if (fs.existsSync(this.localPath)) {
        // something
        console.log("同名目录已存在") // 用不到
    } else {
        // console.log("正在克隆中...")
        git.outputHandler((command, stdout, stderr) => {
                stdout.pipe(process.stdout)
                stderr.pipe(process.stderr)
    
                stdout.on('data', (data) => {
                    // Print data
                    console.log(data.toString('utf8'))
                })
            })
            .clone(this.gitURL, this.localPath, this.options, this.callback)
    }
    git.outputHandler()
}

module.exports = clone;
