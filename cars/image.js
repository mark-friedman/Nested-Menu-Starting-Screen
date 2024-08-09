//------------------------------
// Installed Extensions
// Code stops when it finds an error DURING RUNNING THAT SECTION OF CODE
"use strict";
//#region === Global const and let
const gcCanvas = document.getElementById('canvas');
  gcCanvas.width = 600;
  gcCanvas.height = 300;

const gcContext = gcCanvas.getContext('2d');

const gcBackgroundImage = new Image();
const gcBackgroundWidth = gcCanvas.width;
let glBackgroundHeight;

const gcCarImage = new Image();
const gcCarImageWidth = 40;
const gcCarImageHeight = 100;
let glCarTopLeftX;
let glCarTopLeftY;

let glDegrees = 0;
let glSpecifiedDegrees = '';
let glDistanceIncrement = 10;
let glSpecifiedDistanceIncrement = '';
let glArrowFlag = false;
let glTimeoutIsOccuringFlag = false;
//#endregion === Global const and let
//------------------------------
//++++++++++++++++++++++++++++++
//------------------------------
//#region === document.addEventListener('DOMContentLoaded'
document.addEventListener('DOMContentLoaded', (ev) =>
  // --- The 'DOMContentLoaded' event fires when the HTML document has been completely parsed, and
  // ---  all deferred scripts (<script defer src="…"> and <script type="module">) have downloaded
  // ---  and executed. It doesn't wait for other things like images, subframes, and async scripts
  // ---  to finish loading.
  {
    gcBackgroundImage.onload = function ()
    {
      gcCarImage.onload = function ()
      {
        const cAspectRatio = gcBackgroundImage.naturalWidth / gcBackgroundImage.naturalHeight;
        glBackgroundHeight = gcCanvas.height = gcBackgroundWidth / cAspectRatio;
        gcContext.drawImage(gcBackgroundImage, 0, 0, gcBackgroundWidth, glBackgroundHeight);
        glCarTopLeftX = gcBackgroundWidth / 2 - gcCarImageWidth / 2;
        glCarTopLeftY = glBackgroundHeight / 2 - gcCarImageHeight / 2;
        gcContext.drawImage(gcCarImage, glCarTopLeftX, glCarTopLeftY, gcCarImageWidth, gcCarImageHeight);
      }
      gcCarImage.src = "cars/Car.jpg";
    }
    gcBackgroundImage.src = "cars/Streets.jpg";
  }
)//document.addEventListener('DOMContentLoaded'
//#endregion === document.addEventListener('DOMContentLoaded'
//------------------------------
//++++++++++++++++++++++++++++++
document.addEventListener("click", e =>
  {
    switch(e.key) {
    default:
      let x = 0;
    }
  }
);
//------------------------------
//#region === document.addEventListener('keydown'
document.body.addEventListener("keydown", e =>
  // --- The "keydown" event fires for all keybpoard entries.
  {
    let lCarCenterX;
    let lCarCenterY;
    let lSignX = 0;
    let lSignY = 0;
    e.preventDefault();
    if(glTimeoutIsOccuringFlag === false) {
      switch(e.key) {
        //#region --- default
         default:
          break;
        //#endregion --- default
        //#region --- enter = Set a specified distance movement
        case 'Enter':
          glDistanceIncrement = glSpecifiedDistanceIncrement;
          glSpecifiedDistanceIncrement = '';
          glSpecifiedDegrees = '';
          break;
        //#endregion --- enter = Set a specified distance movement
        //#region --- r = Rotate the specified degrees
        case 'r':
          fRotate();
          // fRotate when finished will reset:
              glSpecifiedDistanceIncrement = '';
              glSpecifiedDegrees = '';
          break;
        //#endregion --- r = Rotate the specified degrees
        //#region --- s = Spin 360 degrees
        case 's':
          fSpinCar360Deg();
          break;
        //#endregion --- s = Spin 360 degrees
        //#region --- f = Move forward to edge
        case 'f':
          fMoveForwardToEdge();
          break;
        //#endregion --- f = Move forward to edge
        //#region --- b = Move backward to edge
        case 'b':
          fMoveBackwardToEdge();
          break;
        //#endregion --- b = Move backward to edge
        //#region --- ArrowUp = Move forward the specified distance
        case 'ArrowUp':
          lSignX = 0;
          lSignY = -1;
          fSinCosArrowMovement(lSignX, lSignY);
          break;
        //#endregion  --- ArrowUp = Move forward the specified distance
        //#region --- ArrowDown = Move backward the specified distance
        case 'ArrowDown':
          lSignX = 0;
          lSignY = 1;
          fSinCosArrowMovement(lSignX, lSignY);
          break;
        //#endregion --- ArrowDown = Move backward the specified distance
        //#region --- ArrowLeft = Move left the specified distance
        case 'ArrowLeft':
          lSignX = -1;
          lSignY = 0;
          fSinCosArrowMovement(lSignX, lSignY);
          break;
        //#endregion --- ArrowLeft = Move left the specified distance
        //#region --- ArrowRight = Move right the specified distance
        case 'ArrowRight':
          lSignX = 1;
          lSignY = 0;
          fSinCosArrowMovement(lSignX, lSignY);
          break;
        //#endregion --- ArrowRight = Move right the specified distance
        //#region --- -, 1, 2, ... 9 = Set specified angle in degrees --- or --- Set specified distance increment
        case '-':
          glSpecifiedDegrees = '-';
          glSpecifiedDistanceIncrement = '-';
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if(glSpecifiedDistanceIncrement < 1) {
            glSpecifiedDistanceIncrement = '';
          }
          glSpecifiedDistanceIncrement += e.key;
          // if(glSpecifiedDistanceIncrement < )
          //---
          if(glSpecifiedDegrees === 0) {
            glSpecifiedDegrees = '';
          }
          glSpecifiedDegrees += e.key;
          let lAbs = Math.abs(glSpecifiedDegrees)
          if(lAbs >= 360) {
            glSpecifiedDegrees = e.key;
          }
          else if(lAbs === 360) {
            glSpecifiedDegrees = 0;
          }
          break;
        //#endregion --- -, 1, 2, ... 9 = Set specified angle in degrees --- or --- Set specified distance increment
      }// --- switch(e.key)
    }// --- if(glTimeoutIsOccuringFlag
  }// --- =>
)// --- document.body.addEventListener("keydown"
//#endregion === document.addEventListener('DOMContentLoaded'
//------------------------------
//++++++++++++++++++++++++++++++
//------------------------------
//#region === Functions
//------------------------------
function fMoveForwardToEdge()
{
  let lStartAndStopTimeoutID;
  let lCarCenterX = glCarTopLeftX + gcCarImageWidth / 2;
  let lCarCenterY = glCarTopLeftY + gcCarImageHeight / 2;
  let lForward = () => {
    fMove(lCarCenterX, lCarCenterY, glDegrees);
    glTimeoutIsOccuringFlag = true;
    if(glCarTopLeftY > 0) {
      glCarTopLeftY -= 2;
      lCarCenterY = glCarTopLeftY + gcCarImageHeight / 2;
      lStartAndStopTimeoutID = setTimeout(lForward, 10);
    }
    else {
      clearTimeout(lStartAndStopTimeoutID);
      glTimeoutIsOccuringFlag = false;
    }
  };
  lForward();
}// --- fMoveForwardToEdge
//------------------------------
//------------------------------
function fMoveBackwardToEdge()
{
  let lStartAndStopTimeoutID;
  let lCarCenterX = glCarTopLeftX + gcCarImageWidth / 2;
  let lCarCenterY = glCarTopLeftY + gcCarImageHeight / 2;
  let lBackwards = () => {
    fMove(lCarCenterX, lCarCenterY, glDegrees);
    let lCarBottomLeftY = glCarTopLeftY + gcCarImageHeight;
    glTimeoutIsOccuringFlag = true;
    if(lCarBottomLeftY < glBackgroundHeight) {
      glCarTopLeftY += 2;
      lCarCenterY = glCarTopLeftY + gcCarImageHeight / 2;
      lStartAndStopTimeoutID = setTimeout(lBackwards, 10);
    }
    else {
      clearTimeout(lStartAndStopTimeoutID);
      glTimeoutIsOccuringFlag = false;
    }
  };
  lBackwards();
}// --- fMoveBackwardToEdge
//------------------------------
//------------------------------
function fSpinCar360Deg()
{
  let lStartAndStopTimeoutID;
  let lCarCenterX = glCarTopLeftX + gcCarImageWidth / 2;
  let lCarCenterY = glCarTopLeftY + gcCarImageHeight / 2;
  glDegrees = 0;
  glTimeoutIsOccuringFlag = true;
  let lRotate = () => {
    fMove(lCarCenterX, lCarCenterY, glDegrees);
    if(glDegrees < 360) {
      glDegrees += 1;
      lStartAndStopTimeoutID = setTimeout(lRotate, 10);
    }
    else {
      clearTimeout(lStartAndStopTimeoutID);
      glTimeoutIsOccuringFlag = false;
    }
  };
  lRotate();
}// --- fSpinCar360Deg
//------------------------------
//------------------------------
function fSinCosArrowMovement(lSignX, lSignY)
{
  let lRadians = Math.PI / 180 * glDegrees;
  let lAngleSin = Math.sin(lRadians);
  let lAngleCos = Math.cos(lRadians);
  let lDistanceX;
  let lDistanceY;
  if(lSignX === 0 && lSignY === -1) {
    // --- Arrow forward
    lDistanceX = lAngleSin * glDistanceIncrement;
    lDistanceY = -lAngleCos * glDistanceIncrement;
    glCarTopLeftX += lDistanceX;
    glCarTopLeftY += lDistanceY;
  }
  else if(lSignX === 0 && lSignY === 1) {
    // --- Arrow backward
    lDistanceX = -lAngleSin * glDistanceIncrement;
    lDistanceY = lAngleCos * glDistanceIncrement;
    glCarTopLeftX += lDistanceX;
    glCarTopLeftY += lDistanceY;
  }
  else if(lSignX === 1 && lSignY === 0) {
    // --- Arrow right
    lDistanceX = lAngleCos * glDistanceIncrement;
    lDistanceY = lAngleSin * glDistanceIncrement;
    glCarTopLeftX += lDistanceX;
    glCarTopLeftY += lDistanceY;
  }
  else if(lSignX === -1 && lSignY === 0) {
    // --- Arrow left
    lDistanceX = -lAngleCos * glDistanceIncrement;
    lDistanceY = -lAngleSin * glDistanceIncrement;
    glCarTopLeftX += lDistanceX;
    glCarTopLeftY += lDistanceY;
  }
  let lCarCenterX = glCarTopLeftX + gcCarImageWidth / 2;
  let lCarCenterY = glCarTopLeftY + gcCarImageHeight / 2;
  fMove(lCarCenterX, lCarCenterY, glDegrees);
}// --- fSinCosArrowMovement
//------------------------------
//------------------------------
function fRotate()
{
  let lCarCenterX = glCarTopLeftX + gcCarImageWidth / 2;
  let lCarCenterY = glCarTopLeftY + gcCarImageHeight / 2;
  let lStartAndStopTimeoutID;
  if(glDegrees < glSpecifiedDegrees){
    glTimeoutIsOccuringFlag = true;
    let lRotateRight = () => {
      fMove(lCarCenterX, lCarCenterY, glDegrees);
      if(glDegrees < glSpecifiedDegrees) {
        glDegrees += 1;
        lStartAndStopTimeoutID = setTimeout(lRotateRight, 10);
      }
      else {
        clearTimeout(lStartAndStopTimeoutID);
        glTimeoutIsOccuringFlag = false;
        glSpecifiedDegrees = '';
        glSpecifiedDistanceIncrement = '';
      }
    };
    lRotateRight();
  }
  else if(glDegrees > glSpecifiedDegrees){
    glTimeoutIsOccuringFlag = true;
    let lRotateLeft = () => {
      fMove(lCarCenterX, lCarCenterY, glDegrees);
      if(glDegrees > glSpecifiedDegrees) {
        glDegrees -= 1;
        lStartAndStopTimeoutID = setTimeout(lRotateLeft, 10);
      }
      else {
        clearTimeout(lStartAndStopTimeoutID);
        glTimeoutIsOccuringFlag = false;
        glSpecifiedDegrees = '';
        glSpecifiedDistanceIncrement = '';
      }
    };
    lRotateLeft();
  }
  else {
    glSpecifiedDegrees = '';
    glSpecifiedDistanceIncrement = '';
  }
}// --- fRotate
//------------------------------
//------------------------------
function fMove(lCarCenterX, lCarCenterY, glDegrees)
{
  gcContext.clearRect(0, 0, gcCanvas.width, gcCanvas.height);
  gcContext.drawImage(gcBackgroundImage, 0, 0, gcBackgroundWidth, glBackgroundHeight);
  let lRadians = Math.PI / 180 * glDegrees;
  gcContext.translate(lCarCenterX, lCarCenterY);
  gcContext.rotate(lRadians);
  gcContext.drawImage(gcCarImage, -gcCarImageWidth / 2, -gcCarImageHeight / 2, gcCarImageWidth, gcCarImageHeight);
  gcContext.rotate(-lRadians);
  gcContext.translate(-lCarCenterX, -lCarCenterY);
}// --- fMove
//------------------------------
//#endregion === Functions
//------------------------------
//++++++++++++++++++++++++++++++
//------------------------------
//------------------------------
//------------------------------


