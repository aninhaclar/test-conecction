function goBack() {
    alert("Voltando para login...");
}

function confirmPassword() {
    let newPassword = document.getElementById("new-password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    if (newPassword === confirmPassword && newPassword !== "") {
        alert("Senha alterada com sucesso!");
    } else {
        alert("As senhas não coincidem!");
    }
}
