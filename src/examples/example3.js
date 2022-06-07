/**
 * 几何体
 */

 import * as THREE from 'three'
 import { OrbitControls } from '@three-ts/orbit-controls';
//  创建场景对象
const scene = new THREE.Scene();
//  创建网格模型
//长方体 参数：长，宽，高
// const geometry = new THREE.BoxGeometry(100, 100, 100);

// 球体 参数：半径60  经纬度细分数40,40
// var geometry = new THREE.SphereGeometry(60, 40, 40);

// 圆柱  参数：圆柱面顶部、底部直径50,50   高度100  圆周分段数
// var geometry = new THREE.CylinderGeometry( 50, 50, 100, 25 );

// 正八面体
// var geometry = new THREE.OctahedronGeometry(50);

// 正十二面体
// var geometry = new THREE.DodecahedronGeometry(50);

// 正二十面体
var geometry = new THREE.IcosahedronGeometry(50);
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

function render(){
  renderer.render(scene, camera);
}
render()
const controls = new OrbitControls(camera, renderer.domElement);  //  创建控制对象
controls.addEventListener('change', render);

// 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
var axesHelper  = new THREE.AxesHelper(200);
scene.add(axesHelper );