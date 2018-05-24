$(document).ready(function(){
   var section_items=$('.section'),
       navigation_items=$('#navigation a');

    updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
	});

    navigation_items.on('click',function(event){
       event.preventDefault();
        smoothScroll($(this.hash));
    });

    $('.scroll_down').on('click',function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    function updateNavigation() {
		section_items.each(function(){
			$this = $(this);
			var activeSection = $('#navigation a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigation_items.eq(activeSection).addClass('is-selected');
			}else {
				navigation_items.eq(activeSection).removeClass('is-selected');
			}
		});
	}

    function smoothScroll(target){
        $('body,html').animate(
            {'scrollTop':target.offset().top}
            ,600);
    }
});



  // 스크롤버튼
  $(function(){
    $('#up').click(function(){
      //stop()을 걸어주면 여러번 눌러도 한번만 실행되게 한다.
      $('html, body').stop().animate({
        scrollTop:'-=949'
      },1000,);
    })

    $('#bottom').click(function(){
      $('html, body').stop().animate({
        scrollTop:'+=949'
      },1000);
    })

  })

  $(document).ready(function() {
    $(window).fadeThis({
      speed: 1000,
    });
  });
