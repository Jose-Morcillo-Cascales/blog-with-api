// let modalHtml = 
// `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div class="modal-dialog">
//         <div class="modal-content">

//             <div class="modal-header">
//                 <h1 class="modal-title" id="exampleModalLabel"></h1>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>

//             <div class="modal-body">
//                 <p id="modal-post-body">Post body</p>
//                 <div>
//                     <h2 id="modal-user-title">User</h2>
//                     <p id="modal-username">alex123</p>
//                     <p id="modal-user-email"></p>alex@gmail.com</p>
//                 </div>
//             </div>

//             <div class="modal-footer comments-section">
//                 <h2>Comments</h2>
//                 <button type="button" class="btn btn-primary">Load Comments</button>
//             </div>

//         </div>
//     </div>
// </div>`;

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
            // container.insertAdjacentHTML("afterbegin", modalHtml);

            let divPosts = document.createElement("div");
            divPosts.setAttribute("id", "div-posts");
            divPosts.setAttribute("data-bs-toggle", "modal");
            divPosts.setAttribute("data-bs-target", "#exampleModal");

            let pTitle = document.createElement("p");
            pTitle.setAttribute("class", "pTitle");

            let pBody = document.createElement("p");
            pBody.setAttribute("class", "pBody");

            container.appendChild(divPosts);
            divPosts.appendChild(pTitle);
            divPosts.appendChild(pBody);
            pTitle.appendChild(document.createTextNode(`${post.title}`));
            pBody.appendChild(document.createTextNode(`${post.body}`));

            // postDivs.addEventListener("click", () => {
            //     modalDataPosts(post.title, post.body);
            // });

            // postDivs.forEach(div => {
            //     div.addEventListener("click", modalDataPosts);
            // })
            // postDivs.addEventListener("click", modalDataPosts);

            // let modalH1Title = document.createElement("h1");
            // modalHeader.appendChild(modalH1Title);
            // modalH1Title.appendChild(document.createTextNode(post.title));
            
            let modalPostTitle = document.querySelector("#exampleModalLabel");
            modalPostTitle.appendChild(document.createTextNode(`${post.title}`));
        }); 
    });

function modalDataPosts() {
    console.log("holi")
    // for (let i =1;i<postDivs.length;i++){
    //     if(i===post.id){
    //         // modalPostTitle.appendChild(document.createTextNode(`${post.title}`));

    //         let modalH1Title = document.createElement("h1");
    //         modalHeader.appendChild(modalH1Title);
    //         modalH1Title.appendChild(document.createTextNode(`${post.title}`));
    //         //pintame el h1 con post.id
    //     }
}


    // modalPostTitle.appendChild(document.createTextNode(title));
    // modalPostTitle.appendChild(document.createTextNode(body));

    // let modalH1Title = document.createElement("h1");
    // modalHeader.appendChild(modalH1Title)
    // modalH1Title.appendChild(document.createTextNode(title));


    
