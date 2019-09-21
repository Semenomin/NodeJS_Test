function loadTask1(){
  async function doLabs(subject, callback) {
    alert(`Starting doing ${subject} labs`);
    callback();
  } 
  doLabs('Testing',function(){alert('Stop do Labs')})
}