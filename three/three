# Three

## 基础
### WebGL

### 什么是Three



### 基本构成
渲染器(Renderer)、场景(Scene)、照相机(Camera)，以及在场景中创建的物体。
#### 渲染器(Renderer)
渲染器将和Canvas元素进行绑定，如果之前在HTML中手动定义了id为mainCanvas的Canvas元素，那么Renderer可以这样写：
```javascript
var renderer = new THREE.WebGLRenderer({
 canvas:document.getElementById('mainCanvas')
});
```
而如果想要Three.js生成Canvas元素，在HTML中就不需要定义Canvas元素，在JavaScript代码中可以这样写：
```javascript
var renderer = new THREE.WebGLRenderer();
renderer.setSize(400,300);
document.getElementsByName('body')[0].appendChild(renderer.domElement);
renderer.setClearColor(0x000000);
```

#### 场景(Scene)
在Three.js中添加物体都是添加到场景中的，因此它相当于一个大容器，一般说，场景没有很复杂的操作，在程序最开始的时候进行实例化，然后将物体添加到场景中即可。
```javascript
var scene = new THREE.Scene();
```

#### 照相机(Camera)
WebGL和Three.js使用的坐标系是右手坐标系。
```javascript
var camera = new THREE.PerspectiveCamera(45,4/3,1,1000);
camera.position.set(0,0,5);
scene.add(camera);
```

#### 长方体
我们要创建一个x、y、z方向长度分别为1、2、3的长方体，并将其设置为红色。
```javascript
var cube = new THREE.Mesh(new THREE.CubeGeometry(1,2,3)),new THREE.MeshBasicMaterial({
                        color:0xffffff
                        })
                        );
scene.add(cube);
```

#### 渲染
在定义了场景中的物体，设置好的照相机之后，渲染器就知道如何渲染出二维的结果了。
这时候，只需调用渲染器的渲染函数，就能使其渲染一次了。
```javascript
renderer.render(scene,camera);
```

### 功能概览
```
Camera (照相机，控制投影方式)
    Camera
    OrthographicCamera
    PerspectiveCamera

Core(核心对象)
    BufferGeometry
    Clock(用来记录时间)
    EventDispatcher
    Face3
    Face4
    Geometry
    Object3D
    Projector
    Raycaster(计算鼠标拾取物体时很有用的对象)
    
Lights(光照)
    Light
    AmbientLight
    AreaLight
    DirectionalLight
    HemisphereLight
    PointLight
    SpotLight
   
Loaders(加载器，用来加载特定文件)
    Loader
    BinaryLoader
    GeometryLoader
    ImageLoader
    JSONLoader
    LoadingMonitor
    SceneLoader
    TextureLoader

Materials(材质，控制物体的颜色、纹理等)
    Material
    LineBasicMaterial
    LineDashedMaterial
    MeshBasicMaterial
    MeshDeptMaterial
    MeshFaceMaterial
    MeshLambertMaterial
    MeshNormalMaterial
    MeshPhongMaterial
    ParticleBasicMaterial
    ParticleCanvasMaterial
    ParticleDOMMaterial
    ShaderMaterial
    SpriteMaterial
    
Math(和数学相关的对象)
    Box2
    Box3
    Color
    Frustum
    Math
    Matrix3
    Matrix4
    Plane
    Quaternion
    Sphere
    Spline
    Triangle
    Vector2
    Vector3
    Vector4
    
Objects(物体)
    Bone
    Line
    LOD
    Mesh(网格，最常用的物体)
    MorphAnimMesh
    Particle
    ParticleSystem
    Ribbon
    SkinnedMesh
    Sprite
    
Renderers(渲染器，可以渲染到不同对象上)
    CanvasRenderer
    WebGLRenderer(使用WebGL渲染)
    WebGLRendererTarget
    WebGLRendererTargetCube
    WebGLShaders(着色器)
    
Renderers/Renderables
    RenderableFace3
    RenderableFace4
    RenderableLine
    RenderableObject
    RenderableParticle
    RenderableVertex
    
Scenes(场景)
    Fog
    FogExp2
    Scene
    
Textures(纹理)
    CompressedTexture
    DataTexture
    Texture
    
Extras
    FontUtils
    GeometryUtils
    ImageUtils
    SceneUtils
    
Extras/Animation
    Animation
    AnimationHandler
    AnimationMorphTarget
    KeyFrameAnimation
    
Extras/Cameras
    CombinedCamera
    CubeCamera
    
Extras/Core
    Curve
    CurvePath
    Gyroscope
    Path
    Shape
    
Extras/Geometries(几何形状)
    CircleGeometry
    ConvexGeometry
    CubeGeometry
    CylinderGeometry
    ExtrudeGeometry
    IcosahedronGeometry
    LatheGeometry
    OctahadronGeometry
    ParametricGeometry
    PlaneGeometry
    PloyhedronGeometry
    ShapeGeometry
    SphereGeometry
    TetrahedronGeometry
    TextGeometry
    TorusKontGeometry
    TubeGeometry
    
Extras/Helpers
    ArrowHelper
    AxisHelper
    CameraHelper
    DirectionalLightHelper
    HemisphereLightHelper
    PointLightHelper
    SpotLightHelper

Extras/Objects
    ImmediateRenderObject
    LensFlare
    MorphBlendMesh
    
Extras/Renderers/Plugins
    DepthPassPlugin
    LensFlarePlugin
    ShadowMapPlugin
    SpritePlugin
    
Extras/Shaders
    ShaderFlares
    ShaderSprite
```

