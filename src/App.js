import { useEffect } from 'react';
import './App.css';
import * as THREE from 'three';
import { useRef } from 'react';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

const App = ()=>{

  const canvasRef = useRef(null);

    useEffect(()=>{

      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0.5 ,0.5 , 0.5)
      const camera = new THREE.PerspectiveCamera(75 , window.innerWidth/window.innerHeight , 0.5 , 1000)
      const renderer = new THREE.WebGLRenderer()

      renderer.setSize(window.innerWidth , window.innerHeight)

      const ambitionLight = new THREE.AmbientLight(0xffffff , 0.1)
      scene.add(ambitionLight)

      const pointLight = new THREE.PointLight(0xffffff ,1 , 100)
      // pointLight.position.set(6 , 0 , 3)
      scene.add(pointLight)

      const geometry = new THREE.BoxGeometry( 5, 5, 5 );
      const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
      const cube = new THREE.Mesh( geometry, material );
      scene.add( cube );

      const lightGeometry = new THREE.SphereGeometry( 1, 32, 15 );
      const lightMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
      const lightSphere = new THREE.Mesh( lightGeometry, lightMaterial );
      scene.add( lightSphere );
      // lightSphere.position.set(6,0,3)

      document.getElementById("root").appendChild(renderer.domElement)

      camera.position.z = 50;

      let q=0

      const controls = new OrbitControls(camera , renderer.domElement)

function animate(){

  q+=0.01

  controls.update()

  let qsin = Math.sin(q)
  let qcos = Math.cos(q)

  cube.position.x = 3*qsin

  const sinScaler = 30*qsin
  const cosScaler = 30*qcos

  lightSphere.position.set(sinScaler , 0 , cosScaler)
  pointLight.position.set(sinScaler , 0 , cosScaler)

  cube.rotation.x+=0.01
  cube.rotation.y+=0.01
  cube.rotation.z+=0.01

  renderer.render(scene , camera)
  requestAnimationFrame(animate)
}

   animate();
    },[])

    return <canvas ref={canvasRef} />;
}

export default App;

// app.js
// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// const App = () => {

//   const canvasRef = useRef(null);

//   useEffect(() => {
//     // Set up Three.js scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
//     renderer.setSize(window.innerWidth, window.innerHeight);

//     // Add objects and lights to the scene here

//     // Load a 3D model using GLTFLoader
//     const loader = new GLTFLoader();
//     loader.load('path/to/model.gltf', (gltf) => {
//       // The 3D model is loaded successfully, and you can add it to the scene
//       scene.add(gltf.scene);
//     });

//     // Add animation logic here

//     // Render the scene
//     const animate = () => {
//       requestAnimationFrame(animate);
//       // Update objects' positions and animations here
//       renderer.render(scene, camera);
//     };
//     animate();

//     // Clean up Three.js objects when the component unmounts
//     return () => {
//       // Clean up scene, camera, and other Three.js objects
//       // to prevent memory leaks
//     };
//   }, []);

//   return <canvas ref={canvasRef} />;
// };

// export default App;
