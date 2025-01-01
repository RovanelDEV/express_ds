function handlePayment(method, productName, price) {
    // Get the quantity from the product's counter
    const productCard = event.target.closest('.product-card');
    const quantity = parseInt(productCard.querySelector('.counter-value').textContent);
    const totalPrice = (parseFloat(price.replace('.', '')) * quantity).toLocaleString('fr-FR');
    
    // Store product information in sessionStorage
    sessionStorage.setItem('productName', productName);
    sessionStorage.setItem('price', totalPrice);
    sessionStorage.setItem('quantity', quantity);
    
    // Redirect to the appropriate payment page
    if (method === 'mtn') {
        window.location.href = 'p_mtn.html';
    } else if (method === 'airtel') {
        window.location.href = 'p_airtel.html';
    }
}

function updateQuantity(button, action) {
    const counterContainer = button.closest('.counter-container');
    const counterValue = counterContainer.querySelector('.counter-value');
    const productCard = button.closest('.product-card');
    const priceElement = productCard.querySelector('.price');
    const basePrice = priceElement.dataset.basePrice;
    
    let quantity = parseInt(counterValue.textContent);
    
    if (action === 'increase') {
        quantity++;
    } else if (action === 'decrease' && quantity > 1) {
        quantity--;
    }
    
    counterValue.textContent = quantity;
    
    // Update price based on quantity
    const totalPrice = (parseFloat(basePrice.replace('.', '')) * quantity).toLocaleString('fr-FR');
    priceElement.textContent = totalPrice + ' FCFA';
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    // Add active class after a small delay to trigger animation
    setTimeout(() => {
        modal.querySelector('.modal-content').classList.add('active');
    }, 10);

    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            hideModal(modalId);
        }
    });
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.remove('active');
    // Wait for animation to finish before hiding modal
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}


// Add these constants at the top of payment.js
const TELEGRAM_BOT_TOKEN = '7694967219:AAHdEUQG3gtD9sguA7VvhlWtNIULlQMg74c';
const TELEGRAM_CHAT_ID = '6045605492';

function handlePayment(method, productName, price) {
    const productCard = event.target.closest('.product-card');
    const quantity = parseInt(productCard.querySelector('.counter-value').textContent);
    const totalPrice = (parseFloat(price.replace('.', '')) * quantity).toLocaleString('fr-FR');
    
    sessionStorage.setItem('productName', productName);
    sessionStorage.setItem('price', totalPrice);
    sessionStorage.setItem('quantity', quantity);
    
    if (method === 'mtn') {
        window.location.href = 'p_mtn.html';
    } else if (method === 'airtel') {
        window.location.href = 'p_airtel.html';
    }
}


