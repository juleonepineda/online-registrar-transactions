document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Login Gatekeeping Logic ---
    const loginForm = document.getElementById('login-form');
    const appContent = document.getElementById('app-content');
    const loginOverlay = document.getElementById('login-overlay');
    const loginMessage = document.getElementById('login-message');

    // --- NEW: Simulated Student Database (Multiple Users) ---
    // All 6 provided accounts are stored here for verification and login.
    const validUsers = [
        { email: "jsmorales24@bpsu.edu.ph", id: "24-05487", password: "08-11-2006" },
        { email: "jegperalta24@bpsu.edu.ph", id: "24-05255", password: "09-03-2006" },
        { email: "azdprieto24@bpsu.edu.ph", id: "24-04229", password: "04-18-2006" },
        { email: "jqpineda24@bpsu.edu.ph", id: "24-04617", password: "07-01-2006" },
        { email: "ldvmores24@bpsu.edu.ph", id: "24-03096", password: "02-09-2006" },
        { email: "jmdquintos24@bpsu.edu.ph", id: "24-03650", password: "09-18-2006" }
    ];

    // Function to show the main content and hide the login
    function showAppContent() {
        if (appContent) {
            appContent.style.display = 'block';
            if (loginOverlay) {
                loginOverlay.style.display = 'none';
            }
        }
    }

    // Check if the user is already logged in (client-side simulation)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
        showAppContent();
    } else if (appContent && window.location.pathname.split('/').pop() !== 'index.html') {
        // If not logged in and not on the index page, redirect to index
        window.location.href = 'index.html'; 
    }

    if (loginForm) { // Only run this logic if the login form is on the page (index.html)
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous messages
            loginMessage.textContent = "";
            loginMessage.className = 'message';

            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();

            // NEW: Check against the validUsers array for login
            const user = validUsers.find(u => u.email === username && u.password === password);

            if (user) {
                // Successful Login
                loginMessage.textContent = "Login successful. Welcome to the Student Portal.";
                loginMessage.className = 'message success';
                
                // Set the "logged in" flag
                localStorage.setItem('isLoggedIn', 'true'); 

                // Redirect after a short delay
                setTimeout(showAppContent, 500); 

            } else {
                // Failed Login
                loginMessage.textContent = "Error: Invalid email or password. Access Denied.";
                loginMessage.className = 'message error';
            }
        });
    }

    // --- 1. Student ID Verification Logic (Used in request.html) ---
    const verificationForm = document.getElementById('verification-form');
    const documentOptions = document.getElementById('document-options');
    const verificationMessage = document.getElementById('verification-message');

    if (verificationForm) {
        verificationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous messages
            verificationMessage.textContent = "";
            verificationMessage.className = 'message';
            documentOptions.style.display = 'none'; // Hide request form on new attempt

            const studentId = document.getElementById('student-id').value.trim();
            const studentEmail = document.getElementById('student-email').value.trim();

            // NEW: Check against the validUsers array for verification
            const user = validUsers.find(u => u.id === studentId && u.email === studentEmail);


            // Combined Student ID and BPSU Email verification logic
            if (user) {
                verificationMessage.textContent = "Identity confirmed. Please proceed to document selection.";
                verificationMessage.className = 'message success';
                documentOptions.style.display = 'block'; // Show the document request form
            } else {
                verificationMessage.textContent = "Error: Student ID or BPSU Email did not match our records. Please verify your official credentials.";
                verificationMessage.className = 'message error';
            }
        });
    }

    // --- 2. Document Request Submission Logic (Used in request.html) ---
    const documentRequestForm = document.getElementById('document-request-form');
    const requestMessage = document.getElementById('request-message');

    if (documentRequestForm) {
        documentRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous messages
            requestMessage.textContent = "";
            requestMessage.className = 'message';
            
            const docType = document.getElementById('document-type').value;
            const paymentMethod = document.getElementById('payment-method').value;

            if (!docType || !paymentMethod) {
                 requestMessage.textContent = "Error: Please select both a document type and a payment method.";
                 requestMessage.className = 'message error';
                 return;
            }

            // Get the verified email for the success message
            const verifiedEmail = document.getElementById('student-email').value.trim();

            // Simulated Successful Submission
            requestMessage.textContent = `Request for "${docType}" submitted successfully. A payment link for "${paymentMethod}" has been sent to ${verifiedEmail}. The document will be processed upon payment confirmation.`;
            requestMessage.className = 'message success';
            
            // Reset forms for a new request flow
            documentRequestForm.reset();
            verificationForm.reset();
            documentOptions.style.display = 'none';
            verificationMessage.textContent = "Verification step reset. Start a new request by verifying your ID again."; 
            verificationMessage.className = 'message';
        });
    }

    // --- 3. Log Out Logic ---
    const logoutButton = document.getElementById('logout-button');

    function handleLogout(e) {
        if (e) e.preventDefault();
        
        // Clear the "logged in" flag
        localStorage.removeItem('isLoggedIn'); 
        
        // Redirect to the login page (index.html)
        window.location.href = 'index.html';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }

    // --- 4. Active Navigation Highlighting ---
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Check if the link's path matches the current page path
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active'); // Add the 'active' class
        }
    });

});