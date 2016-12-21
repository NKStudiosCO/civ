////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function create_unit(value_civ, value_unit){
  // get the city's x-coord & y-coord so can pass to unit_struct so it can generate a new unit on the city's location
  // only works the first time then it messes up...also i cant be hardcoding the unit name
  // var result3 = get_num_value(document.getElementById('unit_0_0').style.left);
  // var result4 = get_num_value(document.getElementById('unit_0_0').style.top);
  //
  // result3 = result3 / 100;
  // result4 = result4 / 100;
play_sound("./sound/lay.mp3");
  x = selected_tile_x;
  y = selected_tile_y;

  x = 100;
  y = 100;

  // player 2's unit creation
  if (value_civ === 1){
    f2 += 1;

    for (var i = 0, length = values_units.units.length; i < length; i++){
      if (value_unit === i){
        unit_type = values_units.units[i].type; // required
        fx = f2;
        civ_units[p_color][f2] = new unit_struct((get_num_value(document.getElementById('unit_1_0').style.left) / 100),(get_num_value(document.getElementById('unit_1_0').style.top) / 100), values_units.units[i].type, values_units.units[i].move, values_units.units[i].move, values_units.units[i].health, values_units.units[i].strength, f2, player[p_color].civ_Name, values_units.units[i].production, values_units.units[i].class, values_units.units[i].bonus_damage);

        civ_units[p_color][f2].unit_X_coord = x;
        civ_units[p_color][f2].unit_Y_coord = y;
      }
    }
  }

  // player 1's unit creation
  if (value_civ === 0){
    f += 1; // player 1 unit counter and f2 is player 2 unit counter

    for (var i = 0, length = values_units.units.length; i < length; i++){
      if (value_unit === i){
        unit_type = values_units.units[i].type; // required
        fx = f;
        civ_units[p_color][f] = new unit_struct((get_num_value(document.getElementById('unit_0_0').style.left) / 100),(get_num_value(document.getElementById('unit_0_0').style.top) / 100), values_units.units[i].type, values_units.units[i].move, values_units.units[i].move, values_units.units[i].health, values_units.units[i].strength, f, player[p_color].civ_Name, values_units.units[i].production, values_units.units[i].class, values_units.units[i].bonus_damage);

        civ_units[p_color][f].unit_X_coord = x;
        civ_units[p_color][f].unit_Y_coord = y;
      }
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function calculate_gold(value){
  // CALCULATE GOLD FOR SIMPLE RESOURCES
  if (options_resources === 1){
    var expense_units = (civ_units[p_color].length * (-1)) + num_owned_cities[p_color] + (civ_units_deleted[p_color] * (-1));
    var income_population = (civ_population[p_color] * 1) + num_owned_cities[p_color]; // num_owned_cities offsets the gold cost of owning the settlers that turned to cities...

    // values_resources.resource[0].name/gold // how to get these natural or otherwise resources if no techs researched???
    //var temp_resources = player_1_num_resources * 2; // times 2 here because that's what the JSON gold value of the resource is -- TEMP FIX
    // var temp_resources = (resources_mineral_player[0] * values_resources_simple.resource[0].gold);
    var temp_resources = (resources_mineral_player[0] * values_resources_simple.resource[0].gold) + (resources_nutrient_player[0] * values_resources_simple.resource[1].gold);

    // value = 1 means that it only asks for the player's current net gold for that turn without actually modifying the value (which can cause problems)
    if (value === 1){
      return (expense_units + income_population + temp_resources);
    }else{
      gold[p_color] += expense_units + income_population + temp_resources;
    }

    //research_income[0] += (resources_mineral_player[0] * values_resources_simple.resource[0].research) + (resources_nutrient_player[0] * values_resources_simple.resource[1].research);

    research_income[0] = (resources_mineral_player[0] * values_resources_simple.resource[0].research) + (resources_nutrient_player[0] * values_resources_simple.resource[1].research) + num_owned_cities[0];
  }

  // // CALCULATE GOLD FOR COMPLEX RESOURCES
  // if (options_resources === 0){
  //   var expense_units = (civ_units[p_color].length * (-1)) + num_owned_cities[p_color] + (civ_units_deleted[p_color] * (-1));
  //   var income_population = (civ_population[p_color] * 1) + num_owned_cities[p_color]; // num_owned_cities offsets the gold cost of owning the settlers that turned to cities...
  //
  //   // values_resources.resource[0].name/gold // how to get these natural or otherwise resources if no techs researched???
  //   //var temp_resources = player_1_num_resources * 2; // times 2 here because that's what the JSON gold value of the resource is -- TEMP FIX
  //   var temp_resources = player_1_num_resources * values_resources.resource[0].gold;
  //
  //   // value = 1 means that it only asks for the player's current net gold for that turn without actually modifying the value (which can cause problems)
  //   if (value === 1){
  //     return (expense_units + income_population + temp_resources);
  //   }else{
  //     gold[p_color] += expense_units + income_population + temp_resources;
  //   }
  // }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function end_turn(value){ // value = which player's turn to end
  // PLAYER 1'S TURN
 play_sound("./sound/zone.mp3");
  if (value === 0){
    check_civ_resources();
    calculate_gold();

    if (research_turns <= 0){
      var get_tech = null;
      for (var i = 1, length = technology_power.length; i < length; i++){
        if (research_name_current === "TECH POWER " + i){
          get_tech = i;
        }
      }

      technology_power[get_tech - 1].tech_Research_Required = 0;
      technology_power[get_tech - 1].tech_Status = 0;

      technology_power[get_tech].tech_Status = 2;

      for (var i = 0, length = values_units.units.length; i < length; i++){
        if (technology_power[get_tech - 1].tech_Provides === values_units.units[i].type){
          // ENABLE NEW ADVANCES FROM TECHS -- push the tech into player 1's enabled units / structures / other list
          city_menu_enabled_list[p_color].push(technology_power[get_tech - 1].tech_Provides);

          city_menu_enabled_list_2[p_color].push(["<table class='city_menu_build_item' onclick='create_unit("+(p_color)+","+(i)+")' id='city_menu_build_item'><tr>\
            <td class='city_menu_build_item_image'>&nbsp;</td>\
            <td class='city_menu_build_item'>",city_menu_enabled_list[p_color][get_tech - 1],"\
            <br>",values_units.units[i].production," Turns</td></tr></table>"].join(""));

            // sends notification that a research has been completed and thus will notify the player when their next turn starts
            notification_alert[p_color] = "tech";
        }
      }

      get_tech = null;

      research_turns = "NA";
      research_name_current = "???";
    }

    if (research_turns > 0){
      var get_tech = null;
      for (var i = 1, length = technology_power.length; i <= length; i++){
        if (research_name_current === "TECH POWER " + i){
          get_tech = i;

          if (i > length){
            get_tech = 999;
          }
        }
      }

      if (get_tech != null){
        if (get_tech === 999){
          research_turns = technology_power[get_tech - 1].tech_Research_Required; // research_turns = technology_power[0].tech_Research_Required;
        }else{
          technology_power[get_tech - 1].tech_Research_Required -= research_income[p_color]; // technology_power[0].tech_Research_Required--;
          research_turns = technology_power[get_tech - 1].tech_Research_Required; // research_turns = technology_power[0].tech_Research_Required;
        }
      }

      get_tech = null;
    }

    // TEMPORARILY DISABLED AS A HOTFIX TO THE NOTIFICATION MENU NOT APPEARING IF RESEARCH_TURNS WENT BELOW ZERO (should be one control for '< 0' and one for '=== 0')
    // if (research_turns < 0){
    //   research_turns = 0;
    //
    //   end_turn(value);
    // }

    update_top_menu();

    p_color++;
    update_units_move(p_color);
    end_turn(p_color); // go to the next player
  }

  if (value === 1){
    p_color = value;

    // run bot AI
    bot_ai();
    update_units_move(p_color);

    /*
    // get unit based on ID
    p_color = 0 // get div of Player 1
    selected_unit = "unit_" + p_color + "_" + value
    selected_unit_no = value

    // flag that the unit has been selected
    unit_move = 1

    //tile_select
    unit_value = value
    //x = unit_x[value].unit_X_Coord
    //y = unit_x[value].unit_Y_Coord
    x = civ_units[p_color][0].unit_X_Coord / 100;
    y = civ_units[p_color][0].unit_Y_Coord / 100;
    */
  }

  // resets all unit movement points
  function update_units_move(value){
    play_sound("./sound/hello.mp3");
    for(var i = 0, length = civ_units[p_color].length; i < length; i++){
      if (civ_units[p_color][i].unit_Type === "City"){
        civ_units[p_color][i].unit_Movement_Remaining = 0;
      }

      if (civ_units[p_color][i].unit_Type === "Settler"){
        civ_units[p_color][i].unit_Movement_Remaining = values_units.units[0].move;
      }

      if (civ_units[p_color][i].unit_Type === "Warrior"){
        civ_units[p_color][i].unit_Movement_Remaining = values_units.units[1].move;
      }

      if (civ_units[p_color][i].unit_Type === "Horsemen"){
        civ_units[p_color][i].unit_Movement_Remaining = values_units.units[2].move;
      }

      if (civ_units[p_color][i].unit_Type === "Archers"){
        civ_units[p_color][i].unit_Movement_Remaining = values_units.units[3].move;
      }

      // why is this here???
      //update_unit_menu(value);
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// THIS RUNS BEFORE tile_select()
function unit_select(value){
  play_sound("./sound/what.mp3");
  // check if another unit has already been selected before this one has
  if (another_unit_is_selected === 1){ // so this only seems to activate when touching your own units...thus a major problem
    another_unit_is_selected = 0;
    unit_select(value); // putting this here helps remove the requirement for double clicking on units in order to select them
  } else{
    // run everything else in this function
    another_unit_is_selected = 1;

    result_x = get_num_value(document.getElementById(value).style.left) / 100;
    result_y = get_num_value(document.getElementById(value).style.top) / 100;

    unit_move = 1;

    xy_flag = value;

    // save coords of selected tile -- apparently required for several things, but may be able to be rolled into other variables
    selected_tile_x = result_x;
    selected_tile_y = result_y;

    // only allow the player to move units if they own them -- kind of a weak solution for now
    /*if (parseInt(get_num_value(document.getElementById(value).id)[0]) === p_color){
      tile_select(result_x,result_y);
    }*/

    document.getElementById("unit_selector").style.top = result_y * 100;
    document.getElementById("unit_selector").style.left = result_x * 100;

    if (perform_attack === 1){
      // allow attack

      // find out what unit was at that location -- can toss this all into another function???
      if (parseInt(get_num_value(document.getElementById(value).id)) != p_color){
        // cause damage to that enemy
        var get_enemy_id = parseInt(get_num_value(document.getElementById(value).id)[0]);
        var get_enemy_unit_num = parseInt(get_num_value(document.getElementById(value).id)[1]);

        // now have to actually make sure that they are within combat range
        var get_enemy_left = parseInt(get_num_value(document.getElementById(value).style.left)) / 100;
        var get_enemy_top = parseInt(get_num_value(document.getElementById(value).style.top)) / 100;
//alert(Math.abs(get_enemy_left - unit_that_is_attacking[0]) + ", " + (Math.abs(get_enemy_top - unit_that_is_attacking[1]) === 1) + ", " + unit_that_is_attacking);
        var testing_x = Math.abs(get_enemy_left - unit_that_is_attacking[0]);
        var testing_y = Math.abs(get_enemy_top - unit_that_is_attacking[1]);
        //if ((Math.abs(get_enemy_left - unit_that_is_attacking[0]) === 1) || (Math.abs(get_enemy_top - unit_that_is_attacking[1]) === 1)){
        if (testing_x > 1 || testing_y > 1){
          // illegal move (like a chess knight) -- do nothing
        }else if ((testing_x === 1) || (testing_y === 1)){
          // now damage the enemy unit by the strength of the attacking unit (civ_units[p_color][unit_that_is_attacking[2]].unit_Strength)
          civ_units[get_enemy_id][get_enemy_unit_num].unit_Health -= civ_units[p_color][unit_that_is_attacking[2]].unit_Strength;

          // apply bonus damage based on unit classes
          if (civ_units[p_color][unit_that_is_attacking[2]].unit_Class === "Elite"){
            if (civ_units[get_enemy_id][get_enemy_unit_num].unit_Class === "Common"){
              civ_units[get_enemy_id][get_enemy_unit_num].unit_Health -= civ_units[p_color][unit_that_is_attacking[2]].unit_Bonus_Damage;
            }
          }

          if (civ_units[p_color][unit_that_is_attacking[2]].unit_Class === "Common"){
            if (civ_units[get_enemy_id][get_enemy_unit_num].unit_Class === "Medic"){
              civ_units[get_enemy_id][get_enemy_unit_num].unit_Health -= civ_units[p_color][unit_that_is_attacking[2]].unit_Bonus_Damage;
            }
          }

          if (civ_units[p_color][unit_that_is_attacking[2]].unit_Class === "Medic"){
            if (civ_units[get_enemy_id][get_enemy_unit_num].unit_Class === "Elite"){
              civ_units[get_enemy_id][get_enemy_unit_num].unit_Health -= civ_units[p_color][unit_that_is_attacking[2]].unit_Bonus_Damage;
            }
          }

          play_sound("./sound/layzone.mp3");

          // modify unit hp bar according to the percentage of health left ... NEED TO GENERALIZE THIS (values_units.units[1].health is specific to a single unit)
          document.getElementById("unit_" + get_enemy_id + "_" + get_enemy_unit_num + "_hp_bar").style.width = (civ_units[get_enemy_id][get_enemy_unit_num].unit_Health / values_units.units[1].health) * 100;

          if (civ_units[get_enemy_id][get_enemy_unit_num].unit_Health <= 0){
            //alert(document.getElementById(value).innerHTML);
            //alert(civ_units[get_enemy_id][get_enemy_unit_num].unit_Type);
            // i think this if statement here sometimes makes it take attacking twice in order to kill something...which i dont think it did that before...so this would be a bug
            if (civ_units[get_enemy_id][get_enemy_unit_num].unit_Type === "Settler"){ // should be if type === "City" but NYI for bot AI
              // change ownership to the attacking civ (use a separate function)
              civ_units[get_enemy_id][get_enemy_unit_num].unit_Owner = player[p_color].civ_Name;
              document.getElementById("unit_" + get_enemy_id + "_" + get_enemy_unit_num + "_hp_bar").style.backgroundColor = player[p_color].civ_Color;
              //num_owned_cities[get_enemy_id] -= 1;
              //destroy_unit(document.getElementById(value).id); // delete this line after implementing the change of ownership

              //civ_units[p_color][get_enemy_unit_num] = undefined;
            }else if(civ_units[get_enemy_id][get_enemy_unit_num].unit_Type === "City"){
              civ_units[get_enemy_id][get_enemy_unit_num].unit_Owner = player[p_color].civ_Name;
              document.getElementById("unit_" + get_enemy_id + "_" + get_enemy_unit_num + "_hp_bar").style.backgroundColor = player[p_color].civ_Color;

              // hide the hp bar's border if hp is at / below zero -- TEMPORARILY DISABLED
              //document.getElementById("unit_" + get_enemy_id + "_" + get_enemy_unit_num + "_hp_bar").style.border = "0px solid rgba(0,0,0,0)";

              num_owned_cities[get_enemy_id] -= 1;

              num_owned_cities[p_color] += 1;

              victory_conditions();
            }else{
              destroy_unit(document.getElementById(value).id);

              // hide the hp bar's border if hp is at / below zero -- TEMPORARILY DISABLED
              //document.getElementById("unit_" + get_enemy_id + "_" + get_enemy_unit_num + "_hp_bar").style.border = "0px solid rgba(0,0,0,0)";
            }
            //destroy_unit(document.getElementById(value).id);
          }
//alert(unit_that_is_attacking[1])
          document.getElementById("unit_selector").style.top = unit_that_is_attacking[1] * 100;
          document.getElementById("unit_selector").style.left = unit_that_is_attacking[0] * 100;
        }

        setTimeout(function(){
          document.getElementById("attack_selector").style.top = get_enemy_top * 100;
          document.getElementById("attack_selector").style.left = get_enemy_left * 100;
        }, 10);

        setTimeout(function(){
          document.getElementById("attack_selector").style.top = -100;
          document.getElementById("attack_selector").style.left = -100;
        }, 1000);

        perform_attack = 0;
      }else{
        perform_attack = 0;
      }
    } else if (parseInt(get_num_value(document.getElementById(value).id)[0]) === p_color){
      unit_that_is_attacking = [result_x, result_y, parseInt(get_num_value(document.getElementById(value).id)[1])];

      tile_select(result_x,result_y);
    }
    /////////////////////////////////////

    selected_unit = value;

    var result = get_num_value(value);

    update_unit_menu(result[1]); // 0 = SETTLER, 1 = WARRIOR, BUT PROBLEM BECAUSE ??? (doesnt seem to work)
    //update_unit_menu(value); // need to bring this back
    ///////////////////////////////////////

    // get unit based on ID
    //p_color = 0 // get div of Player 1
    //selected_unit = "unit_" + p_color + "_" + value
    selected_unit_no = result[1];

    // flag that the unit has been selected
    //unit_move = 1

    //tile_select
    unit_value = value;

    x = civ_units[p_color][0].unit_X_Coord / 100; // ... these two values are currently wrong for whatever reason
    y = civ_units[p_color][0].unit_Y_Coord / 100;

    // disable the ability for cities to move
    /*if (unit_x[value].unit_Type === "City"){
      unit_x[value].unit_Movement_Remaining = 0;
    }*/
  }
  // then if it has been selected, then check if its within attackable range (1 for melee, 2 for ranged i guess)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function destroy_unit(value){
  play_sound("./sound/man.wav");
  // document.getElementById(value).innerHTML = "";
  // document.getElementById(value).style.left = -100;
  // document.getElementById(value).style.top = -100;

  document.getElementById(value).innerHTML = "<img src='./images/units/dead_1.png'>";

  document.getElementById(value + "_hp_bar").innerHTML = "";
  document.getElementById(value + "_hp_bar").style.left = -100;
  document.getElementById(value + "_hp_bar").style.top = -100;
  document.getElementById(value + "_hp_bar").border = "0px solid #000";

  var unit_p_color = get_num_value(value)[0];
  var unit_number = get_num_value(value)[1];
//alert(unit_p_color)
  // should maybe have a flag in the unit_struct or something to ID that the unit is considered destroyed ... also destroy struct?
  //var value2 = get_num_value(value)[1];
  //civ_units[p_color].splice(value, value2);
  //civ_units[p_color][value] = undefined;
  //alert("a: " + unit_p_color + "_" + unit_number + "_" + civ_units[unit_p_color][unit_number].unit_Class)
  civ_units[unit_p_color][unit_number].unit_Class = "civilian"; // ... the p_color here is 0 (as in the player)...need it to be the correct enemy color ???
  //alert("b: " + unit_p_color + "_" + unit_number + "_" + civ_units[unit_p_color][unit_number].unit_Class)
  civ_units_deleted[unit_p_color]++;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clear_units(value){
  for (var i = 0, length = civ_units[value].length; i < length; i++){
    if (document.getElementById("unit_" + value + "_" + i).innerHTML === '<img src="./images/units/dead_1.png">'){
      document.getElementById("unit_" + value + "_" + i).innerHTML = "";
      document.getElementById("unit_" + value + "_" + i).style.left = -100;
      document.getElementById("unit_" + value + "_" + i).style.top = -100;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function unit_action(value, action){
  value = parseInt(value);
  var terrain_types = ['land', 'grassland_hills', 'desert', 'desert_hills'];
  // create city via settler
  if (civ_units[p_color][value].unit_Type === "Settler"){
    for (var i = 0, length = terrain_types.length; i < length; i++){
      if (matrix_2[selected_tile_x][selected_tile_y].tile_Type === terrain_types[i]){
        document.getElementById(selected_unit).innerHTML = "<img src='./images/units/city_2.png'>";
        document.getElementById(selected_unit).style.zIndex = 199; // REMOVE THIS LATER ???
        //document.getElementById(selected_unit).onclick = function(){tile_select(selected_tile_x,selected_tile_y);}; // REMOVE THIS LATER ???
        document.getElementById(selected_unit).ondblclick = function(){city_menu();};

        // when grid is gone/semi-gone then make it so that the borders that change color are those not inside the territory, but only those that border the territory??? or something...
        player_1_borders();

        civ_units[p_color][value].unit_Type = "City"; // convert settler into city

        civ_units[p_color][value].unit_Movement = 0; // remove any remaining ability to move
        civ_units[p_color][value].unit_Movement_Remaining = 0;

        update_unit_menu(value);

        research_income[p_color] += 1;
        civ_population[p_color] += 1;
        num_owned_cities[p_color] += 1;

        check_civ_resources();
        calculate_gold(1);
        update_top_menu();
      }
    }
  }

  if (action === 0){
    destroy_unit(document.getElementById("unit_" + p_color + "_" + value).id);

    // remove the unit from the array
    //civ_units[p_color].splice(value, 1);
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UPDATE THE UNIT MENU
function update_unit_menu(value){
  value = parseInt(value);

  // GET THE UNIT DATA FOR THE SELECTED UNIT
  if (parseInt(get_num_value(document.getElementById(selected_unit).id)[0]) === p_color){
    // GET THE DATA FOR THE CIV THAT IS THE CURRENT PLAYER
    document.getElementById('unit_menu_name').innerHTML = civ_units[p_color][value].unit_Type;

    document.getElementById('unit_menu_stats').innerHTML = "Movement "+civ_units[p_color][value].unit_Movement_Remaining+"/"+civ_units[p_color][value].unit_Movement+"<br>Health "+civ_units[p_color][value].unit_Health+"<br>Strength "+civ_units[p_color][value].unit_Strength+"<br>Class " + civ_units[p_color][value].unit_Class

    if (civ_units[p_color][value].unit_Type === "City"){
      document.getElementById('unit_menu_actions').innerHTML = "\
      <a href='javascript:void(0);' onclick='city_menu()'><span href='javascript:void(0);' class='in-game_hotkey'>C</span>ity View</a>\
      "
    }

    if (civ_units[p_color][value].unit_Type === "Settler"){
      document.getElementById('unit_menu_actions').innerHTML = "\
      <a href='javascript:void(0);' onclick='unit_action("+value+")'><span href='javascript:void(0);' class='in-game_hotkey'>B</span>uild City</a><br>\
      <a href='javascript:void(0);' onclick='unit_action("+value+", 0)'><span href='javascript:void(0);' class='in-game_hotkey'>D</span>elete Unit</a>\
      "
    }

    if ((civ_units[p_color][value].unit_Type === "Warrior") ||
       (civ_units[p_color][value].unit_Type === "Horsemen") ||
       (civ_units[p_color][value].unit_Type === "Archers")){ // value = 1 here
      document.getElementById('unit_menu_actions').innerHTML = "\
      <a href='javascript:void(0);' onclick='unit_attack = 1'><span href='javascript:void(0);' class='in-game_hotkey'>A</span>ttack</a><br>\
      <a href='javascript:void(0);' onclick='unit_action("+value+", 0)'><span href='javascript:void(0);' class='in-game_hotkey'>D</span>elete Unit</a>\
      "
    }
  } else{
    // GET DATA FOR THE OTHER CIVS THAT AREN'T THE CURRENT PLAYER
    for (var i = 0, length = player.length; i < length; i++){
      if (parseInt(get_num_value(document.getElementById(selected_unit).id)[0]) === i){
        //alert("p_color = " + i);
        document.getElementById('unit_menu_name').innerHTML = civ_units[i][value].unit_Type;

        document.getElementById('unit_menu_stats').innerHTML = "Movement "+civ_units[i][value].unit_Movement_Remaining+"/"+civ_units[i][value].unit_Movement+"<br>Health "+civ_units[i][value].unit_Health+"<br>Strength "+civ_units[i][value].unit_Strength

        if (civ_units[i][value].unit_Type === "City"){
          document.getElementById('unit_menu_actions').innerHTML = "\
          <a href='javascript:void(0);' onclick='city_menu()'><span class='in-game_hotkey'>C</span>ity View</a>\
          "
        }

        if (civ_units[i][value].unit_Type === "Settler"){
          document.getElementById('unit_menu_actions').innerHTML = "\
          <a href='javascript:void(0);' onclick='unit_action("+value+")'><span class='in-game_hotkey'>B</span>uild City</a>\
          "
        }

        if (civ_units[i][value].unit_Type === "Warrior"){
          document.getElementById('unit_menu_actions').innerHTML = "NYI"
        }
      }
    }
  }
}


// UPDATE THE GAME (THIS SHOULD BE THE MAIN GAME LOOP)
//setInterval(function(){
  //update_unit_menu();
//}, 100);

function update_game(){
  // NYI -- not sure if necessary anyway
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATES PLAYER BORDERS BASED ON THE LOCATION OF THEIR CITIES
function player_1_borders(){
  var aa = "";
  var bb = "";
  var new_selected_tile = "";

  // THIS IS IN CASE THE CITY IS BUILT ALONG THE LEFT-MOST OF THE MAP (TILE X === 0)
  if (selected_tile_x === 0){
    for (var i = 0; i < 2; i++){
      aa = selected_tile_x + i;

      for (var j = -1; j < 2; j++){
        bb = selected_tile_y + j;
        new_selected_tile = "tile_" + aa + "_" + bb;

        document.getElementById(new_selected_tile).innerHTML = "<img src='./images/player_1_border_all.png'>";

        if (is_enabled_fog_of_war === 1 && p_color === 0){ fog_of_war_remove(aa,bb); fog_of_war_remove_mini_map(aa,bb); }
      }
    }

    aa = map_width - 1;

    for (var j = -1; j < 2; j++){
      bb = selected_tile_y + j;
      new_selected_tile = "tile_" + aa + "_" + bb;

      document.getElementById(new_selected_tile).innerHTML = "<img src='./images/player_1_border_all.png'>";

      if (is_enabled_fog_of_war === 1 && p_color === 0){ fog_of_war_remove(aa,bb); fog_of_war_remove_mini_map(aa,bb); }
    }
  }else{ // THIS IS FOR EVERY OTHER INSTANCE (WHERE THE CITY IS ANYWHERE BUT TILE X === 0)
    for (var i = -1; i < 2; i++){
      aa = selected_tile_x + i;

      for (var j = -1; j < 2; j++){
        bb = selected_tile_y + j;
        new_selected_tile = "tile_" + aa + "_" + bb;

        document.getElementById(new_selected_tile).innerHTML = "<img src='./images/player_1_border_all.png'>";

        if (is_enabled_fog_of_war === 1 && p_color === 0){ fog_of_war_remove(aa,bb); fog_of_war_remove_mini_map(aa,bb); }
      }
    }
  }

  // generate css borders in a one-square radius from the city
  // for (var i = -1; i < 2; i++){
  //   aa = selected_tile_x + i;
  //
  //   for (var j = -1; j < 2; j++){
  //     bb = selected_tile_y + j;
  //     new_selected_tile = "tile_" + aa + "_" + bb;
  //
  //     document.getElementById(new_selected_tile).innerHTML = "<img src='./images/player_1_border_all.png'>";
  //   }
  // }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function update_player_1_borders(value2){
  // expand city beyond initial borders
  if (value2 === 1){
    var aa_2 = undefined;
    var bb_2 = undefined;
    // get player borders

    // select random tile at periphery of borders
    var select_random_tile_x = get_num_value(document.getElementById("unit_0_0").style.left) / 100;
    var select_random_tile_y = get_num_value(document.getElementById("unit_0_0").style.top) / 100;
    for (var i = -1; i < 2; i++){
      aa_2 = select_random_tile_x + i;

      for (var j = -1; j < 2; j++){
        bb_2 = select_random_tile_y + j;

        var select_random_tile_x_2 = Math.floor((Math.random() * 10) + 1);
        var select_random_tile_y_2 = Math.floor((Math.random() * 10) + 1);

        if (select_random_tile_x_2 >= 7){ select_random_tile_x = aa_2; }
        if (select_random_tile_y_2 >= 7){ select_random_tile_y = bb_2; }
      }
    }

    //alert(select_random_tile_x + "_" + select_random_tile_y);

    // allows the borders to expand east & west instead of just north & south
    var variance_x = Math.floor((Math.random() * 2) + 1);
    var variance_y = Math.floor((Math.random() * 2) + 1);
    if (variance_x === 1){ variance_x = -1; }
    if (variance_y === 1){ variance_y = -1; }

    // place the new border
    document.getElementById("tile_" + (select_random_tile_x + variance_x) + "_" + (select_random_tile_y + variance_y)).innerHTML = "<img src='./images/player_1_border_all.png'>";

    // reveal the map around that new border
    if (is_enabled_fog_of_war === 1 && p_color === 0){ fog_of_war_remove(select_random_tile_x,select_random_tile_y); fog_of_war_remove_mini_map(select_random_tile_x,select_random_tile_y); }

    // intelligently select specific tile at periphery of borders
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CREATES PLAYER BORDERS BASED ON THE LOCATION OF THEIR CITIES
function generate_civ_borders(value){ // value = p_color here
  var aa = "";
  var bb = "";
  var new_selected_tile = "";
  if (selected_tile_x === 0){
    for (var i = 0; i < 2; i++){
      aa = selected_tile_x + i;

      for (var j = -1; j < 2; j++){
        bb = selected_tile_y + j;
        new_selected_tile = "tile_" + aa + "_" + bb;

        document.getElementById(new_selected_tile).innerHTML = "<img src='./images/player_2_border_all.png'>";
      }
    }

    aa = map_width - 1;

    for (var j = -1; j < 2; j++){
      bb = selected_tile_y + j;
      new_selected_tile = "tile_" + aa + "_" + bb;

      document.getElementById(new_selected_tile).innerHTML = "<img src='./images/player_2_border_all.png'>";
    }
  }else{
    for (var i = -1; i < 2; i++){
      aa = selected_tile_x + i;

      for (var j = -1; j < 2; j++){
        bb = selected_tile_y + j;
        new_selected_tile = "tile_" + aa + "_" + bb;

        document.getElementById(new_selected_tile).innerHTML = "<img src='./images/player_2_border_all.png'>";
      }
    }
  }

  // generate css borders in a one-square radius from the city
  // for (var i = -1; i < 2; i++){
  //   aa = selected_tile_x + i;
  //
  //   for (var j = -1; j < 2; j++){
  //     bb = selected_tile_y + j;
  //     new_selected_tile = "tile_" + aa + "_" + bb;
  //
  //     document.getElementById(new_selected_tile).innerHTML = "<img src='./images/player_1_border_all.png'>";
  //   }
  // }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// whenever you click on a tile, this function runs...even if that tile has a unit or not
function tile_select(a,b){
  if (unit_move === 2){
    x_2 = a;
    y_2 = b;

    var x_x = Math.abs(x_1 - x_2);
    var y_y = Math.abs(y_1 - y_2);

    unit_move = 0;

    // only allow the unit to move if it has remaining movement points
    if (civ_units[p_color][selected_unit_no].unit_Movement_Remaining > 0){
      if (x_x > 1 || y_y > 1){
        // illegal move (like a chess knight) -- do nothing
      }else if(x_x === 1 || y_y === 1){
        // make impassable terrain (polar borders, mountains)
        var land_types2 = ["mountain", "ice"];
        var land_types = ["land", "grassland_hills", "desert", "desert_hills", "water"];
        for (var i = 0, length = land_types.length; i < length; i++){
          if (matrix_2[a][b].tile_Type === land_types[i]){
            // only allow the unit to move the proper amount of spaces
            civ_units[p_color][selected_unit_no].unit_Movement_Remaining--;

            selected_tile = "tile_" + a + "_" + b;
            selected_unit = xy_flag;

            // move unit
            var u_id = document.getElementById(xy_flag);
            u_id.style.left = window.getComputedStyle(document.getElementById(selected_tile)).getPropertyValue('left');
            u_id.style.top = window.getComputedStyle(document.getElementById(selected_tile)).getPropertyValue('top');

            // change unit facing direction
            if ((x_1 - x_2) === 1){
              u_id.style.transform = "rotateY(180deg)";
            }else{
              u_id.style.transform = "";
            }

            // move unit hp bar
            var u_id_hp_bar = document.getElementById(selected_unit + '_hp_bar');
            u_id_hp_bar.style.left = window.getComputedStyle(u_id).getPropertyValue('left');
            u_id_hp_bar.style.top = get_num_value(window.getComputedStyle(u_id).getPropertyValue('top')) - 7.5; // adjusts correctly now

            // move unit selector
            document.getElementById("unit_selector").style.top = u_id.style.top;
            document.getElementById("unit_selector").style.left = u_id.style.left;
            if (matrix_2[a][b].tile_Type === "water"){
              u_id.innerHTML = "<img src='./images/units/transport_boat_3.png'>";
            //}else if((matrix_2[a][b].tile_Type != "water") && (u_id.innerHTML === '<img src="./images/units/transport_boat_3.png">')){ // WORKS THE SAME AS BELOW BUT THE SECOND PART IS CRITICAL CUZ === "(' ')" IS FALSE BUT === '(" ")' IS TRUE!!!!!
            }else if(matrix_2[a][b].tile_Type != "water"){
              // u_id.innerHTML = values_units.units[get_num_value(document.getElementById(selected_unit).id)[1]].image;//civ_units[p_color][selected_unit_no].unit_Image;//values_units.units[1].image;

              // SETTLER
              if (civ_units[p_color][get_num_value(selected_unit)[1]].unit_Type === values_units.units[0].type){
                u_id.innerHTML = values_units.units[0].image;
              }

              // WARRIOR
              if (civ_units[p_color][get_num_value(selected_unit)[1]].unit_Type === values_units.units[1].type){
                u_id.innerHTML = values_units.units[1].image;
              }

              // HORSEMEN
              if (civ_units[p_color][get_num_value(selected_unit)[1]].unit_Type === values_units.units[2].type){
                u_id.innerHTML = values_units.units[2].image;
              }

              // ARCHERS
              if (civ_units[p_color][get_num_value(selected_unit)[1]].unit_Type === values_units.units[3].type){
                u_id.innerHTML = values_units.units[3].image;
              }
            }

            if (is_enabled_fog_of_war === 1 && p_color === 0){ fog_of_war_remove(x_2,y_2); fog_of_war_remove_mini_map(x_2,y_2); }
          }
        }
      }
    }
  }

  if (unit_move === 1){
    x_1 = a;
    y_1 = b;

    unit_move = 2;
  }

  // save coords of selected tile -- apparently required for several things, but may be able to be rolled into other variables
  selected_tile_x = a;
  selected_tile_y = b;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function add_unit_to_group(value){
  var unit_to_group = civ_units[p_color][get_num_value(selected_unit)[1]].unit_Type;
  if (civ_units[p_color][get_num_value(selected_unit)[1]].unit_Group != value){
    unit_group[value].push(unit_to_group);
    civ_units[p_color][get_num_value(selected_unit)[1]].unit_Group = value;
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generate_unit_div(value, value_x_pos, value_y_pos){
  var x_tile = Math.floor((Math.random()*map_width));
  var y_tile = Math.floor((Math.random()*map_height));
  if (x_tile > 10) { x_tile = 10; }
  if (y_tile > 4) { y_tile = 4; }

  if (value_x_pos >= 0){
    x_tile = value_x_pos;
    y_tile = value_y_pos;
    matrix_2[x_tile][y_tile].tile_Occupied = 0;
  } else{
    // do nothing
  }

  var terrain_types = ['land', 'grassland_hills', 'desert', 'desert_hills'];
  // needs to recall this function to try again until completed (recursion)
  if ((matrix_2[x_tile][y_tile].tile_Type != terrain_types[0] &&
        matrix_2[x_tile][y_tile].tile_Type != terrain_types[1] &&
        matrix_2[x_tile][y_tile].tile_Type != terrain_types[2] &&
        matrix_2[x_tile][y_tile].tile_Type != terrain_types[3])){
    generate_unit_div(fx);
  }

  if ((matrix_2[x_tile][y_tile].tile_Type === terrain_types[0] ||
        matrix_2[x_tile][y_tile].tile_Type === terrain_types[1] ||
        matrix_2[x_tile][y_tile].tile_Type === terrain_types[2] ||
        matrix_2[x_tile][y_tile].tile_Type === terrain_types[3]) && matrix_2[x_tile][y_tile].tile_Occupied === 1){
    generate_unit_div(fx);
  }

  if ((matrix_2[x_tile][y_tile].tile_Type === terrain_types[0] ||
        matrix_2[x_tile][y_tile].tile_Type === terrain_types[1] ||
        matrix_2[x_tile][y_tile].tile_Type === terrain_types[2] ||
        matrix_2[x_tile][y_tile].tile_Type === terrain_types[3]) && matrix_2[x_tile][y_tile].tile_Occupied === 0){
    matrix_2[x_tile][y_tile].tile_Occupied = 1; // disabled cuz would prevent units from spawning on the city if another unit was ever built there

    x = x_tile * 100;
    y = y_tile * 100;

    var unit_d_div = document.createElement("div");
      unit_d_div.id = "unit_" + p_color + "_" + value;
      unit_d_div.className = "unit_tile";
      unit_d_div.style.top = y;
      unit_d_div.onclick = function(){unit_select(this.id)};
      //unit_d_div.onmouseover = function(){if(unit_is_allowed_to_move === 1){showCoords(event)}};
      document.body.appendChild(unit_d_div);

    var unit_x_div = document.createElement("div");
      unit_x_div.id = "unit_" + p_color + "_" + value + "_hp_bar";
      unit_x_div.className = "unit_hp_bar";
      unit_x_div.style.top = y - 7.5;
      unit_x_div.style.backgroundColor = player[p_color].civ_Color;
      document.body.appendChild(unit_x_div);

    if(unit_type === "Settler"){
      unit_d_div.style.left = x;
      unit_d_div.innerHTML = values_units.units[0].image; //unit_d_div.style.backgroundImage = "url('settler.gif')";

      unit_x_div.style.left = x - 3;
    }

    if(unit_type === "Warrior"){
      unit_d_div.style.left = x;
      unit_d_div.innerHTML = values_units.units[1].image;

      unit_x_div.style.left = x - 3; //(x + 25)
    }

    if(unit_type === "Horsemen"){
      unit_d_div.style.left = x;
      unit_d_div.innerHTML = values_units.units[2].image;

      unit_x_div.style.left = x; //(x + 25)
    }

    if(unit_type === "Archers"){
      unit_d_div.style.left = x;
      unit_d_div.innerHTML = values_units.units[3].image;

      unit_x_div.style.left = x; //(x + 25)
    }

    if (is_enabled_fog_of_war === 1 && p_color === 0){ fog_of_war_remove(x_tile,y_tile); fog_of_war_remove_mini_map(x_tile,y_tile); }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERALIZATION FOR init_player_N() functions -- CURRENTLY UNUSED AND UNFINISHED
function init_civ(value){
  var unit_counter = 0;
  p_color = value;
  fx = f;
  if (value === 0){ fx = f; unit_counter = f; }
  if (value === 1){ fx = f2; unit_counter = f2; }

  var unit_num = 0;
  unit_type = values_units.units[unit_num].type;
  civ_units[p_color][unit_counter] = new unit_struct(-1,-1, values_units.units[unit_num].type, values_units.units[unit_num].move, values_units.units[unit_num].move, values_units.units[unit_num].health, values_units.units[unit_num].strength, unit_counter, player[p_color].civ_Name, values_units.units[unit_num].production, values_units.units[unit_num].class, values_units.units[unit_num].bonus_damage);

  civ_units[p_color][unit_counter].unit_X_coord = x; // do these even do anything???
  civ_units[p_color][unit_counter].unit_Y_coord = y;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// generates a new player (but should be in a diff part of the code likely) ????
function init_player_1(){
  p_color = 0; // determines the color of the unit hp bars
  fx = f;

  // generate units for the civilization
  // generate a settler
  /*unit_type = values_units.units[0].type;
  civ_units[p_color][f] = new unit_struct(-1,-1, values_units.units[0].type, values_units.units[0].move, values_units.units[0].move, values_units.units[0].health, values_units.units[0].strength, f, player[p_color].civ_Name, values_units.units[0].production, values_units.units[0].class, values_units.units[0].bonus_damage);*/
  var unit_num = 0;
  unit_type = values_units.units[unit_num].type;
  civ_units[p_color][f] = new unit_struct(-1,-1, values_units.units[unit_num].type, values_units.units[unit_num].move, values_units.units[unit_num].move, values_units.units[unit_num].health, values_units.units[unit_num].strength, f, player[p_color].civ_Name, values_units.units[unit_num].production, values_units.units[unit_num].class, values_units.units[unit_num].bonus_damage);

  civ_units[p_color][f].unit_X_coord = x; // do these even do anything???
  civ_units[p_color][f].unit_Y_coord = y;

  // generate a warrior
  f++;
  fx = f;
  /*unit_type = values_units.units[1].type;
  civ_units[p_color][f] = new unit_struct(-1,-1, values_units.units[1].type, values_units.units[1].move, values_units.units[1].move, values_units.units[1].health, values_units.units[1].strength, f, player[p_color].civ_Name, values_units.units[1].production, values_units.units[1].class, values_units.units[1].bonus_damage);*/
  var unit_num = 1;
  unit_type = values_units.units[unit_num].type;
  civ_units[p_color][f] = new unit_struct(-1,-1, values_units.units[unit_num].type, values_units.units[unit_num].move, values_units.units[unit_num].move, values_units.units[unit_num].health, values_units.units[unit_num].strength, f, player[p_color].civ_Name, values_units.units[unit_num].production, values_units.units[unit_num].class, values_units.units[unit_num].bonus_damage);

  civ_units[p_color][f].unit_X_coord = x;
  civ_units[p_color][f].unit_Y_coord = y;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function init_player_2(){
  // generates a new player (but should be in a diff part of the code likely)
  //player[1] = new civ_struct("Greece", 1, "#000033")
  p_color = 1;
  fx = f2;

  // generate units for the civilization
  unit_type = values_units.units[0].type;
  civ_units[p_color][f2] = new unit_struct(-1,-1, values_units.units[0].type, values_units.units[0].move, values_units.units[0].move, values_units.units[0].health, values_units.units[0].strength, f2, player[p_color].civ_Name, values_units.units[0].production, values_units.units[0].class, values_units.units[0].bonus_damage);

  civ_units[p_color][f2].unit_X_coord = x;
  civ_units[p_color][f2].unit_Y_coord = y;

  //f2++;
  //unit_type = values_units.units[1].type;
  //civ_units[p_color][f2] = new unit_struct(-1,-1, values_units.units[1].type, values_units.units[1].move, values_units.units[1].move, values_units.units[1].health, values_units.units[1].strength, f2, player[p_color].civ_Name, values_units.units[1].production);

  //civ_units[p_color][f2].unit_X_coord = x;
  //civ_units[p_color][f2].unit_Y_coord = y;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RETURNS THE WANTED NUMERICAL VALUE FROM A REGEXP
function get_num_value(value1, value2){
  var loc = value1;
  var search = /[0-9]/g;
  var result = loc.match(search);
  var result3 = "";
  for (var j = 0; j < result.length; j++){
    result3 = result3 + result[j];
  }

  if (typeof value2 !== "undefined"){
    var loc = value2;
    var search = /[0-9]/g;
    var result = loc.match(search);
    var result4 = "";
    for (var j = 0; j < result.length; j++){
      result4 = result4 + result[j];
    }

    return [result3, result4];
  } else{
    return result3;
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function victory_conditions(){
  play_sound("./sound/cheese.wav");
  // this should be in a game loop???
  if (num_owned_cities[1] === 0){
    victory_menu();
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var audio = document.createElement("audio");
function play_sound(value){
  if (options_audio_sound_effects_enabled === 1){
    audio.src = value;
    audio.play();
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var audio_music = document.createElement("audio");
var last_in_game_music_played = -1;
function play_music(value){
  if (options_audio_in_game_music_enabled === 1){
    // last_in_game_music_played = ????;
    audio_music.src = value;
    //audio_music.currentTime = 180;
    audio_music.volume = options_audio_in_game_music_volume;
    audio_music.play();
  }

  setInterval(function(){
    if (audio_music.ended){
      var select_random_in_game_music = Math.floor((Math.random() * audio_in_game_music.length) + 1);
      // if (select_random_in_game_music === last_in_game_music_played){
      //   play_music();
      // }
      select_random_in_game_music -= 1;
      play_music(audio_in_game_music[select_random_in_game_music]);
    }
  }, 1000);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
window.onload = function start(){
  play_sound("./sound/menu.mp3");
  document.title = "Colonial Warfare III";

  // disable to hide the title menu
  play_game();

  generate_map();

  document.getElementById('map').innerHTML = matrix;
  generate_map_borders();

  // USING A SET TIMEOUT BECAUSE IT WAS HAVING ISSUES WITH AUTOMATICALLY STARTING IN THE START() FUNCTION
  setTimeout(function(){
    generate_mini_map();
    mini_map_navigation(); // this should be okay to put in the start() function outside of a timer function afaik

    init_player_1();
    fx = 0; // resets the unit counter for the next player
    init_player_2();
    fx = 0;

    p_color = 0; // set the starting player ???

    update_top_menu();

    // center on the initial settler unit
    if (p_color === 0){
      document.body.scrollLeft = get_num_value(document.getElementById("unit_0_0").style.left) / 4;
      document.body.scrollTop = get_num_value(document.getElementById("unit_0_0").style.top) / 4;
    }

    selected_unit = "unit_0_0";
    update_unit_menu(0);
    var select_start_unit_x = get_num_value(document.getElementById(selected_unit).style.left);
    var select_start_unit_y = get_num_value(document.getElementById(selected_unit).style.top);
    tile_select(select_start_unit_x,select_start_unit_y);
    //notification_menu(); // may use this for beginning turn info like Civ does ... so keeping it here for now

    var select_random_in_game_music = Math.floor((Math.random() * audio_in_game_music.length) + 1);
    select_random_in_game_music -= 1;
    play_music(audio_in_game_music[select_random_in_game_music]);
  },500);

  get_keyboard_input();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
