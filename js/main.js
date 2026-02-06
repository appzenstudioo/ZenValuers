// UNIFIED SITE CONFIG - Single source of truth for nav/footer (eliminates 7 copies of header/footer)
const SiteConfig = {
  navItems: [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'services.html', label: 'Services' },
    { href: 'process.html', label: 'Process' },
    { href: 'reports.html', label: 'Reports' },
    { href: 'pricing.html', label: 'Pricing' },
    { href: 'contact.html', label: 'Contact' }
  ],
  footerLinks: [
    { href: 'about.html', label: 'About' },
    { href: 'services.html', label: 'Services' },
    { href: 'pricing.html', label: 'Pricing' },
    { href: 'contact.html', label: 'Contact' }
  ]
};

// Generate navbar dynamically
function generateNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navbar.innerHTML = `
    <div class="container row">
      <div class="logo">Zen Valuers</div>
      <nav class="nav">
        ${SiteConfig.navItems.map(item => {
          const isActive = currentPage === item.href || (currentPage === '' && item.href === 'index.html');
          if (item.href === 'contact.html') {
            return `<a href="${item.href}"${isActive ? ' class="active"' : ''}><span class="btn-nav">${item.label}</span></a>`;
          }
          return `<a href="${item.href}"${isActive ? ' class="active"' : ''}>${item.label}</a>`;
        }).join('')}
      </nav>
    </div>
  `;
}

// Generate footer dynamically
function generateFooter() {
  const footer = document.querySelector('.footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container footer-inner">
      <div>
        <div class="logo">Zen Valuers</div>
        <p class="muted">IBBI Registered Property Valuers • Bank Approved Reports</p>
      </div>
      <nav class="footer-nav">
        ${SiteConfig.footerLinks.map(item => `<a href="${item.href}">${item.label}</a>`).join('')}
      </nav>
    </div>
    <div class="container footer-bottom">
      <p class="muted">© 2026 Zen Valuers. All Rights Reserved.</p>
    </div>
  `;
}

(function(){
  'use strict';

  // Initialize dynamic navbar & footer on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      generateNavbar();
      generateFooter();
    });
  } else {
    generateNavbar();
    generateFooter();
  }

  // Smooth scrolling for anchor links
  document.addEventListener('click', function(e){
    var el = e.target.closest('a');
    if(!el) return;
    var href = el.getAttribute('href');
    if(!href) return;
    if(href.startsWith('#')){
      var target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        history.replaceState(null,'',href);
      }
    }
  }, false);

  // IntersectionObserver for reveal animations
  function initObserver(){
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});

    var nodes = document.querySelectorAll('.service-card, .service-detail, .price-card, .report-card, .step-box, .testimonial-card, .why-item');
    nodes.forEach(function(n){ observer.observe(n); });
  }

  if('IntersectionObserver' in window){
    document.addEventListener('DOMContentLoaded', initObserver);
  } else {
    document.addEventListener('DOMContentLoaded', function(){
      document.querySelectorAll('.service-card, .service-detail, .price-card, .report-card, .step-box, .testimonial-card, .why-item').forEach(function(n){ n.classList.add('show'); });
    });
  }
})();
