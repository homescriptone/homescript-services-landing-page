/*
* TYCAN - Timeless Coming Soon Template
* Build Date: May-October 2019
* Last Update: October 2019
* Author: Madeon08
* Copyright (C) 2019-2XXX Madeon08
* This is a premium product available exclusively here : https://themeforest.net/user/Madeon08/portfolio
*/

/*  TABLE OF CONTENTS
    ---------------------------
    1. Loading / Opening
    2. FullPage init
    3. Animate scroll fade adding
    4. Menu button
    5. Transition for nav & logo position
    6. Text rotator on loading screen
    7. Newsletter init
*/

/* ------------------------------------- */
/* 1. Loading / Opening ................ */
/* ------------------------------------- */

$(window).on('load', function () {
    "use strict";

    var $logoloading = document.getElementById('loading_img');

    $("#loading").addClass('show').delay(800).queue(function(){
        $logoloading.style.opacity = "0.9";
    });

    setTimeout(function(){
        $("#loading").addClass('hide');
        $('#fullpage .section.fp-table').css('opacity','1');
    },3400);

    
    $('.fade_entrance').fadeTo(0,0).each(function(i) {//initial fadeout, then blink loop
        var bk = $(this);//can i get a blink?
        if ($('.load-0').length) { bk = $('.load-'+i); }//load ordering support
        setTimeout(function() {
            bk.delay(i*300).animate({opacity: '1'}, 500);//animate [delay,opacity,duration]
        },4000);
    });

    setTimeout(function(){
        $("#loading").remove();
    },4000);

});

$(document).ready(function(){
    "use strict";

    /* ------------------------------------- */
    /* 2. FullPage init .................... */
    /* ------------------------------------- */

    $('#fullpage').fullpage();

    /* ------------------------------------- */
    /* 3. Works carousel ................... */
    /* ------------------------------------- */

    $('.works_slider').slick({
        dots: true,
        infinite: true,
        draggable: true,
        loop: true,
        speed: 550,
        centerMode: false,
        variableWidth: true,
        arrows: true,
        autoplay: false,
        swipeToSlide: true,
        slidesToShow: 3
    });

    /* ------------------------------------- */
    /* 4. Services carousel ................ */
    /* ------------------------------------- */

    $("#myCarousel").on("touchstart", function(event){

        var yClick = event.originalEvent.touches[0].pageY;
        $(this).one("touchmove", function(event){

            var yMove = event.originalEvent.touches[0].pageY;
            if( Math.floor(yClick - yMove) > 1 ){
                $(".carousel").carousel('next');
            }
            else if( Math.floor(yClick - yMove) < -1 ){
                $(".carousel").carousel('prev');
            }
        });
        $(".carousel").on("touchend", function(){
            $(this).off("touchmove");
        });
    });

    /* ------------------------------------- */
    /* 5. Newsletter block ................. */
    /* ------------------------------------- */
       
    var $button = $('#button-newsletter');
    var $tooltip = $('.footer-newsletter');
    var $navMain = $(".navbar-collapse a");

    $('#button-newsletter').on( "click", function() {

        if ($tooltip.attr('data-name') === 'news') {

            (this).innerHTML = "Close";

            $('.footer-newsletter, footer').addClass('showing').delay(50).queue(function( next ){
                $('.footer-newsletter').addClass('show_newsletter');
                next();
            });
            $("body").addClass("elmt_hovr"); 
            $tooltip.removeAttr('data-name');
            return $button.attr('aria-expanded', true);

        } else {

            if ($('html').attr('lang') == "fr"){
                (this).innerHTML = "REJOIGNEZ LA FUSÉE"
            }else{
                (this).innerHTML = "SUBSCRIBE NOW"
            }


            $('.footer-newsletter').removeClass('show_newsletter').delay(200).queue(function( next ){
                $('.footer-newsletter, footer').removeClass('showing');
                $tooltip.attr('data-name', 'news');
                next();
            });
            $("body").removeClass("elmt_hovr");

            return $button.attr('aria-expanded', false);
        }
    });

    $('.navbar-nav>li>a, .navbar .brand-logo, .navbar-nav>li>a, .navbar .brand-logo-no-change').on('click', function(){
        $('.navbar-collapse').collapse('hide');
        $('.navbar-toggler').removeClass('collapsed');
        $('.navbar-toggler-icon').removeClass('opened-close');
        $("body").removeClass("elmt_hovr"); 

        document.getElementById("button-newsletter").innerHTML = "Subscribe now";

        $('.footer-newsletter').removeClass('show_newsletter').delay(200).queue(function( next ){
            $('.footer-newsletter, footer').removeClass('showing');
            $tooltip.attr('data-name', 'news');
            next();
        });

        
        return $button.attr('aria-expanded', false);
    });

    /* ------------------------------------- */
    /* 6. Menu hamburger animation ......... */
    /* ------------------------------------- */

    var btnEl = document.getElementsByClassName('navbar-toggler');

    Array.prototype.forEach.call(btnEl, function(button) {
      button.addEventListener('click', function() {
        $("body").toggleClass("elmt_hovr"); 
        var menuEl = this.querySelectorAll('.navbar-toggler-icon')[0];
        var openedClassname = menuEl.dataset.toggled;
        menuEl.classList.toggle(openedClassname);
      });
    });

    $("#newsletter-form").on('submit', function(e){
        e.preventDefault();
        var newsform = $(this);
        var newsbtn = document.getElementById('get_notified');

        newsform.parsley().validate();

        newsbtn.disabled = true;
        newsbtn.innerText='Sending…';

        if (newsform.parsley().isValid()){

            $.post('https://homescriptone-email-services.herokuapp.com/send_email/',{
                from_email : $('input[name="from_email"]').val(),
                email_object : "HomeScript Services",
                email_message : "Je suis interessé, et aimerait etre mise au courant à la sortie, merci!"
            },function(e){
                if (e.operation){
                    alert('Success...');
                    $('div#subscribe').empty().append("<span style='color:white;'>Merci, d'avoir rejoint!</span>")
                }else{
                    alert('Failed...');
                }
            })
            
        }
    });

    $('body').on('click', '.parsley-errors-list', function() {
        $(this).removeClass('filled');
    });

});