document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("password").value;
  const mensagem = document.getElementById("mensagem");

  // Verifica se os campos estão vazios
  if (email.trim() === "" || senha.trim() === "") {
    mensagem.textContent = "Por favor, preencha todos os campos.";
    return;
  }

  try {
    const response = await fetch("https://back-spider.vercel.app/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha }) // 'password' e não 'senha'
    });

    const data = await response.json();

    // Verifica se a resposta da API foi positiva
    if (response.ok) {
      // Login válido
      window.location.href = "../feed/feed.html"; // Redireciona para o feed
    } else {
      // Caso a API retorne um erro (ex: credenciais inválidas)
      mensagem.textContent = data.message || "Credenciais inválidas.";
    }
  } catch (error) {
    console.error("Erro ao conectar:", error);
    mensagem.textContent = "Erro de conexão com o servidor.";
  }
});
