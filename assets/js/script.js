// Banner Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    
    // Make sure the video on active slide is playing
    const activeVideo = slides[index].querySelector('video');
    if (activeVideo) {
        activeVideo.play();
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Initialize slider
if (slides.length > 0) {
showSlide(currentSlide);
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Video Background Timer Control
let videoIndex = 0;
const videos = [
    "https://cdn.pixabay.com/video/2024/11/11/240841_tiny.mp4",
    "https://cdn.pixabay.com/video/2021/04/12/70796-538877060_tiny.mp4",
    "https://cdn.pixabay.com/video/2023/06/28/169249-840702546_tiny.mp4"
];

// Function to change video source
function changeVideo() {
    const videoElement = document.getElementById('myVideo');
    videoIndex = (videoIndex + 1) % videos.length;
    videoElement.src = videos[videoIndex];
    videoElement.play();
}

// Change video every 5 seconds
setInterval(changeVideo, 5000);

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Animation on scroll
function checkScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('show');
        }
    });
}

// Check animation when page loads
window.addEventListener('load', checkScroll);
// Check animation when scrolling
window.addEventListener('scroll', checkScroll);

// Tambahkan variabel global untuk menyimpan data ketersediaan pax
const availablePax = {
    'maldives': 10,
    'seoul': 8,
    'dubai': 6,
    'mecca': 15,
    'fuji': 12
};

// Fungsi untuk memperbarui tampilan pax yang tersedia
function updateAvailablePaxDisplay() {
    // Update pax display di package cards
    document.querySelectorAll('.package-card').forEach(card => {
        const destination = card.querySelector('.btn.book-now').getAttribute('onclick').match(/'(.*?)'/)[1];
        const paxDisplay = card.querySelector('.detail-item:nth-child(2) span');
        if (paxDisplay && destination) {
            paxDisplay.textContent = `pax: ${availablePax[destination] || 0}`;
        }
    });
}

// Booking Modal Functions
function openBookingModal(destination = '') {
    document.getElementById('bookingModal').style.display = 'flex';
    
    // Set the destination if provided
    if (destination) {
        const destinationSelect = document.getElementById('bookingDestination');
        destinationSelect.value = destination;
        updatePrice();
        updateMaxPax();
    }
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
    
    // Reset form and sections
    document.getElementById('bookingForm').reset();
    document.getElementById('bookingForm').style.display = 'block';
    document.getElementById('bookingSummary').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('receiptSection').style.display = 'none';
    
    // Update available pax display
    updateAvailablePaxDisplay();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        closeBookingModal();
    }
}

// Custom Success Popup
function showSuccessPopup(message) {
    const popup = document.getElementById('successPopup');
    const messageElement = document.getElementById('successMessage');
    
    if (messageElement) {
        messageElement.textContent = message || 'Operation completed successfully.';
    }
    
    popup.style.display = 'flex';
    
    // Close popup when clicking the X
    const closeBtn = popup.querySelector('.close-popup');
    if (closeBtn) {
        closeBtn.onclick = function() {
            popup.style.display = 'none';
        };
    }
    
    // Close popup when clicking the OK button
    const okBtn = popup.querySelector('.close-btn');
    if (okBtn) {
        okBtn.onclick = function() {
            popup.style.display = 'none';
        };
    }
    
    // Close popup when clicking outside
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    };
}

