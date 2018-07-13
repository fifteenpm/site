import React, { Component } from 'react';
import { render } from 'react-dom';
import { cloth, clothGeometry, clothMesh, simulate, windForce } from "../Utils/Cloth";
import { Detector } from "../Utils/Detector";
import { OrbitControls } from "../Utils/OrbitControls";
import { ballPosition, sphere } from "../Utils/Sphere";
import { service } from "../Utils/service";

import * as THREE from 'three';
import './Release.css';
import debounce from 'lodash/debounce';

/* this handles number of segments in cloth , TO DO fix this */
let pinsFormation = [];

let pinsArr = [];
for (let i=0; i<51; i++) {
  pinsArr.push(i);
}

service.pins = pinsArr;
pinsFormation.push( service.pins );
service.pins = pinsFormation[ 0 ];


class Network extends Component {
  constructor() {
    super();
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x000000);
    this.scene.fog = new THREE.Fog( 0x000000, 500, 10000 );

    this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
    this.light = new THREE.AmbientLight( 0x666666 );
    this.ambientLight = new THREE.AmbientLight( 0x666666 );
    this.directionalLight = new THREE.DirectionalLight( 0xdfebff, 1 );

    this.groundMaterial = new THREE.MeshPhongMaterial(
      {
        color: 0x02002f,//0x3c3c3c,
        specular: 0x404761, //0x3c3c3c//,
        //map: groundTexture
      } );
    this.groundMesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), this.groundMaterial );

    // net poles
    this.poleGeo = new THREE.BoxGeometry( 5, 250+125, 5 );
    this.poleMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shininess: 100, side: THREE.DoubleSide} );
    this.pole1 = new THREE.Mesh( this.poleGeo, this.poleMat );
    this.pole2 = new THREE.Mesh( this.poleGeo, this.poleMat );

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );

    this.createText();
    this.createRoom();
  }

  componentDidMount() {
    window.addEventListener( 'resize', this.onWindowResize, false );
    this.init();
    this.animate();
  }

  createRoom = () => {
    const {scene} = this;
    const geometry = new THREE.BoxGeometry( 10000, 10000, 10000 );
    geometry.faces.forEach( face => face.color.setHex( Math.random()));

    const material = new THREE.MeshNormalMaterial();
    material.side = THREE.DoubleSide;

    const roomMesh = new THREE.Mesh(geometry, material);
    roomMesh.flipSided = true;
    this.roomMesh = roomMesh;

    scene.add(this.roomMesh);
  }

  createText = () => {
    const fontJson = require("../fonts/helvetiker_bold.typeface.json");
    const font = new THREE.Font(fontJson);
    const textGeo = new THREE.TextGeometry("Network", {
      font: font,
      size: 70,
      height: 10,
      curveSegments: 2,
      bevelEnabled: true,
      weight: 1,
    });
    const textMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
    const texMesh = new THREE.Mesh(textGeo, textMaterial);
    texMesh.position.set(200, -245, 0);
    this.scene.add(texMesh);
  }

  init = () => {
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

    const { scene, camera, groundMesh, controls } = this;

    // // camera
    camera.position.y = 450;
    camera.position.z = 2200;
    camera.lookAt( scene.position );

    // sphere
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    scene.add( sphere );

    // ground mesh
    groundMesh.position.y = -250;
    groundMesh.rotation.x = - Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add( groundMesh ); // add ground to scene

    // controls
    //controls.maxPolarAngle = Math.PI * 0.5;
    controls.minDistance = 1000;
    controls.maxDistance = 5000;

    this.addRenderer();
    this.addLights();
    this.addNet();  // cloth mesh and poles
  }

  onWindowResize = debounce(() => {
    const { camera, renderer } = this;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

  }, 1000);

  addLights = () => {
    const {light, ambientLight, directionalLight, scene} = this;
    // lights
    scene.add( light );
    scene.add( ambientLight );  
    directionalLight.position.set( 50, 200, 100 );
    directionalLight.position.multiplyScalar( 1.3 );
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;

    let d = 300; // direction
    directionalLight.shadow.camera.left = - d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = - d;
    directionalLight.shadow.camera.far = 1000;
    scene.add( directionalLight );
  }

  addNet = () => {
    const { pole1, pole2, scene } = this;

    scene.add( clothMesh );

    pole1.position.x = -750;
    pole1.position.z = 0;
    pole1.position.y = -60;
    pole1.receiveShadow = true;
    pole1.castShadow = true;
    scene.add( pole1 );

    pole2.position.x = 750;
    pole2.position.z = 0;
    pole2.position.y = -60;
    pole2.receiveShadow = true;
    pole2.castShadow = true;
    scene.add( pole2 );
  }

  addRenderer = () => {
    const {renderer} = this;
    // renderer
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.renderSingleSided = false;

    this.container.appendChild( renderer.domElement );

    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
  }

  updateCloth = () => {
    var p = cloth.particles;
    for ( var i = 0, il = p.length; i < il; i ++ ) {
      clothGeometry.vertices[ i ].copy( p[ i ].position );
    }
    clothGeometry.verticesNeedUpdate = true;
    clothGeometry.computeFaceNormals();
    clothGeometry.computeVertexNormals();
  }

  animate = () => {

    requestAnimationFrame( this.animate );

    let time = Date.now();

    let windStrength = Math.cos( time / 7000 ) * 20 + 40;
    windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) )
    windForce.normalize()
    windForce.multiplyScalar( windStrength );

    simulate( time );
    this.renderScene();
  }

  renderScene = () => {
    const { scene, camera, renderer } = this;

    /* LETS ROTATE, WHY NOT */
    // let timer = Date.now() * 0.0002;
    // let cameraRadius = Math.sqrt(camera.position.x*camera.position.x + camera.position.z*camera.position.z);
    // camera.position.x = Math.cos( timer ) * cameraRadius;
    // camera.position.z = Math.sin( timer ) * cameraRadius;

    this.updateCloth();
    sphere.position.copy( ballPosition );
    renderer.render( scene, camera );
  }

  render() {
    return (
      <div ref={element => this.container = element } />
    );
  }
}

export default Network;
