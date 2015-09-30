// CONTROLS
var unit_is_allowed_to_move = 0;
var move_selector = document.createElement("div");
  move_selector.id = "move_selector";
  move_selector.className = "move_selector";
  //move_selector.onclick = function(){tile_select();};
  document.body.appendChild(move_selector);
function showCoords(event){
  var get_mouse_coord_x = event.clientX;
  var get_mouse_coord_y = event.clientY;
//alert(get_mouse_coord_x)
  get_mouse_coord_x = Math.floor(get_mouse_coord_x / 100);
  get_mouse_coord_y = Math.floor(get_mouse_coord_y / 100);

  //document.getElementById("move_selector").style.zIndex = 5050;

  document.getElementById("move_selector").style.left = get_mouse_coord_x * 100;
  document.getElementById("move_selector").style.top = get_mouse_coord_y * 100;

  document.getElementById("move_selector").onclick = function(){
    tile_select(get_mouse_coord_x, get_mouse_coord_y);
    unit_is_allowed_to_move = 0;

    document.getElementById("move_selector").style.left = -100;
    document.getElementById("move_selector").style.top = -100;
  };

  //unit_is_allowed_to_move = 0;
}

// mouse clicking on the in-game map
document.body.onclick = function(e){
  //var isRightMB;
  //e = e || window.event;

  if (unit_attack === 1){
    perform_attack = 1;

    unit_attack = 0;
  }
}

function get_keyboard_input(){
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;

  var currentlyPressedKeys = {};

  function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;

    //if (String.fromCharCode(event.keyCode) == "F") {}

    handleKeys();
  }


  function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
  }


  function handleKeys() {
    // ESC key
    if (currentlyPressedKeys[27]) {
      if (is_a_menu_open === 1){
        menu_return();
      } else{
        // do nothing
      }
    }

    // ENTER key -- end turn if no menus are open -- THIS IS CAUSING MULTIPLE TURNS TO OCCUR -- NEEDS FIXING
    if (currentlyPressedKeys[13]) {
      if (is_a_menu_open === 1){
        menu_return();
      } else{
        end_turn(0); // 0 is the player ID -- may need to generalize in the future
      }
    }

    // F1 key
    if (currentlyPressedKeys[112]) {
      if (is_a_menu_open === 1){
        menu_return();
      } else{
        policies_menu();
      }
    }

    // F2 key
    if (currentlyPressedKeys[113]) {
      if (is_a_menu_open === 1){
        menu_return();
      } else{
        economy_menu();
      }
    }

    // F3 key
    if (currentlyPressedKeys[114]) {
      if (is_a_menu_open === 1){
        menu_return();
      } else{
        research_menu();
      }
    }

    // F10 key
    if (currentlyPressedKeys[121]) {
      if (is_a_menu_open === 1){
        menu_return();
      } else{
        main_menu();
      }
    }

    // A key -- unit attack
    if (currentlyPressedKeys[65]){
      // flag
      if (civ_units[p_color][get_num_value(document.getElementById(selected_unit).id)[1]].unit_Class != "civilian"){
        unit_attack = 1;
      }
    }

    var temp_unit_value = get_num_value(unit_value)[1]; // TEMPORARY FIX... originally used unit_value ("unit_0_0") instead of temp_unit_value
    // B key -- build city
    if (currentlyPressedKeys[66]){
      //var temp_unit_value = "";
      unit_action(temp_unit_value);
    }

    // C key -- view city menu
    if (currentlyPressedKeys[67]){
      if (is_a_menu_open === 1){
        menu_return();
      } else if(civ_units[p_color][temp_unit_value].unit_Type === "City"){//(unit_value === 0){ // TEMPORARY FIX -- NEED TO FIX THIS FOR THE FUTURE -- a value of 0 here means the first unit the player has
        city_menu();
      }
    }

    // M key -- unit move
    if (currentlyPressedKeys[77]){
      unit_is_allowed_to_move = 1;
      // get mouse coords (aligned with tile coords)
      showCoords(event);

      // move unit to mouseover tile coords
      // tile_select(a,b);
    }

    // SHIFT + 1 key -- unit group 1
    if (currentlyPressedKeys[16] && currentlyPressedKeys[49]){
      add_unit_to_group(0);
    }

    if (currentlyPressedKeys[37] || currentlyPressedKeys[65]){
      // Left cursor key
      /*
      var loc = document.getElementById("player_object").style.left;
      var search = /[0-9]/g;
      var result = loc.match(search);
      var result2 = "";
      for (i = 0; i < result.length; i++){
        result2 = result2 + result[i];
      }

      document.getElementById("player_object").style.left = parseInt(result2) - 10;
      */
    }
    if (currentlyPressedKeys[39] || currentlyPressedKeys[68]) {
      // Right cursor key
    }
    if (currentlyPressedKeys[38] || currentlyPressedKeys[87]) {
      // Up cursor key
    }
    if (currentlyPressedKeys[40] || currentlyPressedKeys[83]) {
      // Down cursor key

    }
  };
};