// Form Validation for Contact Form
function validateForm() {
    let isValid = true;
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    // Name validation
    if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else {
        nameError.textContent = '';
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        emailError.textContent = 'Please enter a valid email';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    
    // Subject validation
    if (!subject.value.trim()) {
        subjectError.textContent = 'Subject is required';
        isValid = false;
    } else {
        subjectError.textContent = '';
    }
    
    // Message validation
    if (!message.value.trim()) {
        messageError.textContent = 'Message is required';
        isValid = false;
    } else {
        messageError.textContent = '';
    }
    
    if (isValid) {
        // Show success popup instead of alert
        showSuccessPopup('Your message has been sent successfully!');
        
        // Reset the form
        document.getElementById('contactForm').reset();
    }
    
    return false; // Prevent form submission
}

// Form Validation for Booking Form
function validateBookingForm() {
    let isValid = true;
    const fields = ['bookingName', 'bookingEmail', 'bookingPhone', 'bookingDate', 'bookingPax', 'bookingDestination'];
    
    fields.forEach(field => {
        const input = document.getElementById(field);
        const error = document.getElementById(`${field}Error`);
        
        if (!input.value.trim()) {
            error.textContent = 'This field is required';
            isValid = false;
        } else {
            error.textContent = '';
        }
    });

    // Email validation
    const email = document.getElementById('bookingEmail');
    const emailError = document.getElementById('bookingEmailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() && !emailPattern.test(email.value)) {
        emailError.textContent = 'Please enter a valid email';
        isValid = false;
    }

    // Phone validation
    const phone = document.getElementById('bookingPhone');
    const phoneError = document.getElementById('bookingPhoneError');
    const phonePattern = /^\d{10,}$/;
    if (phone.value.trim() && !phonePattern.test(phone.value)) {
        phoneError.textContent = 'Please enter a valid phone number';
        isValid = false;
    }
    
    // Date validation - ensure date is not in the past
    const dateInput = document.getElementById('bookingDate');
    const dateError = document.getElementById('bookingDateError');
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison
    
    if (selectedDate < today) {
        dateError.textContent = 'Please select a future date';
        isValid = false;
    }

    if (isValid) {
        // Show booking summary
        showBookingSummary();
    }

    return false; // Prevent form submission for demo
}

// Function to calculate price based on destination and number of travelers
function calculatePrice() {
    const destination = document.getElementById('bookingDestination').value;
    const pax = parseInt(document.getElementById('bookingPax').value) || 0;
    
    let basePrice = 0;
    
    // Base price by destination
    switch(destination) {
        case 'maldives':
            basePrice = 750; // $750
            break;
        case 'seoul':
            basePrice = 650; // $650
            break;
        case 'dubai':
            basePrice = 850; // $850
            break;
        case 'mecca':
            basePrice = 1200; // $1200
            break;
        case 'fuji':
            basePrice = 950; // $950
            break;
        default:
            basePrice = 0;
    }
    
    // Calculate total price
    const totalPrice = basePrice * pax;
    
    // Format price in USD
    return formatUSD(totalPrice);
}

// Function to format number to USD
function formatUSD(number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(number);
}

// Update price when destination or number of travelers changes
function updatePrice() {
    const priceDisplay = document.getElementById('priceDisplay');
    if (priceDisplay) {
        priceDisplay.textContent = calculatePrice();
    }
}

// Show booking summary
function showBookingSummary() {
    const name = document.getElementById('bookingName').value;
    const destination = document.getElementById('bookingDestination');
    const destinationText = destination.options[destination.selectedIndex].text;
    const pax = document.getElementById('bookingPax').value;
    const date = document.getElementById('bookingDate').value;
    const price = calculatePrice();
    
    const summaryHTML = `
        <h3>Booking Summary</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Destination:</strong> ${destinationText}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Number of Travelers:</strong> ${pax}</p>
        <p><strong>Total Price:</strong> ${price}</p>
        <div class="summary-actions">
            <button type="button" class="btn form-submit" onclick="proceedToPayment()">Proceed to Payment</button>
            <button type="button" class="btn btn-secondary" onclick="backToBookingForm()">Back</button>
        </div>
    `;
    
    document.getElementById('bookingSummary').innerHTML = summaryHTML;
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('bookingSummary').style.display = 'block';
    document.getElementById('paymentSection').style.display = 'none';
}

// Proceed to payment
function proceedToPayment() {
    const price = calculatePrice();
    
    const paymentHTML = `
        <h3>Payment Method</h3>
        <div class="payment-options">
            <div class="payment-option">
                <input type="radio" id="eWallet" name="paymentMethod" value="eWallet" checked>
                <label for="eWallet">E-Wallet</label>
                <div class="payment-logos">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/2560px-Logo_dana_blue.svg.png" alt="Dana" class="payment-logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png" alt="OVO" class="payment-logo">
                    <img src="https://i0.wp.com/umsu.ac.id/berita/wp-content/uploads/2024/07/cara-lihat-nomor-gopay-di-aplikasi-gojek.webp?fit=850%2C510&ssl=1" alt="GoPay" class="payment-logo">
                </div>
            </div>
            <div class="payment-option">
                <input type="radio" id="mBanking" name="paymentMethod" value="mBanking">
                <label for="mBanking">Mobile Banking</label>
                <div class="payment-logos">
                    <img src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/1200px-BNI_logo.svg.png" alt="BNI" class="payment-logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/2560px-Bank_Central_Asia.svg.png" alt="BCA" class="payment-logo">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png" alt="Mandiri" class="payment-logo">
                </div>
            </div>
        </div>
        <div class="payment-details">
            <p><strong>Total Amount:</strong> ${price}</p>
        </div>
        <div class="summary-actions">
            <button type="button" class="btn form-submit" onclick="processPayment()">Pay Now</button>
            <button type="button" class="btn btn-secondary" onclick="backToSummary()">Back</button>
        </div>
    `;
    
    document.getElementById('paymentSection').innerHTML = paymentHTML;
    document.getElementById('bookingSummary').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'block';
}

// Back to booking summary
function backToSummary() {
    document.getElementById('bookingSummary').style.display = 'block';
    document.getElementById('paymentSection').style.display = 'none';
}

// Print receipt
function printReceipt() {
    const receiptContent = document.querySelector('.receipt').innerHTML;
    const originalContent = document.body.innerHTML;
    
    document.body.innerHTML = `
        <div class="print-receipt">
            <div class="receipt-print-header">
                <h2>Travel Agency</h2>
            </div>
            ${receiptContent}
        </div>
    `;
    
    window.print();
    
    // Restore original content
    document.body.innerHTML = originalContent;
    
    // Reinitialize event listeners and modal state
    initializeEventListeners();
    
    // Fix: Properly close the modal after printing
    setTimeout(() => {
        closeBookingModalAfterPrint();
    }, 100);
}

// Close booking modal after printing
function closeBookingModalAfterPrint() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
    }
    
    // Update available pax display
    updateAvailablePaxDisplay();
}

