var widthImg = 0;
var heightImg = 0;
var numberPiece = 3;
var listPostion31 = [{x:1,y:2}, {x:0,y:2},
                    {x:0,y:1}, {x:1,y:1}, {x:2,y:1},
                    {x:2,y:0}, {x:1,y:0}, {x:0,y:0},
                    {x:0,y:1}, {x:0,y:2}, 
                    {x:1,y:2}, {x:1,y:1}, {x:1,y:0},
                    {x:2,y:0}, {x:2,y:1}, {x:2,y:2}];
var listPostion32 = [{x:1,y:2}, {x:0,y:2},
                    {x:0,y:1}, {x:0,y:0}, 
                    {x:1,y:0}, {x:2,y:0}, 
                    {x:2,y:1}, {x:1,y:1},
                    {x:1,y:2}, {x:2,y:2}];
var listPostion41 = [{x:2,y:3}, {x:1,y:3},{x:0,y:3},
                    {x:0,y:2}, {x:1,y:2}, {x:2,y:2}, {x:3,y:2}, 
                    {x:3,y:1}, {x:2,y:1}, {x:1,y:1}, {x:0,y:1},
                    {x:0,y:0}, {x:1,y:0}, {x:2,y:0}, {x:3,y:0},
                    {x:3,y:1}, {x:2,y:1}, {x:2,y:2}, {x:3,y:2}, {x:3, y:3}];
var listPostion42 = [{x:2,y:3}, {x:1,y:3}, {x:0,y:3},
                    {x:0,y:2}, {x:0,y:1}, {x:0,y:0}, 
                    {x:1,y:0}, {x:2,y:0}, {x:3,y:0},
                    {x:3,y:1}, {x:3,y:2},
                    {x:2,y:2}, {x:1,y:2},
                    {x:1,y:1}, {x:2,y:1},
                    {x:2,y:2}, {x:2,y:3}, {x:3, y:3}];
var listPostion51 = [{x:3,y:4}, {x:2,y:4}, {x:1,y:4}, {x:0,y:4},
                    {x:0,y:3}, {x:1,y:3}, {x:2,y:3}, {x:3,y:3}, {x:4,y:3},
                    {x:4,y:2}, {x:3,y:2}, {x:2,y:2}, {x:1,y:2}, {x:0,y:2},
                    {x:0,y:1}, {x:1,y:1}, {x:2,y:1}, {x:3,y:1}, {x:4,y:1}, 
                    {x:4,y:0}, {x:3,y:0}, {x:2,y:0}, {x:1,y:0}, {x:0,y:0},
                    {x:1,y:0}, {x:1,y:1}, 
                    {x:2,y:1}, {x:2,y:2}, 
                    {x:3,y:2}, {x:3,y:3},
                    {x:4,y:3}, {x:4,y:4}];
var listPostion52 = [{x:3,y:4}, {x:2,y:4}, {x:1,y:4}, {x:0,y:4},
                    {x:0,y:3}, {x:0,y:2}, {x:0,y:1}, {x:0,y:0},
                    {x:1,y:0}, {x:2,y:0}, {x:3,y:0}, {x:4,y:0},
                    {x:4,y:1}, {x:4,y:2}, {x:4,y:3},
                    {x:3,y:3}, {x:2,y:3}, {x:1,y:3},
                    {x:1,y:2}, {x:1,y:1},
                    {x:2,y:1}, {x:3,y:1},
                    {x:3,y:2}, {x:2,y:2},
                    {x:2,y:3}, {x:3,y:3},{x:4,y:3}, {x:4,y:4}];
                    
var sizeWidth = 0;
var sizeHeight = 0;
var xStart = numberPiece - 1;
var yStart = numberPiece - 1;

