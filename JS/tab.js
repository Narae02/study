
//ver.1
// var pfTab = $('.tab-button'); // 셀렉터 문법은 기본적으로 작동시간이 오래걸림 => 반복해서쓰는 셀렉터는 변수로 바꿔야 성능이 빨라짐*
// var pfTabTxt = $('.tab-content');

// // 1번째 탭
// pfTab.eq(0).on('click', function(){  //eq(0):1번째 클래스를 찾기위해 문자열로
//   pfTab.removeClass('orange')  //모든버튼에 붙은 orange 클래스명 제거
//   // $('.tab-button:eq(0)').addClass(orange) //버튼0에 orange 클래스명 추가
//   pfTab.eq(0).addClass('orange') //버튼0에 orange 클래스명 추가
//   // - document.querySelectorAll('.test1')[0].innerHTML = '안녕';

//   pfTabTxt.removeClass('show')  //모든div에 붙은 show 클래스명 제거
//   // $('div:eq(0)').addClass(show)  //div0에 show 클래스명 추가하기
//   pfTabTxt.eq(0).addClass('show')  //div0에 show 클래스명 추가하기

// });
// // 2번째 탭
// pfTab.eq(1).on('click', function(){  
//   pfTab.removeClass('orange') 
//   pfTab.eq(1).addClass('orange')

//   pfTabTxt.removeClass('show') 
//   pfTabTxt.eq(1).addClass('show')

// });
// // 3번째 탭
// pfTab.eq(2).on('click', function(){  
//   pfTab.removeClass('orange') 
//   pfTab.eq(2).addClass('orange')

//   pfTabTxt.removeClass('show') 
//   pfTabTxt.eq(2).addClass('show')

// });

// //문법공부) for반복문
// for (var i = 0; i < 3; i++){  //3회 반복
//   document.getElementsByClassName('tab-content')[0].innerHTML = '토닥토닥♥'
// }

// for (var i = 3; i < 6; i++) {
//   console.log('3번 반복됨')
// }
// for (var i = 3; i < 6; i++) {
//   console.log(i)
// }


//ver.2 for반복문
// var pfTab = $('.tab-button');
// var pfTabTxt = $('.tab-content');

// for (let i = 0; i < 3; i++) {

//   pfTab.eq(i).on('click', function(){  
//     pfTab.removeClass('orange') 
//     pfTab.eq(i).addClass('orange')
//     pfTabTxt.removeClass('show') 
//     pfTabTxt.eq(i).addClass('show')
  
//   });

// } //왜 var에서 let으로 바꿨는지 궁금하면 'C:\Users\kimnr\Desktop\강의&공부 메모장\영상메모' 에서 찾아보기



//ver.3 확장성(3이라는 숫자 대신 "지금 html에 있는 탭 버튼의 갯수"를 넣기)

console.log('탭 버튼의 갯수:', $('.tab-button').length);

// var tabTxtCount = $('.tab-content').length;
// console.log('탭 버튼에 들어갈 컨텐츠 갯수:', tabButtonCount);  //이건 필요 없나?

// var pfTab = $('.tab-button');
// var pfTabTxt = $('.tab-content');

// for (let i = 0; i < $('.tab-button').length; i++) { //여러개 찾아주는 셀렉터로 html 요소 찾은 다음에 .length 붙이면 갯수를 세어줍니다.

//   pfTab.eq(i).on('click', function(){  
//     pfTab.removeClass('orange') 
//     pfTab.eq(i).addClass('orange')
//     pfTabTxt.removeClass('show') 
//     pfTabTxt.eq(i).addClass('show')
  
//   });

// }

//ver.4 위의 코드를 함수사용해서 바꿔보기(파라미터)
for (let i = 0; i < $('.tab-button').length; i++){

  $('.tab-button').eq(i).on('click', function(){
    탭열기(i)
  })

}


function 탭열기(구멍){  //축약할 코드에 변수가 있으면 변수를 파라미터로 바꿔야 잘 동작함!! 그래서 i 부분을 전부 파라미터로 바꿔줌
  $('.tab-button').removeClass('orange');
  $('.tab-button').eq(구멍).addClass('orange');
  $('.tab-content').removeClass('show');
  $('.tab-content').eq(구멍).addClass('show');
} // 탭열기(0) 이러면 0번 탭이 열림 / 탭열기(1) 이러면 1번 탭이 열림 / 탭열기(2) 이러면 2번 탭이 열림


