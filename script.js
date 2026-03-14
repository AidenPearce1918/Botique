// Modern Botique - Ladies Exclusive Fashion Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('Botique - Exclusive Ladies Fashion loaded');

    // Collection filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            products.forEach(product => {
                if (filterValue === 'all' || product.getAttribute('data-category') === filterValue) {
                    product.style.display = 'block';
                    // Add fade-in animation
                    product.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    product.style.display = 'none';
                }
            });
        });
    });

    // Product click functionality with enhanced interaction
    products.forEach(product => {
        product.addEventListener('click', function() {
            const productName = this.querySelector('h3').textContent;
            const productPrice = this.querySelector('.price').textContent;

            // Create a modern modal or toast notification
            showProductModal(productName, productPrice);
        });
    });

    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add CSS animation for fadeIn
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});

function showProductModal(name, price) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.product-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>${name}</h3>
            <p class="modal-price">${price}</p>
            <p>Experience the elegance of this exquisite piece. Contact us to arrange a personal viewing or styling consultation.</p>
            <button class="inquire-btn">Inquire Now</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .product-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: modalFadeIn 0.3s ease;
        }
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 400px;
            text-align: center;
            position: relative;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
        }
        .modal-price {
            font-size: 1.5rem;
            color: #D4AF37;
            font-weight: 600;
            margin: 1rem 0;
        }
        .inquire-btn {
            background: linear-gradient(135deg, #8B5A3C 0%, #D4AF37 100%);
            color: white;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .inquire-btn:hover {
            transform: translateY(-2px);
        }
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(modalStyle);

    // Close modal functionality
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
        modalStyle.remove();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            modalStyle.remove();
        }
    });

    // Inquire button functionality
    modal.querySelector('.inquire-btn').addEventListener('click', () => {
        alert('Thank you for your interest! Our stylist will contact you shortly.');
        modal.remove();
        modalStyle.remove();
    });
}