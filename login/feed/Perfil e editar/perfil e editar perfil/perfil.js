document.addEventListener("DOMContentLoaded", function () {
    const btnEditar = document.getElementById("btn-editar");
    const btnOk = document.getElementById("btn-ok");
    const perfilView = document.getElementById("perfil-view");
    const editView = document.getElementById("edit-view");
  
    const nomeInput = document.getElementById("nome");
    const bioInput = document.getElementById("bio");
    const bioText = document.getElementById("bio-text");
    const usernameDisplay = document.getElementById("username");
  
    const profilePic = document.getElementById("edit-foto");
    const mainPic = document.getElementById("foto-perfil");
  
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
  
    document.querySelector(".change-photo").addEventListener("click", function () {
      fileInput.click();
    });
  
    fileInput.addEventListener("change", function () {
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          profilePic.src = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    });
  
    // Mostrar tela de edição
    btnEditar.addEventListener("click", function () {
      nomeInput.value = usernameDisplay.textContent;
      bioInput.value = bioText.textContent.replace(/"/g, "");
      editView.style.display = "flex";
      perfilView.style.display = "none";
    });
  
    // Confirmar edição
    btnOk.addEventListener("click", function () {
      if (nomeInput.value.trim() === "" || bioInput.value.trim() === "") {
        alert("Por favor, preencha todos os campos!");
        return;
      }
  
      usernameDisplay.textContent = nomeInput.value;
      bioText.textContent = `"${bioInput.value}"`;
  
      mainPic.src = profilePic.src;
  
      perfilView.style.display = "block";
      editView.style.display = "none";
      alert("Perfil atualizado com sucesso!");
    });
  });
  

  