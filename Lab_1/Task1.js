function loadscript(src,callback) {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error(`Не удалось загрузить скрипт ${src}`));
    document.head.append(script);  
}
function loadTask1(){
    loadscript('https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js',
    function(error, script)
     {
        if (error) {
        alert("Error")
        } else {
        alert("Good")
        }
      }
    );   
}