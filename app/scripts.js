$(document).ready(function() {
/* for sticky navagation */
	$('.stick-nav-here').waypoint(function(direction) {
		if (direction == "down") {
			$('nav').addClass('sticky-custom');
		} else {
			$('nav').removeClass('sticky-custom');
		}
			}, {
  		offset: '60px'
  });

  /* scroll on buttons */
  $('.js--presub-btn').click(function() {
  		$('html, body').animate({ scrollTop: $('.wrap-checkout1').offset().top-25}, 1000);
  		console.log($('.wrap-checkout1').offset().top);
  });

 

  /* Navagation scroll */
  $(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

$(".top-bar-section ul li > a").click(function() {
    $(this).parent().addClass('active').siblings().removeClass('active');

    });


// $(".circle1").click(function() {
//     $(this).parent().addClass('active').siblings().removeClass('active');

//     });

// $(".circle-size").click(function() {
//     $(this).parent().addClass('active').siblings().removeClass('active');

//     });
// $(".circle-length").click(function() {
//     $(this).parent().addClass('active').siblings().removeClass('active');

//     });




 // setTimeout(function(){ 

 //    $('.fade1').waypoint(function(direction){
 //      $('.fade1').addClass('animated fadeOut');
 //  }, {
 //    offset: '100%;'
 //  });

 //  },5000);



});



