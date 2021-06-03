const { ipcRenderer } = require("electron");

const button = document.getElementById("upload")

const randomString = require('random-string')

const fs = require('fs')

const process = require('child_process')

var format = 'm3u8'

var dir = './media'

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
}

/*$("#format").change(function(){
    format = $("#format option:selected").text()
    
})*/

button.addEventListener('click', function(event){
    ipcRenderer.send('open-file-dialog-for-file')
})
ipcRenderer.on('selected-file', function(event, paths){
    console.log(event);
    console.log(paths);

    process.exec(`ffmpeg -i "${paths}" media/${randomString()}_video.${format}`,
    function(error, stdout, stderr){
        console.log(stdout)

        if(error !== null){
            console.log(error)
        }
    })
})