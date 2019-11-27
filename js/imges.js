window.onload=function(){
    let imgAll = document.getElementsByTagName('img')
    let imgAllLength = imgAll.length
    let deg = 360/imgAllLength
    let warp = document.getElementsByClassName('warp')[0]
    let startx = 0
    let starty = 0
    let x = 0
    let y = 0
    let endx = 0
    let endy = 0
    var w = window.innerWidth;//获取浏览器宽

    //warp.style.transform =`rotateX(${x}deg) rotateY(${y}deg)`
   // console.log(deg);
    Array.prototype.forEach.call(imgAll,function (ele,index) {
        ele.style.transform = `rotateY(${deg*index}deg) translateZ(${350}px)`
        ele.style.transition =`${1}s ${(imgAllLength-index)*0.1}s`
    })
 //PC端
    if (w>=780){
        document.onmousedown = function (e) {

            startx = e.pageX*0.1
            starty = e.pageY*0.1


            console.log(startx + '**' + starty);
            document.onmousemove = function (e) {

                let overx = e.pageX*0.1
                let overy = e.pageY*0.1
                endx = overx - startx
                endy = -(overy - starty)
                x = endx + x
                y = endy + y
                warp.style.transform =`rotateY(${x}deg) rotateX(${y}deg)`

            }
            document.onmouseup = function () {
                //warp.style.transform =`rotateY(${x}deg) rotateX(${y}deg)`
                document.onmousemove = null

                // console.log('松开了');
            }
        }
    }else {
        //移动端
        document.ontouchstart = function (e) {
            startx = e.pageX*0.1
            starty = e.pageY*0.1
            document.ontouchmove = function (e) {
                let overx = e.pageX*0.1
                let overy = e.pageY*0.1
                endx = overx - startx
                endy = -(overy - starty)
                x = endx + x
                y = endy + y
                warp.style.transform =`rotateY(${x}deg) rotateX(${y}deg)`
            }
            document.ontouchend = function () {
                document.onmousemove = null
            }
        }

    }

}

