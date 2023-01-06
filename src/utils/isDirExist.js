const fs = require('fs');
const path = require('path');

// 判断文件是否存在
async function isDirExist(ProjectName) {
    return new Promise((resolve, reject) => {
        // F_ok:文件对调用进程可见,可判断文件是否存在,其他有R_OK,W_OK,X_OK等
        fs.access(path.resolve(process.cwd(), ProjectName), fs.constants.F_OK, (err) => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}
module.exports = isDirExist;
