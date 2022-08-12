let modalHtml;
let modalFooterHtml;

const apiUrl = 'http://localhost:3000';
const container = document.querySelector('section');
const postDivs = document.querySelectorAll('#div-posts');

// Modal
const modalHeader = document.querySelector('.modal-header');
const modalPostTitle = document.querySelector('#exampleModalLabel');
const modalPostBody = document.querySelector('#modal-post-body');
const modalUsername = document.querySelector('#modal-username');
const modalUserEmail = document.querySelector('#modal-user-email');

fetch(`${apiUrl}/posts`)
	.then((response) => response.json())
	.then((posts) => {
		posts.forEach((post) => {
			let divPosts = document.createElement('div');
			divPosts.setAttribute('id', 'div-posts');
			divPosts.setAttribute('data-bs-toggle', 'modal');
			divPosts.setAttribute('data-bs-target', `#post-${post.id}`);

			let pTitle = document.createElement('p');
			pTitle.setAttribute('class', 'p-title');

			let pBody = document.createElement('p');
			pBody.setAttribute('class', 'p-body');

			container.appendChild(divPosts);
			divPosts.appendChild(pTitle);
			divPosts.appendChild(pBody);
			pTitle.appendChild(document.createTextNode(`${post.title}`));
			pBody.appendChild(document.createTextNode(`${post.body.slice(0, 60)}...`));

			fetch(`${apiUrl}/users`)
				.then((response) => response.json())
				.then((users) => {
					users.forEach((user) => {
						if (post.userId === user.id) {
							modalHtml = 
							`<div data-backdrop="static" class="modal fade" id="post-${post.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

										<div class="modal-footer comments-section" id="comment-post-${post.id}">
											<h2 id="">Comments</h2>
											<p>
												<button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
													View / Hide Comments
												</button>
											</p>
										</div>									
									</div>
								</div>
							</div>`;
							// divPosts.insertAdjacentHTML('beforeend', modalHtml);
							document.getElementById("posts-modals").insertAdjacentHTML('beforeend', modalHtml);
						}
					});
				});
						
			fetch(`${apiUrl}/comments`)
				.then((response) => response.json())
				.then((comments) => {
					comments.forEach((comment) => {
							const commentsPostId = document.querySelector(`#comment-post-${post.id}`);
								
								if (post.id === comment.postId) {
									modalFooterHtml = 
									`<div class="collapse" id="collapseExample">
										<div class="card card-body" id="comment">
												<p id="comment-name">${comment.name}</p>
												<p id="comment-body">${comment.body}</p>
												<p id="comment-email">${comment.email}</p>									
										</div>
									</div>`
									
									commentsPostId.insertAdjacentHTML('beforeend', modalFooterHtml);

									console.log(`POST ${post.id}`)
									console.log(comment.postId)	
								}
					});
				});
		});
	});