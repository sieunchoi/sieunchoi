$(document).ready(function() {
  $(document).on("scroll", onScroll);
  //smoothscroll
  $('.navbar-nav li a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    $(document).off("scroll");
    $('.navbar-nav li a').each(function() {
      $(this).removeClass('active');
    })
    $(this).addClass('active');
    var target = this.hash,
      menu = target;
    $target = $(target);
    $('html, body').stop().animate({
      'scrollTop': $target.offset().top + 2
    }, 1000, 'swing', function() {
      window.location.hash = target;
      $(document).on("scroll", onScroll);
    });
  });
});

function onScroll(event) {
  var scrollPos = $(document).scrollTop();
  $('.navbar-nav li a').each(function() {
    var currLink = $(this);
    var refElement = $(currLink.attr("href"));
    if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
      $('.navbar-nav li a').removeClass("active");
      currLink.addClass("active");
    } else {
      currLink.removeClass("active");
    }
  });
}

//팝업닫기
$('.popup .icon-cancel').on('click',function(){
  //열려있는 팝업을 닫고 팝업백그라운드 제거
  $('.popup').slideUp(function(){$('.popup-bg').remove()});
})

//로그인 팝업
$('#btn-login').on('click',function(){
  $('.popup-login').slideDown();
  //팝업 백그라운드를 깔아준다.
  $('body').append('<div class="popup-bg"></div>');
})
//로그인 input포커스
$('#id, #password').on('focus',function(){
  $(this).prev('label').addClass('change');
}).on('focusout',function(){
  $(this).prev('label').removeClass('change');
})

  $(function(){

  $('#scroll-down').click(function(){
    $('html, body').stop().animate({
      scrollTop:$('#information').offset().top-60
    },1000);
  })

  // $(window).scroll(function(){
  //   var windowTop=$(window).scrollTop();
  //   var myScrollTop=$(document).height()-$(window).height()-340;
  //   if(windowTop>myScrollTop){
  //     $('.hidden').addClass('on');
  //   }else{
  //     $('.hidden').removeClass('on');
  //   }
  //   console.log(windowTop, myScrollTop);
  // })

  $('.event-col').flip({
    axis: 'y',
    reverse: true,
    trigger: 'manual'
  }).bind('mouseenter focusin',function(){
    $(this).flip(true);
  }).bind('mouseleave focusout', function () {
    $(this).flip(false);
  });


  $('[class*="td-0"] [data-toggle="tooltip"]').tooltip({
      animated: 'fade',
      placement: 'bottom',
      html: true
  });

  $('#noticeTab a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  $('#myTab a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })


  // Instantiate the Bootstrap carousel
  $('.multi-item-carousel').carousel({
    interval: false
  });

  // for every slide in carousel, copy the next slide's item in the slide.
  // Do the same for the next, next item.
  $('.multi-item-carousel .item').each(function(){
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    if (next.next().length>0) {
      next.next().children(':first-child').clone().appendTo($(this));
    } else {
    	$(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
  });

  $(window).resize(function(){
    var mediaH=$('.size').height();
    console.log(mediaH);
    $('.media-box .group').height(mediaH);
  }).resize();


  var moveIndex=20;
  $('.media').on('mousewheel', function(e){
    var moveTop=$('.move').position().top;
    //console.log(moveTop);
      if(e.originalEvent.wheelDelta /120 > 0) {
        if(moveTop<=70 && moveTop>=0){
          $('.move').stop().animate({
            top:'+='+moveIndex
          },500);
        //  console.log('scrolling up !');
        }else{
          $('.move').stop().animate({
            top:70
          },500);
        }
      }else{
        if(moveTop<=70 && moveTop>=0){
        //  console.log('scrolling down !');
          $('.move').stop().animate({
            top:'-='+moveIndex
          },500);
        }else{
          $('.move').stop().animate({
            top:0
          },500);
        }
      }
  });

  $('.carousel').carousel({
    interval: false
  })

  $(function() {
    $( "#datepicker" ).datepicker();
    $.datepicker.setDefaults({
      dateFormat:'yy.mm.dd',
      prevText:'이전 달',
      nextText:'다음 달',
      monthNames:['01','02','03','04','05','06','07','08','09','10','11','12'],
      dayNames:['SUN','MON','TUE','WED','THU','FRI','SAT'],
      dayNamesShort:['SUN','MON','TUE','WED','THU','FRI','SAT'],
      dayNamesMin:['SUN','MON','TUE','WED','THU','FRI','SAT'],
      showMonthAfterYear:true,
      yearSuffix:' / '
    })
   });



  // $(window).scroll(function(){
  //   var windowTop=$(window).scrollTop();
  //   var mediaBox=$('.media-box').offset().top;
  //   console.log(moveIndex);
  //   if(moveIndex > 70){moveIndex=70}
  //   if(moveIndex < 0){moveIndex=0}
  //   if(windowTop>mediaBox){
  //
  //     $('.move').animate({
  //       top:'-='+moveIndex
  //     })
  //   }else{
  //
  //   }
  //
  // })
});
  //윈도우 리사이즈 end
