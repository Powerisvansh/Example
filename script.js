(function() {
  document.addEventListener('DOMContentLoaded', function() {
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
