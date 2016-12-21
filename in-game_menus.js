////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// METHOD TO SAVE SPACE AND MAYBE PROCESSING TIME BY PUTTING THE SUB MENU TITLE BARS INTO VARIABLES...and easier to edit one thing than many
var sub_menu_title = "";
var sub_menu_title_bar = ["<table class='sub_menu_title_bar'>\
<tr><td><b class='sub_menu_title_bar_title'>","</b>\
<div class='sub_menu_title_bar_return'>[<a href='javascript:void(0);' onclick='menu_return();'>Return</a>]</div></td></tr></table>"];

// METHOD
// var menu_title_bar = [sub_menu_title_bar[0],"CITY MENU",sub_menu_title_bar[1]].join("");
// "+ menu_title_bar +"\
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function main_menu(){
  menu_return();
  is_a_menu_open = 1;

  // TITLE BAR
  var menu_title_bar = [sub_menu_title_bar[0],"MAIN MENU",sub_menu_title_bar[1]].join("");

  document.getElementById('game_menu_2').style.width = "100%";
  document.getElementById('game_menu_1').style.width = "20%";
  document.getElementById('game_menu_1').innerHTML = "\
  "+ menu_title_bar +"\
  <table class='main_menu_options'>\
  <tr class='' onclick='save_game_menu()' id='main_menu_options'><td style='color:#000;'>Save</td></tr></table>\
  <table class='main_menu_options'>\
  <tr class='' onclick='load_game_menu()' id='main_menu_options'><td style='color:#000;'>Load</td></tr></table>\
  <table class='main_menu_options'>\
  <tr class='' onclick='guide_menu()' id='main_menu_options'><td style='color:#000;'>Game Guide</td></tr></table>\
  <table class='main_menu_options'>\
  <tr class='' onclick='hotkeys_menu()' id='main_menu_options'><td>Hotkeys</td></tr></table>\
  <table class='main_menu_options'>\
  <tr class='' onclick='options_menu()' id='main_menu_options'><td style='color:#000'>Options</td></tr></table>\
  <table class='main_menu_options'>\
  <tr class='' onclick='quit_game()' id='main_menu_options'><td>Quit Game</td></tr>\
  </table>\
  "
  document.getElementById('game_menu_1').style.border = "1px solid #FFFFFF";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function menu_return(value){
  document.getElementById('game_menu_2').style.width = "0%";

  var objects_to_clear = ['game_menu_1', 'policies_menu', 'econ_menu_1', 'res_menu_1',
                          'city_menu_1', 'tech_0', 'tech_1', 'hotkeys_menu', 'victory_menu',
                          'notification_menu'];
  for (var i = 0, length = objects_to_clear.length; i < length; i++){
    document.getElementById(objects_to_clear[i]).style.width = "0%";
    //document.getElementById(objects_to_clear[i]).style.left = "20%";
    //document.getElementById(objects_to_clear[i]).style.top = "20%";
    document.getElementById(objects_to_clear[i]).innerHTML = "";
    document.getElementById(objects_to_clear[i]).style.border = "";
  }

  is_a_menu_open = 0;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// UPDATE TOP MENU ////////////////////////////////////////////////////////////////////////////////////////////////////////////
function update_top_menu(){
  var top_menu_no_research = ["&nbsp;<img src='./images/icons/icon_policies.png'> <font color=#00AAFF><a href='javascript:void(0);' onclick='policies_menu()'>Policies</a></font> | <img src='./images/icons/icon_gold.gif'> <font color=#FFFF00> ", gold[p_color], " <a href='javascript:void(0);' onclick='economy_menu()'>Economy</a> (", calculate_gold(1), ")</font> | <img src='./images/icons/icon_research.gif'> <font color=#00AAFF> ", research_income[0], " <a href='javascript:void(0);' onclick='research_menu()' style='color:#F00'>", research_name_current, "</a> (", research_turns, ")</font> |"].join("");

  var top_menu_has_research = ["&nbsp;<img src='./images/icons/icon_policies.png'> <font color=#00AAFF><a href='javascript:void(0);' onclick='policies_menu()'>Policies</a></font> | <img src='./images/icons/icon_gold.gif'> <font color=#FFFF00> ", gold[p_color], " <a href='javascript:void(0);' onclick='economy_menu()'>Economy</a> (", calculate_gold(1), ")</font> | <img src='./images/icons/icon_research.gif'> <font color=#00AAFF> ", research_income[0], " <a href='javascript:void(0);' onclick='research_menu()'>", research_name_current, "</a> (", research_turns, ")</font> |"].join("");

  if (research_name_current === "NO RESEARCH"){
    document.getElementById('top_menu').innerHTML = top_menu_no_research;
  } else{
    document.getElementById('top_menu').innerHTML = top_menu_has_research;
  }

  document.getElementById('top_menu_2').innerHTML = "\
  &nbsp;Turn: "+turn+" \
  | "+player[0].civ_Name+" \
  || <a href='javascript:void(0);' onclick='main_menu()'>MENU</a>&nbsp;\
  "
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function hotkeys_menu(){
  menu_return();
  is_a_menu_open = 1;

  // TITLE BAR
  var menu_title_bar = [sub_menu_title_bar[0],"HOTKEYS MENU",sub_menu_title_bar[1]].join("");

  document.getElementById('hotkeys_menu').style.left = "20%";

  document.getElementById('game_menu_2').style.width = "100%"
  document.getElementById('hotkeys_menu').style.width = "60%"
  document.getElementById('hotkeys_menu').innerHTML = "\
  "+ menu_title_bar +"\
  <table class='hotkeys_menu_child_window_1'>\
  <tr class='hotkeys_menu_child_window_2'>\
  <td class='hotkey_menu_hotkey'>ESC</td><td class='hotkey_menu_description'>Closes any open windows and menus.</td>\
  <td class='hotkey_menu_blank'>&nbsp;</td>\
  <td class='hotkey_menu_hotkey'>C</td><td class='hotkey_menu_description'>Opens up the city menu.</td>\
  </tr>\
  <tr class='hotkeys_menu_child_window_2'>\
  <td class='hotkey_menu_hotkey'>F1</td><td class='hotkey_menu_description'>Opens the policies menu.</td>\
  <td class='hotkey_menu_blank'>&nbsp;</td>\
  <td class='hotkey_menu_hotkey'>B</td><td class='hotkey_menu_description'>Commands a settler unit to build a city.</td>\
  </tr>\
  <tr class='hotkeys_menu_child_window_2'>\
  <td class='hotkey_menu_hotkey'>F2</td><td class='hotkey_menu_description'>Opens the economy menu.</td>\
  <td class='hotkey_menu_blank'>&nbsp;</td>\
  <td class='hotkey_menu_hotkey'>A</td><td class='hotkey_menu_description'>Commands a military unit to attack another unit.</td>\
  </tr>\
  <tr class='hotkeys_menu_child_window_2'>\
  <td class='hotkey_menu_hotkey'>F3</td><td class='hotkey_menu_description'>Opens the research menu.</td>\
  <td class='hotkey_menu_blank'>&nbsp;</td>\
  </tr>\
  <tr class='hotkeys_menu_child_window_2'>\
  <td class='hotkey_menu_hotkey'>F10</td><td class='hotkey_menu_description'>Opens the main in-game menu.</td>\
  <td class='hotkey_menu_blank'>&nbsp;</td>\
  </tr>\
  </table>"
  document.getElementById('hotkeys_menu').style.border = "1px solid #FFFFFF"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function policies_menu_select_policy(value1, value2){
  // impliment the policy for the user
  if (value1 === 0){
    gold_income = gold_income + parseInt(policy_values.government[value2].gold);
    policy_values.government[value2].class = "policies_menu_links_2"; // CURRENTLY BROKEN
  }

  if (value1 === 1){
    gold_income = gold_income + parseInt(policy_values.economy[value2].gold);
  }

  if (value1 === 2){
    gold_income = gold_income + parseInt(policy_values.religion[value2].gold);
  }

  // first change the other policies colors to normal (& disable them -- how?)
  for (var i = 0; i < 4; i++){
    for (var j = 0; j < 4; j++){
      // then turn that policy a diff color so the user can see that it is selected as their policy
      if (i === value1 && j === value2){
        document.getElementById('policy_' + value1 + '_' + value2).className = "policies_menu_links_2";
        //policy_values.government[value2].class = "policies_menu_links_2"; // CURRENTLY BROKEN
      } else{
        document.getElementById('policy_' + i + '_' + j).className = "policies_menu_links_1";
        //policy_values.government[value2].class = "policies_menu_links_1";
      }
    }
  }
}

function policies_menu(){
  menu_return();
  is_a_menu_open = 1;

  // TITLE BAR
  var menu_title_bar = [sub_menu_title_bar[0],"POLICIES",sub_menu_title_bar[1]].join("");

  document.getElementById('game_menu_2').style.width = "100%";
  document.getElementById('policies_menu').style.width = "60%";
  document.getElementById('policies_menu').style.border = "1px solid #FFFFFF";

  document.getElementById('policies_menu').innerHTML = "\
  "+ menu_title_bar +"\
  <br>\
  <div style='position:absolute; left:2.5%; background:linear-gradient(#008, #004); width:20%; border:1px solid #444;'>\
  <center>GOVERNMENT</center>\
  <hr size=1>\
  <a href='javascript:void(0);' onclick=" + policy_values.government[0].link + " id=" + policy_values.government[0].id + " class=" + policy_values.government[0].class + ">" + policy_values.government[0].name + "</a> \
  [" + policy_values.government[0].gold + " <img src='./images/icons/icon_gold.gif'>, \
  " + policy_values.government[0].research + " <img src='./images/icons/icon_research.gif'>]\
  <br>\
  <a href='javascript:void(0);' onclick=" + policy_values.government[1].link + " id=" + policy_values.government[1].id + " class=" + policy_values.government[0].class + ">" + policy_values.government[1].name + "</a> \
  [" + policy_values.government[1].gold + " <img src='./images/icons/icon_gold.gif'>, \
  " + policy_values.government[1].research + " <img src='./images/icons/icon_research.gif'>]\
  </div>\
  <div style='position:absolute; left:25%; background:linear-gradient(#008, #004); width:20%; border:1px solid #444;'>\
  <center>ECONOMY</center>\
  <hr size=1>\
  " + policy_values.economy[0].name + " \
  [" + policy_values.economy[0].gold + " <img src='./images/icons/icon_gold.gif'>, \
  " + policy_values.economy[0].research + " <img src='./images/icons/icon_research.gif'>]\
  <br>\
  " + policy_values.economy[1].name + " \
  [" + policy_values.economy[1].gold + " <img src='./images/icons/icon_gold.gif'>, \
  " + policy_values.economy[1].research + " <img src='./images/icons/icon_research.gif'>]\
  </div>\
  <div style='position:absolute; left:47.5%; background:linear-gradient(#008, #004); width:20%; border:1px solid #444;'>\
  <center>RELIGION</center>\
  <hr size=1>\
  " + policy_values.religion[0].name + " \
  [" + policy_values.religion[0].gold + " <img src='./images/icons/icon_gold.gif'>, \
  " + policy_values.religion[0].research + " <img src='./images/icons/icon_research.gif'>]\
  <br>\
  " + policy_values.religion[1].name + " \
  [" + policy_values.religion[1].gold + " <img src='./images/icons/icon_gold.gif'>, \
  " + policy_values.religion[1].research + " <img src='./images/icons/icon_research.gif'>]\
  </div>\
  <div style='position:absolute; left:70%; background:linear-gradient(#008, #004); width:20%; border:1px solid #444;'>\
  <center>???</center>\
  <hr size=1>\
  ???<br>\
  ???\
  </div>";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function economy_menu(){
  menu_return();
  is_a_menu_open = 1;

  check_civ_resources();
  calculate_gold(1);

  // TITLE BAR
  var menu_title_bar = [sub_menu_title_bar[0],"ECONOMY",sub_menu_title_bar[1]].join("");

  document.getElementById('game_menu_2').style.width = "100%"
  document.getElementById('econ_menu_1').style.width = "20%"


  if (options_resources === 1){
    document.getElementById('econ_menu_1').innerHTML = "\
    "+ menu_title_bar +"\
    <table class='economy_menu_child_window_1'>\
    <tr class='economy_menu_child_window_2'><td>\
    EXPENSES\
    <br>Units: " + (civ_units[p_color].length - num_owned_cities[p_color] + (civ_units_deleted[p_color] * (-1))) + "\
    <br>Unit upkeep: " + ((civ_units[p_color].length * 1) - num_owned_cities[p_color]) +"\
    <br>Structure upkeep:\
    <br>Other costs:\
    <br>\
    <br>INCOME\
    <br>Population: " + civ_population[0] + "\
    <br>Population general tax: " + (civ_population[0] * 1) + "\
    <br>Minerals: " + resources_mineral_player[0] + " (" + resources_mineral_player[0] * values_resources_simple.resource[0].gold + ")\
    <br>Nutrients: " + resources_nutrient_player[0] + " (" + resources_nutrient_player[0] * values_resources_simple.resource[1].gold + ")\
    <br>\
    <br>NET: " + calculate_gold(1) + "\
    </td></tr></table>\
    "
  }

  if (options_resources === 0){
    document.getElementById('econ_menu_1').innerHTML = "\
    "+ menu_title_bar +"\
    <table class='economy_menu_child_window_1'>\
    <tr class='economy_menu_child_window_2'><td>\
    EXPENSES\
    <br>Units: " + (civ_units[p_color].length - num_owned_cities[p_color] + (civ_units_deleted[p_color] * (-1))) + "\
    <br>Unit upkeep: " + ((civ_units[p_color].length * 1) - num_owned_cities[p_color]) +"\
    <br>Structure upkeep:\
    <br>Other costs:\
    <br>\
    <br>INCOME\
    <br>Population: " + civ_population[0] + "\
    <br>Population general tax: " + (civ_population[0] * 1) + "\
    <br>Gold Resources: " + player_1_num_resources + " (" + player_1_num_resources * values_resources.resource[0].gold + ")\
    <br>\
    <br>NET: " + calculate_gold(1) + "\
    </td></tr></table>\
    "
  }

  document.getElementById('econ_menu_1').style.border = "1px solid #FFFFFF";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var tech_status_color = ["#836234", "#004499", "#008800", "#111111"];
var tech_status_border = ["2px dashed #FFD800"];
var tech_names = ["power", "production", "civics"];

function research_menu_select_this_research(value_tech, value){
  var result3 = get_num_value(value);

  var select_tech = eval(["technology_", value_tech, "[", result3, "]"].join(""));

  for (var i = 0, length = tech_names.length; i < length; i++){
    if (value_tech === tech_names[i]){
      if (select_tech.tech_Status === 2){
        research_name_current = select_tech.tech_Name;
        research_turns = select_tech.tech_Research_Required;

        // change color of tech when it is selected as being currently researched
        document.getElementById(value).style.background = tech_status_color[1];
        document.getElementById(value).style.border = tech_status_border;

        select_tech.tech_Status = 1;
      }

      /* // to stop researching a tech currently being researched
      if (select_tech.tech_Status === 1){
        research_name_current = select_tech.tech_Name;
        research_turns = select_tech.tech_Research_Required;

        // change color of tech when it is selected as being currently researched
        select_tech.tech_Status = 2;
      }
      */
    }
  }

  update_top_menu();
}

function research_menu_generate_divs(){
  for (var i = 0, length = technology_power.length; i < length; i++){
    var new_tech_power = document.createElement("div");
      new_tech_power.id = "tech_power_" + i;
      new_tech_power.style.left = (i * 25) + 2 + "%";
      new_tech_power.style.top = 10 + "%";
      new_tech_power.innerHTML = technology_power[i].tech_Listed_Name+" ("+technology_power[i].tech_Research_Required+")\
      <br><span style='text-align:left;'>"+technology_power[i].tech_Provides+"</span>\
      ";
      new_tech_power.className = "tech_2";
      new_tech_power.onclick = function(){research_menu_select_this_research("power", this.id); void(0);};
      document.getElementById("res_menu_1").appendChild(new_tech_power);
  }

  var new_tech_production = [];
  for (var i = 0, length = technology_production.length; i < length; i++){
    new_tech_production[i] = document.createElement("div");
      new_tech_production[i].id = "tech_production_" + i;
      new_tech_production[i].style.left = (i * 25) + 2 + "%";
      new_tech_production[i].style.top = 30 + "%";
      new_tech_production[i].innerHTML = technology_production[i].tech_Listed_Name+" ("+technology_production[i].tech_Research_Required+")\
      <br><span style='text-align:left;'>"+technology_production[i].tech_Provides+"</span>\
      ";
      new_tech_production[i].className = "tech_2";
      new_tech_production[i].onclick = function(){research_menu_select_this_research("production", this.id); void(0);};
      document.getElementById("res_menu_1").appendChild(new_tech_production[i]);
  }

  for (var i = 0, length = technology_civics.length; i < length; i++){
    var new_tech_civics = document.createElement("div");
      new_tech_civics.id = "tech_civics_" + i;
      new_tech_civics.style.left = (i * 25) + 2 + "%";
      new_tech_civics.style.top = 50 + "%";
      new_tech_civics.innerHTML = technology_civics[i].tech_Listed_Name+" ("+technology_civics[i].tech_Research_Required+")";
      new_tech_civics.className = "tech_2";
      new_tech_civics.onclick = function(){research_menu_select_this_research("civics", this.id); void(0);};
      document.getElementById("res_menu_1").appendChild(new_tech_civics);
  }
}

function research_menu(){
  menu_return();
  is_a_menu_open = 1;

  // TITLE BAR
  var menu_title_bar = [sub_menu_title_bar[0],"RESEARCH",sub_menu_title_bar[1]].join("");

  document.getElementById('game_menu_2').style.width = "100%"
  document.getElementById('res_menu_1').style.width = "60%"
  document.getElementById('res_menu_1').innerHTML = "\
  "+ menu_title_bar +"\
  <br>"
  document.getElementById('res_menu_1').style.border = "1px solid #FFFFFF"

  // create the research divs -- may have to do this elsewhere since it may be laggy later idk
  research_menu_generate_divs();

  //var tech_status_color = ["#000055", "#FFAA00", "#FF4400", "#111111"];
  for (var i = 0, length = technology_power.length; i < length; i++){
    if (technology_power[i].tech_Status === 0){
      document.getElementById('tech_power_'+i).style.background = tech_status_color[0];
    }
    if (technology_power[i].tech_Status === 1){
      document.getElementById('tech_power_'+i).style.background = tech_status_color[1];
      document.getElementById('tech_power_'+i).style.border = tech_status_border;
    }
    if (technology_power[i].tech_Status === 2){
      document.getElementById('tech_power_'+i).style.background = tech_status_color[2];
    }
    if (technology_power[i].tech_Status === 3){
      document.getElementById('tech_power_'+i).style.background = tech_status_color[3];
    }
  }

  for (var i = 0, length = technology_production.length; i < length; i++){
    if (technology_production[i].tech_Status === 0){
      document.getElementById('tech_production_'+i).style.background = tech_status_color[0];
    }
    if (technology_production[i].tech_Status === 1){
      document.getElementById('tech_production_'+i).style.background = tech_status_color[1];
      document.getElementById('tech_production_'+i).style.border = tech_status_border;
    }
    if (technology_production[i].tech_Status === 2){
      document.getElementById('tech_production_'+i).style.background = tech_status_color[2];
    }
    if (technology_production[i].tech_Status === 3){
      document.getElementById('tech_production_'+i).style.background = tech_status_color[3];
    }
  }

  for (var i = 0, length = technology_civics.length; i < length; i++){
    if (technology_civics[i].tech_Status === 0){
      document.getElementById('tech_civics_'+i).style.background = tech_status_color[0];
    }
    if (technology_civics[i].tech_Status === 1){
      document.getElementById('tech_civics_'+i).style.background = tech_status_color[1];
      document.getElementById('tech_civics_'+i).style.border = tech_status_border;
    }
    if (technology_civics[i].tech_Status === 2){
      document.getElementById('tech_civics_'+i).style.background = tech_status_color[2];
    }
    if (technology_civics[i].tech_Status === 3){
      document.getElementById('tech_civics_'+i).style.background = tech_status_color[3];
    }
  }

  /*
  var result3 = get_num_value(value);

  var select_tech = eval(["technology_", value_tech, "[", result3, "]"].join(""));

  var tech_names = ["power", "production", "civics"];
  for (var i = 0, length = tech_names.length; i < length; i++){
    if (tech_names[i] === ??????????????){
      for (var i = 0, length = ????????.length; i < length; i++){
        if (eval(tech_))
        research_name_current = select_tech.tech_Name;
        research_turns = select_tech.tech_Research_Required;
      }
    }
  }
  */
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function research_select(value2){
  var loc = value2;
  var search = /[0-9]/g;
  var result = loc.match(search);
  var result3 = "";
  for (var j = 0; j < result.length; j++){
    result3 = result3 + result[j];
  }

  var value = result3; // for "technology[value].tech_Status" because it was faster than re-writing all the variables

  var value = get_num_value(value2);
  //var value = eval(["technology_", value_tech, "[", result3, "]"].join(""));

  if (technology[value].tech_Status === 0){
    // do not allow color change
  }

  if (technology[value].tech_Status === 1){
    // disable the research
  }

  if (technology[value].tech_Status === 2){
    // enable the research
    document.getElementById('tech_'+value).style.backgroundColor = "#00AA00";
    technology[value].tech_Status = 1;

    research_name_current = technology[value].tech_Name;

    research_turns = technology[value].tech_Research_Required;
  }

  if (technology[value].tech_Status === 3){
    // do not allow color change
  }
  // should we allow for many things to be researched??? (faster but focused progress VS slower but broad progress)

  update_top_menu();
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERATE THE TECHNOLOGY DIVS FOR THE RESEARCH TREE -- maybe have this load only when the player clicks on it for faster
// initial game loading -- NO LONGER IN USE AFAIK (SAFE TO DELETE)
var num_techs = 2;
var tech = [];
for (var i = 0; i < num_techs; i++){
  tech[i] = document.createElement("div");
  tech[i].id = "tech_" + i;
  tech[i].className = "tech";
  tech[i].onclick = function(){ research_select(this.id); };
  document.body.appendChild(tech[i]);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var city_menu_enabled_list = [];
city_menu_enabled_list[0] = []; // player 1's list of enabled units, structures, and other things

var city_menu_enabled_list_2 = [];
city_menu_enabled_list_2[0] = [];


function city_menu(){
  menu_return();
  is_a_menu_open = 1;

  // TITLE BAR
  var menu_title_bar = [sub_menu_title_bar[0],"CITY MENU",sub_menu_title_bar[1]].join("");

  // calculate total production needed for every item -- TEMP SOLUTION -- ONLY WORKS FOR PLAYER 1
  var total_prod = (resources_mineral_player[0] * values_resources_simple.resource[0].production) + (resources_nutrient_player[0] * values_resources_simple.resource[1].production);

  for (var z = 0, length = values_units.units.length; z < length; z++){
    values_units.units[z].production = values_units.units[z].production_original;
    values_units.units[z].production -= total_prod;
  }

  // UNITS
  var city_menu_units = ["<table class='city_menu_build_item'><tr>\
  <td class='city_menu_build_item_title'>Units</td></tr></table>\
  <table class='city_menu_build_item' onclick='create_unit(0,1)' id='city_menu_build_item'><tr>\
  <td class='city_menu_build_item_image'>&nbsp;</td>\
  <td class='city_menu_build_item'>",values_units.units[1].type,"\
  <br>",values_units.units[1].production," Turns\
  &nbsp;[Buy 100g]</td></tr></table>",city_menu_enabled_list_2[0]].join("");
  /*var city_menu_units = ["<table class='city_menu_build_item'><tr>\
  <td class='city_menu_build_item_title'>Units</td></tr></table>\
  <table class='city_menu_build_item' onclick='create_unit(0,1)' id='city_menu_build_item'><tr>\
  <td class='city_menu_build_item_image'>&nbsp;</td>\
  <td class='city_menu_build_item'>",values_units.units[1].type,"\
  <br>",values_units.units[1].production," Turns\
  &nbsp;[Buy 100g]</td></tr></table>\
  <table class='city_menu_build_item' onclick='create_unit()' id='city_menu_build_item'><tr>\
  <td class='city_menu_build_item_image'>&nbsp;</td>\
  <td class='city_menu_build_item'>",values_units.units[2].type,"\
  <br>",values_units.units[2].production," Turns</td></tr></table>\
  <table class='city_menu_build_item' onclick='create_unit()' id='city_menu_build_item'><tr>\
  <td class='city_menu_build_item_image'>&nbsp;</td>\
  <td class='city_menu_build_item'>",values_units.units[3].type,"\
  <br>",values_units.units[3].production," Turns</td></tr></table>\
  <table class='city_menu_build_item' onclick='create_unit()' id='city_menu_build_item'><tr>\
  <td class='city_menu_build_item_image'>&nbsp;</td>\
  <td class='city_menu_build_item'>Catapult\
  <br>",unit_x.unit_Production," Turns</td></tr></table>",city_menu_enabled_list_2[0]].join("");*/

  // STRUCTURES
  var city_menu_structures = ["<table class='city_menu_build_item'><tr>\
  <td class='city_menu_build_item_title'>Structures</td></tr></table>"].join("");

  // OTHER
  var city_menu_other = ["<table class='city_menu_build_item'><tr>\
  <td class='city_menu_build_item_title'>Other</td></tr></table>"].join("");

  document.getElementById('game_menu_2').style.width = "100%"
  document.getElementById('city_menu_1').style.width = "20%"
  document.getElementById('city_menu_1').innerHTML = "\
  "+ menu_title_bar +"\
  "+ city_menu_units +"\
  "+ city_menu_structures +"\
  "+ city_menu_other +"\
  ";
  document.getElementById('city_menu_1').style.border = "1px solid #FFFFFF"
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// THE IN-GAME VICTORY MENU
function victory_menu(){
  menu_return();
  is_a_menu_open = 1;

  // TITLE BAR
  var menu_title_bar = [sub_menu_title_bar[0],"VICTORY MENU",sub_menu_title_bar[1]].join("");

  document.getElementById('game_menu_2').style.width = "100%";
  document.getElementById('victory_menu').style.width = "20%";
  document.getElementById('victory_menu').innerHTML = "\
  "+ menu_title_bar +"\
  <a href='javascript:window.location.reload();'>Start a new game.</a>\
  ";
  document.getElementById('victory_menu').style.border = "1px solid #FFFFFF";
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function notification_menu(value){
  menu_return();
  is_a_menu_open = 1;

  // TITLE BAR
  var menu_title_bar = [sub_menu_title_bar[0],"NOTIFICATION MENU",sub_menu_title_bar[1]].join("");

  // document.getElementById('game_menu_2').style.width = "100%";
  document.getElementById('notification_menu').style.width = "20%";

  if (value === "tech"){
    var notification = "Research completed.";
  }else{
    //var notification = "";

    document.getElementById('notification_menu').style.width = "0%";
  }

  document.getElementById('notification_menu').innerHTML = "\
  "+ menu_title_bar +"\
  "+ notification +"\
  ";

  document.getElementById('notification_menu').style.border = "1px solid #FFFFFF";

  if (value === undefined){
    menu_return();
  }

  notification_alert[p_color] = undefined;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
