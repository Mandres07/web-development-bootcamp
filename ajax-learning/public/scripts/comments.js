const loadCommentsBtn = document.getElementById('load-comments');
const sectionElement = document.getElementById('comments');
const commentsFormEl = document.querySelector('#comments-form form');
const commentTitleEl = document.getElementById('title');
const commentTextEl = document.getElementById('text');

function createCommentsList(comments) {
   const commentListElement = document.createElement('ol');
   for (const comment of comments) {
      const commentElement = document.createElement('li');
      commentElement.innerHTML = `
         <article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
         </article>
      `;
      commentListElement.append(commentElement);
   }
   return commentListElement;
}

async function fetchPostComments() {
   const postId = loadCommentsBtn.dataset.postid;
   try {
      const response = await fetch(`/posts/${postId}/comments`);
      const responseData = await response.json();
      if (responseData && responseData.length > 0) {
         const commentsListEl = createCommentsList(responseData);
         sectionElement.innerHTML = '';
         sectionElement.appendChild(commentsListEl);
      } else {
         sectionElement.firstElementChild.textContent = 'We could not find any comments, maybe add one?';
      }
   }
   catch (error) {
      alert('Fetching comments failed, try again later');
   }
}

async function saveComment(event) {
   event.preventDefault();
   const postId = event.target.dataset.postid;
   const comment = { title: commentTitleEl.value, text: commentTextEl.value };
   try {
      const response = await fetch(`/posts/${postId}/comments`, {
         method: 'POST',
         body: JSON.stringify(comment),
         headers: {
            'Content-Type': 'application/json'
         }
      });

      if (response.ok) {
         return fetchPostComments();
      }
      alert('something went wrong, please try again later');
   }
   catch (error) {
      alert('something went wrong with the server, please try again later');
   }
}

loadCommentsBtn.addEventListener('click', fetchPostComments);
commentsFormEl.addEventListener('submit', saveComment);