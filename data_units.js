var version_info = "pa050";

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DEV OPTIONS / TOOLS
var is_enabled_fog_of_war = 1; // 0 = off, 1 = on

var options_audio_sound_effects_enabled = 1;
var options_audio_sound_effects_volume = 1;
var options_audio_in_game_music_enabled = 0;
var options_audio_in_game_music_volume = 0.2;

var options_resources = 1; // 0 = complex resources, 1 = simple resources
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var audio_in_game_music = [];
audio_in_game_music[0] = "./audio/music_1.mp3";
audio_in_game_music[1] = "./audio/music_2.mp3";
audio_in_game_music[2] = "./audio/music_3.mp3";
audio_in_game_music[3] = "./audio/music_4.mp3";
audio_in_game_music[4] = "./audio/music_5.mp3";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var policies_json = '{"government":[' +
                        '{"name":"Despotism","gold":"1","research":"-1", "id":"policy_0_0", "link":"policies_menu_select_policy(0,0)", "class":"policies_menu_links_1"},' +
                        '{"name":"Democracy","gold":"-1","research":"1", "id":"policy_0_1", "link":"policies_menu_select_policy(0,1)", "class":"policies_menu_links_1"}],' +
                      '"economy":[' +
                        '{"name":"Socialism","gold":"2","research":"-2"},' +
                        '{"name":"Capitalism","gold":"-2","research":"2"}],' +
                      '"religion":[' +
                        '{"name":"Theocracy","gold":"3","research":"-3"},' +
                        '{"name":"None/Free","gold":"-3","research":"3"}]}';

var policy_values = JSON.parse(policies_json);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var json_units = '{"units":[\
                    {\
                      "type":"Settler",\
                      "move":2,\
                      "health":1,\
                      "strength":0,\
                      "production":100,\
                      "production_original":100,\
                      "image":"<img src=./images/units/settler_2.png>",\
                      "class":"civilian"\
                    },\
                    {\
                      "type":"Warrior",\
                      "move":1,\
                      "health":5,\
                      "strength":1,\
                      "production":100,\
                      "production_original":100,\
                      "image":"<img src=./images/units/warrior_2.png>",\
                      "class":"rock",\
                      "bonus_damage":1,\
                      "sound_attack":"./audio/1.mp3"\
                    },\
                    {\
                      "type":"Horsemen",\
                      "move":1,\
                      "health":5,\
                      "strength":1,\
                      "production":100,\
                      "production_original":100,\
                      "image":"<img src=./images/units/horsemen_4.png>",\
                      "class":"paper",\
                      "bonus_damage":1\
                    },\
                    {\
                      "type":"Archers",\
                      "move":1,\
                      "health":5,\
                      "strength":1,\
                      "production":100,\
                      "production_original":100,\
                      "image":"<img src=./images/units/archers_3.png>",\
                      "class":"scissors",\
                      "bonus_damage":1\
                    }\
                  ]}';

var values_units = JSON.parse(json_units);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var json_resources = '{"resource":[\
                    {\
                      "name":"Gold",\
                      "image":"<img src=./images/resources/resource_gold_1.png>",\
                      "gold":2,\
                      "research":0\
                    },\
                    {\
                      "name":"Copper",\
                      "image":"<img src=./images/resources/resource_copper_1.png>",\
                      "gold":1,\
                      "research":0\
                    },\
                    {\
                      "name":"Iron",\
                      "image":"<img src=./images/resources/resource_iron_1.png>",\
                      "gold":1,\
                      "research":0\
                    },\
                    {\
                      "name":"Mineral",\
                      "image":"<img src=./images/resources/resource_mineral_1.png>",\
                      "gold":2,\
                      "research":1\
                    }\
                  ]}';

var values_resources = JSON.parse(json_resources);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var json_resources_simple = '{"resource":[\
                    {\
                      "name":"Mineral",\
                      "image":"<img src=./images/resources/resource_mineral_5.png>",\
                      "gold":2,\
                      "research":1,\
                      "production":3\
                    },\
                    {\
                      "name":"Nutrient",\
                      "image":"<img src=./images/resources/resource_nutrient_3.png>",\
                      "gold":1,\
                      "research":2,\
                      "production":1\
                    }\
                  ]}';

var values_resources_simple = JSON.parse(json_resources_simple);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var map_width = 40;
var map_height = 18;

var a = [];
var b = [];

var k = [];
k[0] = 0;

var h = [];
h[0] = 0;

var matrix = [];

var sp = 0;
var tilex = "";
var selected_tile = "";
var unit_move = 0;
var selected_unit = "";

var turn = 1;

var gold = [];
gold[0] = 0;
gold[1] = 0;

var gold_income = [];
gold_income[0] = 0;
gold_income[1] = 0;

var research_income = [];
research_income[0] = 0;

var resources_mineral_player = [];
resources_mineral_player[0] = 0;

var resources_nutrient_player = [];
resources_nutrient_player[0] = 0;

var selected_tile_x = 0;
var selected_tile_y = 0;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// the following for tile_select()
var tile_preserve = 0;
var old_selected_tile = "";

var old_left = "";
var old_top = "";
var new_left = "";
var new_top = "";

var x_1 = null; // old
var y_1 = null; // old
var x_2 = null; // new
var y_2 = null; // new
var xy_flag = 0;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// for unit_select()
var another_unit_is_selected = 0;
var selected_unit_no = "";
var unit_value = "";

var unit_attack = 0;
var perform_attack = 0;
var unit_that_is_attacking = [];

