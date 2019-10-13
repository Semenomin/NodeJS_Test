let webdriver = require('selenium-webdriver');
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Введите имя сущности и название столбца через запятую\n", function(answer) {
    let answers = answer.split(',');
    if(answers[0]!=null && answers[1]!=null){
        startXPath(answers[0],answers[1]);
    }
    else console.log("Ошибка ввода данных");
    rl.close();
});
function startXPath(substanseName,collName){
    let browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();
    //тут нужно подключиться к таблице
    browser.findElements(webdriver.By.xpath(`//td[count(//span[text()="${collName}"]/../preceding-sibling::*)+1][../td[2]/a="${substanseName}"]`)) //сам XPath, замените переменные чтобы проверить
        .then(function(callbacks){
            console.log(callbacks.getText());
            browser.quit();
        });
}

