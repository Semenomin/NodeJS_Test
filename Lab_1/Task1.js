function loadTask1(){
  function doLabs(subject, callback) {
    alert(`Starting doing ${subject} labs`);
    callback();
  } 
  doLabs('Testing',function(){alert('Stop do Labs')})
}