document.addEventListener("DOMContentLoaded", () => {
    const publishBtn = document.getElementById("publishBtn");
    const imageUpload = document.getElementById("imageUpload");
    const captionInput = document.getElementById("captionInput");
    const feed = document.getElementById("feed");
  
    publishBtn.addEventListener("click", () => {
      const file = imageUpload.files[0];
      const caption = captionInput.value.trim();
  
      if (!file || caption === "") {
        alert("Selecione uma imagem e escreva uma legenda.");
        return;
      }
  
      const reader = new FileReader();
      reader.onload = function (e) {
        const post = document.createElement("div");
        post.className = "post";
        post.innerHTML = `
          <div class="user-info">
            <img src="./perfil-user.png" alt="Usuário" />
            <div style="display: flex; flex-direction: column; gap: 2px;">
              <strong>Você</strong>
              <p>Agora mesmo</p>
            </div>
          </div>
          <img src="${e.target.result}" class="post-image" alt="Nova postagem" />
          <div class="caption-box1">
            <strong>Você:</strong> ${caption}
          </div>
          <div class="actions">
            <span class="heart">🤍</span>
            <span>💬</span>
          </div>
          <div class="comments" style="display: none;">
            <input type="text" placeholder="Comentário">
            <button>➤</button>
          </div>
          <div class="comment-box" style="display: none;"></div>
        `;
  
        feed.prepend(post);
        captionInput.value = "";
        imageUpload.value = "";
        ativarPost(post); // ativa eventos do novo post
      };
  
      reader.readAsDataURL(file);
    });
  
    function ativarPost(post) {
      const likeBtn = post.querySelector(".heart");
      likeBtn.addEventListener("click", () => {
        likeBtn.textContent = likeBtn.textContent === "🤍" ? "💜" : "🤍";
        likeBtn.classList.toggle("liked");
      });
  
      const commentIcon = post.querySelector(".actions span:last-child");
      const commentInput = post.querySelector(".comments input");
      const commentBtn = post.querySelector(".comments button");
      const commentsDiv = post.querySelector(".comments");
      const commentBox = post.querySelector(".comment-box");
  
      commentIcon.addEventListener("click", () => {
        const isHidden = commentsDiv.style.display === "none" || commentsDiv.style.display === "";
        commentsDiv.style.display = isHidden ? "block" : "none";
        commentBox.style.display = isHidden ? "block" : "none";
      });
  
      commentBtn.addEventListener("click", () => addComment(commentInput, commentBox));
      commentInput.addEventListener("keypress", e => {
        if (e.key === "Enter") {
          e.preventDefault();
          addComment(commentInput, commentBox);
        }
      });
    }
  
    function addComment(input, commentBox) {
      const commentText = input.value.trim();
      if (commentText !== "") {
        const comment = document.createElement("div");
        comment.innerHTML = `<strong>Você:</strong> ${commentText}`;
        commentBox.appendChild(comment);
        input.value = "";
      }
    }
  });
  