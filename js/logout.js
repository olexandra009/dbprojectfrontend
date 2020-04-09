function logout(){
    console.log("LOGOUT");
    $.ajax({
        url: "/logout",
        type: "POST",
        contentType: "application/json",
        success: function(res){
            location.reload();
        }
    });
}