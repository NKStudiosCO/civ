////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function tile_struct(x_pos,y_pos,type,occupied){
  this.tile_X = x_pos;
  this.tile_Y = y_pos;
  this.tile_Type = type;
  this.tile_Occupied = occupied // occupied by units:  0 = no, 1 = yes
  //this.tile_Owner = owner
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function generate_map_borders(){
  //alert(document.getElementById("tile_0_0").className);
  //alert(matrix_2[0][0].tilex)
  var terrain_types = ['land', 'grassland_hills', 'desert', 'desert_hills'];
  for(var i = 0; i < map_width; i++) {
    for(var j = 0; j < (map_height - 1); j++) {

      ////////////////////////////////////////////////////////
      // GRASS TILES - SINGLE SIDED
      // FOR BOTTOM OF LAND
      if (j > 0 && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water")){
        if ((document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "land") ||
            (document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "grassland_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_one";

          //matrix_2[i][j].tilex = "water_all";
        }
      }

      // FOR TOP OF LAND
      if (j > 0 && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water")){
        if ((document.getElementById("tile_"+(i)+"_"+(j+1)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i)+"_"+(j+1)+"").className === "land") ||
            (document.getElementById("tile_"+(i)+"_"+(j+1)+"").className === "grassland_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_one";
          document.getElementById("tile_"+(i)+"_"+(j)+"").style.transform = "rotate(180deg)";

          //matrix_2[i][j].tilex = "water_all";
        }
      }

      // FOR LEFT OF LAND
      if (i < (map_width-1) && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water")){
        if ((document.getElementById("tile_"+(i+1)+"_"+(j)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i+1)+"_"+(j)+"").className === "land") ||
            (document.getElementById("tile_"+(i+1)+"_"+(j)+"").className === "grassland_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_one";
          document.getElementById("tile_"+(i)+"_"+(j)+"").style.transform = "rotate(90deg)";

          //matrix_2[i][j].tilex = "water_all";
        }
      }

      // FOR RIGHT OF LAND
      if (i > 0 && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water")){
        if ((document.getElementById("tile_"+(i-1)+"_"+(j)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i-1)+"_"+(j)+"").className === "land") ||
            (document.getElementById("tile_"+(i-1)+"_"+(j)+"").className === "grassland_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_one";
          document.getElementById("tile_"+(i)+"_"+(j)+"").style.transform = "rotate(270deg)";

          //matrix_2[i][j].tilex = "water_all";
        }
      }

      ////////////////////////////////////////////////////////
      // GRASS TILES - DOUBLE SIDED
      // FOR BOTTOM & RIGHT OF LAND -- idk why this donnt work
      /*if ((j > 0) && (i < (map_width-1)) && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water_side_one")){
        if ((document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "land") ||
            (document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "grassland_hills"))
            &&
            ((document.getElementById("tile_"+(i+1)+"_"+(j)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i+1)+"_"+(j)+"").className === "land") ||
            (document.getElementById("tile_"+(i+1)+"_"+(j)+"").className === "grassland_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_one_1";

          //matrix_2[i][j].tilex = "water_all";
        }
      }
      */

      /*
      // FOR TOP OF LAND
      if (j > 0 && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water")){
        if ((document.getElementById("tile_"+(i)+"_"+(j+1)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i)+"_"+(j+1)+"").className === "land") ||
            (document.getElementById("tile_"+(i)+"_"+(j+1)+"").className === "grassland_hills"))
            &&
            ((document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "land") ||
            (document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "grassland_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_one_1";
          document.getElementById("tile_"+(i)+"_"+(j)+"").style.transform = "rotate(180deg)";

          //matrix_2[i][j].tilex = "water_all";
        }
      }

      // FOR LEFT OF LAND
      if (i < (map_width-1) && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water")){
        if ((document.getElementById("tile_"+(i+1)+"_"+(j)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i+1)+"_"+(j)+"").className === "land") ||
            (document.getElementById("tile_"+(i+1)+"_"+(j)+"").className === "grassland_hills"))
            &&
            ((document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "land") ||
            (document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "grassland_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_one_1";
          document.getElementById("tile_"+(i)+"_"+(j)+"").style.transform = "rotate(90deg)";

          //matrix_2[i][j].tilex = "water_all";
        }
      }

      // FOR RIGHT OF LAND
      if (i > 0 && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water")){
        if ((document.getElementById("tile_"+(i-1)+"_"+(j)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i-1)+"_"+(j)+"").className === "land") ||
            (document.getElementById("tile_"+(i-1)+"_"+(j)+"").className === "grassland_hills"))
            &&
            ((document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "mountain") ||
            (document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "land") ||
            (document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "grassland_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_one_1";
          document.getElementById("tile_"+(i)+"_"+(j)+"").style.transform = "rotate(270deg)";

          //matrix_2[i][j].tilex = "water_all";
        }
      }*/

      ////////////////////////////////////////////////////////
      // DESERT TILES - SINGLE SIDED
      // FOR BOTTOM OF LAND
      if (j > 0 && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water")){
        if ((document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "desert") ||
            (document.getElementById("tile_"+(i)+"_"+(j-1)+"").className === "desert_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_two";

          //matrix_2[i][j].tilex = "water_all";
        }
      }

      // FOR TOP OF LAND
      if (j > 0 && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water")){
        if ((document.getElementById("tile_"+(i)+"_"+(j+1)+"").className === "desert") ||
            (document.getElementById("tile_"+(i)+"_"+(j+1)+"").className === "desert_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_two";
          document.getElementById("tile_"+(i)+"_"+(j)+"").style.transform = "rotate(180deg)";

          //matrix_2[i][j].tilex = "water_all";
        }
      }

      // FOR LEFT OF LAND
      if (i < (map_width-1) && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water")){
        if ((document.getElementById("tile_"+(i+1)+"_"+(j)+"").className === "desert") ||
            (document.getElementById("tile_"+(i+1)+"_"+(j)+"").className === "desert_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_two";
          document.getElementById("tile_"+(i)+"_"+(j)+"").style.transform = "rotate(90deg)";

          //matrix_2[i][j].tilex = "water_all";
        }
      }

      // FOR RIGHT OF LAND
      if (i > 0 && (document.getElementById("tile_"+(i)+"_"+(j)+"").className === "water")){
        if ((document.getElementById("tile_"+(i-1)+"_"+(j)+"").className === "desert") ||
            (document.getElementById("tile_"+(i-1)+"_"+(j)+"").className === "desert_hills")){
          document.getElementById("tile_"+(i)+"_"+(j)+"").className = "water_side_two";
          document.getElementById("tile_"+(i)+"_"+(j)+"").style.transform = "rotate(270deg)";

          //matrix_2[i][j].tilex = "water_all";
        }
      }
    }
  }
}

// LOOKS LIKE THIS GENERATES THE TILES
var matrix_2 = []
for(var i = 0; i < map_width; i++){
  matrix_2[i] = []
  for(var j = 0; j < map_height; j++){
    matrix_2[i][j] = ""
  }
}

// CREATES THE MAP USING THE ABOVE MATRIX
function generate_map(){
  for (var i = 1; i < map_width; i++){
    k[i] = k[i - 1] + 100
  }

  for (var v = 1; v < map_height; v++){
    h[v] = h[v - 1] + 100
  }

  for(var i = 0; i < map_width; i++) {
    matrix[i] = [];
    for(var j = 0; j < map_height; j++) {
      sp = Math.floor((Math.random() * 100) + 1);
      if (sp <= 3){tilex = "mountain"}
      if (sp <= 30 && sp > 15){tilex = "land"}
      if (sp <= 15 && sp > 10){tilex = "grassland_hills"}
      if (sp <= 10 && sp > 6){tilex = "desert"}
      if (sp <= 6 && sp > 3){tilex = "desert_hills"}
      if (sp >= 31){tilex = "water"}
      //if (j === 0 || j === (map_height - 1)){tilex = "ice"}
      if (j === 0){tilex = "ice"}
      if (j === (map_height - 1)){tilex = "ice"; var transform = "rotateX(180deg)"}
      //matrix[i][j] = "<div id='tile_"+i+"_"+j+"' class='"+tilex+"' style='left:"+k[i]+"; top:"+h[j]+";' onclick='tile_select("+i+","+j+")'>"+sp+"</div>";
      /*matrix[i][j] = "<div id='tile_"+i+"_"+j+"' class='"+tilex+"' style='left:"+k[i]+"; top:"+h[j]+"; transform:" + transform + ";' onclick='tile_select("+i+","+j+")' onmouseover='if(unit_is_allowed_to_move === 1){showCoords(event);}'></div>";*/
      matrix[i][j] = "<div id='tile_"+i+"_"+j+"' class='"+tilex+"' style='left:"+k[i]+"; top:"+h[j]+"; transform:" + transform + ";' onclick='tile_select("+i+","+j+")'></div>";

      matrix_2[i][j] = new tile_struct(i,j,tilex,0);

      transform = ""; // reset the transforms so that it doesnt apply to every tile, only the ones that need it

      // add resources to the tiles based on their terrain type
      if (tilex === "land" || tilex === "grassland_hills" || tilex === "desert" || tilex === "desert_hills"){
        add_resource_tiles(i,j);
      }

      // add fog of war
      if (is_enabled_fog_of_war === 1){ fog_of_war_add(i,j); }
    }
  }

  // check if ocean tile borders land tile
  // then change ocean tile to have corresponding coastlines (border color)

  //research tech tree
  // then land

  //alert(matrix[0][0].match(/class/g))
  //alert(RegExp('[a]',matrix[0][0]))
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ADD RESOURCES TO THE MAIN MAP
var add_resource_tile = [];
for(var i = 0; i < map_width; i++){
  add_resource_tile[i] = [];
}
function add_resource_tiles(i,j){
  var sp2 = Math.floor((Math.random() * 100) + 1);
  /*if (sp2 <= 100 && sp2 > 95){
    add_resource_tile[i][j] = document.createElement("div");
    add_resource_tile[i][j].id = "resource_tile_gold_" + i + "_" + j;
    add_resource_tile[i][j].style.left = i * 100;
    add_resource_tile[i][j].style.top = j * 100;
    add_resource_tile[i][j].className = "resource_tile";
    add_resource_tile[i][j].innerHTML = values_resources.resource[0].image;
    document.body.appendChild(add_resource_tile[i][j]);
  }

  if (sp2 <= 94 && sp2 > 90){
    add_resource_tile[i][j] = document.createElement("div");
    add_resource_tile[i][j].id = "resource_tile_copper_" + i + "_" + j;
    add_resource_tile[i][j].style.left = i * 100;
    add_resource_tile[i][j].style.top = j * 100;
    add_resource_tile[i][j].className = "resource_tile";
    add_resource_tile[i][j].innerHTML = values_resources.resource[1].image;
    document.body.appendChild(add_resource_tile[i][j]);
  }

  if (sp2 <= 89 && sp2 > 85){
    add_resource_tile[i][j] = document.createElement("div");
    add_resource_tile[i][j].id = "resource_tile_iron_" + i + "_" + j;
    add_resource_tile[i][j].style.left = i * 100;
    add_resource_tile[i][j].style.top = j * 100;
    add_resource_tile[i][j].className = "resource_tile";
    add_resource_tile[i][j].innerHTML = values_resources.resource[2].image;
    document.body.appendChild(add_resource_tile[i][j]);
  }*/

  if (sp2 <= 100 && sp2 > 91){
    add_resource_tile[i][j] = document.createElement("div");
    add_resource_tile[i][j].id = "resource_tile_mineral_" + i + "_" + j;
    add_resource_tile[i][j].style.left = i * 100;
    add_resource_tile[i][j].style.top = j * 100;
    add_resource_tile[i][j].className = "resource_tile";
    add_resource_tile[i][j].innerHTML = values_resources_simple.resource[0].image;
    add_resource_tile[i][j].onclick=function(){tile_select(i,j);};
    document.body.appendChild(add_resource_tile[i][j]);
  }

  if (sp2 <= 90 && sp2 > 81){
    add_resource_tile[i][j] = document.createElement("div");
    add_resource_tile[i][j].id = "resource_tile_nutrient_" + i + "_" + j;
    add_resource_tile[i][j].style.left = i * 100;
    add_resource_tile[i][j].style.top = j * 100;
    add_resource_tile[i][j].className = "resource_tile";
    add_resource_tile[i][j].innerHTML = values_resources_simple.resource[1].image;
    add_resource_tile[i][j].onclick=function(){tile_select(i,j);};
    document.body.appendChild(add_resource_tile[i][j]);
  }
}

// check to see if any resources are located within the civ's borders
var player_1_num_tiles = 0;
var player_1_num_resources = 0;
var new_selected_tile = null;
function check_civ_resources(){ //alert(document.getElementById("resource_tile_gold_1_1"))
player_1_num_resources = 0; // reset so it doesn't keep adding resources that don't exist
resources_mineral_player[0] = 0;
resources_nutrient_player[0] = 0;

  for(var i = 0; i < map_width; i++){
    for(var j = 0; j < map_height; j++){
      // if tile is inside of civ's border
      new_selected_tile = "tile_" + i + "_" + j;
      if (document.getElementById(new_selected_tile).innerHTML === '<img src="./images/player_1_border_all.png">'){
        player_1_num_tiles++;

        // then check if tile has a resource in it (gold resources only...no others for now)
        if (document.getElementById("resource_tile_gold_" + i + "_" + j) !== null){

          // if it does have a resource in it, then award that player the resource (but what if the enemy has a unit on top of it or blocked access to it???)
          player_1_num_resources++;
        }

        // then check if tile has a resource in it (gold resources only...no others for now)
        if (document.getElementById("resource_tile_mineral_" + i + "_" + j) !== null){

          // if it does have a resource in it, then award that player the resource (but what if the enemy has a unit on top of it or blocked access to it???)
          //player_1_num_resources++;
          resources_mineral_player[0] += 1; // should be resources_mineral_player[p_color] in the future
          // gold_income[0] += values_resources_simple.resource[0].gold;
          // research_income[0] += values_resources_simple.resource[0].research;
        }

        // then check if tile has a resource in it (gold resources only...no others for now)
        if (document.getElementById("resource_tile_nutrient_" + i + "_" + j) !== null){

          // if it does have a resource in it, then award that player the resource (but what if the enemy has a unit on top of it or blocked access to it???)
          resources_nutrient_player[0] += 1;
          // gold_income[0] += values_resources_simple.resource[1].gold;
          // research_income[0] += values_resources_simple.resource[1].research;
        }
      }
    }
  }

  //alert(player_1_num_resources)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var mini_map_tile = [];

var loc = document.getElementById("mini_map").style.width;
  var search = /[0-9]/g;
  var result = loc.match(search);
  var result3 = "";
  for (j = 0; j < result.length; j++){
    result3 = result3 + result[j];
  }
//var xxx = Math.ceil(map_width / result3) + "%";
var xxx = Math.ceil(map_width / result3) * 4; // THE EXTRA 4 HERE AND 7.5 IN THE HEIGHT ARE HACKS AND PROLLY ONLY WORK FOR MY COMP

var loc = document.getElementById("mini_map").style.width;
  var search = /[0-9]/g;
  var result = loc.match(search);
  var result3 = "";
  for (j = 0; j < result.length; j++){
    result3 = result3 + result[j];
  }
//var yyy = Math.ceil(map_height / result3) + "%";
var yyy = Math.ceil(map_height / result3) * 7.5;

function generate_mini_map(){
  // MAP RATIO - RATIO OF MAP_WIDTH & MAP_HEIGHT TO MINI_MAP WIDTH % AND HEIGHT % ???????????
  for(i = 0; i < map_width; i++){
    mini_map_tile[i] = [];

    for(j = 0; j < map_height; j++){
      mini_map_tile[i][j] = document.createElement("div");
        mini_map_tile[i][j].style.position = "absolute";
        mini_map_tile[i][j].style.left = i * xxx;
        mini_map_tile[i][j].style.top = j * yyy;
        mini_map_tile[i][j].style.width = xxx;
        mini_map_tile[i][j].style.height = yyy;
        mini_map_tile[i][j].style.zIndex = 1002;

      if(matrix_2[i][j].tile_Type === "land"){
        mini_map_tile[i][j].style.backgroundColor = "#508F50";
      }else if(matrix_2[i][j].tile_Type === "grassland_hills"){
        mini_map_tile[i][j].style.backgroundColor = "#508F50";
      }else if(matrix_2[i][j].tile_Type === "mountain"){
        mini_map_tile[i][j].style.backgroundColor = "#333";
      }else if(matrix_2[i][j].tile_Type === "desert"){
        mini_map_tile[i][j].style.backgroundColor = "#FFE97F";
      }else if(matrix_2[i][j].tile_Type === "desert_hills"){
        mini_map_tile[i][j].style.backgroundColor = "#FFE97F";
      }else if(matrix_2[i][j].tile_Type === "ice"){
        mini_map_tile[i][j].style.backgroundColor = "#FFF";
      }else{
        mini_map_tile[i][j].style.backgroundColor = "#468CB8";
      }

      document.getElementById("mini_map").appendChild(mini_map_tile[i][j]);

      // add fog of war to the mini map
      if (is_enabled_fog_of_war === 1){ fog_of_war_add_mini_map(i,j); }
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function mini_map_navigation(){
  // need to create minimap navigation
  var mh = map_height * 100;
  var mw = map_width * 100;

  var mm_selector = document.createElement("canvas");
    mm_selector.id = "mm_selector";
    mm_selector.style.position = "absolute";
    mm_selector.style.top = document.getElementById("mini_map").style.top;
    mm_selector.style.right = document.getElementById("mini_map").style.right;
    mm_selector.style.width = "100%";
    mm_selector.style.height = "100%";
    mm_selector.style.background = "rgba(255,0,0,0)";
    mm_selector.style.zIndex = 5002;
    mm_selector.addEventListener("click", function(event){ get_mm_loc(event); });
    document.getElementById("mini_map").appendChild(mm_selector);

  draw_mini_map_box(0,0);
}

function draw_mini_map_box(mm_x,mm_y){
  // CREATE MINIMAP SELECTOR BOX TO SHOW AREA OF MAIN MAP THAT IS BEING VIEWED
  // (4, 7.5) ... screen (15,8)
  //alert(document.body.clientWidth)
  // (screen dimension / tile dimension) * (unknown value)
  var mm_selector_w = (document.body.clientWidth / 100) * 8;
  var mm_selector_h = (document.body.clientHeight / 100) * 9;
  var c=document.getElementById("mm_selector");
  var ctx=c.getContext("2d");
  // clear the canvas
  //ctx.clearRect(0,0, (document.body.clientWidth * 0.20), (document.body.clientHeight * 0.15)); // need to change these absolute values later
  ctx.clearRect(0,0,200,200);
  ctx.rect(mm_x, mm_y, mm_selector_w, mm_selector_h);
  ctx.strokeStyle = "#F00";
  ctx.stroke();

  var rect = document.body.getBoundingClientRect();
  //alert(rect.top + "," + rect.right + "," + rect.bottom + "," + rect.left);
  // document.body.scrollLeft += 200;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GET THE LOCATION THAT THE PLAYER CLICKS ON WHEN THEY CLICK ON THE MINI MAP
function get_mm_loc(event){
  var xzk = event.clientX;
//var xzk = document.getElementById("mm_selector").clientX;
  var yzk = event.clientY;

  var zero_x = document.body.clientWidth - document.getElementById("mini_map").offsetWidth;
  var zero_y = document.body.clientHeight - document.getElementById("mini_map").offsetHeight;
  //get_num_value(document.getElementById("mini_map").style.left)
  //xzk = (xzk / 100);
  //xzk = Math.abs(xzk - document.body.clientWidth);
  //xzk = document.body.clientWidth - document.getElementById("mini_map").offsetWidth; // 309
  //xzk = document.body.clientWidth * 0.2; // 307
  xzk = Math.ceil((xzk - zero_x) / 8); // the 8 here is the same 8 as in mm_selector_w
  yzk = Math.ceil((yzk - zero_y) / 8); // the 8 here is NOT the same as the 9 as in mm_selector_h, but it is close enough for now...
  //alert(yzk);

  if (xzk <= 1){ xzk = 0; }
  if (yzk <= 1){ yzk = 0; }

  document.body.scrollLeft = 0;
  document.body.scrollTop = 0;

  document.body.scrollLeft += xzk * 55;
  document.body.scrollTop += yzk * 45;

  draw_mini_map_box(document.body.scrollLeft,document.body.scrollTop);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERATE THE FOG OF WAR FOR THE MAIN MAP
var matrix_fog_of_war = [];
for(var i = 0; i < map_width; i++){
  matrix_fog_of_war[i] = [];
}
function fog_of_war_add(i,j){
  matrix_fog_of_war[i][j] = document.createElement("div");
  matrix_fog_of_war[i][j].id = "tile_fog_of_war_" + i + "_" + j;
  matrix_fog_of_war[i][j].style.left = i * 100;
  matrix_fog_of_war[i][j].style.top = j * 100;
  matrix_fog_of_war[i][j].className = "tile_fog_of_war";
  //matrix_fog_of_war[i][j].innerHTML = values_resources_simple.resource[0].image;
  document.body.appendChild(matrix_fog_of_war[i][j]);
}

function fog_of_war_remove(selected_tile_x, selected_tile_y){
  //document.getElementById("tile_fog_of_war_" + i + "_" + j).style.background = "rgba(0,0,0,0)";

  var aa = "";
  var bb = "";
  var new_selected_tile = "";

  // generate css borders in a one-square radius from the city
  for (var i = -1; i < 2; i++){
    aa = selected_tile_x + i;

    for (var j = -1; j < 2; j++){
      bb = selected_tile_y + j;
      //new_selected_tile = "tile_" + aa + "_" + bb;

      document.getElementById("tile_fog_of_war_" + aa + "_" + bb).style.background = "rgba(0,0,0,0)";
      document.getElementById("tile_fog_of_war_" + aa + "_" + bb).style.zIndex = 0;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GENERATE THE FOG OF WAR FOR THE MINI MAP
var matrix_fog_of_war_mini_map = [];
for(var i = 0; i < map_width; i++){
  matrix_fog_of_war_mini_map[i] = [];
}
function fog_of_war_add_mini_map(i,j){
  matrix_fog_of_war_mini_map[i][j] = document.createElement("div");
  matrix_fog_of_war_mini_map[i][j].id = "tile_fog_of_war_mini_map_" + i + "_" + j;
  matrix_fog_of_war_mini_map[i][j].style.left = i * xxx;
  matrix_fog_of_war_mini_map[i][j].style.top = j * yyy;
  matrix_fog_of_war_mini_map[i][j].style.width = xxx;
  matrix_fog_of_war_mini_map[i][j].style.height = yyy;
  matrix_fog_of_war_mini_map[i][j].className = "tile_fog_of_war_mini_map";
  document.getElementById("mini_map").appendChild(matrix_fog_of_war_mini_map[i][j]);
}

function fog_of_war_remove_mini_map(selected_tile_x, selected_tile_y){
  var aa = "";
  var bb = "";
  var new_selected_tile = "";

  // generate css borders in a one-square radius from the city
  for (var i = -1; i < 2; i++){
    aa = selected_tile_x + i;

    for (var j = -1; j < 2; j++){
      bb = selected_tile_y + j;

      document.getElementById("tile_fog_of_war_mini_map_" + aa + "_" + bb).style.background = "rgba(0,0,0,0)";
      document.getElementById("tile_fog_of_war_mini_map_" + aa + "_" + bb).style.zIndex = 0;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
