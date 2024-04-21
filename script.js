document.addEventListener('DOMContentLoaded', function () {
    const blogPosts = document.getElementById('blog-posts');
    const modal = document.getElementById('modal');
    const newPostBtn = document.getElementById('new-post-btn');
    const closeBtn = document.querySelector('.close');
    const postForm = document.getElementById('post-form');
    const saveBtn = document.getElementById('save-btn');
    const postIdInput = document.getElementById('post-id');
    const postTitleInput = document.getElementById('post-title');
    const postContentInput = document.getElementById('post-content');
    const postAuthorInput = document.getElementById('post-author');
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
  
    function renderPosts() {
      blogPosts.innerHTML = '';
      posts.forEach((post, index) => {
        const postItem = document.createElement('div');
        postItem.classList.add('post');
        postItem.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <p><strong>Author:</strong> ${post.author}</p>
          <button class="edit-btn" data-id="${index}">Edit</button>
          <button class="delete-btn" data-id="${index}">Delete</button>
        `;
        blogPosts.appendChild(postItem);
      });
    }
  
    function showModal(title = 'New Post', post = {}) {
      modal.style.display = 'block';
      document.getElementById('modal-title').textContent = title;
      postIdInput.value = post.id || '';
      postTitleInput.value = post.title || '';
      postContentInput.value = post.content || '';
      postAuthorInput.value = post.author || '';
    }
  
    function closeModal() {
      modal.style.display = 'none';
      postForm.reset();
    }
  
    newPostBtn.addEventListener('click', () => showModal());
  
    closeBtn.addEventListener('click', closeModal);
  
    postForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const id = postIdInput.value;
      const title = postTitleInput.value;
      const content = postContentInput.value;
      const author = postAuthorInput.value; 
  
      if (id) {
        // Update existing post
        posts[id] = { id, title, content, author };
      } else {
        // Add new post
        posts.push({ id: posts.length, title, content, author});
      }
  
      localStorage.setItem('posts', JSON.stringify(posts));
      renderPosts();
      closeModal();
    });
  
    blogPosts.addEventListener('click', function (e) {
      if (e.target.classList.contains('edit-btn')) {
        const postId = e.target.dataset.id;
        const post = posts[postId];
        showModal('Edit Post', post);
      }
  
      if (e.target.classList.contains('delete-btn')) {
        const postId = e.target.dataset.id;
        posts.splice(postId, 1);
        localStorage.setItem('posts', JSON.stringify(posts));
        renderPosts();
      }
    });
  
    renderPosts();
  });
  