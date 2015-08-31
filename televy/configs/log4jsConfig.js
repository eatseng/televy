var n = __dirname.lastIndexOf("/");
var logPath = __dirname.slice(0, n)

console.log(logPath)

module.exports = {
    "appenders": [
        {
            "type": "file",
            "filename": logPath + "/logs/televy_run.log",
            "maxLogSize": 20480,
            "backups": 10,
            "category": ["apis", "index", "reports", "stories"]
        },
        {
        	"type": "console"
        }
    ],
    "replaceConsole": true
}
