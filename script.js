// Simulasi penyimpanan data di localStorage
function loadAccounts() {
    return JSON.parse(localStorage.getItem('accounts') || '[]');
}

function saveAccounts(accounts) {
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

// function showTemp() {
//     document.getElementById('sign-up-form').classList.add('hidden');
//     document.getElementById('sign-in-success').classList.remove('hidden');
// }

function showSignUp() {
    document.getElementById('sign-in-form').classList.add('hidden');
    document.getElementById('sign-up-form').classList.remove('hidden');
}

function showSignIn() {
    document.getElementById('sign-up-form').classList.add('hidden');
    document.getElementById('sign-in-form').classList.remove('hidden');
}

function showPassword() {
    // Ambil elemen input password di form sign-in dan sign-up
    const signInPassword = document.getElementById("signin-password");
    const signUpPassword = document.getElementById("signup-password");

    // Cek dan toggle tipe input (password/text) untuk Sign In
    if (signInPassword.type === "password") {
        signInPassword.type = "text";
    } else if (signInPassword) {
        signInPassword.type = "password";
    }

    // Cek dan toggle tipe input (password/text) untuk Sign Up
    if (signUpPassword.type === "password") {
        signUpPassword.type = "text";
    } else if (signUpPassword) {
        signUpPassword.type = "password";
    }
}

function signUp() {
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    if (!username || !password) {
        alert('Username dan Password tidak boleh kosong!');
        return;
    }

    const accounts = loadAccounts();
    if (accounts.some(acc => acc.username === username)) {
        setTimeout(function(){
            document.getElementById('terdaftar').classList.remove('hidden');
        }, 500);
        document.getElementById('terdaftar').classList.add('hidden');
        return;
    }
    
    const newUser = {
        username: username,
        password: password,
        createdAt: new Date().toLocaleString()
    };
    accounts.push(newUser);
    saveAccounts(accounts);
    alert('Akun berhasil dibuat!');
    showSignIn();
}

function signIn() {
    const username = document.getElementById('signin-username').value.trim();
    const password = document.getElementById('signin-password').value.trim();
    
    const accounts = loadAccounts();
    const user = accounts.find(acc => acc.username === username && acc.password === password);

    if (user) {
        document.getElementById('sign-in-form').classList.add('hidden');
        document.getElementById('sign-in-success').classList.remove('hidden');
        const loadingScreen = document.getElementById('loading-screen-table');
        loadingScreen.classList.remove('hidden');
        loadingScreen.style.display = "flex";
        
        setTimeout(function () {
            loadingScreen.style.display = "none";
        }, 1000);

        setTimeout(function () {
            loadingScreen.classList.add('hidden');
            document.getElementById('sign-in-success').classList.add('hidden');
            document.getElementById('info-akun').classList.remove('hidden');            
            document.getElementById('info-username').textContent = `Username: ${user.username}`;
            document.getElementById('info-created-at').textContent = `Dibuat: ${user.createdAt}`;
            localStorage.setItem('loggedInUser', JSON.stringify(user));
        }, 2000);
    } else {
        setTimeout(function(){
            document.getElementById('invalid').classList.remove('hidden');
        }, 500);
        document.getElementById('invalid').classList.add('hidden');
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    document.getElementById('info-akun').classList.add('hidden');
    document.getElementById('sign-in-form').classList.remove('hidden');
}

function deleteAccount() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) return;

    if (confirm(`Apakah kamu yakin ingin menghapus akun "${loggedInUser.username}"?`)) {
        let accounts = loadAccounts();
        accounts = accounts.filter(acc => acc.username !== loggedInUser.username);
        saveAccounts(accounts);
        localStorage.removeItem('loggedInUser');
        alert('Akun berhasil dihapus!');
        location.reload();
    }
}

// Simulasi loading selama 3 detik
window.addEventListener("load", function () {
    const loadingScreen = document.getElementById("loading-screen");
    const content = document.getElementById("content");

    setTimeout(() => {
        // Sembunyikan loading screen
        loadingScreen.style.display = "none";

        // Tampilkan konten utama
        content.classList.remove("hidden");
    }, 2000); // 3000ms = 3 detik
});

// Cek apakah user sudah login sebelumnya
window.onload = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        document.getElementById('sign-in-form').classList.add('hidden');
        document.getElementById('info-akun').classList.remove('hidden');
        document.getElementById('info-username').textContent = `Username: ${loggedInUser.username}`;
        document.getElementById('info-created-at').textContent = `Dibuat: ${loggedInUser.createdAt}`;
    }
};