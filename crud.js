$(function(){
    loadRecepies();
    $("#recipes").on("click",".btn-danger",deleteRecipes);
    $("#recipes").on("click",".btn-warning",updateRecipes);
    $("#addbtn").click(addRecipes);
    //saving the updated record
    $("#updatesave").click(function(){
        var id = $("#updateID").val();
        var title = $("#updatetitle").val();
        var body = $("#updatedescription").val();
        
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
            data: {title, body},
            method: "PUT",
            success: function(response){
                console.log(response);
                loadRecepies();
                $("#update").modal("hide");
            }

        });
    });
});

function updateRecipes(){
    //$("#update").modal("show");
    var btn = $(this);
    var parentdiv = btn.closest(".recipes");
    let id = parentdiv.attr("data-id"); 
    $.get("https://usman-recipes.herokuapp.com/api/recipes/" + id, function(response){
        $("#updateID").val(response._id);
        $("#updatetitle").val(response.title);
        $("#updatedescription").val(response.body);
        $("#update").modal("show");
    });

}
   
function deleteRecipes(){
    var btn = $(this);
    var parentdiv = btn.closest(".recipes");
    let id = parentdiv.attr("data-id");
    console.log(id);
    //console.log("delete");
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes/" + id,
        method: "DELETE",
        success: function(){
            loadRecepies();
        }
    });
}
function addRecipes(){
    var title = $("#title").val();
    var body = $("#body").val();
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "POST",
        data:{title,body},
        success: function(response){
            console.log(response);
            loadRecepies();
        }
    });
}

function loadRecepies(){
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/recipes",
        method: "GET",
        error: function(response){
            
            var recipes = $("#recipes");
            //use htmk instead of append so loading disappears
            recipes.html("An error has occured");

        },
        success: function(response){
            console.log(response);
            var recipes = $("#recipes");
            recipes.empty();
            for(var i=0;i<response.length;i++) {
              // recipes.append("<div><h3>Recipe's Title</h3></div>");
              //saving response in variable
              var pro = response[i];
              //using var to fetch data
              //recipes.append("<div><h3>"+ rec.name+ "</h3></div>");
              recipes.append(`<div class = "recipes" data-id="${pro._id}"><h3>${pro.title}</h3><p> <button class="btn btn-danger btn-sm float-right" >delete</button><button class="btn btn-warning btn-sm float-right" >Edit</button>${pro.body}</p></div`);
            }
        }
        
    });
}