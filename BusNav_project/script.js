// Script for handling the login page functionality

// Function to handle login based on the selected user type
function login() {
    const userType = document.querySelector('.user-btn.active')?.innerText.toLowerCase();
    
    if (!userType) {
        
        console.log('abc');
        return;
    }
    else{

    // let username = '';
    // let password = '';

    if (userType === 'user') {
        username = document.getElementById('user-name').value;
        if (!username) {
            alert('Please enter your name.');
            console.log('abc2');
            return;
        }
        // Redirect to the user page
        window.location.href = 'user-page/index.html'; // Adjust path if needed
    } 
    if (userType === 'driver') {
        const driverId = document.getElementById('driver-id').value;
        const driverPassword = document.getElementById('driver-password').value;
        if (!driverId || !driverPassword) {
            alert('Please enter your Employee ID and Password.');
    
            return;
        }
         window.location.href = '#'
        // Implement driver login logic here if necessary
    }
     if (userType === 'admin') {
        const adminId = document.getElementById('admin-id').value;
        const adminPassword = document.getElementById('admin-password').value;
        if (!adminId || !adminPassword) {
            alert('Please enter your Admin ID and Password.');
            return;
            
        }
        // Implement admin login logic here if necessary
        window.location.href = 'admin-type/employee-list.html'
    }
}
}

// Function to handle user type button clicks
function showLoginPanel(type) {
    document.querySelectorAll('.user-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.login-panel').forEach(panel => panel.style.display = 'none');
    document.getElementById(`${type}-login`).style.display = 'block';
    document.querySelector(`.user-btn.${type}-btn`).classList.add('active');
}

// Function to handle forgot password
function forgotPassword() {
    alert('Forgot Password functionality not implemented yet.');
}

// Optional: Initialize page with default settings if needed
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.user-btn').click(); // Set default user type if needed
});
