//Focal focus
!function(t){t.fn.responsify=function(){return this.each(function(){var e,r,a,i,o,h,n,s,f,u,c,d,p=t(this);if(e=p.width(),r=p.height(),a=p.parent().width(),i=p.parent().height(),o=Number(p.attr("data-focus-left")),h=Number(p.attr("data-focus-top")),n=Number(p.attr("data-focus-right")),s=Number(p.attr("data-focus-bottom")),e/r>a/i){var b=(n-o)*e;b/r>a/i?(d=-o*(f=e*a/b),c=(i-(u=r*a/b))/2):(u=i,d=a-(d=(d=a/2-(o+n)*(f=i*e/r)/2)>0?0:d)-f>0?a-f:d,c=0)}else{var l=(s-h)*r;l/e>i/a?(c=-h*(u=r*i/l),d=(a-(f=e*i/l))/2):(f=a,c=i-(c=(c=i/2-(h+s)*(u=a*r/e)/2)>0?0:c)-u>0?i-u:c,d=0)}p.parent().css({overflow:"hidden"}),p.css({position:"relative",height:u,width:f,left:d,top:c})})}}(jQuery);
//Matchheight
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,a=function(t){return parseFloat(t)||0},n=function(e){var o=null,n=[];return t(e).each(function(){var e=t(this),i=e.offset().top-a(e.css("margin-top")),r=n.length>0?n[n.length-1]:null;null===r?n.push(e):Math.floor(Math.abs(o-i))<=1?n[n.length-1]=r.add(e):n.push(e),o=i}),n},i=function(e){var o={byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=i(e);if(o.remove){var a=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(a)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="master",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,r._afterUpdate=null,r._rows=n,r._parse=a,r._parseOptions=i,r._apply=function(e,o){var s=i(o),h=t(e),l=[h],c=t(window).scrollTop(),p=t("html").outerHeight(!0),u=h.parents().filter(":hidden");return u.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),u.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),l=n(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(l,function(e,o){var n=t(o),i=0;if(s.target)i=s.target.outerHeight(!1);else{if(s.byRow&&n.length<=1)return void n.css(s.property,"");n.each(function(){var e=t(this),o=e.attr("style"),a=e.css("display");"inline-block"!==a&&"flex"!==a&&"inline-flex"!==a&&(a="block");var n={display:a};n[s.property]="",e.css(n),e.outerHeight(!1)>i&&(i=e.outerHeight(!1)),o?e.attr("style",o):e.css("display","")})}n.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=a(e.css("border-top-width"))+a(e.css("border-bottom-width")),o+=a(e.css("padding-top"))+a(e.css("padding-bottom"))),e.css(s.property,i-o+"px"))})}),u.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(c/p*t("html").outerHeight(!0)),this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),a=o.attr("data-mh")||o.attr("data-match-height");e[a]=a in e?e[a].add(o):o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(a,n){if(n&&"resize"===n.type){var i=t(window).width();if(i===e)return;e=i}a?-1===o&&(o=setTimeout(function(){s(n),o=-1},r._throttle)):s(n)},t(r._applyDataApi);var h=t.fn.on?"on":"bind";t(window)[h]("load",function(t){r._update(!1,t)}),t(window)[h]("resize orientationchange",function(t){r._update(!0,t)})});

function resize(){
    $('.js-focal-point-image').responsify();
  	$('.products-list li .desc p.name').matchHeight();
  	$('.products-list li').matchHeight();
}

function filterState () {
    var filter = $('.filter');

    if (filter[0]) {
        var filterBoxes = filter.find('.filter-box');
        if ($(window).width() <= 991) {
            filterBoxes.each(function (){
                if ($(this).hasClass('showed')) {
                    $(this).removeClass('showed');
                    $(this).find('.filter-options').slideUp();
                }
            });
        } else {
            filterBoxes.each(function (){
                if ($(this).hasClass('opened') && !$(this).hasClass('showed')) {
                    $(this).addClass('showed');
                    $(this).find('.filter-options').slideDown();
                }
            });
        }
    }
}

function headerState() {
    var body = $('body');
    if ( $(this).scrollTop() > 100){
        body.addClass("scrolled");
    } else if($(this).scrollTop() < 100) {
        body.removeClass("scrolled");
    }
}

function setColorValue () {
	if ($('.product-detail-propdown')[0]) {
    	var selector = $('.product-detail-propdown .product-configure-options > div:nth-child(1) select option:selected');
      var color = selector.text()
      $('.product-color-text').text(color);
    }
}

