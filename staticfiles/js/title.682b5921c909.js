$(function() {
    setTimeout(function(){
        $('.start p').fadeIn(3200);
    }, 500);  // 0.5秒後にロゴをフェードイン！
    setTimeout(function(){
        $('.start').fadeOut(1000);
    }, 5000);  // 2.5秒後にロゴ含め真っ白背景をフェードアウト！
});