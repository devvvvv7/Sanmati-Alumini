const alumniData = [
    {
        name: "Rajesh Kumar",
        batch: "2015-2019",
        profession: "Engineer",
        location: "Mumbai, India",
        company: "Tech Solutions Ltd."
    },
    {
        name: "Priya Sharma",
        batch: "2010-2014",
        profession: "Doctor",
        location: "Delhi, India",
        company: "Apollo Hospital"
    },
    {
        name: "Amit Patel",
        batch: "2020-2024",
        profession: "Engineer",
        location: "Bangalore, India",
        company: "Google India"
    },
    {
        name: "Neha Singh",
        batch: "2005-2009",
        profession: "Teacher",
        location: "Pune, India",
        company: "International School"
    },
    {
        name: "Vikash Agarwal",
        batch: "2015-2019",
        profession: "Entrepreneur",
        location: "Dubai, UAE",
        company: "StartUp Ventures"
    },
    {
        name: "Kavita Jain",
        batch: "2010-2014",
        profession: "Doctor",
        location: "London, UK",
        company: "NHS Hospital"
    },
    {
        name: "Rohit Gupta",
        batch: "2020-2024",
        profession: "Engineer",
        location: "San Francisco, USA",
        company: "Meta Inc."
    },
    {
        name: "Anjali Verma",
        batch: "2005-2009",
        profession: "Teacher",
        location: "Sydney, Australia",
        company: "Public School System"
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeAlumniDirectory();
    initializeAnimatedCounters();
    initializeSpotlightCarousel();
    initializeScrollEffects();
    initializeTimeline();
});

// Alumni Directory Functions
function initializeAlumniDirectory() {
    displayAlumni(alumniData);
    setupFilters();
}

function displayAlumni(alumni) {
    const alumniGrid = document.getElementById('alumniGrid');
    alumniGrid.innerHTML = '';
    
    alumni.forEach(alumnus => {
        const alumniCard = createAlumniCard(alumnus);
        alumniGrid.appendChild(alumniCard);
    });
}

function createAlumniCard(alumnus) {
    const card = document.createElement('div');
    card.className = 'alumni-card';
    
    const initials = alumnus.name.split(' ').map(n => n[0]).join('');
    
    card.innerHTML = `
        <div class="alumni-photo">${initials}</div>
        <div class="alumni-name">${alumnus.name}</div>
        <div class="alumni-details">
            <div>Batch: ${alumnus.batch}</div>
            <div>Profession: ${alumnus.profession}</div>
            <div>Location: ${alumnus.location}</div>
            <div>Company: ${alumnus.company}</div>
        </div>
        <button class="btn btn-primary" onclick="requestAccess('${alumnus.name}')">Request Access</button>
    `;
    
    return card;
}

function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const batchFilter = document.getElementById('batchFilter');
    const professionFilter = document.getElementById('professionFilter');
    
    function filterAlumni() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedBatch = batchFilter.value;
        const selectedProfession = professionFilter.value;
        
        const filteredAlumni = alumniData.filter(alumnus => {
            const matchesSearch = alumnus.name.toLowerCase().includes(searchTerm) ||
                                alumnus.profession.toLowerCase().includes(searchTerm) ||
                                alumnus.company.toLowerCase().includes(searchTerm);
            const matchesBatch = !selectedBatch || alumnus.batch === selectedBatch;
            const matchesProfession = !selectedProfession || alumnus.profession === selectedProfession;
            
            return matchesSearch && matchesBatch && matchesProfession;
        });
        
        displayAlumni(filteredAlumni);
    }
    
    searchInput.addEventListener('input', filterAlumni);
    batchFilter.addEventListener('change', filterAlumni);
    professionFilter.addEventListener('change', filterAlumni);
}

// Animated Counters
function initializeAnimatedCounters() {
    const observerOptions = {
        threshold: 0.7
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target >= 1000) {
                counter.textContent = (current / 1000).toFixed(0) + 'K+';
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 20);
    });
}

// Spotlight Carousel
let currentSpotlight = 0;

function initializeSpotlightCarousel() {
    setInterval(() => {
        nextSpotlight();
    }, 5000);
}

function nextSpotlight() {
    const track = document.getElementById('spotlightTrack');
    const cards = track.children;
    currentSpotlight = (currentSpotlight + 1) % cards.length;
    track.style.transform = `translateX(-${currentSpotlight * 100}%)`;
}

function previousSpotlight() {
    const track = document.getElementById('spotlightTrack');
    const cards = track.children;
    currentSpotlight = currentSpotlight === 0 ? cards.length - 1 : currentSpotlight - 1;
    track.style.transform = `translateX(-${currentSpotlight * 100}%)`;
}

// Timeline Interaction
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Navigation Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
       });
    }
}

// Form Handlers
function submitNewsletter(event) {
    event.preventDefault();
    alert('Thank you for subscribing to our newsletter! We will keep you updated with the latest alumni news and events.');
    event.target.reset();
}

function requestAccess(alumniName) {
    alert(`Access request sent for ${alumniName}'s detailed profile. The alumni will be notified and you'll receive a response within 24 hours.`);
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
});
