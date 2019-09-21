function Task4(callback){
    let promise = new Promise((resolve,reject)=>{
        let src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js';
        let script = document.createElement('script');
        script.src = src;
        script.Onload = () => resolve("done");
        script.onerror = () => reject(new Error("Error 404"));
        document.head.append(script);  
    }).then(error => callback(error),result=> callback(result))
}
function loadTask4(){
    Task4(function(message){
        alert(message);
    }
);   
}