// Process payment and show receipt
function processPayment() {
    const name = document.getElementById('bookingName').value;
    const destination = document.getElementById('bookingDestination');
    const destinationValue = destination.value;
    const destinationText = destination.options[destination.selectedIndex].text;
    const paxInput = parseInt(document.getElementById('bookingPax').value) || 1;
    const date = document.getElementById('bookingDate').value;
    const price = calculatePrice();
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const bookingNumber = generateBookingNumber();
    const transactionDate = new Date().toLocaleString();
    
    // Reduce available pax
    if (availablePax[destinationValue] && availablePax[destinationValue] >= paxInput) {
        availablePax[destinationValue] -= paxInput;
    } else {
        alert("Sorry, not enough seats available for this destination!");
        return;
    }
    
    const receiptHTML = `
        <div class="receipt">
            <div class="receipt-header">
                <h3>Payment Receipt</h3>
                <p class="success-message">Payment Successful!</p>
            </div>
            <div class="receipt-details">
                <p><strong>Booking Number:</strong> ${bookingNumber}</p>
                <p><strong>Transaction Date:</strong> ${transactionDate}</p>
                <p><strong>Customer Name:</strong> ${name}</p>
                <p><strong>Destination:</strong> ${destinationText}</p>
                <p><strong>Travel Date:</strong> ${date}</p>
                <p><strong>Number of Travelers:</strong> ${paxInput}</p>
                <p><strong>Payment Method:</strong> ${paymentMethod}</p>
                <p><strong>Total Amount:</strong> ${price}</p>
            </div>
            <div class="receipt-footer">
                <p>Thank you for booking with us!</p>
                <p>A confirmation email has been sent to your email address.</p>
            </div>
            <div class="receipt-actions">
                <button type="button" class="btn form-submit" onclick="printReceipt()">Print Receipt</button>
                <button type="button" class="btn btn-secondary" onclick="closeBookingModal()">Close</button>
            </div>
        </div>
    `;
    
    document.getElementById('receiptSection').innerHTML = receiptHTML;
    document.getElementById('paymentSection').style.display = 'none';
    document.getElementById('receiptSection').style.display = 'block';
    
    // Update available pax display
    updateAvailablePaxDisplay();
}

