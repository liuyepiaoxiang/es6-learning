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
虽然这一形状的名字叫立方体(CubeGeometry),但它其实是长方体，也就是长宽高可以设置为不同的值。其构造函数是：
```javascript
THREE.CubeGeometry(width,height,depth,widthSegments,heightSegments,depthSegments)
```
这里，width是x方向上的长度；height是y方向上的长度；depth是z方向上的长度；\
后面三个参数分别是在三个方向上的分段数。一般情况下不需要分段的话，可以不设置后三个参数，后三个参数的缺省值为1，其他几何形状中的分段也是类似的。

### 长宽高
创建立方体直观简单，`new THREE.CubeGeometry(1, 2, 3);`可以创建一个x方向长度为1，y方向长度为2，z方向长度为3的立方体。

### 平面
这里的平面(PlaneGeometry)其实是一个长方形，而不是数学意义上无限大小的平面。其构造函数为：
```javascript
THREE.PlaneGeometry(width,height,widthSegments,heightSegments)
```
其中，width是x方向上的长度；height是y方向上的长度；后两个参数同样表示分段。

### 球体
球体(SphereGeometry)的构造函数为：
```javascript
THREE.SphereGeometry(radius,widthSegments,heightSegments,phiStart,phiLength,thetaStart,thetaLength)
```
其中，radius是半径；segmentsWidth表示经度上的切片数；segmentsHeight表示纬度上的切片数；phiStart表示经度开始的弧度；phiLength表示纬度跨过的弧度；thetaStart表示纬度开始的弧度；thetaLength表示纬度跨过的弧度。

### 分段
```javascript
var sphere = new THREE.SphereGeometry(3,8,6)
```
创建一个半径为3，经度划分为8份，纬度划分为6份的球体。

### 经度弧度
```javascript
new THREE.SphereGeometry(3,8,6,Math.PI / 6 , Math.PI / 3)
```
表示起始经度为Math.PI / 6，经度跨度为Math.PI / 3.

### 纬度弧度
```javascript
new THREE.SphereGeometry(3,8,6,0,Math.PI*2,Math.PI / 6,Math.PI / 3)
```
意味着纬度从Math.PI / 6跨过 Math.PI / 3。

```javascript
new THREE.SphereGeometry(3,8,6,Math.PI / 2,Math.PI,Math.PI / 6 ,Math.PI /2)
```

### 圆形
圆形(CircleGeometry)可以创建圆形或者扇形，其构造函数:
```javascript
THREE.CircleGeometry(radius,segments,thetaStart,thetaLength)
THREE.CircleGeometry(3,18,Math.PI / 3,Math.PI / 3 * 4)
```

### 圆柱体
圆柱体(CylinderGeometry)的构造函数是:
```javascript
THREE.CylinderGeometry(radiusTop,radiusBottom,height,radialSegments,heightSegments,openEnded,thetaStart,thetaLength)
```
其中，radiusTop与radiusBottom分别是顶面和底面的半径；height是圆柱体的高度。\
radiusSegments与heightSegments可类比球体中的分段；openEnded是一个布尔值，表示是否没有顶面和地面，缺省值为false，表示有顶面和底面。

### 标准圆柱体
```javascript
new THREE.CylinderGeometry(2,2,4,18,3)
```
### 圆柱台
```javascript
new THREE.CylinderGeometry(2,3,4,18,3)
```

### 无顶面底面
```javascript
new THREE.CylinderGeometry(2,3,4,18,3,true)
```

### 正四面体、正八面体、正二十面体
正四面体(TetrahedronGeometry)、正八面体(OctahedronGeometry)、正十二面体(IcosahedronGeometry)的构造函数较为类似，分别为:
```javascript
THREE.TetrahedronGeometry(radius,detail)
THREE.OctahedronGeometry(radius,detail)
THREE.IcosahedronGeometry(radius,detail)
```
radius是半径；detail是细节层次的层数。

