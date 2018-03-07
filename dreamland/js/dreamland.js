$(function(){
  var $devWidth;
  var $limitSize=767;

  $(window).resize(function(){
    $devWidth=$('body').width();
    if($devWidth<$limitSize){
      //besttip 슬라이드
      besttipSwiper=new Swiper('.best-tip-swiper',{
        navigation:{
          nextEl:'.best-tip-swiper .swiper-button-next',
          prevEl:'.best-tip-swiper .swiper-button-prev',
        },
        slidesPerView:1,
        loop:false,
      });
    }else{
      //besttip 슬라이드
      besttipSwiper=new Swiper('.best-tip-swiper',{
        navigation:{
          nextEl:'.best-tip-swiper .swiper-button-next',
          prevEl:'.best-tip-swiper .swiper-button-prev',
        },
        slidesPerView:3,
        loop:false,
      });
    }


  }).resize();
  //윈도우 리사이즈 end

  //네비게이션
  $('.gnb-nav').on('mouseenter',function(){
    if($devWidth < $limitSize) return false;
    $('.gnb-nav li ul').stop().fadeIn(500);
    $('header').addClass('on');
  }).on('mouseleave',function(){
    if($devWidth < $limitSize) return false;
    $('.gnb-nav li ul').stop().fadeOut(200);
    $('header').removeClass('on');
  })


  //모바일 메뉴토글
  $('#btn-menu').on('click',function(){
    $('header').toggleClass('on');
    $(this).toggleClass('icon-menu icon-cancel');
  })

  //모바일의 2depth메뉴
  if($devWidth < $limitSize){
    //링크 비활성화(e.preventDefault()와 같은 역할)
    $('.gnb-nav > li > a').attr('href','javascript:void(0)');
    $('.gnb-nav > li').on('click',function(){
      //각 메뉴를 독립적으로 움직이고 싶을 때
      //모두다 펼치기 되면 네비게이션의 높이를 벗어나므로 네비게이션에 overflow-y:auto; =>높이 or 영역
      $(this).find('ul').slideToggle(500);

      //아코디언 방식(메뉴를 한세트로 묶어서 선택한 것만 활성화시키기)
      // $('.gnb-nav ul').slideUp(500);
      // $(this).find('ul').slideDown(500);
    })
  }

  //통합검색창
  var searchFlag=true;
  $('#btn-search-open').on('click',function(){
    if(searchFlag){
      $(this).find('span').text('통합검색창닫기');
      searchFlag=false;
    }else{
      $(this).find('span').text('통합검색창열기');
      $('.search-form input').val('');
      searchFlag=true;
    }
    $(this).toggleClass('icon-search icon-cancel');
    $('.search-form').toggle();
  })





  //footer 사이트 정보
  $('footer h1 a').on('click',function(e){
    e.preventDefault();
    $('.sub-nav').slideToggle();
    $(this).find('i').toggleClass('icon-down-open icon-up-open');
  })
})
//document.ready end
