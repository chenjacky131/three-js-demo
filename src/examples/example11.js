/**
 * 顶点索引复用顶点数据
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
  50, 50, 0, //顶点3坐标
  0, 50, 0, //顶点4坐标
]);
//  创建属性缓冲区对象
const attribute = new THREE.BufferAttribute(vertices, 3); //  三个为一组，表示xyz坐标
//  设置几何体attributes属性的位置属性
geometry.attributes.position = attribute;
const normals = new Float32Array([
  0, 0, 1, //顶点1法向量
  0, 0, 1, //顶点2法向量
  0, 0, 1, //顶点3法向量
  0, 0, 1, //顶点4法向量
]);
// 设置几何体attributes属性的位置normal属性
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
// Uint16Array类型数组创建顶点索引数据
const indexes = new Uint16Array([
  // 0对应第1个顶点位置数据、第1个顶点法向量数据
  // 1对应第2个顶点位置数据、第2个顶点法向量数据
  // 索引值3个为一组，表示一个三角形的3个顶点
  0, 1, 3,
  1, 2, 3,
]);
// 索引数据赋值给几何体的index属性
geometry.index = new THREE.BufferAttribute(indexes, 1); //  一个为一组
//  设置几何体材料
const material = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide, 
});
//  网格模型对象
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//  点光源设置
const pointLight = new THREE.PointLight(0xff0000);
pointLight.position.set(200, 80, 100);
scene.add(pointLight);
//  环境光
const ambient = new THREE.AmbientLight(0xff0000);
// scene.add(ambient);
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