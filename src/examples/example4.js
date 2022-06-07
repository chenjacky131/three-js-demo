
/**
 * 材质
 */

 import * as THREE from 'three'
 import { OrbitControls } from '@three-ts/orbit-controls';
//  创建场景对象
const scene = new THREE.Scene();
//  创建网格模型
//长方体 参数：长，宽，高
const geometry = new THREE.BoxGeometry(100, 100, 100);
/** 镜面反射材料
 * MeshBasicMaterial	基础网格材质，不受光照影响的材质
 * MeshLambertMaterial	Lambert网格材质，与光照有反应，漫反射
 * MeshPhongMaterial	高光Phong材质,与光照有反应
 * MeshStandardMaterial	PBR物理材质，相比较高光Phong材质可以更好的模拟金属、玻璃等效果
 */
// const material = new THREE.MeshPhongMaterial({
//   color: 0xff0000,
//   specular:0xffffff,  //  高光颜色
//   shininess:12//  光照强度系数
// });
const material = new THREE.MeshStandardMaterial({
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