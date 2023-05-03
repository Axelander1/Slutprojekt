import * as THREE from "https://unpkg.com/three@v0.152.2/build/three.module.js";

import { OrbitControls } from 'https://unpkg.com/three@v0.152.2/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#rotating-globe"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth*0.45, 330);
renderer.setClearColor( 0xffffff, 0);
camera.position.setZ(30);

renderer.render(scene, camera)

const earthTexture = new THREE.TextureLoader().load("Images/ChimpanzeeMap.png")

const geometry = new THREE.SphereGeometry(50, 64, 64)
const material = new THREE.MeshBasicMaterial( {map: earthTexture})
const globe = new THREE.Mesh(geometry, material);



scene.add(globe)

const pointLight = new THREE.PointLight(0xfffff)
pointLight.position.set(10000, 50, 100)

scene.add(pointLight)

const controls = new OrbitControls(camera, renderer.domElement);
controls.maxDistance = 300;
controls.minDistance = 70;
controls.enablePan = false;

let mouseDown = false;
renderer.domElement.addEventListener('mousedown', () => {
  mouseDown = true;
});

renderer.domElement.addEventListener('mouseup', () => {
  mouseDown = false;
});


function animate() {
    requestAnimationFrame (animate);
    if (!mouseDown) {
        globe.rotation.y += 0.005
    }
    


    controls.update();
    
    renderer.render(scene, camera);
}

animate()