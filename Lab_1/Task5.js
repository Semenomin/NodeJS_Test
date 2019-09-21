async function loadTask5()
{
    let n=0;
    let promise = new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(++n),4000);
    })
    let result = await promise;
    alert(result);
}