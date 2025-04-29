document.addEventListener("DOMContentLoaded", () => {
    // Curtir posts
    document.querySelectorAll(".heart").forEach(button => {
        button.addEventListener("click", () => {
            button.textContent = button.textContent === "🤍" ? "💜" : "🤍";
            button.classList.toggle("liked");
        });
    });

    // Exibir/Esconder comentários
    document.querySelectorAll(".actions span:last-child").forEach(commentIcon => {
        commentIcon.addEventListener("click", () => {
            let post = commentIcon.closest(".post");
            let commentSection = post.querySelector(".comments");
            let commentBoxes = post.querySelectorAll(".comment-box");

            let isHidden = commentSection.style.display === "none" || commentSection.style.display === "";
            commentSection.style.display = isHidden ? "block" : "none";
            commentBoxes.forEach(box => box.style.display = isHidden ? "block" : "none");
        });
    });

    // Adicionar comentários
    function addComment(input) {
        let commentText = input.value.trim();
        if (commentText !== "") {
            let commentBox = document.createElement("div");
            commentBox.classList.add("comment-box");
            commentBox.innerHTML = `
                <strong>Você:</strong> <span class="comment-text">${commentText}</span>
                <span class="comment-menu">☰</span>
                <div class="comment-options hidden">
                    <button class="edit-comment">✏️ Editar</button>
                    <button class="delete-comment">❌ Excluir</button>
                </div>
            `;

            let post = input.closest(".post");
            let commentSection = post.querySelector(".comments");
            post.appendChild(commentBox);

            input.value = "";
            commentSection.style.display = "block";
            commentBox.style.display = "block";

            let menu = commentBox.querySelector(".comment-menu");
            let options = commentBox.querySelector(".comment-options");

            menu.addEventListener("click", () => options.classList.toggle("hidden"));
            commentBox.querySelector(".delete-comment").addEventListener("click", () => commentBox.remove());
            commentBox.querySelector(".edit-comment").addEventListener("click", () => {
                let commentText = commentBox.querySelector(".comment-text");
                let newText = prompt("Edite seu comentário:", commentText.textContent);
                if (newText !== null && newText.trim() !== "") {
                    commentText.textContent = newText.trim();
                }
                options.classList.add("hidden");
            });
        }
    }

    document.querySelectorAll(".comments button").forEach(button => {
        button.addEventListener("click", event => {
            let input = event.target.previousElementSibling;
            addComment(input);
        });
    });

    document.querySelectorAll(".comments input").forEach(input => {
        input.addEventListener("keypress", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                addComment(input);
            }
        });
    });
});