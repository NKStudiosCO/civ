 var audio = document.createElement("audio");
function play_sound(value){
  if (options_audio_sound_effects_enabled === 1){
    audio.src = value;
    audio.play();
  }
}
 play_sound("./sound/menu.mp3");
