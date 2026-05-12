// Authentication System
const users = [
    { id: 1, name: 'Admin User', email: 'admin@ram-infosys.com', password: 'admin123', role: 'Admin', department: 'Management' },
    { id: 2, name: 'John Doe', email: 'john@ram-infosys.com', password: 'user123', role: 'User', department: 'Sales' },
    { id: 3, name: 'Jane Smith', email: 'jane@ram-infosys.com', password: 'user123', role: 'User', department: 'HR' },
    { id: 4, name: 'Bob Wilson', email: 'bob@ram-infosys.com', password: 'user123', role: 'User', department: 'IT' }
];

let currentUser = null;

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function login(email, password) {
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        if (user.role === 'Admin') {
            window.location.href = 'pages/admin-dashboard.html';
        } else {
            window.location.href = 'pages/user-dashboard.html';
        }
    } else {
        alert('Invalid email or password');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = '../index.html';
}

function getCurrentUser() {
    if (!currentUser) {
        const stored = localStorage.getItem('currentUser');
        if (stored) {
            currentUser = JSON.parse(stored);
        }
    }
    return currentUser;
}

function checkAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = '../pages/login.html';
    }
    return user;
}

// Login Form Handler
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });
}

// Set today's date as default
if (document.getElementById('date')) {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
}