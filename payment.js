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


// Handling of the telegram client notification

// Add these constants at the top of payment.js
const TELEGRAM_BOT_TOKEN = '7694967219:AAHdEUQG3gtD9sguA7VvhlWtNIULlQMg74c';
const TELEGRAM_CHAT_ID = '7694967219';

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

function validateForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const depositConfirm = document.getElementById('depositConfirm').checked;
    const productName = sessionStorage.getItem('productName');
    const price = sessionStorage.getItem('price');

    if (!depositConfirm) {
        alert('Veuillez confirmer que vous avez effectué le dépôt.');
        return false;
    }

    if (name && phone && address && depositConfirm) {
        // Send Telegram notification
        const message = `🛍️ Nouvelle commande!\n\nProduit: ${productName}\nPrix: ${price} FCFA\n\nClient:\nNom: ${name}\nTéléphone: ${phone}\nAdresse: ${address}`;
        
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        alert('Commande confirmée ! Nous vous contacterons bientôt.');
        window.location.href = 'index.html';
    }

    return false;
}

// Keep existing updateQuantity, showModal, and hideModal functions as they are

