/*
[audio/video 주요 속성]
controls    컨트롤바
autoplay    자동재생
loop        무한반복
muted       음소거
volume      볼륨
currentSrc  소스값
currentTime 현재재생시간(초)
duration    총재생시간
ended       재생완료여부
paused      일시정지여부
played      재생시작여부

[audio/video 주요 이벤트]
ended       미디어가 끝에 도달 했을 때 발생
pause       일시정지됐을 때 발생
play        재생시작시 발생
error       에러가 일어날 때 발생

[audio/video 주요 메서드]
load()      미디어 파일 로드(다른 소스로 변경시)
play()      재생
pause()     일시정지
*/

//스크롤바 설정
var playlistScroll=new SimpleBar($('#play-list')[0]);

function listScroll(){
  setTimeout(function(){
    //현재 재생되고 있는 리스트의 위치값을 찾아서 그 위치만큼 스크롤 처리
    playlistScroll.getScrollElement().scrollTop=$('#play-list .active').position().top;
  },500);
}

//오디오 선택
var player=$('audio')[0];
var playerSrc=['source/Thinking About You_Radiohead.mp3',
               'source/Wonderwall_Oasis.mp3',
               'source/Havana (feat. Young Thug)_Camila Cabello.mp3',
               'source/Close Your Eyes_The Chemical Brothers.mp3',
               'source/I Want You Back_Jackson 5.mp3',
               'source/L.S.F. (Lost Souls Forever)_Kasabian.mp3',
               'source/The Scientist_Coldplay.mp3',
               'source/Replica_The XX.mp3',
               'source/The Dying Of The Light_NGHFB.mp3',
               'source/Make You Feel My Love_Adele.mp3'];
var playIndex=0;
var playListLength=playerSrc.length;

function playList(){
  //반복문
  for(var i=0; i<playListLength; i++){
    $('#play-list ul').append('<li>'+playerSrc[i].substring(playerSrc[i].lastIndexOf('/')+1, playerSrc[i].lastIndexOf('.'))+'</li>');
    if(i==0){$('#play-list ul li').addClass('active');}
  }
}
//플레이 리스트 설정(함수를 만들면 호출을 해야함, 최초 한번만 실행)
playList();

function title(){
  src=player.currentSrc;
  var title=src.substring(src.lastIndexOf('/')+1, src.lastIndexOf('.'));
  //한글이 깨지지 않게 출력되도록 디코딩처리
  $('.player-header b').text(decodeURI(title));
}
//현재재생되는 영상제목(최초 한번만 실행)
title();

//프로그레스 상태
var maxim=$('.progress').width();
var progressBar=$('.progress');
var progress=$('.progress > div');
// setTimeout(콜백함수,시간)=>특정시간후에 한번만 호출
// setInterval(콜백함수,시간)=>특정시간마다 계속 호출

function progressState(){
  if(!player.ended){//재생중일때
    var size=parseInt(player.currentTime*maxim/player.duration);//실수=>정수
    progress.css('width',size+'px');//px생략가능
    var totalTime=parseInt(player.duration);
    var nowTime=parseInt(player.currentTime);
    // timer함수를 호출시 초를 전달해주면 패턴에 맞는 문자열을 리턴해준다.
    $('#time').text(timer(nowTime)+' / '+timer(totalTime));
  }else{//재생이 완료되었을 때
    progress.css('width',0);
    $('#btn-play-pause i').text('play_arrow');
  }
}

//초를 받아서 시,분,초로 구하는 함수
function timer(seconds){
  var h=parseInt(seconds/3600);
  var m=parseInt(seconds/60%60);
  var s=parseInt(seconds%60);
  //삼항연산식
  //결과값=(조건식)?참일때수행할코드:거짓일때수행할코드;
  m=(m < 10)?'0'+m : m;
  s=(s < 10)?'0'+s : s;
  if(h==0){
    return m+':'+s;
  }else{
    return h+':'+m+':'+s;
  }
}

//프로그레스바 제어(영상시간)
progressBar.on('click',function(e){
  var mouseX=e.pageX-progressBar.offset().left;//클릭한 시점의 위치값 구하기
  var newtime=mouseX*player.duration/maxim;//클릭한 시점의 시간구하는 공식
  //e.pageX 클릭한 시점의 x축값(화면상에서)
  //요소.offset().left 해당요소가 있는 x축 위치값(화면상에서)
  //console.log(e.pageX, progressBar.offset().left);
  //console.log(mouseX, newtime);
  player.currentTime=newtime;//클릭한 시점의 구간으로 현재시간을 갱신처리
  var totalTime=parseInt(player.duration);
  var nowTime=parseInt(newtime);
  //시간변경 및 프로그레스상태 갱신
  $('#time').text(timer(nowTime)+' / '+timer(totalTime));
  progress.css('width',mouseX+'px');//px생략가능
})

//플레이 리스트 보기
$('#btn-play-list').on('click',function(){
  var icon=$(this).find('i').text();//=>get, 가져오기
  if(icon=='playlist_play'){
    $(this).find('i').text('clear');//=>set, 변경하기
    $('#play-list').addClass('open');
    listScroll();
  }else{
    $(this).find('i').text('playlist_play');
    $('#play-list').removeClass('open');
  }
})

