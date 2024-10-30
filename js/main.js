//１．動く関数（＋CSS）を準備する
//２．play-contentsから選択肢を選ぶことでcurrentActionに設定（まだ動作はしない）
//３．イラストをクリックしたタイミングでcurrentActionが適用（ここで動く）
//４．クリックしたときにanimationが動いていれば停止させる（isAnimatingで)


let currentAction = null; // 現在の選択を記録する変数
let isAnimating = false; //今動いてるかどうか？最初は停止中なのでfalse

//まわる関数 rotateが自分で作ったkeyframe（中身はCSSファイルに記述）
// (linearを付けた場合は一定速度で動く)
function rotateIcon(element) {
    $(element).css({ "animation": "rotate 2s infinite" });
}

//はねる関数 
function jumpIcon(element) {
    $(element).css({ "animation": "jump 1s infinite" });
}

//点滅する関数(alternateは往復動作をするので滑らかになる！)
function blinkIcon(element) {
    $(element).css({ "animation": "blink 1s infinite" });
}

//震える関数
function shakeIcon(element) {
    $(element).css({ "animation": "shake 0.5s infinite" });
}

//動きを停止する関数
function stopAnimation(element) {
    $(element).css({ "animation": "" });
}

//崩壊ボタンのコメント
$(document).ready(function () {
    $('#collapseAll').hover(
        function () {
            $('.badchild').fadeIn();
        },
        function () {
            $('.badchild').fadeOut();
        }
    );
});


// それぞれのアイコンにクリックイベントを設定
$("#rotateIcon").click(function () {
    currentAction = "rotate";
    console.log(currentAction);
});
$("#jumpIcon").click(function () {
    currentAction = "jump";
});
$("#blinkIcon").click(function () {
    currentAction = "blink";
});
$("#shakeIcon").click(function () {
    currentAction = "shake";
})

let count = 0;
$("#collapseAll").click(function () {
    count += 1;
    console.log(count);
    if (count === 2) {
        stopAnimation(["#jack1", "#jack2", "#jack3", "#jack4", "#jack5", "#jack6", "#jack7", "#jack8"]);
    } if (count === 3) {
        const Animation1 = ["#title1", "#shakeIcon", "#jumpIcon", "#jack1"];
        Animation1.forEach(function (selector) {
            $(selector).addClass("animate__animated animate__hinge");
        });
        const Animation2 = ["#jack3", "#jack4", "#jack5", "#jack6", "#jack8"];
        Animation2.forEach(function (selector) {
            $(selector).addClass("animate__animated animate__rotateOutDownRight");
        });
        setTimeout(function () {
            const Animation3 = ["#title2", ".main", "#jack7", "#jack2"];
            Animation3.forEach(function (selector) {
                $(selector).addClass("animate__animated animate__hinge");
            });
        }, 1000);
        $("#goodchild").fadeIn(5000);
    }
});

//反省したときの再読み込みボタン
$("#goodchild").on("click", function () {
    location.reload();
});

//かぼちゃアイコンのクリック時
$("#jack1, #jack2, #jack3, #jack4, #jack5, #jack6, #jack7, #jack8").click(function () {
    if (isAnimating) {
        stopAnimation(this);
        isAnimating = false;
    } else {
        if (currentAction === "rotate") {
            rotateIcon(this);
        } else if (currentAction === "jump") {
            jumpIcon(this);
        } else if (currentAction === "blink") {
            blinkIcon(this);
        } else if (currentAction === "shake") {
            shakeIcon(this);
        }
        isAnimating = true;
    }
});