function setSizeGamePlay() {
    var headSite = 30 + 30 + 90;    
    var adsense = 60;

    if (window.innerHeight >= window.innerWidth) {
        // mobile
        widthImg = window.innerWidth - 15;
        if (window.innerHeight - headSite - adsense < widthImg) {
            widthImg = window.innerHeight - headSite - adsense;
        }        
    } 
    heightImg = window.innerHeight - headSite - adsense;
}
$(document).ready(function () {
    setSizeGamePlay();

    $("#btnFile").click(function () {
        $("#myfile").click();
    });

    $("#myfile").change(function (evt) {
        document.querySelector("#waittingScreen").style.display = "block";
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            document.removeEventListener('keyup', setEventButtonUp, false);
            removeEventButtonMove();
            
            $("#divImage").fadeOut("fast");
            $("#number" + numberPiece).fadeOut("fast");
            resetTable();

            var fr = new FileReader();
            fr.onload = function () {
                var imgSource = new Image();
                imgSource.onload = function () {                    
                    resizeImage(imgSource);
                    createTable();

                    document.addEventListener('keyup', setEventButtonUp, false);
                    addEventButtonMove();

                    createGameLevel();
                    $("#number" + numberPiece).fadeIn("slow");
                    document.querySelector("#waittingScreen").style.display = "none";
                };
                imgSource.src = fr.result;
                $("#imageSrc").attr("src", fr.result);
            }
            fr.readAsDataURL(files[0]);
        } else {
            // Not supported
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
            document.querySelector("#waittingScreen").style.display = "none";
        }
    });
});

// var xDown = null;
// var yDown = null;
// function getTouches(evt) {
//     return evt.touches ||             // browser API
//         evt.originalEvent.touches; // jQuery
// }
// function handleTouchStart(evt) {
//     const firstTouch = getTouches(evt)[0];
//     xDown = firstTouch.clientX;
//     yDown = firstTouch.clientY;
// };
// function handleTouchMove(evt) {
//     if (!xDown || !yDown) {
//         return;
//     }

//     var xUp = evt.touches[0].clientX;
//     var yUp = evt.touches[0].clientY;

//     var xDiff = xDown - xUp;
//     var yDiff = yDown - yUp;

//     if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
//         if (xDiff > 0) {
//             /* left swipe */
//             moveRight();
//         } else {
//             /* right swipe */
//             moveLeft();
//         }
//     } else {
//         if (yDiff > 0) {
//             /* up swipe */
//             moveBottom();
//         } else {
//             /* down swipe */
//             moveTop();
//         }
//     }
//     /* reset values */
//     xDown = null;
//     yDown = null;
// };

// detect press button
function pressTop() {
    moveBottom();
}
function pressLeft() {
    moveRight();
}
function pressRight() {
    moveLeft();
}
function pressBottom() {
    moveTop();
}
function removeEventButtonMove() {
    if (mobileAndTabletCheck()) {
        $("#btnTop").unbind("touchend", pressTop);
        $("#btnLeft").unbind("touchend", pressLeft);
        $("#btnRight").unbind("touchend", pressRight);
        $("#btnBottom").unbind("touchend", pressBottom);
    } else {
        $("#btnTop").unbind("mouseup", pressTop);
        $("#btnLeft").unbind("mouseup", pressLeft);
        $("#btnRight").unbind("mouseup", pressRight);
        $("#btnBottom").unbind("mouseup", pressBottom);
    }
}
function addEventButtonMove() {
    if (mobileAndTabletCheck()) {
        $("#btnTop").bind("touchend", pressTop);
        $("#btnLeft").bind("touchend", pressLeft);
        $("#btnRight").bind("touchend", pressRight);
        $("#btnBottom").bind("touchend", pressBottom);
    } else {
        $("#btnTop").bind("mouseup", pressTop);
        $("#btnLeft").bind("mouseup", pressLeft);
        $("#btnRight").bind("mouseup", pressRight);
        $("#btnBottom").bind("mouseup", pressBottom);
    }
}

// detecting arrow key presses
function setEventButtonUp(e) {
    var left = 37;
    var up = 38;
    var right = 39;
    var down = 40;
    switch (e.keyCode) {
        case left:
            moveRight();
            break;
        case up:
            moveBottom();
            break;
        case right:
            moveLeft();
            break;
        case down:
            moveTop();
            break;
    }
}

