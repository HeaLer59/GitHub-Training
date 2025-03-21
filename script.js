// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const ctaButtons = document.querySelector(".cta-buttons");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    ctaButtons.classList.toggle("active");
    hamburger.classList.toggle("active");
  });
}

// Sticky Header
const header = document.querySelector("header");
const scrollWatcher = () => {
  window.scrollY > 10
    ? header.classList.add("scrolled")
    : header.classList.remove("scrolled");
};

window.addEventListener("scroll", scrollWatcher);

// Pricing Toggle
const pricingToggle = document.getElementById("pricing-toggle");
const amounts = document.querySelectorAll(".amount");
const periods = document.querySelectorAll(".period");

if (pricingToggle) {
  pricingToggle.addEventListener("change", () => {
    const isYearly = pricingToggle.checked;

    amounts.forEach((amount) => {
      const monthly = amount.getAttribute("data-monthly");
      const yearly = amount.getAttribute("data-yearly");
      amount.textContent = isYearly ? yearly : monthly;
    });

    periods.forEach((period) => {
      period.textContent = isYearly ? "/year" : "/month";
    });
  });
}

// Testimonial Slider
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".dot");
const prevButton = document.querySelector(".prev-testimonial");
const nextButton = document.querySelector(".next-testimonial");

if (testimonialSlides.length > 0) {
  let currentSlide = 0;

  const showSlide = (n) => {
    testimonialSlides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;

    testimonialSlides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  };

  const nextSlide = () => showSlide(currentSlide + 1);
  const prevSlide = () => showSlide(currentSlide - 1);

  if (prevButton && nextButton) {
    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showSlide(index));
  });

  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        ctaButtons.classList.remove("active");
        hamburger.classList.remove("active");
      }
    }
  });
});

// Play video functionality
const playButtons = document.querySelectorAll(".play-button");

playButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // In a real implementation, this would play a video
    // For example, you could replace the image with an embedded YouTube or Vimeo player
    // or show a modal with a video
    alert("Video player would open here in a real implementation!");
  });
});

// Animation on scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".feature-card, .pricing-card, .step, .demo-video"
  );

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add("animated");
    }
  });
};

window.addEventListener("scroll", animateOnScroll);
animateOnScroll(); // Run once on page load

// Add some dynamic styling for the animated class
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        .feature-card, .pricing-card, .step, .demo-video {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Mobile Navigation Styles */
        @media (max-width: 768px) {
            .nav-links.active, .cta-buttons.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 80px;
                left: 0;
                width: 100%;
                background: var(--white);
                padding: 20px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                z-index: 100;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
        }
    </style>
`
);

// Add CSS class for the scrolled header
document.head.insertAdjacentHTML(
  "beforeend",
  `
    <style>
        header.scrolled {
            padding: 10px 0;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }
    </style>
`
);

// Preload images for better performance
const preloadImages = () => {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    const src = img.getAttribute("src");
    if (src) {
      const preloadImg = new Image();
      preloadImg.src = src;
    }
  });
};

window.addEventListener("load", preloadImages);
