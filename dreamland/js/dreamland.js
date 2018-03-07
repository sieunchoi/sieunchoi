$(function(){
  var $devWidth;
  var $limitSize=767;

  $(window).resize(function(){
    $devWidth=$('body').width();
    if($devWidth<$limitSize){
      //멤버십 슬라이드(2)
      besttipSwiper=new Swiper('.best-tip-swiper',{
        navigation:{
          nextEl:'.best-tip-swiper .swiper-button-next',
          prevEl:'.best-tip-swiper .swiper-button-prev',
        },
        slidesPerView:1,
        loop:false,
      });
      // $('.popup-store .popup-body').height($(window).height()-50);
    }else{
      //멤버십 슬라이드(3)
      besttipSwiper=new Swiper('.best-tip-swiper',{
        navigation:{
          nextEl:'.best-tip-swiper .swiper-button-next',
          prevEl:'.best-tip-swiper .swiper-button-prev',
        },
        slidesPerView:3,
        loop:false,
      });
      // $('.popup-store .popup-body').height('auto');
    }

    //이벤트 슬라이드
    eventSlide=new Swiper('.event-slide',{
      navigation:{
        nextEl:'.event-slide .swiper-button-next',
        prevEl:'.event-slide .swiper-button-prev',
      }
    });
    var eventSlideBG=['images/event1.png','images/event2.png','images/event1-m.png','images/event2-m.png'];
    $('.event-slide .swiper-slide').each(function(index){
      if($devWidth < $limitSize){//모바일
        $(this).css('backgroundImage','url('+eventSlideBG[index+2]+')');
      }else{//pc
        $(this).css('backgroundImage','url('+eventSlideBG[index]+')');
      }
    })
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

  //공지사항 롤링
  //3초마다 위에있는 리스트를 숨기고 마지막 위치에 다시 붙이는 작업을 반복 수행
  notice=setInterval(noticeRolling,3000);
  function noticeRolling(){
    $('.notice li').first().slideUp(function(){
      $(this).appendTo($('.notice ul')).slideDown();
    })
  }

  //마우스를 공지사항 내용에 올렸을 때 롤링 멈추기
  $('.notice li').on('mouseenter',function(){
    //notice라는 이름을 호출해서 롤링작업을 멈추기
    clearInterval(notice);
  }).on('mouseleave',function(){
    //다시 수행하도록 호출
    notice=setInterval(noticeRolling,3000);
  })

  //api key=AIzaSyCWlsNSKJKPgak83iFy-ie_pmZY6ZOQDyc
  function initMap() {
   //마커가 포함된 지도
   var uluru = {lat: 37.556179, lng: 126.939038};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 18,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
    //정보 더보기
    var contentString = '<div id="map">'+
    '<div class="map-popup">'+
    '<h2>놀이기구 이름</h2>'+
    '<button>자세히보기</button>'+
    '</div>'+
    '</div>';

   var infowindow = new google.maps.InfoWindow({
     content: contentString
   });

   var marker = new google.maps.Marker({
     position: uluru,
     map: map,
     title: '놀이기구 이름'
   });
   marker.addListener('click', function() {
     infowindow.open(map, marker);
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


  //footer 사이트 정보
  $('footer h1 a').on('click',function(e){
    e.preventDefault();
    $('.sub-nav').slideToggle();
    $(this).find('i').toggleClass('icon-down-open icon-up-open');
  })
})
//document.ready end
