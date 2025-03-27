// Track user interactions and page views
function trackUserInteractions() {
    // Track page view when the page loads
    const pageViewEvent = {
        timestamp: new Date().toISOString(),
        eventType: 'view',
        eventObject: 'page',
        url: window.location.href,
        pageTitle: document.title
    };
    console.log(`${pageViewEvent.timestamp}, ${pageViewEvent.eventType}, ${pageViewEvent.eventObject}`);

    // Track all click events
    document.addEventListener('click', function(event) {
        // Get the target element
        const target = event.target;
        
        // Determine the element type
        let elementType = target.tagName.toLowerCase();
        if (target.classList.length > 0) {
            elementType += `.${Array.from(target.classList).join('.')}`;
        }
        if (target.id) {
            elementType += `#${target.id}`;
        }

        // Special cases for specific element types
        if (target.tagName === 'IMG') {
            elementType = 'image';
        } else if (target.tagName === 'A') {
            elementType = 'link';
        } else if (target.tagName === 'BUTTON') {
            elementType = 'button';
        } else if (target.tagName === 'SELECT') {
            elementType = 'drop-down';
        } else if (target.tagName === 'INPUT') {
            elementType = `input[type=${target.type}]`;
        }

        // Create click event object
        const clickEvent = {
            timestamp: new Date().toISOString(),
            eventType: 'click',
            eventObject: elementType,
            element: target,
            position: {
                x: event.clientX,
                y: event.clientY
            }
        };

        // Log to console in the requested format
        console.log(`${clickEvent.timestamp}, ${clickEvent.eventType}, ${clickEvent.eventObject}`);

    }, true); // Use capture phase to catch all clicks

    // Track visibility changes (for page view duration)
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            const pageViewEvent = {
                timestamp: new Date().toISOString(),
                eventType: 'view',
                eventObject: 'page',
                visibility: 'visible'
            };
            console.log(`${pageViewEvent.timestamp}, ${pageViewEvent.eventType}, ${pageViewEvent.eventObject}`);
        } else {
            const pageHideEvent = {
                timestamp: new Date().toISOString(),
                eventType: 'view',
                eventObject: 'page',
                visibility: 'hidden'
            };
            console.log(`${pageHideEvent.timestamp}, ${pageHideEvent.eventType}, ${pageHideEvent.eventObject}`);
        }
    });

    // Track section views via Intersection Observer
    const sections = document.querySelectorAll('section, header, footer');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionViewEvent = {
                    timestamp: new Date().toISOString(),
                    eventType: 'view',
                    eventObject: entry.target.tagName.toLowerCase() + 
                               (entry.target.id ? `#${entry.target.id}` : '') +
                               (entry.target.classList.length > 0 ? `.${Array.from(entry.target.classList).join('.')}` : '')
                };
                console.log(`${sectionViewEvent.timestamp}, ${sectionViewEvent.eventType}, ${sectionViewEvent.eventObject}`);
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', trackUserInteractions);