//ver5. 이벤트버블링으로 이벤트리스너 하나만 사용하기! (이벤트버블링 알고있으면 이벤트 리스너 많이 필요 없음! 램 용량이 1/3로 줄어서 성능적으로 좋음)
// 이벤트버블링을 알면 이벤트리스너 줄일 수 있음

 

// - 지금 탭을 만들 때 이벤트리스너를 3개나 부착했습니다. (버튼이 3개니까요)
// - 근데 잘 생각해보면 이벤트리스너 1개만 써도 충분히 기능구현이 가능합니다.
// - 버튼 3개의 부모인 <ul class="list"> 여기에 이벤트리스너 1개만 있어도 탭기능만들 수 있을듯요 
// - 버튼 뭘 누르든 간에 <ul class="list">에 붙은 이벤트리스너도 동작하니까요. 
// - 왜냐면 이벤트버블링이 항상 일어나기 때문입니다. 
 

// $('.list').click(function(){
//   지금 누른게 버튼 0이면 탭열기(0) 실행
//   지금 누른게 버튼 1이면 탭열기(1) 실행
//   지금 누른게 버튼 2이면 탭열기(2) 실행
// })
// 그래서 이렇게 탭기능 만들어도 잘 동작한다는 소리입니다.
// - (jQuery 셀렉터엔 .click() 이라고 써도 간단하게 click 이벤트리스너 부착가능)

// Q. 왜 굳이 이벤트리스너 줄여서 코드 짜냐고요? 
// - 버튼이 몇십개 있다면 이렇게 짜는게 덜 복잡하고
// - 이벤트리스너를 줄이면 램용량을 절약할 수 있습니다. 성능개선의 일환입니다. 
 

// $('.list').click(function(){
//   if(e.target == document.querySelectorAll('.tab-button')[0]){ // 지금 누른게 버튼0이면
//     탭열기(0)
//   }
//   if(e.target == document.querySelectorAll('.tab-button')[1]){ // 지금 누른게 버튼1이면
//     탭열기(1)
//   }
//   if(e.target == document.querySelectorAll('.tab-button')[2]){ // 지금 누른게 버튼2이면
//     탭열기(2)
//   }
//   if(e.target == document.querySelectorAll('.tab-button')[3]){ // 지금 누른게 버튼3이면
//     탭열기(3)
//   }
//   if(e.target == document.querySelectorAll('.tab-button')[4]){ // 지금 누른게 버튼4이면
//     탭열기(4)
//   }

// })


// function 탭열기(구멍){  //축약할 코드에 변수가 있으면 변수를 파라미터로 바꿔야 잘 동작함!! 그래서 i 부분을 전부 파라미터로 바꿔줌
//   $('.tab-button').removeClass('orange');
//   $('.tab-button').eq(구멍).addClass('orange');
//   $('.tab-content').removeClass('show');
//   $('.tab-content').eq(구멍).addClass('show');
// }


//ver5. dataset 문법
// html태그에 몰래 정보 숨기기 가능 : data-자료이름-"값"
// <li class="tab-button" data-id="0">Products</li>
// ---> 그리고 숨겼던 자료 출력하는 방법 :  콘솔창에' 셀렉터.dataset.자료이름 '입력
// document.querySelector('.tab-button').dataset.id   그러면 숨겨놓은 값'0'이 출력됨!

//1. html에 data값 입력
//2. 
$('.list').click(function(e){
  탭열기(e.target.dataset.id)
})

function 탭열기(구멍){  //축약할 코드에 변수가 있으면 변수를 파라미터로 바꿔야 잘 동작함!! 그래서 i 부분을 전부 파라미터로 바꿔줌
  $('.tab-button').removeClass('orange');
  $('.tab-button').eq(구멍).addClass('orange');
  $('.tab-content').removeClass('show');
  $('.tab-content').eq(구멍).addClass('show');
}
