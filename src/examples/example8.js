/**
 * 线模型
 */

 import * as THREE from 'three'
 import { OrbitControls } from '@three-ts/orbit-controls';
//  创建场景对象
const scene = new THREE.Scene();
//  创建网格模型
//  创建一个buffer类型的几何对象
const geometry = new THREE.BufferGeometry();
//   类型数组创建顶点数据
const vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 100, 0, //顶点3坐标
  0, 0, 10, //顶点4坐标
  0, 0, 100, //顶点5坐标
  50, 0, 10, //顶点6坐标
]);
//  创建属性缓冲区对象
const attribute = new THREE.BufferAttribute(vertices, 3); //  三个为一组，表示xyz坐标
//  设置几何体attributes属性的位置属性
geometry.attributes.position = attribute;
//  设置几何体材料
const material = new THREE.LineBasicMaterial({
  color: 0xff0000,
});
//  线模型对象
const line = new THREE.Line(geometry, material);
scene.add(line);
//  点光源设置
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(200, 200, 150);
scene.add(pointLight);
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