let isLogin = true;

const form = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const toggleFormText = document.getElementById('toggle-form');
const messageDiv = document.getElementById('message');

toggleFormText.addEventListener('click', () => {
    messageDiv.innerHTML = '';
    if (isLogin) {
        formTitle.textContent = 'Register';
        form.innerHTML = `
            <input type="text" id="name" placeholder="Full Name" required />
            <input type="email" id="email" placeholder="Email" required />
            <input type="password" id="password" placeholder="Password" required />
            <button type="submit" id="submit-btn">Register</button>
        `;
        toggleFormText.textContent = 'Already have an account? Login';
        isLogin = false;
    } else {
        formTitle.textContent = 'Login';
        form.innerHTML = `
            <input type="email" id="email" placeholder="Email" required />
            <input type="password" id="password" placeholder="Password" required />
            <button type="submit" id="submit-btn">Login</button>
        `;
        toggleFormText.textContent = "Don't have an account? Register";
        isLogin = true;
    }
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    messageDiv.innerHTML = '';

    if (isLogin) {
        const email = form.querySelector('#email').value.trim();
        const password = form.querySelector('#password').value.trim();

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            messageDiv.innerHTML = `<p class="success">Login successful! Redirecting...</p>`;
            setTimeout(() => {
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                window.location.href = 'home.html';
            }, 1000);
        } else {
            messageDiv.innerHTML = `<p class="error">Invalid email or password.</p>`;
        }
    } else {
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const password = form.querySelector('#password').value.trim();

        if (password.length < 6) {
            messageDiv.innerHTML = `<p class="error">Password should be at least 6 characters.</p>`;
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.find(u => u.email === email)) {
            messageDiv.innerHTML = `<p class="error">Email already registered. Please login.</p>`;
            return;
        }

        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));

        messageDiv.innerHTML = `<p class="success">Registration successful! Redirecting to home...</p>`;

        setTimeout(() => {
            window.location.href = 'home.html';
        }, 1000);
    }
});
