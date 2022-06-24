/**
 * 材质对象
 */

 import * as THREE from 'three'
 import { OrbitControls } from '@three-ts/orbit-controls';
//  创建场景对象
const scene = new THREE.Scene();

var geometry = new THREE.SphereGeometry(100, 25, 25); //创建一个球体几何对象
// 创建一个点材质对象
// const material = new THREE.PointsMaterial({
//   color: 0xff0000, //颜色
//   size: 3, //点渲染尺寸
// });
//点模型对象  参数：几何体  点材质
// const point = new THREE.Points(geometry, material);
// scene.add(point); //网格模型添加到场景中

// 直线基础材质对象
// const material = new THREE.LineBasicMaterial({
//   color: 0xff0000
// });
// const line = new THREE.Line(geometry, material); //线模型对象
// scene.add(line); //点模型添加到场景中

const material = new THREE.MeshPhongMaterial( {
	color: 0xff0000,
} );
const mesh = new THREE.Mesh(geometry, material); //线模型对象
scene.add(mesh); //点模型添加到场景中

//  点光源设置
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(0, 0, 400);
// scene.add(pointLight);
//  环境光
// const ambient = new THREE.AmbientLight(0x888888);
// ambient.intensity = 1
// scene.add(ambient);
// 平行光
const directionalLight = new THREE.SpotLight(0xffffff, 1);
// 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
directionalLight.position.set(110, 110, 110);
directionalLight.angle = Math.PI / 5
scene.add(directionalLight);
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
var axesHelper  = new THREE.AxesHelper(1000);
scene.add(axesHelper );