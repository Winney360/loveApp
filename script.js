document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const loveNote = document.getElementById('loveNote');
    
    // Yes button functionality - show note at top
    yesBtn.addEventListener('click', function() {
        showLoveNote();
        createHeartExplosion();
        celebrateLove();
    });
    
    // No button direction change functionality
    let noBtnMoveCount = 0;
    let currentDirection = 1; 
    
    function changeNoButtonDirection() {
        noBtnMoveCount++;
        
        // Add moving animation class
        noBtn.classList.add('moving');
        
        // Change direction
        currentDirection *= -1;
        
        // Move button slightly in the new direction
        const currentTransform = noBtn.style.transform || '';
        const moveDistance = 30 * currentDirection;
        
        // Apply the direction change with animation
        noBtn.style.transform = `translateX(${moveDistance}px)`;
        
        // Remove moving class after animation
        setTimeout(() => {
            noBtn.classList.remove('moving');
            // Reset position after a moment
            setTimeout(() => {
                noBtn.style.transform = '';
            }, 200);
        }, 500);
        
        // Change button text based on move count
        const messages = [
            "💔 No",
            "😟 really?.. wanna brreak my heart?",
            "😢 Nope?", 
            "😭 Never?",
            "🥺 Please.. no?",
            "😰 Stop trying to hurt me:(",
            "😵 Please don't break my heart",
            "🤯 Trust me I've been broken before",
            "😴 Still no?",
            "🥰 Just say yes! You know how much i love you :("
        ];
        
        if (noBtnMoveCount < messages.length) {
            noBtn.textContent = messages[noBtnMoveCount];
        }
        
        // Make button smaller after many attempts
        if (noBtnMoveCount > 5) {
            noBtn.style.transform += ' scale(0.9)';
        }
        
        if (noBtnMoveCount > 8) {
            noBtn.style.transform += ' scale(0.8)';
            noBtn.style.opacity = '0.9';
        }
    }
    
    // Add event listeners for No button
    noBtn.addEventListener('mouseenter', changeNoButtonDirection);
    noBtn.addEventListener('mouseover', changeNoButtonDirection);
    
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        changeNoButtonDirection();
        
        
    });
    
    // Enhanced touch events for mobile
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        changeNoButtonDirection();
    });
    
    noBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    
    // Additional mobile interaction
    noBtn.addEventListener('touchmove', function(e) {
        e.preventDefault();
    });
    
    function showLoveNote() {
        // Show the love note at the top
        loveNote.style.display = 'block';
        
        // Auto-hide after 10 seconds
        setTimeout(() => {
            if (loveNote.style.display !== 'none') {
                loveNote.style.display = 'none';
            }
        }, 10000);
    }
    
    function createHeartExplosion() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.textContent = ['💖', '💕', '💗', '💓', '💝'][Math.floor(Math.random() * 5)];
                heart.style.cssText = `
                    position: fixed;
                    font-size: 2em;
                    pointer-events: none;
                    z-index: 9999;
                    left: 50%;
                    top: 50%;
                    animation: heartExplode 3s ease-out forwards;
                `;
                
                const angle = (i / 15) * 360;
                const distance = 100 + Math.random() * 150;
                
                heart.style.setProperty('--angle', angle + 'deg');
                heart.style.setProperty('--distance', distance + 'px');
                
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 3000);
            }, i * 50);
        }
        
        // Add heart explosion animation if not already added
        if (!document.querySelector('#heartExplodeStyle')) {
            const style = document.createElement('style');
            style.id = 'heartExplodeStyle';
            style.textContent = `
                @keyframes heartExplode {
                    0% {
                        transform: translate(-50%, -50%) rotate(0deg) translateY(0) scale(0);
                        opacity: 1;
                    }
                    50% {
                        transform: translate(-50%, -50%) rotate(180deg) translateY(var(--distance)) scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: translate(-50%, -50%) rotate(360deg) translateY(calc(var(--distance) * 1.5)) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function celebrateLove() {
        // Change background temporarily
        document.body.style.background = 'linear-gradient(135deg, #ff6b9d 0%, #ff8cc8 50%, #ffd1dc 100%)';
        
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)';
        }, 3000);
    }
    
    function showTemporaryMessage(text) {
        const message = document.createElement('div');
        message.textContent = text;
        message.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-family: 'Quicksand', sans-serif;
            z-index: 9999;
            animation: slideDown 0.5s ease, slideUp 0.5s ease 2s forwards;
            max-width: 90vw;
            text-align: center;
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => message.remove(), 3000);
        
        // Add slide animations if not already added
        if (!document.querySelector('#slideAnimationStyle')) {
            const style = document.createElement('style');
            style.id = 'slideAnimationStyle';
            style.textContent = `
                @keyframes slideUp {
                    from { transform: translateX(-50%) translateY(0); opacity: 1; }
                    to { transform: translateX(-50%) translateY(-100px); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Prevent scrolling on mobile when interacting with buttons
    document.addEventListener('touchmove', function(e) {
        if (e.target === noBtn || e.target === yesBtn) {
            e.preventDefault();
        }
    }, { passive: false });
});