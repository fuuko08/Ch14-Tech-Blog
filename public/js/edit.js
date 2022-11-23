const postId = document.querySelector('input[name="post-id"]').value;

// Edit post
const editHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const content = document.querySelector('textarea[name="post-content"]').value.trim();

    const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            content,
        }),
        headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert("Something wrong!");
    }
    document.location.replace('/dashboard');
};

// Click on delete post
const deleteHandler = async () => {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });
    document.location.replace('/dashboard');
};

document.querySelector('.edit-form').addEventListener('submit', editHandler);
document.querySelector('#delete-btn').addEventListener('click', deleteHandler);