function processEventLevel(cbx) {
    
    
        changeLevel(cbx);
    
}
function changeLevel(cbx) {    
    $(cbx).attr("disabled", "disabled");
    $("#btnFile").attr("disabled", "disabled");

    var value = parseInt($(cbx).val());
    if ($("#number" + numberPiece).is(":visible")) {        
        document.querySelector("#waittingScreen").style.display = "block";

        setTimeout(function () {
            var r = confirm(
                "You will RESTART the game. Do you want to change Level?"
            );
            if (r == true) {
                $("#number" + numberPiece).fadeOut("fast");
                restartGame(value);
                document.querySelector("#waittingScreen").style.display = "none";
            } else {
                $("#btnFile").removeAttr("disabled");
                $(cbx).removeAttr("disabled");
                $(cbx).val(numberPiece);
                document.querySelector("#waittingScreen").style.display = "none";
                return false;
            }
        }, 100);
    } else if ($("#imageSrc").attr("src") != undefined && $("#imageSrc").attr("src") != "") {
        document.querySelector("#waittingScreen").style.display = "block";

        setTimeout(function () {
            $("#divImage").fadeOut("fast");
            restartGame(value);

            document.addEventListener("keyup", setEventButtonUp, false);
            addEventButtonMove();
            document.querySelector("#waittingScreen").style.display = "none";
        }, 100);
    } else {
        numberPiece = value;
    }

    $("#btnFile").removeAttr("disabled");
    $(cbx).removeAttr("disabled");        
}

function restartGame(newLevel) {
    resetTable();
    resetListImage();

    numberPiece = newLevel;    
    createImageGame($("#imageSrc").attr("src"), $("#imageSrc").attr("style"));
    createTable();

    xStart = numberPiece-1;
    yStart = numberPiece-1;
    createGameLevel();
    $("#number" + numberPiece).fadeIn("slow");
}

function resetTable() {    
    moveImage(xStart, yStart, numberPiece - 1, numberPiece - 1);
    xStart = numberPiece-1;
    yStart = numberPiece-1;

    var listDiv = $("#number" + numberPiece + " div[class=divGame]");
    for (var i = 0; i < listDiv.length; i++) {
        $(listDiv[i]).attr("id", "div" + (i + 1));
    }
}

function resetListImage() {
    var listImage = $("#number" + numberPiece + "  img[class=game]");
    for (var i = 0; i < listImage.length; i++) {
        $(listImage[i]).attr("src", "");
    }
}

function resizeImage(imgS) {
    var sizeImg = "height";
    if (imgS.width > imgS.height) {
        sizeImg = "width";
    }

    if (window.innerHeight >= window.innerWidth) {
        // mobile
        if (sizeImg == "height") {
            // portrait
            sizeHeight = heightImg;
            sizeWidth = (heightImg * imgS.width) / imgS.height;
        } else {
            // landspace
            sizeHeight = (widthImg * imgS.height) / imgS.width;
            sizeWidth = widthImg;
        }
    } else {
        // laptop
        sizeHeight = heightImg;
        sizeWidth = (heightImg * imgS.width) / imgS.height;
    }

    var styleText = "height:" + sizeHeight + "px;";
    styleText += "width:" + sizeWidth + "px;";
    $("#imageSrc").attr("style", styleText);

    createImageGame(imgS.src, styleText);
}

function createImageGame(imgSrc, styleText){
    var listImage = $("#number" + numberPiece + " img[class=game]");
    for (var i = 0; i < listImage.length; i++) {
        $(listImage[i]).attr("style", styleText);
        $(listImage[i]).attr("src", imgSrc);
    }
}

function createTable() {
    var xSize = sizeWidth / numberPiece;
    var ySize = sizeHeight / numberPiece;

    var listDiv = $("#number" + numberPiece + " div[class=divGame]");
    for (var i = 0; i < listDiv.length; i++) {
        var styleText = "width:" + xSize + "px;height:" + ySize + "px;";
        $(listDiv[i]).attr("style", styleText + "overflow:hidden;");
        $(listDiv[i]).attr("x", parseInt(i % numberPiece));
        $(listDiv[i]).attr("y", parseInt(i / numberPiece));
    }

    var listImage = $("#number" + numberPiece + " img[class=game]");
    for (var i = 0; i < listImage.length; i++) {
        var styleImg = $(listImage[i]).attr("style");
        var idX = parseInt(i % numberPiece);
        var idY = parseInt(i / numberPiece);
        var sizeX = xSize * idX;
        var sizeY = ySize * idY;
        styleImg += "margin-left:-" + sizeX + "px;";
        styleImg += "margin-top:-" + sizeY + "px;";
        $(listImage[i]).attr("style", styleImg);
    }
}

