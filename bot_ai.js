////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var num_owned_cities = [];
num_owned_cities[0] = 0;
num_owned_cities[1] = 0;

function bot_ai(){
  // seek out extremely important tasks first

  // check for any cities
  if (num_owned_cities[p_color] === 0){
    // locate any settlers -- have them build cities
    for (var i = 0, length = civ_units[p_color].length; i < length; i++){
      if (civ_units[p_color][i].unit_Type === "Settler"){
        // should add a check to see if there are any nearby resources and which are most valuable to the civ then to build the city near there if they have movement available

        // settle a city
        selected_unit = "unit_" + p_color + "_" + i;

        document.getElementById(selected_unit).innerHTML = "<img src='./images/units/city_2.png'>";

        civ_units[p_color][i].unit_Type = "City";

        selected_tile_x = get_num_value(document.getElementById(selected_unit).style.left) / 100;
        selected_tile_y = get_num_value(document.getElementById(selected_unit).style.top) / 100;
        generate_civ_borders(p_color);

        num_owned_cities[p_color] = 1;
        civ_population[p_color] += 1;
      }
    }

    // if no settlers -- gg cuz cant build any new ones cuz no cities
  }

  if (num_owned_cities[p_color] != 0){
    // build units
    //create_unit(p_color, 1); // create a warrior
    if ((turn % 5) === 0){
      create_unit(p_color, 1); // create a warrior EVERY 3 TURNS ... temp solution for testing purposes only
    }
  }

  // if civ is at war with another civ, then move some/all of its combat units towards the enemy civ
  civs_at_war[p_color][0] = 0; // at war with civ 0 (aka the player) ... should be more generalized???
  if (civs_at_war[p_color][0] === 0){
    locate_enemy_units(); // only locates civilian units for now
  }


  // THIS CURRENTLY MOVES ENEMY UNITS TOWARDS ITS CITIES ... CAN MAYBE BE FIXED FOR UNIT CREATION TO SPAWN IN / NEAR THEIR CITIES WHERE THEY WERE CREATED
  // civs_at_war[p_color][0] = 0; // at war with civ 0 (aka the player) ... should be more generalized???
  // if (civs_at_war[p_color][0] === 0){
  //   // move some/all of its combat units towards the enemy civ
  //   // locate enemy cities (& units???)
  //   for (var i = 0, length = civ_units[civs_at_war[p_color][0]].length; i < length; i++){
  //     if (civ_units[civs_at_war[p_color][0]][i].unit_Class === "civilian"){
  //       // put these locations into an array
  //       get_enemy_city_coords[p_color][i] = "unit_" + p_color + "_" + i; // ... THE KEY IS HERE CUZ IT DETECTS THE CURRENT PLAYER'S CITIES AND NOT THE ENEMIES (p_color)
  //     }
  //   }
  //
  //   // locate any units
  //   for (var i = 0, length = civ_units[p_color].length; i < length; i++){
  //     if (civ_units[p_color][i].unit_Class != "civilian"){
  //       // select unit???
  //       selected_unit = "unit_" + p_color + "_" + i;
  //
  //       var get_enemy_left_coord = get_num_value(document.getElementById(get_enemy_city_coords[p_color][0]).style.left);
  //       var get_enemy_top_coord = get_num_value(document.getElementById(get_enemy_city_coords[p_color][0]).style.top);
  //
  //       document.getElementById(selected_unit).style.left = get_enemy_left_coord;
  //       document.getElementById(selected_unit).style.top = get_enemy_top_coord;
  //
  //       document.getElementById(selected_unit + '_hp_bar').style.left = get_enemy_left_coord;
  //       document.getElementById(selected_unit + '_hp_bar').style.top = get_enemy_top_coord;
  //     }
  //   }
  //
  // }

  // select next player's turn and end turn
  if (p_color < (player.length - 1)){
    p_color++;
  }else{
    p_color = 0;

    turn++; // NEED THIS TO NOT CHANGE UNTIL ALL PLAYERS HAVE COMPLETED THEIR TURNS
    update_top_menu();
    clear_units(1);
    // update_player_1_borders(1);
    notification_menu(notification_alert[p_color]);
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function locate_enemy_units(){
  for (var i = 0, length = civ_units[civs_at_war[p_color][0]].length; i < length; i++){
    if (civ_units[civs_at_war[p_color][0]][i].unit_Class === "civilian"){
      // put these locations into an array
      get_enemy_city_coords[p_color][i] = "unit_" + civs_at_war[p_color][0] + "_" + i;
    }
  }

  // locate any units
  for (var i = 0, length = civ_units[p_color].length; i < length; i++){//alert(civ_units[p_color][i].unit_Class)
    if ((civ_units[p_color][i].unit_Class != "civilian")){
      // select unit???
      selected_unit = "unit_" + p_color + "_" + i;

      var get_enemy_left_coord = get_num_value(document.getElementById(get_enemy_city_coords[p_color][0]).style.left);
      var get_enemy_top_coord = get_num_value(document.getElementById(get_enemy_city_coords[p_color][0]).style.top);

      var get_unit_left_coord = get_num_value(document.getElementById(selected_unit).style.left);
      var get_unit_top_coord = get_num_value(document.getElementById(selected_unit).style.top);

      // get direction of movement ???
      var get_direction_of_movement_left = (get_enemy_left_coord - get_unit_left_coord) / Math.abs(get_enemy_left_coord - get_unit_left_coord);
      var get_direction_of_movement_top = (get_enemy_top_coord - get_unit_top_coord) / Math.abs(get_enemy_top_coord - get_unit_top_coord);

      // record current location
      var get_unit_left_coord_old = get_unit_left_coord;
      var get_unit_top_coord_old = get_unit_top_coord;

      document.getElementById(selected_unit).style.left = parseInt(get_unit_left_coord) + (get_direction_of_movement_left * 100);
      document.getElementById(selected_unit).style.top = parseInt(get_unit_top_coord) + (get_direction_of_movement_top * 100);

      document.getElementById(selected_unit + '_hp_bar').style.left = parseInt(get_unit_left_coord) + (get_direction_of_movement_left * 100);
      document.getElementById(selected_unit + '_hp_bar').style.top = parseInt(get_unit_top_coord) + (get_direction_of_movement_top * 100) - 7.5;

      get_unit_left_coord = get_num_value(document.getElementById(selected_unit).style.left);
      get_unit_top_coord = get_num_value(document.getElementById(selected_unit).style.top);

      // check if unit exists in the same tile -- UNITS STOP APPROACHING AFTER FIRST ONE LANDS ON CITY -- ALSO SEEMS LIKE THEY CANT ENTER THE PLAYER'S BORDERS
      for (var i = 0, length = civ_units[0].length; i < length; i++){
        if ((get_num_value(document.getElementById("unit_" + 0 + "_" + i).style.left) === get_unit_left_coord) &&
           (get_num_value(document.getElementById("unit_" + 0 + "_" + i).style.top) === get_unit_top_coord) &&
           (document.getElementById("unit_" + 0 + "_" + i).innerHTML != '<img src="./images/units/city_2.png">')){ // this last check makes it so that they can only be on the same tile if the unit is a city but not if it is a regular unit (would have to kill it first)
          //alert("collision");
          // move back to original spot -- DOESN'T SEEM TO BE WORKING???
          document.getElementById(selected_unit).style.left = get_unit_left_coord_old;
          document.getElementById(selected_unit).style.top = get_unit_top_coord_old;

          document.getElementById(selected_unit + '_hp_bar').style.left = get_unit_left_coord_old;
          document.getElementById(selected_unit + '_hp_bar').style.top = get_unit_top_coord_old - 7.5;

          // move to non-impassable terrain -- WILL SOMETIMES RUN BACK INTO THE MOUNTAIN UNLESS I ADD A FIX!!!
          document.getElementById(selected_unit).style.left = parseInt(get_unit_left_coord) + (random_move_x * 100);
          document.getElementById(selected_unit).style.top = parseInt(get_unit_top_coord) + (random_move_y * 100);

          document.getElementById(selected_unit + '_hp_bar').style.left = parseInt(get_unit_left_coord) + (random_move_x * 100);
          document.getElementById(selected_unit + '_hp_bar').style.top = parseInt(get_unit_top_coord) + (random_move_y * 100) - 7.5;
        }
      }

      // check if impassable terrain
      if ((document.getElementById("tile_"+(get_unit_left_coord/100)+"_"+(get_unit_top_coord/100)).className === "mountain") ||
         (document.getElementById("tile_"+(get_unit_left_coord/100)+"_"+(get_unit_top_coord/100)).className === "ice")){
        var random_move_x = Math.floor((Math.random() * 2) + 1);
        var random_move_y = Math.floor((Math.random() * 2) + 1);
        if (random_move_x > 1){ random_move_x = -1; }
        if (random_move_y > 1){ random_move_y = -1; }

        // move back to original spot -- DOESN'T SEEM TO BE WORKING???
        document.getElementById(selected_unit).style.left = get_unit_left_coord_old;
        document.getElementById(selected_unit).style.top = get_unit_top_coord_old;

        document.getElementById(selected_unit + '_hp_bar').style.left = get_unit_left_coord_old;
        document.getElementById(selected_unit + '_hp_bar').style.top = get_unit_top_coord_old - 7.5;

        // move to non-impassable terrain -- WILL SOMETIMES RUN BACK INTO THE MOUNTAIN UNLESS I ADD A FIX!!!
        document.getElementById(selected_unit).style.left = parseInt(get_unit_left_coord) + (random_move_x * 100);
        document.getElementById(selected_unit).style.top = parseInt(get_unit_top_coord) + (random_move_y * 100);

        document.getElementById(selected_unit + '_hp_bar').style.left = parseInt(get_unit_left_coord) + (random_move_x * 100);
        document.getElementById(selected_unit + '_hp_bar').style.top = parseInt(get_unit_top_coord) + (random_move_y * 100) - 7.5;
      }
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////