## 照相机
定义了三维空间到二维屏幕的投影方式。
### 正交投影 vs 透视投影
透视投影照相机获得的结果是类似人眼在真实世界中看到的有“近大远小”的效果；而正交投影照相机获得的结果就是，对于三维空间内平行的线，投影到二维空间也一定是平行的。
大部分使用透视投影。

### 正交投影照相机
#### 参数介绍
正交投影照相机(Orrhographic Camera)设置起来较为直观，它的构造函数是：
```javascript
THREE.OrthographicCamera(left,right,top,bottom,near,far)
```
![](http://images2015.cnblogs.com/blog/885879/201608/885879-20160807133328903-642954567.png)
这六个参数分别代表正交投影照相机拍摄到的空间的六个面的位置，这两个面围成一个长方体，称之为视景体(Frustum)。只有在视景体内部的物体才可能显示在屏幕上，而在视景体外的物体会在显示之前被裁减掉。\
为了保持照相机的横竖比例，需要保证`(right - left)`与`(top - bottom)`的比例与Canvas宽度与高度的比例一致。\
`near`与`far`都是指到照相机位置在深度平面的位置，而照相机不应该拍摄到其后方的物体，因此这两个值应该均为正值。
#### 基本设置
设置照相机
```javascript
var camera = new THREE.OrthographicCamera(-2,2,1.5,-1.5,1,10);
     camera.position.set(0,0,5);
     scene.add(camera);
```
在原点处创建一个边长为1的正方体，为了和透视效果做对比，这里我们使用`wireframe`而不是实心的材质，以便看到正方体后方的边
```javascript
var cube = new THREE.Mesh(new THREE.CubeGeometry(1,1,1),
           new THREE.MeshBasicMaterial({
                color:0xff0000,
                wireframe:true
           })
           );

       scene.add(cube);
```
#### 长宽比例
Canvas宽度是400px，高度是300px，照相机水平方向距离4，垂直方向距离3，因此长宽比例保持不变。为了试验长宽比例变化时的效果，我们将照相机水平方向的距离减小为2：
```javascript
var camera = new THREE.OrthographicCamera(-1,1,1.5,-1.5,1,10);
```
得到的结果是水平方向被拉长了。

#### 照相机位置
照相机默认是面向z轴负方向放置的，所以能看到原点处的正方体。
```javascript
var camera = new THREE.OrthographicCamera(-2,2,1.5,-1.5,1,10);
camera.position.set(1,0,5);
```
#### 换个角度看世界
```javascript
camera.position.set(4,-3,5);
camera.lookAt(new THREE.Vector3(0,0,0));
```

### 透视投影照相机
#### 参数介绍
透视投影照相机(Perspective Camera)的构造函数是:
```javascript
THREE.PerspectiveCamera(fov,aspect,near,far);
```
![](http://images2015.cnblogs.com/blog/885879/201608/885879-20160807135617872-1503866239.png)
fov是视景体竖直方向上的张角(是角度制而非弧度制).\
aspect等于width/height，是照相机水平方向和竖直方向长度的比值，通畅设为Canvas的纵横比例。
near和far分别是照相机到视景体最近、最远的距离，均为正值，且far应大于near。

## 基本几何形状
### 立方体
