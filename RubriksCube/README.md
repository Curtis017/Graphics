## Rubrik's Cube Project
I am attempting to implement a rubrik's cube using Three.js (a WebGL wrapper).
View current implementation [here](http://curtis017.github.io.).

## Current Functionality
Cube is completely moveable on each axis. It is also rotatable and resizable.

Change Axis - Key 'd'
Switch Rotation Direction - Key 's'
Change Camera Angle - Click and Drag
Reset Camera Angle - Key 'r'
Zoom In/Out - Scroll

## Code Layout
Currently all my Three.js JavaScript code is placed within MyUtils.js.
The jQuery used for even handling and document load is within MyMods.js

## Dependencies
jQuery
Three.js (for rendering graphic content)
  - CanvasRenderer (for mobile usability)
  - Projector (for mouse position and detecting cube intersections)
  - OrbitControls (for zooming and object rotation)
