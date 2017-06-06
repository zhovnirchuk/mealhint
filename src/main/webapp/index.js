function init() {
	var rootpath = "//" + window.location.host + "/_ah/api";
	gapi.client.load('mealhintAPI', 'v1', loadCallback, rootpath);
}

function loadCallback () {	
	enableButtons ();
}

function enableButtons () {
	btn = document.getElementById("add-submit");
	btn.onclick= function(){addRecipeButton();};
	
	btn = document.getElementById("get-recipes-btn");
	btn.onclick=function(){getRecipesButton();};
	
}


function addRecipeButton(){
	var title = $("#add-recipe-title").text();
	var request = gapi.client.mealhintAPI.hasRecipe({'title': title});
	request.execute(addRecipeCallback);
}

function addRecipeCallback (response) {
	if(response.message == "0"){
		var time = 0;
		if($("#add-breakfast").hasClass("checked")){
			time = 1;
		}else if($("#add-lunch").hasClass("checked")){
			time = 2;
		}else if($("#add-dinner").hasClass("checked")){
			time = 3;
		}
		var ingredients = "";
		if($("#add-meat").hasClass("checked")){
			ingredients += "1";
		}else{
			ingredients += "0";
		} 
		if($("#add-vegetables").hasClass("checked")){
			ingredients += "1";
		}else{
			ingredients += "0";
		} 
		if($("#add-fruits").hasClass("checked")){
			ingredients += "1";
		}else{
			ingredients += "0";
		} 
		if(time == 0){
			alert("Select time!");
			return;
		}
		if(ingredients == ""){
			alert("Select ingredients!");
			return;
		}
		var recipe = {
				'title': $("#add-recipe-title").text(),
				'time': time,
				'ingredients': ingredients,
				'description': $("#description").val()
		};
		gapi.client.mealhintAPI.addRecipe(recipe).execute();
		alert("New recipe has been added!");
		$('#add-frame').css('display', 'none');
	} else {
		alert("Such title already exists!");
	}
}

function getRecipesButton(){
	var times = "";
	if($("#breakfast").hasClass("checked")){
		times += "1";
	}else{
		times += "0";
	} 
	if($("#lunch").hasClass("checked")){
		times += "1";
	}else{
		times += "0";
	} 
	if($("#dinner").hasClass("checked")){
		times += "1";
	}else{
		times += "0";
	} 
	var ingrs = "";
	if($("#meat").hasClass("checked")){
		ingrs += "1";
	}else{
		ingrs += "0";
	} 
	if($("#vegetables").hasClass("checked")){
		ingrs += "1";
	}else{
		ingrs += "0";
	} 
	if($("#fruits").hasClass("checked")){
		ingrs += "1";
	}else{
		ingrs += "0";
	} 
	
	if(times=="000" || ingrs=="000"){
		alert("Select filters!");
		return;
	}
	
	var request = gapi.client.mealhintAPI.getRecipes({'time': times, 'ingredients': ingrs});
	request.execute(getRecipesCallback);
}

function getRecipesCallback (response) {
	$("#recipes").empty();
	var list = response.items;
	if(list.length == 0){
		$("#recipes").append($("p").append("No such recipes was found!"));
		return;
	}
	for(var i=0; i<list.length; i++){
		printRecipe(list[i].title, list[i].time, list[i].ingredients, list[i].description);
	}
}

function printRecipe (title, time, ingredients, description){
	var recipe = $("<div class='recipe'></div>");
	recipe.append($("<h2 class='recipe-item-title'>"+title+"</h2>"));
	
	var times = $("<div class='recipe-item-form'></div>");
	if(time == 1) times.append('<div class="recipe-item">Breakfast</div>');
	if(time == 2) times.append('<div class="recipe-item">Lunch</div>');
	if(time == 3) times.append('<div class="recipe-item">Dinner</div>');
	recipe.append(times);
	
	var ingrs = $("<div class='recipe-item-form'></div>");
	if(ingredients[0] == '1') ingrs.append('<div class="recipe-item">Meat</div>');
	if(ingredients[1] == '1') ingrs.append('<div class="recipe-item">Vegetables</div>');
	if(ingredients[2] == '1') ingrs.append('<div class="recipe-item">Fruits</div>');
	recipe.append(ingrs);
	recipe.append($("<p class='description'>"+description+"</p>"));
	$("#recipes").append(recipe);
}


$(document).ready(function(){
	
  $('#add-btn').click(function(){
        $('#add-frame').css('display', 'block');
    });

  $('#close-frame-btn').click(function(){
        $('#add-frame').css('display', 'none');
    });

  $('.item').click(function(){
        if($(this).hasClass('checked')){
          $(this).removeClass('checked');
          $(this).css('background-color', '#a7ffeb');
          $(this).css('color', '#00695c');
		  if($(this).hasClass('add')){
			$(this).css('background-color', '#00bfa5');
            $(this).css('color', '#a7ffeb');
		  }
          return;
        }
        if($(this).hasClass('radio')){
          $('.radio').each(function(index){
            $(this).removeClass('checked');
            $(this).css('background-color', '#00bfa5');
          });
        }
	$(this).addClass('checked');
        $(this).css('background-color', '#00695c');
		$(this).css('color', '#a7ffeb');
    });
  
});
  
  
  