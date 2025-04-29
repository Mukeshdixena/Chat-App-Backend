document.getElementById('signupForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const userData = { username: name, email, phonenumber: phone, password };

    console.log(userData);

    try {
        const response = await axios.post(`${CONFIG.API_BASE_URL}/api/postUser`, userData);
        console.log(response)
        if (response.status === 201) {
            window.location.href = "../index.html"; // Adjust this URL based on your sign-in page path
        } else {
            alert(response.message);
        }
    } catch (error) {
        console.log('Error submitting the form:', error);
        // Handle error, e.g., show a message to the user
        alert(error?.response?.data?.message)
    }
});
