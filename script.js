
/* =========================================================
   BEARMA STAAL — WEBSITE SCRIPT
   Keeps existing navigation, animations and quote form.
   Fixes gallery filters so each category displays correctly.
   ========================================================= */

// Header scroll effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 24);
});


// Mobile navigation
const menuBtn = document.querySelector('.hamb');
const mobile = document.querySelector('.mobile-menu');

menuBtn?.addEventListener('click', () => {
    mobile?.classList.toggle('open');
});

document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobile?.classList.remove('open');
    });
});


// Reveal animations
// Check that IntersectionObserver is supported before using it.
if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08
    });

    document.querySelectorAll('.reveal').forEach((element, index) => {
        element.style.transitionDelay =
            `${Math.min(index * 45, 300)}ms`;

        obs.observe(element);
    });
} else {
    // Keep content visible in older browsers.
    document.querySelectorAll('.reveal').forEach(element => {
        element.classList.add('in');
    });
}


// =========================================================
// GALLERY FILTERS
// Displays only the selected category and updates the
// active button. Uses inline display to avoid CSS conflicts.
// =========================================================

const filters = document.querySelectorAll('.filter');
const galleryItems = document.querySelectorAll('.gallery-item');

function filterGallery(category) {
    galleryItems.forEach(item => {
        const itemCategory = item.dataset.category;
        const shouldShow =
            category === 'all' || itemCategory === category;

        // Set visibility directly so other CSS rules cannot
        // accidentally override the selected category.
        item.style.display = shouldShow ? '' : 'none';

        // Remove stale hidden classes from previous filtering.
        item.classList.toggle('hidden', !shouldShow);

        // Keep visible items eligible for reveal animations.
        if (shouldShow) {
            item.classList.add('in');
        }
    });

    filters.forEach(button => {
        const isActive = button.dataset.filter === category;

        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
}

if (filters.length && galleryItems.length) {
    filters.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.filter;

            // Ignore buttons without a valid filter value.
            if (!category) return;

            filterGallery(category);
        });
    });

    // Set the initial state from the active button.
    const initialFilter =
        document.querySelector('.filter.active')?.dataset.filter || 'all';

    filterGallery(initialFilter);
}


// =========================================================
// QUOTE FORM
// Retains the existing email enquiry behaviour.
// =========================================================

const form = document.querySelector('#quoteForm');

form?.addEventListener('submit', event => {
    event.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const data = new FormData(form);

    const subject = encodeURIComponent(
        'Website Quote Enquiry — Bearma Staal'
    );

    const body = encodeURIComponent(
        `Name: ${data.get('name')}
Company: ${data.get('company')}
Email: ${data.get('email')}
Phone: ${data.get('phone')}
Service: ${data.get('service')}
Budget: ${data.get('budget') || 'Not specified'}
Timeframe: ${data.get('timeframe') || 'Not specified'}

Project description:
${data.get('description')}`
    );

    window.location.href =
        `mailto:Rainier@bearma.co.za?subject=${subject}&body=${body}`;

    document.querySelector('.success')?.classList.add('show');
});
