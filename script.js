let mapArray = [
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,1,1,0,0,0,0,
    0,0,0,1,1,1,1,0,0,0,
    0,0,1,1,1,1,1,1,0,0,
    0,1,1,1,1,1,1,1,1,0,
    1,1,1,1,1,1,1,1,1,1
  ];

let screen = document.querySelector(".screen");
let buttonTable = document.querySelector(".buttonTable");
let margin = 0;
let topMargin = 0;
let holding = false;

function returnButton(state, index){
    return `<input type="button" value="${state}" class="mapButton" id="${index}" style="margin-left: ${margin}px; margin-top: ${topMargin}px">`;
}

function renderMap(){
    screen.innerHTML = "";
    mapArray.map((e, index) => {
        if(index%10 == 0){
            margin = 0;
            topMargin += 50;
        }
        if(e == 1){
            screen.innerHTML += `<div class="box" style="margin-left: ${margin}px; margin-top: ${topMargin}px;"><div class="side left"></div><div class="side right"></div><div class="side top"></div><div class="side back"></div><div class="side bottom"></div><div class="side left"></div><div class="side front"></div></div>`
            margin += 50;
        }
        else if(e == 0){
            screen.innerHTML += `<div class="space" style="margin-left: ${margin}px; margin-top: ${topMargin}px;"></div>`
            margin += 50;
        }
    })
    margin = 0;
    topMargin = 0;
}

function renderButton(){
    buttonTable.innerHTML = "";
    mapArray.map((e, index) => {
        if(index%10 == 0){
            margin = 0;
            topMargin += 50;
        }
        margin += 50;
        buttonTable.innerHTML += returnButton(e, index);
    })
    margin = 0;
    topMargin = 0;
}


const boxes = document.querySelectorAll(".buttonTable");

const boxPressed = e => {
  let boxId = parseInt(e.target.id);
  if(mapArray[boxId] == 0){
    mapArray[boxId] = 1;
  }
  else if(mapArray[boxId] == 1){
    mapArray[boxId] = 0;
  }
  renderButton();
  }
const mouseHold = e =>{
    if(!holding){
        return
    }
    let boxId = parseInt(e.target.id);
    if(mapArray[boxId] == 0){
      mapArray[boxId] = 1;
    }
    renderButton();
}
for (let box of boxes) {
  box.addEventListener("click", boxPressed)
  box.addEventListener("mouseover", mouseHold)
}

document.querySelector("html").addEventListener("mousedown", _=>{
    holding = true;
})
document.querySelector("html").addEventListener("mouseup", _=>{
    holding = false;
})

document.querySelector(".drawButton").addEventListener("click", _=>{
    renderMap();
    renderButton();
})

document.querySelector(".clearButton").addEventListener("click", _=>{
    mapArray = mapArray.map(() => 0);
    renderButton();
})
renderMap();
renderButton();