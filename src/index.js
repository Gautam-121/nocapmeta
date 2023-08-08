import React from "react"
import ReactDOM  from "react-dom/client"
import App from "./App"
import * as THREE from "three"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App/>)


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75 , window.innerWidth/window.innerHeight , 0.1 , 1000)
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth , window.innerHeight)
document.getElementById("root").appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry(1 ,1 , 1)
const material = new THREE.MeshBasicMaterial({color : "red"})
const cube = new THREE.Mesh(geometry , material)
scene.add(cube)

let flag = true

function animate(){
  cube.position.x+=0.1

  if(cube.position.x > 5){
    flag = false
  }
  else if(cube.position.x < -5){
    flag = true
  }

  if(flag)cube.position.x+=0.1
  else cube.position.x-=0.1

  cube.rotation.x+=0.01
  cube.rotation.y+=0.01
  cube.rotation.z+=0.01
  renderer.render(scene , camera)

  requestAnimationFrame(animate)
}

// animate()



