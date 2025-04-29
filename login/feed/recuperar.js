document.getElementById("recoverForm").addEventListener("submit", async function (event) {
    event.preventDefault();
    const email = document.getElementById("recover-email").value;

    const url = 'https://back-spider.vercel.app/recover-password';
    const data = { email }

    const response = await fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (response.ok) {
        alert("Instruções de recuperação enviadas para seu e-mail!");
        window.location.href = "login.html";
    } else {
        alert("Erro ao recuperar senha!");
    }
});

function goBack() {
    window.location.href = "login.html"; 
    
}

