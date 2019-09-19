function loadTask2(){
let promise = new Promise(function(resolve,reject){
    let src = 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js';
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve("Good");
    script.onerror = () => reject(new Error("Error Message"));
    document.head.append(script);  
}
)
promise.then(
  result => alert(result), // выведет "done!" через одну секунду
  error => alert(error) // не будет запущена
);
}