### 圆环面
```javascript
THREE.TorusGeometry(radius,tube,radialSegments,tubularSegments,arc)
```
radius是圆环半径；tube是管道半径；radialSegments与tubularSegments分别是两个分段数；arc是圆环面的弧度，缺省值为Math.PI*2。

### 圆环结
```javascript
THREE.TorusKnotGeometry(radius,tube,radialSegments,tubularSegments,p,q,heightScale)
```
p和q是控制其样式的参数；heightScale是在z轴方向上的缩放。

### 文字形状
```javascript
THREE.TextGeometry(text,parameters)
```
text是文字字符串，parameters是以下参数组成的对象：
- size：字号大小
- height：文字的厚度
- curveSegemtns：弧线分段数，使得文字的曲线更加光滑
- font：字体
- weight：值为normal或bold，表示是否加粗
- style：值为normal或italics，表示是否斜体
- bevelEnabled：布尔值，是否使用倒角，意为在边缘处斜切
- bevelThickness：倒角厚度
- bevelSize：倒角宽度

### 自定义形状
```javascript
THREE.Geometry()
```

## 材质
### 基本材质
使用基本材质的物体，渲染后物体的颜色始终为该材质的颜色，而不会由于光照产生明暗、阴影效果。如果没有指定材质的颜色，则颜色是随机的。其构造函数是:
```javascript
THREE.MeshLambertMaterial(opt)
```
其中opt可以缺省，或者为包含各属性的值。\
常用的属性:
- visible：是否可见，默认为true
- side：渲染面片正面或者反面，默认为正面`THREE.FrontSide`，可设置为反面`THREE.BackSide`,或双面`THREE.DoubleSide`
- wireframe：是否渲染线而非面，默认为false
- color：十六进制RGB颜色，
- map：使用纹理贴图

### Lambert材质
Lambert材质（MeshLambertMaterial）是符合Lambert光照模型的材质。Lambert光照模型的主要特点是只考虑漫反射而不考虑镜面反射的效果，因而对于金属、镜子等需要镜面反射效果的物体就不适用，对于其他大部分物体的漫反射效果都是适用的。\
其光照模型公式:
```javascript
Idiffuse = Kd * Id * cos(theta)
```
其中，Idiffuse是漫反射光强，Kd是物体表面的漫反射属性，Id是光强，theta是光的入射角弧度。\
color是用来表现材质对散射光的反射能力，也是最常用来设置材质颜色的属性。除此之外，还可以用ambient和emissive控制材质的颜色。\
ambient表示对环境光的反射能力，只有当设置了AmbientLight后，该值才是有效的，材质对环境光的反射能力与环境光强相乘后得到材质实际表现的颜色。\
emissive是材质的自发光颜色，可以用来表现光源的颜色

### Phong材质
Phong材质(MeshPhongMaterial)是符合Phong光照模型的材质。和Lambert不同的是，Phong模型考虑了镜面反射的效果，因此对于金属、镜面的表现尤为适合。\
漫反射部分和Lambert光照模型是相同的，镜面反射部分的模型为：
```javascript
Ispecular = Ks * Is * (cos(alpha))^n
```
其中，Ispecular是镜面反射的光强，Ks是材质表面镜面反射系数，Is是光源强度，alpha是反射光与视线的夹角，n是高光指数，越大则高光光斑越小。\
由于漫反射部分与Lambert模型是一致的，因此，如果不指定镜面反射系数，而只设定漫反射，其效果与Lambert是相同的。

### 法向材质
法向材质可以将材质的颜色设置为其法向量的方向，有时候对于调试很有帮助。\
法向材质的设定很简单，甚至不用设置任何参数:
```javascript
new THREE.MeshNormalMaterial()
```
材质的颜色与照相机与该物体的角度相关。

