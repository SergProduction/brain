const d3 = require('d3');

let createMap = (x,y) => {
  let map = [];
  for (let ym=0; ym < y; ym++) {
    map.push([])
    for (let xm=0; xm < y; xm++) {
      map[ym].push(0)
    }
  }
  return map
}

let createCommet = (map) => {
  let yLen = map.length
  let xLen = map[0].length
  return (quantity) => {
    for(let i=0; i<quantity; i++){
      let x = Math.round( Math.random() * xLen)
      let y = Math.round( Math.random() * yLen)
      map[y][x] = 1
    }
  }
}

let createPlayer = (map) => {
  let yLen = map.length
  let xLen = map[0].length
  let x = Math.round( Math.random() * xLen)
  let y = Math.round( Math.random() * yLen)
  map[y][x] = 5
  return {x,y}
}


let movePlayer = (direct) => {
  /*
  [7,8,9]
  [4, ,6]
  [1,2,3]
  */
  if(!direct){
    direct = Math.round( Math.random() * 9 )
    direct = direct == 5 || direct == 0 ? 9 : direct
  }

  map[coordPlayer.y][coordPlayer.x] = 0
  switch(direct){
    case 8:
      coordPlayer.y-=1
      break
    case 9:
      coordPlayer.y-=1
      coordPlayer.x+=1
      break
    case 6:
      coordPlayer.x+=1
      break
    case 3:
      coordPlayer.y+=1
      coordPlayer.x+=1
      break
    case 2:
      coordPlayer.y+=1
      break
    case 1:
      coordPlayer.y+=1
      coordPlayer.x-=1
      break
    case 4:
      coordPlayer.x-=1
      break
    case 7:
      coordPlayer.y-=1
      coordPlayer.x-=1
      break
    default:
      console.log('tryPlayer')
      break
  }
  if( map[coordPlayer.y][coordPlayer.x] == 1 ){
    gameOver()
  }else{
    map[coordPlayer.y][coordPlayer.x] = 5
  }
  //return coordPlayer
}

function showRadiusMap(r) {
  if(!r) r = 2;
  let newMap = map.slice(coordPlayer.y-r, coordPlayer.y+r+1)
  for(let y=0; y<=r*2; y++){
    newMap[y] = newMap[y].slice(coordPlayer.x-r, coordPlayer.x+r+1)
  }
  return newMap
}


var svgContainer = d3.select("body")
                      .append("svg")
                      .attr("width", 500)
                      .attr("height", 500)
                      .style('border', '1px solid');

let createScen = (map, size) => {
  let yLen = map.length
  let xLen = map[0].length

  let cellAdd = (x,y, color) => {
    svgContainer
    .append("rect")
    .attr("fill", color)
    .attr("stroke", '#000')
    .attr("x", x)
    .attr("y", y)
    .attr("width", size)
    .attr("height", size);
  }

  return () => {
    for(let ym=0; ym<yLen; ym++){
      for(let xm=0; xm<xLen; xm++){
        switch(map[ym][xm]){
          case 0:
            cellAdd(size*xm, size*ym, '#ddd')
          break
          case 1:
            cellAdd(size*xm, size*ym, '#f88')
          break
          case 5:
            cellAdd(size*xm, size*ym, '#555')
          break
          default:
            console.log('tryRender', map[ym][xm])
          break
        }
      }
    }
  }
}



let gameOver = () => {
  d3.select('body')
    .insert('h1', ':first-child')
    .text('gameOver');

  clearInterval(play)
}



let map = createMap(20,20)

createCommet(map)(30)

coordPlayer = createPlayer(map)

let view = showRadiusMap(3)

let render = createScen(map, 25)

let play;

let start = () => {
  d3.select('h1').text('');
  
  play = setInterval(() => {
    movePlayer()
    render()
    console.log('tic')
  }, 1000)
}

setTimeout(() => {
  clearInterval(play)
},30*1000)

d3.select('body')
  .append('button')
  .text('start')
  .on('click', start)

d3.select('body')
  .append('button')
  .text('stop')
  .on('click', ()=> clearInterval(play) )

console.log(map)




let Brain = () => {
  let memmory = []
  
  let input = () => {
    //arguments
  }
  let action = () => {
    //arguments
  }
  return {
    input,
    action
  }
}

let jarvis = Brain()


jarvis.input( showRadiusMap(3) )
jarvis.action(movePlayer, render)

