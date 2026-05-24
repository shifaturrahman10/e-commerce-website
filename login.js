document.addEventListener("DOMContentLoaded", function(){

  let form = document.getElementById("login-form");

  form.addEventListener("submit", function(e){

    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // admin credentials
    let adminUser = "admin";
    let adminPass = "1234";

    if(username === adminUser && password === adminPass){

      localStorage.setItem("adminLoggedIn", "true");

      alert("Login successful!");

      window.location.href = "admin.html";

    } else {

      alert("Wrong username or password!");

    }

  });

});