var unit_selector_div = document.createElement("div");
  unit_selector_div.id = "unit_selector";
  unit_selector_div.className = "unit_selector";
  unit_selector_div.style.top = -100;
  unit_selector_div.style.left = -100;
  document.body.appendChild(unit_selector_div);

var attack_selector_div = document.createElement("div");
  attack_selector_div.id = "attack_selector";
  attack_selector_div.className = "attack_selector";
  attack_selector_div.style.top = -100;
  attack_selector_div.style.left = -100;
  document.body.appendChild(attack_selector_div);

var player_1_border_all_div = document.createElement("div");
  player_1_border_all_div.id = "player_1_border_all";
  player_1_border_all_div.className = "player_border_1";
  player_1_border_all_div.style.top = -100;
  player_1_border_all_div.style.left = -100;
  document.body.appendChild(player_1_border_all_div);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var research_turns = "NA";
var research_name_current = "NO RESEARCH";

// tech_struct(name,research_required,status,provides)
// status: 0 = researched, 1 = currently researching, 2 = available to research, 3 = unavailable to research
// power / military
var technology_power = [];
var first_tech = null;
first_tech = values_units.units[1].type;
if (first_tech === values_units.units[1].type){
  // then pic the others in order
  technology_power[0] = new tech_struct("TECH POWER 1",5,2,values_units.units[3].type,"Ranged Warfare I");
  technology_power[1] = new tech_struct("TECH POWER 2",5,3,values_units.units[2].type,"Mounted Warfare I");
}else{
  technology_power[0] = new tech_struct("TECH POWER 1",5,2,values_units.units[2].type,"Mounted Warfare I");
  technology_power[1] = new tech_struct("TECH POWER 2",5,3,values_units.units[3].type,"Ranged Warfare I");
}
technology_power[2] = new tech_struct("TECH POWER 3",5,3,"","???"); // embarkation ???

// production / economics
var technology_production = [];
technology_production[0] = new tech_struct("TECH PRODUCTION 1",5,2,"Foodstuffs","Cultivation");
technology_production[1] = new tech_struct("TECH PRODUCTION 2",5,3,"Mining (Gold), Lumber","Resource Extraction");
technology_production[2] = new tech_struct("TECH PRODUCTION 3",5,3,"","Engineering"); // embarkation

// civics / growth
var technology_civics = [];
technology_civics[0] = new tech_struct("TECH CIVICS 1",5,2,"","Writing");
technology_civics[1] = new tech_struct("TECH CIVICS 2",5,3,"","Mathematics");
technology_civics[2] = new tech_struct("TECH CIVICS 3",5,3,"","Currency");
technology_civics[3] = new tech_struct("TECH CIVICS 4",5,3,"","???");
technology_civics[4] = new tech_struct("TECH CIVICS 5",5,3,"","???");
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// units that exist for each civ
var civ_units = [];
civ_units[0] = []; // civ 1 units -- generally the player
civ_units[1] = []; // civ 2 units -- generally the AI

// number of units that were deleted for each civ -- temp fix ??? cuz if destroy_unit then cant splice the array or it fucks it up...maybe best to fix this later
var civ_units_deleted = [];
civ_units_deleted[0] = 0;
civ_units_deleted[1] = 0;

var unit_group = [];
unit_group[0] = [];
unit_group[1] = [];

var civ_population = [];
civ_population[0] = 0;
civ_population[1] = 0;

var civs_at_war = [];
civs_at_war[0] = [];
civs_at_war[1] = [];

var notification_alert = [];
notification_alert[0] = undefined;

var get_enemy_city_coords = [];
get_enemy_city_coords[0] = [];
get_enemy_city_coords[1] = [];

var unit_x = [];
var unit_type = "";

var is_a_menu_open = 0; // flag to ID if a menu is open for keyboard_input.js

// the positions for creating new units
var x = 100;
var y = 300;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var f = 0; // this would be good for player stats cuz shows how many total units have been created / controlled by the player
var f2 = 0;
var fx = 0;

var p_color = 0;

// or should this be civ_struct?  well...a bunch of civs arent in an active game...but should create structs for all civs then choose if they are active or not
var player = []
player[0] = new civ_struct("Player 1", 1, "#FF00FF");
player[1] = new civ_struct("Player 2", 1, "#000033"); // must be in init_player_1() not init_player_2()

function civ_struct(name, active, color){
  this.civ_Name = name;
  this.civ_Active = 0; // 0 = not in game, 1 = yes in game
  // need a civ_Position to determine which civ is Player 1, Player 2, etc.
  this.civ_Color = color;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function tech_struct(name,research_required,status,provides,listed_name){
  this.tech_Name = name;
  this.tech_Research_Required = research_required;
  this.tech_Status = status; // status: 0 = researched, 1 = currently researching, 2 = available to research, 3 = unavailable to research
  this.tech_Provides = provides;
  this.tech_Listed_Name = listed_name;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function unit_struct(x_pos,y_pos,type,move,move_remain,health,strength,div,owner,production,class1,bonus_damage,group,time,upkeep){
  this.unit_X_Coord = x_pos;
  this.unit_Y_Coord = y_pos;
  this.unit_Type = type;
  this.unit_Movement = move;
  this.unit_Movement_Remaining = move_remain;
  this.unit_Health = health;
  this.unit_Strength = strength;
  this.unit_Div = new generate_unit_div(div, x_pos, y_pos);
  this.unit_Owner = owner;
  this.unit_Production = production;
  this.unit_Class = class1;
  this.unit_Bonus_Damage = bonus_damage;
  this.unit_Group = group;
  //this.unit_Build_Time = time
  //this.unit_Upkeep = upkeep
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
