/*

Style   : MobApp Script JS
Version : 1.0
Author  : Surjith S M
URI     : https://surjithctly.in/

Copyright © All rights Reserved

*/

$(function() {
  "use strict";

  /*-----------------------------------
   * FIXED  MENU - HEADER
   *-----------------------------------*/
  function menuscroll() {
    var $navmenu = $('.nav-menu');
    if ($(window).scrollTop() > 50) {
      $navmenu.addClass('is-scrolling');
    } else {
      $navmenu.removeClass("is-scrolling");
    }
  }
  menuscroll();
  $(window).on('scroll', function() {
    menuscroll();
  });
  /*-----------------------------------
   * NAVBAR CLOSE ON CLICK
   *-----------------------------------*/

  $('.navbar-nav > li:not(.dropdown) > a').on('click', function() {
    $('.navbar-collapse').collapse('hide');
  });
  /*
   * NAVBAR TOGGLE BG
   *-----------------*/
  var siteNav = $('#navbar');
  siteNav.on('show.bs.collapse', function(e) {
    $(this).parents('.nav-menu').addClass('menu-is-open');
  })
  siteNav.on('hide.bs.collapse', function(e) {
    $(this).parents('.nav-menu').removeClass('menu-is-open');
  })

  /*-----------------------------------
   * ONE PAGE SCROLLING
   *-----------------------------------*/
  // Select all links with hashes
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').not('[data-toggle="tab"]').on('click', function(event) {
    // On-page links
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
  /*-----------------------------------
   * OWL CAROUSEL
   *-----------------------------------*/
  var $testimonialsDiv = $('.testimonials');
  if ($testimonialsDiv.length && $.fn.owlCarousel) {
    $testimonialsDiv.owlCarousel({
      items: 1,
      nav: true,
      dots: false,
      navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>']
    });
  }

  var $galleryDiv = $('.img-gallery');
  if ($galleryDiv.length && $.fn.owlCarousel) {
    $galleryDiv.owlCarousel({
      nav: false,
      center: true,
      loop: true,
      autoplay: true,
      dots: true,
      navText: ['<span class="ti-arrow-left"></span>', '<span class="ti-arrow-right"></span>'],
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 3
        }
      }
    });
  }

}); /* End Fn */

// Loading Placeholder (Showcase) Graphs

$(window).load(function() {})

$(document).ready(function() {

  var dataPoints1 = [];

  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light2",
    zoomEnabled: true,
    panEnabled: true,
    title: {
      text: ""
    },
    axisY: {
      titleFontSize: 24
    },
    axisX: {
      title: "Countries",
      titleFontSize: 24,
      labelAngle: 45,
    },
    data: [{
      type: "column",
      yValueFormatString: "#.### Units",
      xValueFormatString: "string",
      dataPoints: dataPoints1
    }]
  });

  var selecteddata;

  $(".databtn").click(function() {
    if ($(this).is('#' + 'WorldHappy')) {
      selecteddata = 'data/2015worldhappy.json';
      renderChart()
    } else if ($(this).is('#' + 'CreditCardF')) {
      selecteddata = 'data/2016worldhappy.json';
      renderChart()
    } else if ($(this).is('#' + 'CreditCardF2')) {
      selecteddata = 'data/2017worldhappy.json';
      renderChart()
    }
  });

  // Change Y axis on Graph to another one

  $(".dropdown").change(renderChart);

  //  Chart render On Command

  function renderChart() {
    chart.options.data[0].dataPoints = [];
    var e = document.getElementById("dd");
    var selected = e.options[e.selectedIndex].value;
    console.log(selected);
    $.getJSON(selecteddata, function(data) {
      for (var i = 0; i < data.length; i++) {
        chart.options.data[0].dataPoints.push({
          label: data[i].Country,
          y: data[i][selected]
        });
      }
      console.log(i)
      console.log(data)
      chart.render();
    });
  };

  // Change Chart Type to another one

  var chartType = document.getElementById('chartType');
  chartType.addEventListener("change", function() {
    chart.options.data[0].type = chartType.options[chartType.selectedIndex].value;
    chart.render();
  });

  // Print Chart By Command

  document.getElementById("printChart").addEventListener("click", function() {
    chart.print();
  });

  // Export Chart as a file By Command

  document.getElementById("exportChart").addEventListener("click", function() {
    chart.exportChart({
      format: "jpg"
    });

  });
});
