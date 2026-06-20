const socket = io();



async function loadUsers() {

    const response = await fetch("/users");
    const users = await response.json();

    // 🔥 total users update
    document.getElementById("totalUsers").innerText = users.length;

    const usersList = document.getElementById("usersList");
    usersList.innerHTML = "";

    users.forEach(user => {
        usersList.innerHTML += `
        <div class="user-card">

            <h3>👤 USER RECORD</h3>

            <p><strong>📧 Username:</strong> ${user.username}</p>

            <p><strong>🔑 Password:</strong> ${user.password}</p>

            <button class="delete-btn"
                onclick="deleteUser(${user.id})">
                🗑 TERMINATE USER
            </button>

        </div>
        `;
    });
}

loadUsers();

socket.on("newUser", () => {

    console.log("New User Added");

    loadUsers();

});


async function deleteUser(id) {

    const confirmDelete =
    confirm("Delete this user?");

    if (!confirmDelete) return;

    await fetch(
        `/delete-user/${id}`,
        {
            method: "DELETE"
        }
    );

}