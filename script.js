(function() {
  document.addEventListener('DOMContentLoaded', function() {

    // Custom cursor
    var dot = document.getElementById('cursorDot');
    var ring = document.getElementById('cursorRing');
    var mouseX = 0, mouseY = 0;
    var ringX = 0, ringY = 0;

    document.addEventListener('mousemove', function(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    (function animateRing() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      requestAnimationFrame(animateRing);
    })();

    var hoverTargets = document.querySelectorAll('a, button, .property-card, .stat-card, .faq-card, .contact-info-card');
    hoverTargets.forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        dot.classList.add('is-hovering');
        ring.classList.add('is-hovering');
      });
      el.addEventListener('mouseleave', function() {
        dot.classList.remove('is-hovering');
        ring.classList.remove('is-hovering');
      });
    });

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

    // Mobile menu
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
          if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
          mobileMenu.setAttribute('aria-hidden', 'true');
        }
      });
    });

    faqButtons.forEach(function(button) {
      var answer = button.nextElementSibling;
      button.addEventListener('click', function() {
        var expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded));
        if (answer) answer.classList.toggle('open');
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