$(window).scroll(function(){ headerState(); });

$(window).resize(function() {
    resize();
    filterState();
});

$(window).on('load', function(){
    resize();
    headerState();
    filterState();
  	$('body').addClass('loaded');
    setTimeout(function () {
       resize();
    }, 200);
  setTimeout(function () {$('body').addClass('base-animated')}, 1600);
});

$(function () {
    resize();
    headerState();
    filterState();
  	setColorValue();
  
  	$(document).on('click', '.pop-up-news a.icon-close', function(e){
      e.preventDefault();
      $('body').removeClass('pop-up-active');
    });
  	
  	if ($('.article-content p img')[0]) {
    	$('.article-content p img').each(function (index, element) {
      	$(this).parent().addClass('image-wrapper').append('<div class="reveal-div"></div>');
      });
    }

  	if ($('.gui-form select')[0]) {
        $('.gui-form select').styler();
    }
  
    if ($('.sf-select')[0]) {
        $('.sf-select').styler();
    }

    if ($('.sortby-dd')[0]) {
        $('.sortby-dd').styler();
    }
  	
  	if ($('.category-filter select')[0]) {
      $('.category-filter select').styler();
    }

    if ($('.prod-controls .dropdown select')[0]) {
      
        $('.prod-controls .dropdown select').styler();
      
      	$('.prod-controls .dropdown .jq-selectbox__select-text').each(function(){
          var t = $(this),
              te = t.text();
          
          if(te.indexOf("(") >= 0){
            var split = te.split(' (');
            t.html(split[0]);
          }
        });
      
      	$('.prod-controls .dropdown .jq-selectbox__dropdown li').each(function(){
          var t = $(this),
              te = t.text();
          
          if(te.indexOf("(") >= 0){
            t.addClass('flex-cus');
            
            var split = te.split(' ('),
                color = String(split[1]).replace(')', '');

            if(color.indexOf("^") >= 0){
              var colors = color.split('^'),
                  color1 = colors[0],
                  color2 = colors[1],
                  background = 'background:' + color1 + ';background:-moz-linear-gradient(45deg, ' + color1 + ' 0%, ' + color2 + ' 100%);background:-webkit-linear-gradient(45deg, ' + color1 + ' 0%, ' + color2 + ' 100%);background:linear-gradient(45deg, ' + color1 + ' 0%, ' + color2 + ' 100%)';
              
            }else{
              var background = 'background: ' + color + '';
            }

            t.html('<div class="single-color" style="' + background + '"></div><span>' + split[0] + '</span>');
          }
        });
      
    }
    // Mobile filter sidebar
    $('#filter-btn').click(function (e) {
        e.preventDefault();
        $('.product-category .left').toggleClass('showed');
        $('.overlay').fadeIn();
    });

    $('.overlay, .klaar').click(function () {
        $('.overlay').fadeOut();
        $('.product-category .left').toggleClass('showed');
    });

    // Mobile menu
    $('.menu-btn').click(function (e) {
        e.preventDefault();
        $(this).closest('#header').toggleClass('is-active');
      	// $('body').toggleClass('pushy-open-left');
    });

    $(".pushy > div > .menu > li:has(a)").addClass("pushy-link");
    $(".pushy > div > .menu > li:has(ul.sub-menu)").removeClass("pushy-link").addClass("pushy-submenu pushy-submenu-closed");
    $(".pushy > div > .menu > li:has(ul.sub-menu)").prepend("<a class='menu-back-page' href='#'>Terug</a>");

    $(".pushy .menu li.pushy-submenu > a:not(.menu-back-page)").click(function(event) {
        var parentElement = $(this).parent();
        if (!parentElement.hasClass("pushy-submenu-open")) {
            event.preventDefault();
            parentElement.removeClass("pushy-submenu-closed").addClass("pushy-submenu-open");

            if (!parentElement.hasClass('opened-menu-item')) {
                parentElement.addClass('opened-menu-item');
            }
            parentElement.closest('.menu').addClass('hide-no-ancestor');
        }
    });
  
    $('body').on('click', '.search-toggle', function (e) {
      e.preventDefault();
      var target = $(this).parent().find('.search-form');
      target.toggleClass('showed');
    });
    $('body').on('click', '.search-close', function (e) {
      e.preventDefault();
      var target = $(this).closest('.search-form');
      target.toggleClass('showed');
    });
  
    $('.category-item a').click(function (e) {
      e.preventDefault();
      var target = $(this).closest('body');
      target.toggleClass('popup-menu__open');
    });
    $('.popup-menu__close').click(function (e) {
      e.preventDefault();
      var target = $(this).closest('body');
      target.removeClass('popup-menu__open');
    });
  
  
   	$('body').on('click', '.category-pagination li.disabled a, .category-pagination li.active a', function (event) {
    	event.preventDefault;
     	return false;
    });

    $('body').on('click', '.menu-back-page', function (event) {
        event.preventDefault();
        $(this).css('display', 'none');

        var parentElement = $(this).parent();
        $(".pushy .menu li.pushy-submenu").removeClass('opened-menu-item');
        parentElement.removeClass('pushy-submenu-open').addClass('pushy-submenu-closed');
        parentElement.closest('.menu').removeClass('hide-no-ancestor');
    });

    $('body').on('click', '.filter-box .filter-name', function (e) {
        e.preventDefault();
        var target = $(this),
            box = target.parent(),
            body = box.find('.filter-options');

        if (box.hasClass('showed')) {
            box.removeClass('showed');
            body.slideUp();
        } else {
            box.addClass('showed');
            body.slideDown();
        }
    });

    $('.articles-preview').each(function (index, element) {
        var galleryId = $(this).attr('id'),
            sliderName = 'swiper-blog-' + index,
            sliderClass = '.' + sliderName,
            sliderContainer = $(this).find('.swiper-container'),
            settingsObject = {
                speed: 400,
                effect: "slide",
                observer: true,
                observeParents: true,
                slidesPerView: 3,
                spaceBetween: 0,
                breakpoints: {
                    991: {
                        slidesPerView: 2.3,
                    },
                    768: {
                        slidesPerView: 1.7,
                    },
                    544: {
                        slidesPerView: 1.15,
                    }
                },
            };

        sliderContainer.addClass(sliderName);
        sliderContainer.attr('id', sliderName);

        if (settingsObject) {
            new Swiper(sliderClass, settingsObject);
        }
    });
  
  	$('#sticky-overzicht-btn').click(function () {
    	var body = $(this).closest('body');
      body.toggleClass('open-sidebar');
    });
  
  	$('.faq .gui-content-subtitle').click(function () {
    	var target = $(this),
          faqContent = target.next();
      if (target.hasClass('faq-open')) {
        	target.removeClass('faq-open');
          faqContent.slideUp();
      } else {
        	target.addClass('faq-open');
          faqContent.slideDown();
      }
    });
  
  	if ($('#articles-preview .articles-list li')[0]) {
    	$('#articles-preview .articles-list li').each(function (index) {
      	$(this).addClass('fp-transition-' + (index + 1));
      });
    }
  
  	if ($('.prod-cats ul li')[0]) {
    	$('.prod-cats ul li').each(function (index) {
      	$(this).addClass('fp-transition-' + (index + 1));
      });
    }

    $('.anchor-arrow').bind("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
    });

    $('.popin, .fast-popin').viewportChecker({
        classToAdd: 'effect',
        offset: '10%',
    });
  
    $(document).find('.reveal-div').viewportChecker({
        classToAdd: 'effect',
        offset: '10%',
    });
  
    $('.share-button').click(function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });
  
    $(document).on('click', 'ul.menu li a', function(e){
      var a = $(this),
          l = a.parent(),
          u = l.parent(),
          all = $('ul.menu li');

      if(l.hasClass('has-subs') && !u.hasClass('active-submenu')){
        //open submenu
        e.preventDefault();

        all.removeClass('active');
        l.addClass('active');
        u.addClass('active-submenu');

      }else{
        console.log('Navagation to this page'); 
      }
    });
  
  $(document).on('click', '.back-menu-btn', function(){
    $('ul.menu li').removeClass('active');
    $('ul.menu').removeClass('active-submenu');
  });
  
  $('a[href*=#]').bind("click", function(e){
    var anchor = $(this);
    if (!anchor.hasClass('anchor-disabled')) {
      $('html, body').stop().animate({
          scrollTop: ($(anchor.attr('href')).offset().top - 110)
      }, 400);
      e.preventDefault();
    }
  });
  
  $(document).on('click', '.mobile-toggle-tab', function(){console.log('ok');var a = $(this).parent();if(a.hasClass('open')){a.removeClass('open');a.find('nav').slideUp();}else{a.addClass('open');a.find('nav').slideDown();} });
});