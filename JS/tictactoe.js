window.onload = function() {watch()};
function watch() {
    var btn = document.getElementById("btnStop");
    btnDisabled(btn);
}


function rollForTurn() {
    var xArray = [];
    var ranNum = "";
    var minimum = 1;
    var maximum = 11;
    var first = "";
    var txt1 = "";
    for (var i=0; i<2; i++) {
        //GET RANDOM NUMBER
        ranNum = Math.floor(Math.random() * (maximum - minimum) + minimum);
        xArray.push(ranNum);
    }
    diceRoll(); //DICEROLL SOUND

    for (i=0; i<xArray.length; i++) {
        var result = i + 1;
        var pOne = xArray[0];
        var pTwo = xArray[1];
        if (pOne = pTwo) {
            pOne = 1;
            pTwo = 2;
        }
        txt1 = "Player 1 roller ["+pOne+"]<br>";
        writeMsg(txt1);
        txt1 = txt1 + "Player 2 rolled ["+pTwo+"]<br><br>";
        setTimeout(function() {writeMsg(txt1);}, 1000);
    }
    if (pOne > pTwo) {
        first = "Player 1";
        setTimeout(function() {txt1 = txt1 + "Player 1 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    }
    else if (pOne < pTwo) {
        first = "Player 2";
        setTimeout(function() {txt1 = txt1 + "Player 2 wins, please choose a square.";}, 2000);
        setTimeout(function() {writeMsg(txt1);}, 2000);
    }
    //PLAYER THAT WON ROLL
    return first;
}   


// INITIATE THE GAME, ROLL FOR TURN 
function startGame() {
      activePlayer = rollForTurn();
      if (activePlayer == "") {
          avtivePlayer = rollForTurn();
      }
      setTimeout(function() {hideGameMsg();}, 4000);

      var btn = document.getElementById("btnStart");
      btnDisabled(btn);
      var btn = document.getElementById("btnStop");
      stopEnabled(btn);

      var showPlayer = document.getElementById("showPlayer");
      showPlayer.innerHTML = activePlayer;
      showPlayer.style.color = "green";
}

function btnDisabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(153, 153, 102)";
    btn.style.backgrounudColor = "rgb(214, 214, 194)";
    btn.disabled = true;
}

function stopEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(204, 0, 0)";
    btn.style.backgrounudColor = "rgb(255, 51, 51)";
    btn.disabled = flase;
}

function startEnabled(btn) {
    btn.style.color = "#fff";
    btn.style.border = "2px solid rgb(0, 153, 0)";
    btn.style.backgrounudColor = "rgb(57, 230, 0)";
    btn.disabled = flase;
}

function stopGame() {
    hideGameMsg();
    var btn = document.getElementById("btnStart");
    startEnabled(btn);
    var btn = document.getElementById("btnStop");
    btnDisabled(btn);
    var showPlayer = document.getElementById("showPlayer")
    showPlayer.innerHTML = "Game Stopped";
    showPlayer.style.color = "red";

    var arrayO = document.getElementsByClassName("O");
    var arrayX = document.getElementsByClassName("X");
    for (var i=0; i<arrayO.length; i++) {
        array[i].style.transform = "translateY(-100%)";
    }
    for (var i = 0; i<arrayX.length; i++) {
        array[i]. style.transform = "translateY(100%)"
    }

    document.getElementById("boardState").innerHTML = "";
}

function showGameMsg() {
    document.getElementById("gameMsgBox").style.display = "block";
}

function hideGameMsg() {
    clearMsg();
    document.getElementById("gameMsgBox").style.display = "none";
}

function writeMsg(txt) {
    showGameMsg();
    document.getElementById("gameMsg").innerHTML = txt;
}

function clearMsg() {
    document.getElementById("gameMsg").innerHTML = "";
}

function saveSettings() {
    var p1Index = document.getElementById("player1").selectedIndex;
    var p1Selected = document.getElementById("player1").options;
    var p2Index = document.getElementById("player2").selectedIndex;
    var p2Selected = document.getElementById("player2").options;
    if (p1Selected[p1Index].text == p2Selected[p2Index].text) {
        alert("Error - Player 1 and Player 2 cannot both ve assigned as: "+p1Selected[p2Index].text);
    }
    else {
        document.getElementById("p1Display").innerHTML = p1Selected[p1Index].text;
        document.getElementById("p2Display").innerHTML = p2Selected[p2Index].text;
    }
}

function getAvatars() {
    var p1Avatar = document.getElementById("p1Display").innerHTML;
    var p2Avatar = document.getElementById("p2Display").innerHTML;
    var avatarArray = [p1Avatar, p2Avatar];
    return avatarArray;
}

function determineAvatar() {
    var avatarArray = getAvatars();
    var active = document.getElementById("showPlayer").innerHTML;
    p1Avatar = avatarArray[0];
    p2Avatar = avatarArray[1];
    if (active == "Player 1") {
        var paintAvatar = p1Avatar;
    }
    else if (active == "Player 2") {
        var paintAvatar = p2Avatar;
    }
    return paintAvatar;
}

function avatarPlaced() {
    var parseText = document.getElementById("gameMsg").innerHTML;
    var showPlayer = document.getElementById("showPlayer");
    //CHECK FOR WINNER
    if (parseText == "That's three in a row, Player 1 wins!" || parseText == "That's three in a row, Player 2 wins!") {
        showPlayer.innerHTML = "Game Stopped";
        showPlayer.style.color = "red";
    }
    activePlayer = showPlayer.innerHTML;
    if (avtivePlayer == "Player 1") {
        showPlayer.innerHTML = "Player 2";
    }
    else {
        showPlayer.innerHTML = "Player 1"
    }
    check4Tie();
}

function check(info,square) {
    for (var i in info) {
        var tempInfo = info[i].charAt(0);
        if (tempInfo == square) {
            return tempInfo;
        }
    }
}

function recordMoves(square) {
    var proposedMove = square;
    var boardState = document.getElementById("boardState").innerHTML;
    var info = boardState.split(",");
    verdict = check(info,square);
    return verdict;
}

function recordMove (currentMove) {
    var target = document.getElementById("boardState");
    var previousMoves = target.innerHTML;
    target.innerHTML = previousMoves+currentMove;
}

function checkForWinCon() {
    var sqaureArray = [];
    var target = document.getElementById("boardState");
    var info = target.innerHTML;
    info = info.substring(1);
    info = info.split(",");
    info.sort();
    for (var i in info) {
        sqaureArray.push(info[i].charAt(0));
    }
    checkWinCon1(info.sqaureArray);
    checkWinCon2(info.sqaureArray);
    checkWinCon3(info.sqaureArray);
    checkWinCon4(info.sqaureArray);
    checkWinCon5(info.sqaureArray);
    checkWinCon6(info.sqaureArray);
    checkWinCon7(info.sqaureArray);
    checkWinCon8(info.sqaureArray);

    check4Tie();
}

function check4Tie() {
    var boardState = document.getElementById("boardState").innerHTML;
    boardState = boardState.substring(1);
    boardState = boardState.split(",");
    var check = document.getElementById("gameMsg").innerHTML;
    if (boardState.length >= 9 && check != "That's three in a row, Player 1 wins!" && check != "That's three in a row, Player 2 wins!") {
        var txt1 = "Oh no! Nobody wins, it was a tie!";
        tieSound();
        writeMsg(txt1);
        setTimeout(function() {stopGame();}, 3000);
    }
}

//------------------------------------------------------------
//                      CHECK FOR WIN 
//------------------------------------------------------------

// 012
function checkWinCon1(info,sqaureArray) {
    var winDetected = "on";
    var winCon1 = [0, 1, 2];

    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "1") {
            var match1Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1);
        }
    }

    if (match0Avatar != undefined && match1Avatar != undefined && match2Avatar != undefined) {
        if (match0Avatar == match1Avatar && match0Avatar == match2Avatar) {
            winDetected = "win";
            winner(winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1);
}

//345
function checkWinCon1(info,sqaureArray) {
    var winDetected = "on";
    var winCon1 = [3, 4, 5];

    for (var i in info) {
        if (info[i].charAt(0) == "3") {
            var match3Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "5") {
            var match5Avatar = info[i].charAt(1);
        }
    }

    if (match3Avatar != undefined && match4Avatar != undefined && match5Avatar != undefined) {
        if (match3Avatar == match4Avatar && match3Avatar == match5Avatar) {
            winDetected = "win";
            winner(winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1);
}

//678
function checkWinCon1(info,sqaureArray) {
    var winDetected = "on";
    var winCon1 = [6, 7, 8];

    for (var i in info) {
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "7") {
            var match7Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }

    if (match6Avatar != undefined && match7Avatar != undefined && match8Avatar != undefined) {
        if (match6Avatar == match7Avatar && match6Avatar == match8Avatar) {
            winDetected = "win";
            winner(winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1);
}

//036
function checkWinCon1(info,sqaureArray) {
    var winDetected = "on";
    var winCon1 = [0, 3, 6];

    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "3") {
            var match3Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1);
        }
    }

    if (match0Avatar != undefined && match3Avatar != undefined && match6Avatar != undefined) {
        if (match0Avatar == match3Avatar && match0Avatar == match6Avatar) {
            winDetected = "win";
            winner(winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1);
}

//147
function checkWinCon1(info,sqaureArray) {
    var winDetected = "on";
    var winCon1 = [1, 4, 7];

    for (var i in info) {
        if (info[i].charAt(0) == "1") {
            var match1Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "7") {
            var match7Avatar = info[i].charAt(1);
        }
    }

    if (match1Avatar != undefined && match4Avatar != undefined && match7Avatar != undefined) {
        if (match1Avatar == match4Avatar && match1Avatar == match7Avatar) {
            winDetected = "win";
            winner(winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1);
}

//258
function checkWinCon1(info,sqaureArray) {
    var winDetected = "on";
    var winCon1 = [2, 5, 8];

    for (var i in info) {
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "5") {
            var match5Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }

    if (match2Avatar != undefined && match5Avatar != undefined && match8Avatar != undefined) {
        if (match2Avatar == match5Avatar && match2Avatar == match8Avatar) {
            winDetected = "win";
            winner(winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1);
}

//048
function checkWinCon1(info,sqaureArray) {
    var winDetected = "on";
    var winCon1 = [0, 4, 8];

    for (var i in info) {
        if (info[i].charAt(0) == "0") {
            var match0Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "8") {
            var match8Avatar = info[i].charAt(1);
        }
    }

    if (match0Avatar != undefined && match4Avatar != undefined && match8Avatar != undefined) {
        if (match0Avatar == match4Avatar && match0Avatar == match8Avatar) {
            winDetected = "win";
            winner(winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1);
}

//246
function checkWinCon1(info,sqaureArray) {
    var winDetected = "on";
    var winCon1 = [2, 4, 6];

    for (var i in info) {
        if (info[i].charAt(0) == "2") {
            var match2Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "4") {
            var match4Avatar = info[i].charAt(1);
        }
        if (info[i].charAt(0) == "6") {
            var match6Avatar = info[i].charAt(1);
        }
    }

    if (match2Avatar != undefined && match4Avatar != undefined && match6Avatar != undefined) {
        if (match2Avatar == match4Avatar && match2Avatar == match6Avatar) {
            winDetected = "win";
            winner(winDetected,winCon1);
            return;
        }
    }
    winner(winDetected,winCon1);
}



//------------------------------------------------------------
//                      SQUARE ANIMATION
//------------------------------------------------------------



function square1Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "O";
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName("paintAvatar")[0];
            if (paintAvatar == "O") {
                animateO(selected);
            }
            else if (paintAvatar == "X") {
                animateX(selected);
            }
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square2Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "1";
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName("paintAvatar")[0];
            if (paintAvatar == "O") {
                animateO(selected);
            }
            else if (paintAvatar == "X") {
                animateX(selected);
            }
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square3Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "2";
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName("paintAvatar")[0];
            if (paintAvatar == "O") {
                animateO(selected);
            }
            else if (paintAvatar == "X") {
                animateX(selected);
            }
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square4Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "3";
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName("paintAvatar")[0];
            if (paintAvatar == "O") {
                animateO(selected);
            }
            else if (paintAvatar == "X") {
                animateX(selected);
            }
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square5Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "4";
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName("paintAvatar")[0];
            if (paintAvatar == "O") {
                animateO(selected);
            }
            else if (paintAvatar == "X") {
                animateX(selected);
            }
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square6Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "5";
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName("paintAvatar")[0];
            if (paintAvatar == "O") {
                animationEffect(selected);
            }
            else if (paintAvatar == "X") {
                animateX(selected);
            }
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square7Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "6";
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName("paintAvatar")[0];
            if (paintAvatar == "O") {
                animateO(selected);
            }
            else if (paintAvatar == "X") {
                animateX(selected);
            }
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square8Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "7";
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName("paintAvatar")[0];
            if (paintAvatar == "O") {
                animateO(selected);
            }
            else if (paintAvatar == "X") {
                animateX(selected);
            }
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}
function square9Animate() {
    var activePlayer = document.getElementById("showPlayer").innerHTML;
    if (activePlayer != "Game Stopped") {
        var square = "8";
        var verdict = recordMoves(square);
        if (verdict == undefined) {
            var paintAvatar = determineAvatar();
            var selected = document.getElementsByClassName("paintAvatar")[0];
            if (paintAvatar == "O") {
                animateO(selected);
            }
            else if (paintAvatar == "X") {
                animateX(selected);
            }
            var currentMove = ","+square+paintAvatar;
            recordMove(currentMove);
            checkForWinCon();
            avatarPlaced(square,paintAvatar);
            squareSound();
        }
    }
}

function animateO(selected) {
    selected.style.transform = (selected.style.transform == "translateY(-100%)" || null) ? "TranslateY(0)" : "translateY(-100%)";
}

function animateX(selected) {
    selected.style.transform = (selected.style.transform == "translateY(100%)" || null) ? "TranslateY(0)" : "translateY(100%)";
}