// Generate random booking number
function generateBookingNumber() {
    const prefix = "TRV";
    const randomNum = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `${prefix}${randomNum}`;
}

// Initialize event listeners after printing
function initializeEventListeners() {
    // Reattach event listeners that were lost during printing
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', closeBookingModal);
    });
    
    // Book now buttons
    const bookButtons = document.querySelectorAll('.btn.book-now');
    bookButtons.forEach(button => {
        const destination = button.getAttribute('onclick').match(/'(.*?)'/)[1];
        button.addEventListener('click', () => openBookingModal(destination));
    });
    
    const destinationSelect = document.getElementById('bookingDestination');
    const paxInput = document.getElementById('bookingPax');
    
    if (destinationSelect && paxInput) {
        destinationSelect.addEventListener('change', updatePrice);
        paxInput.addEventListener('input', updatePrice);
        destinationSelect.addEventListener('change', updateMaxPax);
    }
    
    // Set minimum date for date input
    const dateInput = document.getElementById('bookingDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Update max pax based on available seats
function updateMaxPax() {
    const destinationSelect = document.getElementById('bookingDestination');
    const paxInput = document.getElementById('bookingPax');
    
    if (destinationSelect && paxInput) {
        const destination = destinationSelect.value;
        const maxAvailable = availablePax[destination] || 0;
        
        paxInput.setAttribute('max', maxAvailable);
        
        // If current value exceeds max, adjust it
        if (parseInt(paxInput.value) > maxAvailable) {
            paxInput.value = maxAvailable;
            updatePrice();
        }
        
        // Show warning if low availability
        const paxWarning = document.getElementById('paxWarning');
        if (paxWarning) {
            if (maxAvailable <= 3 && maxAvailable > 0) {
                paxWarning.textContent = `Only ${maxAvailable} seats left!`;
                paxWarning.style.display = 'block';
            } else if (maxAvailable === 0) {
                paxWarning.textContent = 'Sold out!';
                paxWarning.style.display = 'block';
            } else {
                paxWarning.style.display = 'none';
            }
        }
    }
}

// Add event listeners for price updates and set minimum date
document.addEventListener('DOMContentLoaded', function() {
    const destinationSelect = document.getElementById('bookingDestination');
    const paxInput = document.getElementById('bookingPax');
    const dateInput = document.getElementById('bookingDate');
    
    if (destinationSelect && paxInput) {
        destinationSelect.addEventListener('change', updatePrice);
        paxInput.addEventListener('input', updatePrice);
        destinationSelect.addEventListener('change', updateMaxPax);
        
        // Initial price update
        updatePrice();
    }
    
    // Set minimum date for date input
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
    
    // Initial update of available pax display
    updateAvailablePaxDisplay();
});

// Loading Screen Animation
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading time
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Remove loading screen after fade out
        setTimeout(function() {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.remove();
            }
        }, 500);
    }, 2000); // 2 seconds loading time
});

// Active Navigation Link
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Call the function on scroll
window.addEventListener('scroll', setActiveNavLink);
// Call on page load
window.addEventListener('load', setActiveNavLink);

