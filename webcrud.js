$(function(){
    loadproducts();
    $("#rowID").on("click",".btn-danger",deleteProducts);
    $("#products").on("click",".btn-warning",updateProducts);
    $("#createbtn").click(addProducts);
    $("#updatesave").click(function(){
        var id = $("#updateID").val();
        var name = $("#updatetitle").val();
        var description = $("#updatebody").val();
        
        $.ajax({
            url: "https://usman-recipes.herokuapp.com/api/products/" + id,
            data: {name, description},
            method: "PUT",
            success: function(response){
                console.log(response);
                loadProducts();
                $("#update").modal("hide");
            }

        });
    });
});
function loadproducts(){
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        method: "GET",
        error: function(response){
            var products = $("#rowID");
            products.html("An error has occured");
        },
        success: function(response){
            console.log(response);
            var products = $("#rowID");
            products.empty();
            for(var i=0;i<response.length;i++) {
            //var pro = response[i];
            products.append(`<div class="col-md-3 " style="border: 1px solid black;" id="products" data-id="${response[i]._id}"> 
            <div class= "adjust">
            <div class="image-img" src="" ></div>
            <h1 class="nametitle">${response[i].name}</h1>
            <span class="description">${response[i].description}</span>
            <div class = "buttons">
            <button class="btn btn-danger btn-sm float-right" >Delete product</button>
            <button class="btn btn-warning btn-sm float-right" >Edit Product</button>
            </div>
        </div></div> `)
            /*products.append(`<div class = "products" data-id="${pro._id}"><h3>${pro.name}</h3><p> <button class="btn btn-danger btn-sm float-right" >Delete product</button><button class="btn btn-warning btn-sm float-right" >Edit Product</button>${pro.description}</p></div`);*/
            }
        }
        
    });
}

function deleteProducts(){
    var btn = $(this);
    var parentdiv = btn.closest("#products");
    let id = parentdiv.attr("data-id");
    console.log(id);
    //console.log("delete");
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products/" + id,
        method: "DELETE",
        success: function(){
            loadproducts();
        }
    });
}

function addProducts(){
    var name = $("#title").val();
    var description = $("#description").val();
    console.log(name,description);
    $.ajax({
        url: "https://usman-recipes.herokuapp.com/api/products",
        method: "POST",
        data:{name,description},
        success: function(response){
            console.log(response);
            loadproducts();
        }
    });
}

function updateProducts(){
    $("#update").modal("show");
    var btn = $(this);
    var parentdiv = btn.closest("#products");
    let id = parentdiv.attr("data-id"); 
    $.get("https://usman-recipes.herokuapp.com/api/products/" + id, function(response){
        $("#updateID").val(response._id);
        $("#updatetitle").val(response.title);
        $("#updatebody").val(response.description);
        $("#update").modal("show");
    });

}