document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.flow-node');
    const body = document.body;
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const dropdowns = document.querySelectorAll('.dropdown');
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeNotification = document.getElementById('themeNotification');

    // Check for saved theme preference or default to light theme
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(savedTheme);

    // Set initial icon based on saved theme
    if (themeToggleBtn) {
        const icon = themeToggleBtn.querySelector('.toggle-icon');
        icon.textContent = savedTheme === 'dark-theme' ? '☀️' : '🌙';
    }

    // Theme toggle button click handler
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const isDarkMode = body.classList.contains('dark-theme');
            
            // Toggle theme
            body.classList.remove('light-theme', 'dark-theme');
            
            if (isDarkMode) {
                body.classList.add('light-theme');
                localStorage.setItem('theme', 'light-theme');
                if (themeNotification) {
                    themeNotification.querySelector('.notification-text').textContent = 'Light Mode Activated';
                    themeNotification.classList.add('show');
                }
            } else {
                body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark-theme');
                if (themeNotification) {
                    themeNotification.querySelector('.notification-text').textContent = 'Dark Mode Activated';
                    themeNotification.classList.add('show');
                }
            }
            
            // Auto hide notification after 3 seconds
            if (themeNotification) {
                setTimeout(() => {
                    themeNotification.classList.remove('show');
                }, 3000);
            }
            
            // Animate toggle button
            themeToggleBtn.classList.add('dark');
            setTimeout(() => {
                themeToggleBtn.classList.remove('dark');
            }, 600);
            
            // Update icon
            const icon = themeToggleBtn.querySelector('.toggle-icon');
            icon.textContent = isDarkMode ? '☀️' : '🌙';
        });
    }

    // Title glitch effect
    const title = document.querySelector('.master-title');
    if (title) {
        const originalText = title.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        
        function glitchText() {
            if (Math.random() > 0.95) {
                let glitched = '';
                for (let i = 0; i < originalText.length; i++) {
                    glitched += Math.random() > 0.9 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : originalText[i];
                }
                title.textContent = glitched;
                setTimeout(() => { title.textContent = originalText; }, 50);
            }
        }
        setInterval(glitchText, 3000);
    }

    // Parallax scroll effect
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking && window.innerWidth > 768) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                nodes.forEach((node, i) => {
                    const speed = (i % 3 + 1) * 0.02;
                    node.style.transform = `translateY(${scrolled * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // Node hover effects
    nodes.forEach(node => {
        const quote = node.querySelector('.data-pulse p:first-child');
        const originalQuote = quote ? quote.textContent : '';
        let typeInterval;
        
        node.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768 && quote) {
                let index = 0;
                quote.textContent = '';
                typeInterval = setInterval(() => {
                    if (index < originalQuote.length) {
                        quote.textContent += originalQuote[index++];
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 30);
            }
        });
        
        node.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768 && quote) {
                clearInterval(typeInterval);
                quote.textContent = originalQuote;
            }
        });

        // Ripple effect on click
        node.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255, 140, 0, 0.5) 0%, transparent 70%);
                width: 20px;
                height: 20px;
                left: ${e.clientX - node.getBoundingClientRect().left - 10}px;
                top: ${e.clientY - node.getBoundingClientRect().top - 10}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            node.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Desktop dropdown handling
    if (window.innerWidth > 768) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('mouseenter', () => {
                dropdown.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', () => {
                dropdown.classList.remove('active');
            });
        });
    }

    // Mobile dropdown handling
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        if (dropdownToggle) {
            dropdownToggle.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(item => {
                        if (item !== dropdown) {
                            item.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });

    // Close dropdowns when clicking on a dropdown link
    document.querySelectorAll('.dropdown-link').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            // Reset mobile states on desktop
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});
