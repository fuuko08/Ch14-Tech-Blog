const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    const response = await fetch ('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            username,
            password,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);

    if (response.ok) {
        document.location.replace('/'); //eventually ('/dashboard')
    } else {
        const message = await response.json();
        alert(message);
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);