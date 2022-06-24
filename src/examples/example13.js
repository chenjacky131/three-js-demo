/**
 * 阴影投影计算
 */

 import * as THREE from 'three'
 import { OrbitControls } from '@three-ts/orbit-controls';
//  创建场景对象
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(40, 100, 40); //创建一个球体几何对象
const material = new THREE.MeshLambertMaterial( {
	color: 0x0000ff,
} );
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
//  设置产生投影的网格模型
mesh.castShadow = true;
//  创建一个平面几何体作为投影面
const planeGeometry = new THREE.PlaneGeometry(300, 200)
const planeMaterial = new THREE.MeshLambertMaterial({
  color: 0x999999
})
//  平面网格模型作为投影面
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(planeMesh)
planeMesh.rotateX(-Math.PI / 2)
planeMesh.position.y = -50
//  设置接收阴影的投影面
planeMesh.receiveShadow = true

const directionLight = new THREE.DirectionalLight(0xffffff, 1)
directionLight.position.set(60, 100, 40)
scene.add(directionLight)
//  设置用于计算阴影的光源对象
directionLight.castShadow = true
//  设置计算阴影的区域，最好紧密包围在对象周围
//  计算阴影的区域过大：模糊 过小：看不到或者显示不完整
directionLight.shadow.camera.near = 0.5
directionLight.shadow.camera.far = 300
directionLight.shadow.camera.left = -50
directionLight.shadow.camera.right = 50
directionLight.shadow.camera.top = 200
directionLight.shadow.camera.bottom = -100
//  设置mapSize属性可以使阴影更清晰，不那么模糊
directionLight.shadow.mapSize.set(1024, 1024)
//  聚光光源
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(50, 90, 50)
//  设置聚光光源的发散角度
spotLight.angle = Math.PI / 6
scene.add(spotLight)
spotLight.castShadow = true
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 300
spotLight.shadow.camera.fov = 20


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