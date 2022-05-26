$(function() {
    setTimeout(function(){
        $('.start p').fadeIn(3200);
    }, 500);  // 0.5秒後にロゴをフェードイン！
    setTimeout(function(){
        $('.start').fadeOut(1000);
    }, 3000);  // 3.0秒後にロゴ含め真っ白背景をフェードアウト！
});