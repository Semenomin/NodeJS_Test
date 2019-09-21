function loadTask2(){
    const promise = new Promise((resolve, reject) => {
        const randomNumber = Math.random();
        setTimeout(() => {
          if(randomNumber < .6) {
            resolve('Good');
          } else {
            reject('Bad');
        }
        }, 2000);
      }).then(alert).catch(alert);
}
