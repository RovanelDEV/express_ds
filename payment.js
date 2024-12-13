function handlePayment(method, productName, price) {
    // Store product information in sessionStorage
    sessionStorage.setItem('productName', productName);
    sessionStorage.setItem('price', price);
    
    // Redirect to the appropriate payment page
    if (method === 'mtn') {
        window.location.href = 'p_mtn.html';
    } else if (method === 'airtel') {
        window.location.href = 'p_airtel.html';
    }
}