function moveImage(x1, y1, x2, y2) {
    var parent1 = $("#number" + numberPiece + " div[x=" + x1 + "][y=" + y1 + "]").parent();
    var parent2 = $("#number" + numberPiece + " div[x=" + x2 + "][y=" + y2 + "]").parent();

    var html1 = $(parent1).html();
    $(parent1).html($(parent2).html());
    $(parent2).html(html1);

    var div1 = $("#number" + numberPiece + " div[x=" + x1 + "][y=" + y1 + "]");
    var div2 = $("#number" + numberPiece + " div[x=" + x2 + "][y=" + y2 + "]");
    div1.attr("x", x2);
    div1.attr("y", y2);
    div2.attr("x", x1);
    div2.attr("y", y1);
}

function moveLeft() {
    if (xStart - 1 >= 0) {
        moveImage(xStart, yStart, xStart - 1, yStart);
        xStart = xStart - 1;

        endGame();
    }
}

function moveTop() {
    if (yStart - 1 >= 0) {
        moveImage(xStart, yStart, xStart, yStart - 1);
        yStart = yStart - 1;

        endGame();
    }
}

function moveRight() {
    if (xStart + 1 <= numberPiece - 1) {
        moveImage(xStart, yStart, xStart + 1, yStart);
        xStart = xStart + 1;

        endGame();
    }
}

function moveBottom() {
    if (yStart + 1 <= numberPiece - 1) {
        moveImage(xStart, yStart, xStart, yStart + 1);
        yStart = yStart + 1;

        endGame();
    }
}

function createGameEasy() {
    for (var j = 0; j < numberPiece; j++) {
        var rd = getRndInteger(1, 2);
        if (rd == 1) {
            for (var i = 0, sz = listPostion31.length; i < sz; i++) {
                moveImage(xStart, yStart, listPostion31[i].x, listPostion31[i].y);
                xStart = listPostion31[i].x;
                yStart = listPostion31[i].y;
            }
        } else {
            for (var i = 0, sz = listPostion32.length; i < sz; i++) {
                moveImage(xStart, yStart, listPostion32[i].x, listPostion32[i].y);
                xStart = listPostion32[i].x;
                yStart = listPostion32[i].y;
            }
        }
    }
}
function createGameNormal() {
    for (var j = 0; j < numberPiece; j++) {
        var rd = getRndInteger(1, 2);
        if (rd == 1) {
            for (var i = 0, sz = listPostion41.length; i < sz; i++) {
                moveImage(xStart, yStart, listPostion41[i].x, listPostion41[i].y);
                xStart = listPostion41[i].x;
                yStart = listPostion41[i].y;
            }
        } else {
            for (var i = 0, sz = listPostion42.length; i < sz; i++) {
                moveImage(xStart, yStart, listPostion42[i].x, listPostion42[i].y);
                xStart = listPostion42[i].x;
                yStart = listPostion42[i].y;
            }
        }
    }
}
function createGameHard() {
    for (var j = 0; j < numberPiece; j++) {
        var rd = getRndInteger(1, 2);
        if (rd == 1) {
            for (var i = 0, sz = listPostion51.length; i < sz; i++) {
                moveImage(xStart, yStart, listPostion51[i].x, listPostion51[i].y);
                xStart = listPostion51[i].x;
                yStart = listPostion51[i].y;
            }
        } else {
            for (var i = 0, sz = listPostion52.length; i < sz; i++) {
                moveImage(xStart, yStart, listPostion52[i].x, listPostion52[i].y);
                xStart = listPostion52[i].x;
                yStart = listPostion52[i].y;
            }
        }
    }
}

function createGameLevel() {
    if (numberPiece == 3) {
        createGameEasy();
    } else if (numberPiece == 4) {
        createGameNormal();
    } else {
        createGameHard();
    }
}

function checkEndGame() {
    var listGame = $("#number" + numberPiece + " div[class=divGame]");
    for (var i = 0, sz = listGame.length; i < sz; i++) {
        if ($(listGame[i]).attr("id") != ("div" + (i + 1))) {
            return false;
        }
    }

    return true;
}

function endGame() {
    if (checkEndGame()) {
        document.removeEventListener('keyup', setEventButtonUp, false);
        removeEventButtonMove();  

        $("#number" + numberPiece).fadeOut("slow", function () {
            $("#divImage").fadeIn("slow");
        });
    }
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) 
            check = true;
        })(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};