async function cadastrarUsuario() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const premium = document.getElementById("premium").checked;
    const imagemPerfil = document.getElementById("imagemPerfil").value.trim();
    const senhaRecuperacao = document.getElementById("senhaRecuperacao").value.trim();
  
    if (!nome || !email || !senha || !senhaRecuperacao) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  
    const usuario = {
      nome,
      email,
      senha,
      premium,
      imagemPerfil,
      senhaRecuperacao
    };
  
    try {
      const resposta = await fetch("https://back-spider.vercel.app/user/cadastrarUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario)
      });
  
      const dados = await resposta.json();
      console.log("Resposta da API:", dados);
  
      if (resposta.ok) {
        localStorage.setItem("nomeUsuario", nome);
        localStorage.setItem("imagemPerfil", imagemPerfil || "./perfil.png");
        console.log("Redirecionando para feed...");
        window.location.href = "feed.html";
      } else {
        alert(dados.message || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    }
  }
  