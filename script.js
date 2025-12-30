document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       1. INITIALIZE ANIMATE ON SCROLL (AOS)
       ========================================= */
    // Checks if AOS library is loaded
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,   // Animation duration in ms
            easing: 'ease-out-cubic',
            once: true,      // Run animation only once per session
            offset: 100      // Start animation 100px before element is visible
        });
    }

    /* =========================================
       2. STICKY NAVBAR EFFECT
       ========================================= */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar--scrolled');
        } else {
            navbar.classList.remove('navbar--scrolled');
        }
    });

    /* =========================================
       3. NUMBER COUNTER ANIMATION
       ========================================= */
    const statsSection = document.querySelector('.hero__stats');
    const statNumbers = document.querySelectorAll('.stat-box h3');
    let started = false; 

    function startCount(el) {
        const text = el.innerText;
        const goal = parseInt(text); 
        // Extract suffix (e.g. "+" or "k+")
        const suffix = text.replace(/[0-9]/g, ''); 
        
        let count = 0;
        // Determine speed: larger numbers need larger increments
        const speed = goal < 100 ? 40 : 100; 
        const increment = goal / speed; 

        const timer = setInterval(() => {
            count += increment;
            if (count >= goal) {
                el.innerText = goal + suffix;
                clearInterval(timer);
            } else {
                el.innerText = Math.ceil(count) + suffix;
            }
        }, 30); 
    }

    // Use Intersection Observer to trigger animation only when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !started) {
                statNumbers.forEach(stat => startCount(stat));
                started = true;
            }
        });
    }, { threshold: 0.5 });

    if(statsSection) {
        observer.observe(statsSection);
    }

    /* =========================================
       4. SMOOTH SCROLLING FOR ANCHOR LINKS
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement){
                // Offset for fixed navbar height (80px)
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    /* =========================================
       5. FORM SUBMISSION INTERACTION
       ========================================= */
    const form = document.querySelector('.hero__form');
    
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            const originalBg = window.getComputedStyle(btn).backgroundColor;
            
            // 1. Loading State
            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none'; // Prevent double clicking
            
            // Simulate API call delay
            setTimeout(() => {
                // 2. Success State
                btn.style.backgroundColor = '#10b981'; // Green
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Registration Confirmed!';
                
                // Reset form fields
                form.reset();
                
                // 3. Revert to Original State after 3 seconds
                setTimeout(() => {
                    btn.style.backgroundColor = ''; // Removes inline style to use CSS class again
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'all';
                    btn.innerText = originalText;
                }, 3000);
            }, 1500);
        });
    }

});