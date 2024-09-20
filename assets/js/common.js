gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0);

// header class
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
  let currentScrollTop = window.scrollY;

  if (currentScrollTop > lastScrollTop) {
    $('.header').addClass('down');
  } else {
    $('.header').removeClass('down');
  }

  lastScrollTop = currentScrollTop;
});

$(window).on("load", function () {
  setTimeout(function () {
      const target = document.querySelectorAll(".js-io");
      const targetArray = Array.prototype.slice.call(target);
      const options = {
      root: null,
      rootMargin: "0% 0% -20% 0%",
      threshold: 0,
      };
      const observer = new IntersectionObserver(callback, options);
      targetArray.forEach((tgt) => {
      observer.observe(tgt);
      });

      function callback(entries) {
      entries.forEach(function (entry, i) {
          const target = entry.target;

          if (entry.isIntersecting && !target.classList.contains("_show")) {
          const delay = i * 100;
          setTimeout(function () {
              target.classList.add("_show");
          }, delay);
          }
      });
      }
  }, 400);

  setTimeout(function () {
      const target = document.querySelectorAll(".sec-changes-content");
      const clickBg = document.getElementsByClassName('click-bg')[0];
      const targetArray = Array.prototype.slice.call(target);
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 1,
      };
      const observer = new IntersectionObserver(callback, options);
        targetArray.forEach((tgt) => {
        observer.observe(tgt);
      });

      function callback(entries) {
        entries.forEach(function (entry, i) {
          const target = entry.target;

          if (entry.isIntersecting && !clickBg.classList.contains("_show")) {
            setTimeout(function () {
              lenis.stop();
              setTimeout(() => {
                clickBg.classList.add("_show");
                setTimeout(() => {
                  lenis.start();
                  clickBg.classList.add("_loaded");
                }, 3000);
              }, 0);
            }, 0);
          }
        });
      }
  }, 400);
});

$(document).ready(function() {
  var browserWidth = $(window).width();

  if(browserWidth > '768') {
    gsap.utils.toArray('.js-plx').forEach(el => {
      const speed = el.getAttribute('data-plx-speed') * 10;
      gsap.set(el,{
        y: speed,
      });
    
      gsap.to(el,{
        y: -1 * speed,
        scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        toggleActions: 'play reverse play reverse',
        scrub: 0.1,
        }
      })
    });
  }

  // loading
  // const body = $("body");

  // if (body.hasClass("front-page")) {
  //   $("body").addClass("is-loading");

  //   var imgLoad = imagesLoaded("body");
  //   var images = $("img").length,
  //    loadedCount = 0,
  //    loadingProgress = 0,
  //    tlProgress = gsap.timeline();
    
  //   imgLoad.on("progress", function (instance, image) {
  //     setTimeout(() => {
  //       loadProgress();
  //     }, 2500);
  //   });
    
  //   function loadProgress() {
  //    loadedCount++;
  //    loadingProgress = loadedCount / images;
    
  //    gsap.to(tlProgress, { progress: loadingProgress, duration: 1 });
  //   }
    
  //   var tlProgress = gsap.timeline({
  //    paused: true,
  //    onComplete: loadComplete,
  //   });
    
  //   function loadComplete() {
  //     setTimeout(() => {
  //       $(".loading").addClass('hidden');
  //       setTimeout(() => {
  //         $('body').removeClass('is-loading');
  //         $('.menu-btn__wrap').addClass('loaded');
  //         setTimeout(() => {
  //           $('.sec-fv h2').addClass('_show');
  //           $('.sec-fv-img img').addClass('_show');
  //           setTimeout(() => {
  //             $('.fv-deco__item-container').addClass('_show');
  //             setTimeout(() => {
  //               $('.sec-fv-btn').addClass('_show');
  //             }, 1200);
  //           }, 300);
  //         }, 600);
  //       }, 200);
  //     }, 900);
  //   }
  // } else {
  //   $('body').addClass('loaded');
  //   $('main').addClass('loaded');
  //   $('header').addClass('loaded');
  // }
});

var case_swiper = new Swiper(".partner-swiper", {
  slidesPerView: 1,
  spaceBetween: 0,
  speed:500,
  breakpoints: {
   768: {
    slidesPerView: 'auto',
    spaceBetween: 0,
   },
   1024:{
    slidesPerView: 'auto',
    spaceBetween: 0,
   }
  },
  navigation: {
   nextEl: ".swiper-button-next",
   prevEl: ".swiper-button-prev",
  },
  pagination: {
   el: ".swiper-pagination",
  }
 });

// menu hover 

let mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
//  $(".js-menu .c-menu").lettering();
//  $('.sec-fv h2 span').lettering();
})

if (window.visualViewport.width > 768) {
 $('.js-menu .c-menu').each(function(){
  const elem = $(this);
  const parent = $(this).parent();
  var flg = true;
  parent.hover(
    ()=>{
    if(flg) {
     flg = false;
     gsap.to(elem.find('span'), {
      yPercent: -100,
      duration: 0.6,
      ease: "ease-in-out",
      onComplete: function() {
       gsap.to(elem.find('span'), {
        yPercent: 0,
        duration:0.001
       });
       flg = true;
     },
     });
    }
    },
    ()=>{}
  )
  });

  $(window).on('load', function(){
    $('.js-menu .c-menu span').each(function(){
      const elem = $(this);
      elem.attr('data-text', elem.text());
      if(elem.text() == ' ') elem.text("\u00A0");
    });
  })
}

// partner page modal
$('.sec-partner-page-content .partner-item').click(function() {
  $('.partner-modal__wrap').addClass('open-modal');
});