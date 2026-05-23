(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // 3D mouse-tracking tilt on cards
    var tiltCards = document.querySelectorAll('.property-card, .hero-card, .stat-card, .contact-info-card');
    tiltCards.forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(900px) rotateY(' + (x * 14) + 'deg) rotateX(' + (-y * 10) + 'deg) translateY(-8px) scale(1.02)';
        card.style.boxShadow = (x * 20) + 'px ' + (y * 20 + 30) + 'px 80px rgba(0,0,0,0.5)';
      });
      card.addEventListener('mouseleave', function() {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
    var menuButton = document.querySelector('.nav-toggle');
    var mobileMenu = document.querySelector('.mobile-menu');
    var mobileLinks = document.querySelectorAll('.mobile-menu a');
    var faqButtons = document.querySelectorAll('.faq-question');
    var newsletterForm = document.querySelector('.newsletter-form');

    if (menuButton && mobileMenu) {
      menuButton.addEventListener('click', function() {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded));
        var isOpen = mobileMenu.classList.toggle('is-open');
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      });
    }

    mobileLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (mobileMenu.classList.contains('is-open')) {
          mobileMenu.classList.remove('is-open');
          if (menuButton) {
            menuButton.setAttribute('aria-expanded', 'false');
          }
          mobileMenu.setAttribute('aria-hidden', 'true');
        }
      });
    });

    faqButtons.forEach(function(button) {
      var answer = button.nextElementSibling;
      button.addEventListener('click', function() {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded));
        if (answer) {
          answer.classList.toggle('open');
        }
      });
    });

    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var button = newsletterForm.querySelector('button[type="submit"]');
        if (!button) return;
        button.disabled = true;
        var originalText = button.textContent;
        button.textContent = 'Subscribed';
        setTimeout(function() {
          button.textContent = originalText;
          button.disabled = false;
          newsletterForm.reset();
        }, 1500);
      });
    }
  });
})();
