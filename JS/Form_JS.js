// If you click Korea, You can listen to the music! - It's Secret Message!
const keys = document.querySelectorAll('.sound');

function clickSound(e){
  let soundKey = e.currentTarget.dataset['sound'];
  let audio = document.querySelector(`audio[data-sound="${soundKey}"]`);
  audio.currentTime = 0;
  audio.play();

}

keys.forEach(function(key){
    key.addEventListener("click", clickSound);
});




// If you click the 'WHERE'radio button, BG is changing!
var body = document.getElementsByTagName('body')[0];
document.getElementById("korea").onclick = function Korea() {
  document.getElementById("message").innerHTML = "I Love Korea!";
  body.style.backgroundImage = 'url(img/seoulBG.jpg)';
  body.style.backgroundSize = 'cover';
}
document.getElementById("mexico").onclick = function Mexico() {
  body.style.backgroundImage = 'url(img/mexicoBG.jpg)';
  body.style.backgroundSize = 'cover';
}
document.getElementById("usa").onclick = function USA() {
  body.style.backgroundImage = 'url(img/usaBG.jpg)';
  body.style.backgroundSize = 'cover';
}
