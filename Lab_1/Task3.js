async function loadTask3()
{
    let result = await fetch('/article/promise-chaining/user.json')
    .then(function(response){return response.text();})
    .then(function(text){alert(text);})
    .catch(error=>alert(error));
    alert("Finnaly");
}