const postId = document.querySelector('input[name="post-id"]').value;
console.log(postId);

const commentFormHandler = async (event) => {
    event.preventDefault();
    const content = document.querySelector('textarea[name="comment-body"]').value;
    console.log(content);

    if (content) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                content,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    };
} 

document.querySelector('#new-comment').addEventListener('submit', commentFormHandler);