// Destination Modal Functions
const destinationData = {
    'lotte': {
        name: 'Lotte World',
        location: 'Seoul, South Korea',
        image: 'https://cdn.globaleur.com/places/5e5ed54401b751678fee2194/5e5f2feaff2fe7794148c7be/o7Acpc34fP_ori.jpg',
        description: 'Lotte World is a major recreation complex in Seoul, South Korea. It consists of the world\'s largest indoor theme park, an outdoor amusement park called "Magic Island", an artificial island inside a lake linked by monorail, shopping malls, a luxury hotel, a Korean folk museum, sports facilities, and movie theaters.',
        gallery: [
            {
                image: 'https://wimg.mk.co.kr/news/cms/202404/24/news-p.v1.20240424.3a96343dfbcb43a5be33afbe0979cc96_P1.jpg',
                caption: 'Parades & Performances'
            },
            {
                image: 'https://cdn.koreatraveleasy.com/wp-content/uploads/2023/07/11145303/ice3-1024x768.jpg',
                caption: 'Ice Skating Rink'
            },
            {
                image: 'https://cdn.wisata.app/diary/5453e403-32d0-4417-aad0-d80b9bdc5e56.jpg',
                caption: 'Over 40 Rides & Attractions'
            }
        ],
        destinationValue: 'seoul'
    },
    'burj': {
        name: 'Burj Khalifa',
        location: 'Dubai, United Arab Emirates',
        image: 'https://metropolitan.realestate/wp-content/uploads/2021/06/burj-khalifa-district-00-1-scaled.jpg',
        description: 'The Burj Khalifa is the tallest building in the world, standing at 828 meters (2,717 feet). This impressive structure dominates the Dubai skyline and offers visitors breathtaking views from its observation decks. The building houses residences, offices, and the Armani Hotel Dubai.',
        gallery: [
            {
                image: 'https://accgroup.com/wp-content/uploads/2016/02/Fountain-Views.png',
                caption: 'Fountain Views'
            },
            {
                image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/81/99/0f.jpg',
                caption: 'Observation Decks on 124th, 125th & 148th Floors'
            },
            {
                image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/a5/ab/06.jpg',
                caption: 'Fine Dining Restaurants'
            }
        ],
        destinationValue: 'dubai'
    },
    'kaabah': {
        name: 'Ka\'bah',
        location: 'Mecca, Saudi Arabia',
        image: 'https://a.mktgcdn.com/p/okcmQaxCoRc4USuNhJqY3ieXHjzKYchoazKGvR0rsGY/1024x768.jpg',
        description: 'The Ka\'bah is a building at the center of Islam\'s most important mosque, the Masjid al-Haram in Mecca, Saudi Arabia. It is the most sacred site in Islam, and is considered by Muslims to be the "House of God". The building is cuboid in shape, made of granite from the nearby hills, and stands about 13.1 m (43 ft) high with sides measuring approximately 11.03 m × 12.86 m (36.2 ft × 42.2 ft).',
        gallery: [
            {
                image: 'https://cdn.rakyatku.com/imageresize/images/1631404156_saudi-pres-agency.jpg&width=640&height=427',
                caption: 'Hajar Aswad'
            },
            {
                image: 'https://i.pinimg.com/736x/a6/9c/35/a69c35a970cebd8ea58fbf29bbe9d4c6.jpg',
                caption: 'Makam Nabi Ibrahim'
            },
            {
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRe2csSiycX1qNV-008JK1m6EVcOwwH3MNBwQ&s',
                caption: 'Jejak Kaki Nabi Ibrahim'
            }
        ],
        destinationValue: 'mecca'
    }
};

function openDestinationModal(destinationId) {
    const destination = destinationData[destinationId];
    if (!destination) return;
    
    const modalContent = `
        <div class="destination-header">
            <img src="${destination.image}" alt="${destination.name}">
            <div class="destination-title">
                <h2>${destination.name}</h2>
                <p>${destination.location}</p>
            </div>
        </div>
        <div class="destination-body">
            <div class="destination-description">
                ${destination.description}
            </div>
            <h3>Gallery</h3>
            <div class="destination-gallery">
                ${destination.gallery.map(item => `
                    <div class="gallery-item">
                        <div class="gallery-image">
                            <img src="${item.image}" alt="${destination.name} Gallery">
                        </div>
                        <div class="gallery-caption">
                            ${item.caption}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('destinationModalContent').innerHTML = modalContent;
    document.getElementById('destinationModal').style.display = 'flex';
}

function closeDestinationModal() {
    document.getElementById('destinationModal').style.display = 'none';
}

