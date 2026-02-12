/**
 * GSAP Disclosure Animation Script
 * Handles custom height sliding and rotation to prevent the 
 * abrupt snapping of native <details> elements.
 */

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.disclosure-item');

    items.forEach(item => {
        const summary = item.querySelector('summary');
        const wrapper = item.querySelector('.panel-wrapper');
        const inner = item.querySelector('.panel-inner');
        const chevron = item.querySelector('.chevron');

        // INITIAL STATE CHECK
        // If the HTML has the 'open' attribute, ensure GSAP aligns the styles
        if (item.hasAttribute('open')) {
            gsap.set(wrapper, { height: "auto", opacity: 1 });
            gsap.set(chevron, { rotation: 180 });
        }

        // CLICK HANDLER
        summary.addEventListener('click', (e) => {
            /** * e.preventDefault() is critical here. 
             * It stops the browser from immediately toggling the 'open' attribute,
             * allowing us to animate the transition manually.
             */
            e.preventDefault(); 
            
            const isOpen = item.hasAttribute('open');

            if (!isOpen) {
                // ACTION: OPENING
                // 1. Add the attribute so CSS selectors (like colors) update
                item.setAttribute('open', '');
                
                // 2. Animate Height from 0 to the actual content height (inner.offsetHeight)
                gsap.fromTo(wrapper, 
                    { height: 0, opacity: 0 }, 
                    { 
                        height: inner.offsetHeight, 
                        opacity: 1, 
                        duration: 0.5, 
                        ease: "power3.out" 
                    }
                );
                
                // 3. Rotate Chevron with a slight 'back' ease for a premium bounce
                gsap.to(chevron, { 
                    rotation: 180, 
                    duration: 0.5, 
                    ease: "back.out(1.8)" 
                });

            } else {
                // ACTION: CLOSING
                // 1. Animate Height back to 0
                gsap.to(wrapper, { 
                    height: 0, 
                    opacity: 0,
                    duration: 0.4, 
                    ease: "power3.inOut",
                    onComplete: () => {
                        /**
                         * 2. Crucial Step:
                         * Only remove the 'open' attribute AFTER the animation finishes.
                         * This prevents the content from disappearing mid-slide.
                         */
                        item.removeAttribute('open');
                    }
                });
                
                // 3. Reset Chevron Rotation
                gsap.to(chevron, { 
                    rotation: 0, 
                    duration: 0.4, 
                    ease: "power3.inOut" 
                });
            }
        });
    });
});