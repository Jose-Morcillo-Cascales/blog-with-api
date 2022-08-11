let modalHtml;

const apiUrl = "http://localhost:3000"
const container = document.querySelector("section");
const postDivs = document.querySelectorAll("#div-posts");

// Modal
const modalHeader = document.querySelector(".modal-header");
const modalPostTitle = document.querySelector("#exampleModalLabel");
const modalPostBody = document.querySelector("#modal-post-body");
const modalUsername = document.querySelector("#modal-username");
const modalUserEmail = document.querySelector("#modal-user-email");

fetch(`${apiUrl}/posts`)
    .then(response => response.json())
    .then(posts => {
        posts.forEach(post => {
            let divPosts = document.createElement("div");
            divPosts.setAttribute("id", "div-posts");
            divPosts.setAttribute("data-bs-toggle", "modal");
            divPosts.setAttribute("data-bs-target", `#post-${post.id}`);

            let pTitle = document.createElement("p");
            pTitle.setAttribute("class", "pTitle");

            let pBody = document.createElement("p");
            pBody.setAttribute("class", "pBody");

            container.appendChild(divPosts);
            divPosts.appendChild(pTitle);
            divPosts.appendChild(pBody);
            pTitle.appendChild(document.createTextNode(`${post.title}`));
            pBody.appendChild(document.createTextNode(`${post.body}`));

            fetch(`${apiUrl}/users`)
                .then(response => response.json())
                .then(users => {
                    users.forEach(user => {
                        
                        fetch(`${apiUrl}/comments`)                    
                            .then(response => response.json())
                            .then(comments => {
                                comments.forEach(comment => {
                                    
                                    if (post.userId === user.id) {  
                                        modalHtml = 
                                        `<div class="modal fade" id="post-${post.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                    
                                                    <div class="modal-header">
                                                        <h1 class="modal-title" id="exampleModalLabel">${post.title}</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                    
                                                    <div class="modal-body">
                                                        <p id="modal-post-body">${post.body}</p>
                                                        <div>
                                                            <h2 id="modal-user-title">User</h2>
                                                            <p id="modal-username">${user.username}</p>
                                                            <p id="modal-user-email">${user.email}</p>
                                                        </div>
                                                    </div>
                    
                                                    <div class="modal-footer comments-section">
                                                        <h2>Comments</h2>
                                                        <button type="button" class="btn btn-primary">Load Comments</button>
                                                        <p>${comment.name}</p>
                                                        <p>${comment.body}</p>
                                                        <p>${comment.email}</p>
                                                    </div>
                    
                                                </div>
                                            </div>
                                        </div>`;
                                        divPosts.insertAdjacentHTML("beforeend", modalHtml);
                                    } 
                                    
                                    function loadComments() {
                                        const commentsSection = document.querySelector(".comments-section");
                                        let pCommentName = document.createElement("p")
                                        let pCommentBody = document.createElement("p")
                                        let pCommentEmail = document.createElement("p")

                                        if (post.id === comment.postId) {
                                            commentsSection.appendChild(pCommentName)
                                            commentsSection.appendChild(pCommentBody)
                                            commentsSection.appendChild(pCommentEmail)

                                            pCommentName.appendChild(document.createTextNode(`${comment.name}`));
                                            pCommentName.appendChild(document.createTextNode(`${comment.body}`));
                                            pCommentName.appendChild(document.createTextNode(`${comment.email}`));
                                        }
                                    }
                                });   
                            });       
                    });
                });
        }); 
    });

const btnLoadComments = document.querySelector(".btn");
btnLoadComments.addEventListener("click", loadComments);