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
      let x = Math.floor( Math.random() * xLen)
      let y = Math.floor( Math.random() * yLen)
      map[y][x] = 1
    }
  }
}

let createPlayer = (map) => {
  let yLen = map.length
  let xLen = map[0].length
  let x = Math.floor( Math.random() * xLen)
  let y = Math.floor( Math.random() * yLen)
  map[y][x] = 5
  return {x,y}
}


let movePlayer = (coordPlayer, direct) => {
  /*
  [7,8,9]
  [4, ,6]
  [1,2,3]
  */
  if(!direct){
    direct = Math.floor( Math.random() * 9 )
    direct = direct == 5 || direct == 0 ? 9 : direct
  }

  map[coordPlayer.y][coordPlayer.x] = 0
  switch(direct){
    case 8:
      map[coordPlayer.y-=1][coordPlayer.x] = 5
      break
    case 9:
      map[coordPlayer.y-=1][coordPlayer.x+=1] = 5
      break
    case 6:
      map[coordPlayer.y][coordPlayer.x+=1] = 5
      break
    case 3:
      map[coordPlayer.y+=1][coordPlayer.x+=1] = 5
      break
    case 2:
      map[coordPlayer.y+=1][coordPlayer.x] = 5
      break
    case 1:
      map[coordPlayer.y+=1][coordPlayer.x-=1] = 5
      break
    case 4:
      map[coordPlayer.y][coordPlayer.x-=1] = 5
      break
    case 7:
      map[coordPlayer.y-=1][coordPlayer.x-=1] = 5
      break
    default:
      console.log('tryPlayer')
      break
  }
  return coordPlayer
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

let map = createMap(20,20)

createCommet(map)(30)

coordPlayer = createPlayer(map)

let render = createScen(map, 25)

const play = setInterval(() => {
  coordPlayer = movePlayer(coordPlayer)
  render()
  console.log('tic')
}, 1000)

setTimeout(() => {
  clearInterval(play)
},30*1000)

console.log(map)

let Brain = (){
  let memmory = []
  return () => {

  }
}

let serg = Brain()