//전체화면
$('#btn-fullscreen').on('click',function(){
  var icon=$(this).find('i').text();
  if(icon=='fullscreen'){
    $(this).find('i').text('fullscreen_exit');
    $('#player').addClass('fullscreen');
  }else{
    $(this).find('i').text('fullscreen');
    $('#player').removeClass('fullscreen');
  }
  //전체화면일때 프로그레스바의 사이즈가 변경되므로 다시 설정해줌.
  maxim=$('.progress').width();
})

//재생/일시정지
$('#btn-play-pause, video').on('click',function(){
  if(player.paused){
    player.play();
    $('#btn-play-pause i').text('pause');
    progressloop=setInterval(progressState,10);//프로그레스 움직임.
  }else{
    player.pause();
    $('#btn-play-pause i').text('play_arrow');
    clearInterval(progressloop);//프로그레스의 상태를 멈춤.
  }
})

//전체반복/하나만반복/반복안함
$('#btn-loop').on('click',function(){
  var icon=$(this).find('i').text();
  if(icon=='repeat_one' && $(this).hasClass('on')){//전체반복
    $(this).find('i').text('repeat');
    player.loop=false;//하나만 반복하는 것 막기
    //하나의 영상재생이 완료되었는지 1초마다 검사
    state=setInterval(function(){
      if(player.ended){//영상재생이 완료가 되었다.
        console.log('완료됨');
        //다음버튼을 클릭처리(내가 누르지 않아도 클릭처리되는 기능)
        $('#btn-next').trigger('click');
      }
    },1000);
    console.log('전체반복');
  }else if(icon=='repeat' && !$(this).hasClass('on')){//하나만반복
    $(this).find('i').text('repeat_one');
    $(this).addClass('on');
    player.loop=true;
    console.log('하나만반복');
  }else if(icon=='repeat' && $(this).hasClass('on')){//반복안함
    $(this).removeClass('on');
    player.loop=false;
    clearInterval(state);
    console.log('반복안함');
  }
})

//이전/다음
$('#btn-prev, #btn-next').on('click',function(){
  if($(this).attr('id')=='btn-next'){
    playIndex++;
    if(playIndex == playListLength) playIndex=0;
  }else{
    playIndex--;
    if(playIndex < 0) playIndex=playListLength-1;
  }

  //현재인덱스에 해당되는 소스값으로 변경한다.
  $('source').attr('src',playerSrc[playIndex]);
  //변경 후 오디오소스 로드
  player.load();
  //오디오소스가 로드가 완료되면 제목변경
  player.onloadeddata=function(){
    title();
  }
  //비디오재생
  player.play();
  //재생아이콘을 일시정지아이콘으로 변경하고
  $('#btn-play-pause i').text('pause');
  //리스트목록 활성화를 변경
  $('#play-list ul li').removeClass('active').eq(playIndex).addClass('active');
  progressloop=setInterval(progressState,10);
  listScroll();
})

//플레이리스트에서 선택시 재생처리
$('#play-list li').on('click',function(){
  //리스트에서 선택한 순서 저장
  var index=$(this).index();
  //활성화초기화 후 선택한 리스트 활성화
  $('#play-list ul li').removeClass('active');
  $(this).addClass('active');
  $('source').attr('src',playerSrc[index]);
  player.load();
  player.onloadeddata=function(){
    title();
  }
  player.play();
  $('#btn-play-pause i').text('pause');
  //선택한 인덱스값으로 변경(이전,다음에서 쓰이는 인덱스값을)
  playIndex=index;//매우중요!
})

//음소거
$('#btn-volume').on('click',function(){
  var icon=$(this).find('i').text();
  if(icon=='volume_up'){
    $(this).find('i').text('volume_off');
    player.muted=true;//음소거
  }else{
    $(this).find('i').text('volume_up');
    player.muted=false;//음소거해제
  }
})

//음량 프로그레스
var volumeMaxim=$('.volume-progress').width();
var volumeProgressBar=$('.volume-progress');
var volumeProgress=$('.volume-progress > div');
var soundFlag=false;//음량조절 제어

volumeProgressBar.on({
  mousedown:function(){//마우스를 클릭했을 때
    soundFlag=true;
  },
  mousemove:function(e){//마우스를 움직일때
    if(soundFlag==false) return;//soundFlag가 true일때만 아래 구문을 수행.
    player.muted=false;//음소거 상태 해제
    $('#btn-volume i').text('volume_up');
    var mouseX=parseInt(e.pageX-volumeProgressBar.offset().left);
    if(mouseX>=100){mouseX=100;}
    if(mouseX<=0){mouseX=0;}
    //볼륨수치조절 0~1사이의 실수 (0:음소거, 0.5:50%, 1:최대치)
    player.volume=mouseX*0.01;
    volumeProgress.css('width',mouseX+'%');
  },
  mouseup:function(){//마우스 클릭하고 땟을때
    soundFlag=false;//마우스를 움직이는 이벤트를 수행안하도록 변경
  },
  mouseleave:function(){//영역을 벗어났을 때
    soundFlag=false;
  }
})
