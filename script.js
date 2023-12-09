const posts = document.querySelector(".posts");

function createPostElement(post) {
    const postElement = document.createElement("div");
    postElement.classList.add("post");

    const postTitle = document.createElement("h3");
    postTitle.classList.add("post-title");
    postTitle.textContent = post.title;

    const postContent = document.createElement("p");
    postContent.classList.add("post-content");
    postContent.textContent = post.content;

    postElement.appendChild(postTitle);
    postElement.appendChild(postContent);

    return postElement;
}

async function fetchAndDisplayPosts() {
    const response = await fetch("/posts");
    const postsData = await response.json();

    for (const post of postsData) {
        const postElement = createPostElement(post);

        posts.appendChild(postElement);
    }
}

fetchAndDisplayPosts();
