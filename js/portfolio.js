$(document).ready(function() {
  $(window).fadeThis({
    speed: 1000,
  });


  $('#home, #profile, #portfolio, #services, #contact').click(function(){
    var elName=$(this).attr('id');
    console.log('선택한버튼의 아이디이름값',elName);
    $('html, body').stop().animate({
      scrollTop:$('.'+elName).offset().top-50
    },1000);
  })


  $('#bottom').click(function(){
    $('html, body').stop().animate({
      scrollTop:'+=969'
    },1000);
  })



  $('.btn-top').click(function(){
    $('html, body').stop().animate({
      scrollTop:'0'
    },1000);
  })


  $(function(){
  //isotope 초기화
  var $grid=$('.grid').isotope();
  //카테고리 버튼 클릭시 필터링처리
  $('#works .filter li').on('click',function(e){
    e.preventDefault();
    $('#works .filter li').removeClass('active');
    $(this).addClass('active');
    var sortValue=$(this).attr('data-sort-value');
    //console.log(sortValue);
    $grid.isotope({filter:sortValue});
    searchCount();
  })






  })



});