### 材质的纹理贴图
导入纹理：
```javascript
var texture = THREE.ImageUtils.loadTexture('filename.png');
var material = new THREE.MeshLambertMaterial({
map:texture
});
```
需要重新绘制
```javascript
var texture = THREE.ImageUtils.loadTexture('filename.png',{},function(){
    renderer.render(scene,camera);
});
var material = new THREE.MeshLambertMaterial({
map:texture
});
```


## 网格
最常用的物体是网格(Mesh)，它代表包含点、线、面的几何体，其构造函数是：
```javascript
Mesh(geometry,material)
```
创建网格：
```javascript
var meterial = new THREE.MeshLambertMaterial({
color:0xffff00
});
var geometry = new THREE.CubeGeometry(1,2,3);
var mesh = new THREE.Mesh(geometry,material);
scene.add(mesh);
```
如果material和geometry之后不会复用的话，也可以合在一起写为：
```javascript
var mesh = new THREE.Mesh(new THREE.CubeGeometry(1,2,3),
 new THREE.MeshLambertMaterial({
 color:0xffff00
 }));
scene.add(mesh);
```

### 材质
除了在构造函数中指定材质，在网格被创建后，也能对材质进行修改。

###　位置、缩放、旋转
位置、缩放、旋转是物体的三个常用属性。由于`THREE.Mesh`基础自`THREE.Object3D`，因此包含scale、rotation、position三个属性。它们都是`THREE.Vector3`实例，因此修改其值的方法是相同的。


## 动画
### 实现动画效果
一般FPS在30到60之间都是可取的。

setInterval方法\
如果要设置特定的FPS，可以使用JavaScript DOM定义的方法：
```javascript
setInterval(func,msec)
```
其中，func是每过msec毫秒执行的函数，如果将func定义为重绘画面的函数，就能实现动画效果。`setInterval`函数返回一个id，如果需要停止重绘，需要使用`clearInterval`方法，并传入该id。

### requestAnimationFrame方法
大多数时候，我们并不在意多久重绘一次，这时候就适合用requestAnimationFrame方法。它告诉浏览器在合适的时候调用指定函数，通常可能达到60FPS。
requestAnimationFrame方法同样有对应的cancelAnimationFrame方法取消动画。


## 外部模型
.obj是最常用的模型格式，导入.obj需要OBJLoader.js;
- .obj
- .obj,.mtl
- .dae
- .ctm
- .ply
- .stl
- .wrl
- .vtk


## 光与影
环境光、点光源、平行光、聚光灯
### 环境光
环境光是指场景整体的光照效果，是由于场景内若干光源的多次反射形成的亮度一致的效果，通常用来为整个场景指定一个基础亮度。因此，环境光没有明确的光源位置，在各处形成的亮度也是一致的。
在设置环境光时，只需要指定光的颜色：
```javascript
THREE.AmbientLight(hex)
```
其中，hex是十六进制的RGB颜色信息。
```javascript
var light = new THREE.AmbientLight(0xffffff)
scene.add(light);
```

### 点光源
点光源是不计光源大小，可以看作一个点发出的光源。点光源照到不同物体表面的亮度是线性递减的，因此，离点光源距离越远的物体会显得越暗。
```javascript
THREE.PointLight(hex,intensity,distance)
```
其中，hex是光源十六进制的颜色值；intensity是亮度，缺省值为1，表示100%亮度；distance是光源最远照射到的距离，缺省值为0。
```javascript
var light = new THREE.PointLight(0xffffff,2,100)
light.position.set(1,1.5,2)
scene.add(light);
```

### 平行光
```javascript
THREE.DirectionalLight(hex,intensity)
```
其中，hex是光源十六进制的颜色值；intensity是亮度，缺省值为1，表示100%亮度。

### 聚光灯
聚光灯是一种特殊的点光源，它能够朝着一个方向投射光线。聚光灯投射出的是类似圆锥形的光线。
```javascript
THREE.SpotLight(hex,intensity,distance,angle,exponent)
```
相比点光源，多了angle