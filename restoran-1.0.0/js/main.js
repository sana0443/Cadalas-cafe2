(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

    
document.addEventListener("DOMContentLoaded", function () {
let newsIndex = 0;
let slideIndex = 0;

const newsItems = document.querySelectorAll(".flash-news-item");
const flashNewsContainer = document.querySelector(".flash-news-container");
const slides = document.querySelectorAll(".carousel-slide");
const texts = document.querySelectorAll(".text-overlay");
const dots = document.querySelectorAll(".carousel-dot");


const backgroundColors = [ "gray", "rgb(6, 155, 140)","#ed8e54"];

function showNextNews() {
const currentItem = newsItems[newsIndex];

// Move current item left and fade out
currentItem.classList.remove("active");
currentItem.classList.add("exit");

// Calculate next index
newsIndex = (newsIndex + 1) % newsItems.length;
const nextItem = newsItems[newsIndex];

// Ensure the previous item is fully transitioned out before the next enters
setTimeout(() => {
   currentItem.classList.remove("exit"); // Reset exit state
   nextItem.classList.add("active"); // Move next item into view
   flashNewsContainer.style.backgroundColor = backgroundColors[newsIndex];
}, 500); // Wait for transition to finish
}


function changeSlide() {
slides[slideIndex].classList.remove("active");
texts[slideIndex].classList.remove("show-text");
dots[slideIndex].classList.remove("active");

slideIndex = (slideIndex + 1) % slides.length;

slides[slideIndex].classList.add("active");
texts[slideIndex].classList.add("show-text");
dots[slideIndex].classList.add("active");
}

function goToSlide(index) {
slides[slideIndex].classList.remove("active");
texts[slideIndex].classList.remove("show-text");
dots[slideIndex].classList.remove("active");

slideIndex = index;

slides[slideIndex].classList.add("active");
texts[slideIndex].classList.add("show-text");
dots[slideIndex].classList.add("active");
}

// Start intervals only if elements exist
if (newsItems.length > 0) {
setInterval(showNextNews, 3000);
flashNewsContainer.style.backgroundColor = backgroundColors[0]; // Set initial background color
}

if (slides.length > 0) setInterval(changeSlide, 2000);
});


