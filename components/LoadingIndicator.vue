<template>
    <span class="flower">Loading...</span>
  </template>
  

  
  <style scoped>
@keyframes flower {
  0% {
    transform: rotateZ(0deg);
    box-shadow: 
      white 0 0 15px 0,
      rgb(46, 16, 101) -12px -12px 0 4px,
      rgb(46, 16, 101) 12px -12px 0 4px,
      rgb(46, 16, 101) 12px 12px 0 4px,
      rgb(46, 16, 101) -12px 12px 0 4px;
  }
  50% {
    transform: rotateZ(1080deg);
    box-shadow: 
      white 0 0 15px 0,
      rgb(46, 16, 101) 12px 12px 0 4px,
      rgb(46, 16, 101) -12px 12px 0 4px,
      rgb(46, 16, 101) -12px -12px 0 4px,
      rgb(46, 16, 101) 12px -12px 0 4px;
  }
}

body {
  text-align: center;
  padding: 50px;
}

.flower {
  font-family: sans-serif;
  font-weight: 100;
}

.flower:not(:required) {
  overflow: hidden;
  position: relative;
  text-indent: -9999px;
  display: inline-block;
  width: 16px;
  height: 16px;
  background: rgb(46, 16, 101);
  border-radius: 100%;
  box-shadow: 
    white 0 0 15px 0,
    rgb(46, 16, 101) -12px -12px 0 4px,
    rgb(46, 16, 101) 12px -12px 0 4px,
    rgb(46, 16, 101) 12px 12px 0 4px,
    rgb(46, 16, 101) -12px 12px 0 4px;
  animation: flower 5s infinite ease-in-out;
  transform-origin: 50% 50%;
}
  </style>