// Close destination modal when clicking outside
window.onclick = function(event) {
    const destinationModal = document.getElementById('destinationModal');
    const bookingModal = document.getElementById('bookingModal');
    
    if (event.target == destinationModal) {
        closeDestinationModal();
    } else if (event.target == bookingModal) {
        closeBookingModal();
    }
}

// Perbaikan fungsi processBooking
function processBooking() {
    // Get booking details
    const booking = {
        name: document.getElementById('bookingName').value,
        email: document.getElementById('bookingEmail').value,
        phone: document.getElementById('bookingPhone').value,
        destination: document.getElementById('bookingDestination').value,
        date: document.getElementById('bookingDate').value,
        pax: parseInt(document.getElementById('bookingPax').value),
        totalPrice: calculatePrice()
    };
    
    // Generate booking ID
    const bookingId = 'TRV' + Date.now().toString().slice(-6);
    
    // Show success message
    showSuccessPopup('Your booking has been confirmed!');
    
    // Render receipt
    renderReceipt({
        id: bookingId,
        date: new Date().toLocaleString(),
        customerName: booking.name,
        customerEmail: booking.email,
        destination: getDestinationName(booking.destination),
        travelDate: booking.date,
        travelers: booking.pax,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
        total: booking.totalPrice
    });
}

// Perbaikan fungsi renderReceipt
function renderReceipt(booking) {
    const receiptSection = document.getElementById('receiptSection');
    
    const receiptHTML = `
        <div class="receipt">
            <div class="receipt-header">
                <h3>Payment Receipt</h3>
                <div class="success-message">Payment Successful!</div>
            </div>
            <div class="receipt-details">
                <p><span>Booking Number:</span> <span>${booking.id}</span></p>
                <p><span>Transaction Date:</span> <span>${booking.date}</span></p>
                <p><span>Customer Name:</span> <span>${booking.customerName}</span></p>
                <p><span>Destination:</span> <span>${booking.destination}</span></p>
                <p><span>Travel Date:</span> <span>${booking.travelDate}</span></p>
                <p><span>Number of Travelers:</span> <span>${booking.travelers}</span></p>
                <p><span>Payment Method:</span> <span>${booking.paymentMethod}</span></p>
                <p><span>Total Amount:</span> <span>$${booking.total}</span></p>
            </div>
            <div class="receipt-footer">
                <p>Thank you for booking with us!</p>
                <p>A confirmation email has been sent to your email address.</p>
            </div>
            <div class="receipt-actions">
                <button class="btn solid" onclick="printReceipt()">Print Receipt</button>
                <button class="btn" onclick="closeBookingModal()">Close</button>
            </div>
        </div>
    `;
    
    receiptSection.innerHTML = receiptHTML;
    receiptSection.style.display = 'block';
    
    // Hide other sections
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('bookingSummary').style.display = 'none';
    document.getElementById('paymentSection').style.display = 'none';
}

// Perbaikan fungsi printReceipt
function printReceipt() {
    const receiptContent = document.querySelector('.receipt').innerHTML;
    const printWindow = window.open('', '_blank');
    
    printWindow.document.write(`
        <html>
        <head>
            <title>Travel Booking Receipt</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }
                .receipt-header {
                    text-align: center;
                    margin-bottom: 20px;
                    background: #0066CC;
                    color: white;
                    padding: 20px;
                    border-radius: 10px 10px 0 0;
                }
                .receipt-details p {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;
                    border-bottom: 1px dashed #ddd;
                    padding-bottom: 5px;
                }
                .receipt-footer {
                    text-align: center;
                    margin-top: 30px;
                    background: #f9f9f9;
                    padding: 20px;
                    border-radius: 0 0 10px 10px;
                }
                .success-message {
                    background: rgba(255, 255, 255, 0.2);
                    padding: 5px 10px;
                    border-radius: 20px;
                    display: inline-block;
                }
                @media print {
                    .receipt-actions {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>
            <div class="receipt">
                ${receiptContent}
            </div>
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    // Print after a short delay to ensure content is loaded
    setTimeout(() => {
        printWindow.print();
    }, 500);
}

// Hapus fungsi initializeHistory dari DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Remove add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.remove();
    });
});
