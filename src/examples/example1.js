/**
 * THREE体验
 */

 import * as THREE from 'three'
//  创建场景对象
const scene = new THREE.Scene();
//  创建网格模型
const geometry = new THREE.BoxGeometry(100,100,100);
const material = new THREE.MeshLambertMaterial({
  color: 0xff0000
});
//  网格模型对象
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//  点光源设置
const point = new THREE.PointLight(0xffffff);
point.position.set(300, 200, 400);
scene.add(point);
//  环境光
const ambient = new THREE.AmbientLight(0x444444);
scene.add(ambient);
//  相机设置
const width = window.innerWidth;
const height = window.innerHeight;
const k = width / height;
const s = 200;  //  三维场景的范围控制系数，系数越大，显示的范围越大
//  创建相机
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(scene.position);
//  创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.setClearColor(0xb9d3ff, 1);
document.body.appendChild(renderer.domElement);
renderer.render(scene, camera);