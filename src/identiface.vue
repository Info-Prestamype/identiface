<template>
    <div class="identiface">
        <h1>Análisis de documento identidad - TI</h1>
        <ol>
            <li>
                Acercar el DNI hasta el area marcada
            </li>
            <li>
                Mantener la posición y esperar que cargue
            </li>
            <p>*para mejorar la precisión realizar el test en areas iluminadas</p>
        </ol>
        <template v-if="notSupported">
            <label class="inputContent" id="identify__content" :class="{ 'error' : errorMessage !== ''}">
                <input type="file" class="inputfile" id="identify__input" accept="image/jpeg"
                       @change="validateFile($event)">
                <span class="inputcustom" id="identify__inputcustom">
                <slot name="identify__inputcustom"></slot>
            </span>
            </label>
        </template>
        <template v-else>
            <video
                    :class="{ 'error' : errorMessage !== ''}"
                    class="identify__webcamera"
                    ref="video"
                    :width="width"
                    :height="height"
                    :src="source"
                    :autoplay="autoplay"
                    playsinline
            />

            <div class="content-recognition">
                <canvas ref="canvas" 
                :width="width"
                :height="height"
                >
                </canvas>
                <div class="referenceBox" :class="{ active: detectProgress > 0 }">
                    <div class="left-top"></div>
                    <div class="right-top"></div>
                    <div class="left-bottom"></div>
                    <div class="right-bottom"></div>
                    <div class="circle-ok" v-show="detectProgress >= 93"></div>
                </div>
                 <radial-progress-bar :diameter="90" class="progressCircle"
                       :completed-steps="detectProgress"
                       :strokeWidth="10"
                       startColor="#0eff00"
                       stopColor="#0eff00"
                       innerStrokeColor="#ffffff"
                       :innerStrokeWidth="10"
                       :animateSpeed="100"
                       :total-steps="100" />
            </div>
            <canvas ref="canvas2">
            </canvas>
             <canvas ref="canvas3">
            </canvas>
            <canvas ref="canvas4">
            </canvas>
            <div v-show="reading" class="reading">
                Leyendo imagen...
            </div>
        </template>
        <div class="progress">

        </div>
        <p class="errorMessage" v-if="errorMessage">
            {{this.errorMessage}}
        </p>
    </div>

</template>

<style scoped scss>
    ol{
        margin-top: 40px;
        margin-bottom: 20px;
    }
    li{
        text-align: left;
    }
    p{
        font-size: 10px;
        text-align: left;
    }
    .progressCircle{
        margin-top: -122px;
        display: block;
        margin: -122px auto;
    }
    .content-recognition{
        position: relative;
        display: block;
        margin:  0 auto;
        width: 888px;
        height: 500px;
    }
    .referenceBox{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: flex-end;
        display: flex;
    }
    .referenceBox.active div{
        border-color: #0eff00 !important;
    }
    .left-top{
        border-top: 7px solid #ffffff;
        border-left: 7px solid #ffffff;
        width: 5%;
        height: 9%;
        position: absolute;
        left: 11%;
        top: 7%;
    }
    .right-top{
        border-top: 7px solid #ffffff;
        border-right: 7px solid #ffffff;
        width: 5%;
        height: 9%;
        position: absolute;
        right: 11%;
        top: 7%;
    }
    .left-bottom{
        border-bottom: 7px solid #ffffff;
        border-left: 7px solid #ffffff;
        width: 5%;
        height: 9%;
        position: absolute;
        left: 11%;
        bottom: 7%;
    }
    .right-bottom{ 
        border-bottom: 7px solid #ffffff;
        border-right: 7px solid #ffffff;
        width: 5%;
        height: 9%;
        position: absolute;
        right: 11%;
        bottom: 7%;
    }
    .circle-ok{
        background-color: #0eff00;
        margin-bottom: 49px;
        width: 54px;
        height: 55px;
        border-radius: 50px;
    }
    .canvasroi{
        display: none;
    }
    .reading{
        position: fixed;
        width: 100%;
        height: 100%;
        background: #000000cc;
        top: 0;
        display: flex;
        justify-content: center;
        color: #fff;
        align-items: center;
        font-size: 24px;
    }

    video{
        display: none;
    }

    canvas{
        display: block;
        margin: 0 auto;
    }

    
    .inputContent {
        position: relative;
        display: inline-block;
        cursor: pointer;
    }

    .inputfile {
        min-width: 14rem;
        margin: 0;
        filter: alpha(opacity=0);
        opacity: 0;
    }
    .inputcustom {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 5;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    @keyframes fadein {
    from { opacity: 0; }
    to   { opacity: 1; }
    }

    /* Firefox < 16 */
    @-moz-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Safari, Chrome and Opera > 12.1 */
    @-webkit-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Internet Explorer */
    @-ms-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    /* Opera < 12.1 */
    @-o-keyframes fadein {
        from { opacity: 0; }
        to   { opacity: 1; }
    }
</style>

<script>
    import axios from 'axios'
    import adapter from 'webrtc-adapter';
    import getUserMedia from './getusermedia'
    import toblob from 'canvas-to-blob'
    import * as cv from 'opencv.js'
    import RadialProgressBar from 'vue-radial-progress'
    
   
    export default {
        name: "identiface",
        components: {
        RadialProgressBar
        },
        props: {
            awsUrl: {
                type: String,
                required: true,
            },
            awsConfig: {
                type: Object,
                required: true,
            },
            width: {
                type: [Number, String],
                default: "100%"
            },
            height: {
                type: [Number, String],
                default: 500
            },
            autoplay: {
                type: Boolean,
                default: true
            },
            screenshotFormat: {
                type: String,
                default: "image/jpeg"
            },
            deviceId: {
                type: String,
                default: null
            },
            isFrontCam: {
                type: Boolean,
                default: true
            },
            resolution: {
                type: Object,
                default: null,
                validator: value => {
                    return value.height && value.width;
                }
            }
        },
        data() {
            return {
                detectProgress: 0,
                source: null,
                notSupported: false,
                canvas: null,
                errorMessage: '',
                camerasListEmitted: false,
                cameras: [],
                camsList: { back: null, front: null },
                streaming: false,
                reading: false,
                //recognition Setup
                maskColor: undefined, 
                maskColorElec: undefined,
                lowScalar: undefined, 
                highScalar: undefined, 
                lowScalarMilo: undefined, 
                highScalarMilo: undefined, 
                low: undefined, 
                high: undefined,
                contours: undefined,
                contoursMilo: undefined, 
                hierarchy: undefined, 
                rectangleColor: undefined,
                typeDocument: undefined,
                //detection
                frame: undefined, 
                cap: undefined,
                colorRec: undefined,
                inProcess: false,
                roi: undefined,
                roiDniElec: undefined, 
                hsvRoi: undefined, 
                trackWindow: undefined,
                //face
                frameGray: undefined,
                faces: undefined,
                faceClass: undefined,
                //New Version Performance
                resized: undefined,
                workFrame: undefined,
                Contours: undefined,
                sorteableContours: [],
                bitwise:undefined,
                center:0,
                px:undefined,
                py:undefined,
                w:undefined,
                h:undefined
            };
        },
        watch: {
            deviceId: function (id) {
                if (!this.notSupported) {
                    this.changeCamera(id);
                }
            },
            isFrontCam: function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    this.changeFrontBack(newValue)
                }
            },
            center: function (newValue, oldValue) {
                if(Math.abs(newValue - oldValue) <= 5){
                    this.detectProgress += 10;
                }else{
                    this.detectProgress = 0;
                }

                if(this.detectProgress >= 100){
                    this.detected();
                }
            },
        },
        computed: {
            supportFacingMode () {
                let result = ''
                if (navigator.mediaDevices.getSupportedConstraints()["facingMode"]) {
                    result = "Supported!"
                } else {
                    result = "Not supported!"
                }
                return result
            },
            Constrains () {
                const facingMode =  this.isFrontCam ? 'user' : 'environment'
                const video = {
                    ...(this.deviceId ? {deviceId: { exact: this.deviceId }} : {}), 
                    facingMode,
                    width: { ideal: this.resolution.width },
                    height: { ideal: this.resolution.height }
                }
                return {
                    video,
                }
            }
        },
        mounted() {
            this.setupMedia();
        },
        methods: {
            /**
             * setup media
             */
            validateFile(event) {
                this.errorMessage = '';
                const exFile = event.target.files[0].type;


                if (exFile === 'image/jpeg') {
                    //console.log(event.target.files[0]);

                    const reader = new FileReader();
                    reader.readAsDataURL(event.target.files[0]);
                    reader.onload = ()=> {
                        this.$emit("preview", reader.result);
                    };

                    this.uploadImage(event.target.files[0]);

                } else {
                    this.errorMessage = 'Only jpg/jpeg and png files are allowed!'
                }
            },

            setupMedia() {
                this.loadCameras();
            },

            /**
             * load available cameras
             */
            async loadCameras() {
                try {
                    navigator.mediaDevices
                        .enumerateDevices()
                        .then(deviceInfos => {
                            for (let i = 0; i !== deviceInfos.length; ++i) {
                                let deviceInfo = deviceInfos[i];
                                if (deviceInfo.kind === "videoinput") {
                                    this.cameras.push(deviceInfo);
                                    if (deviceInfo.label.toLowerCase().indexOf('back') !== -1) {
                                        this.camsList.back = deviceInfo
                                    }
                                    if (deviceInfo.label.toLowerCase().indexOf('front') !== -1) {
                                        this.camsList.front = deviceInfo
                                    }
                                }
                            }
                        })
                        .then(() => {
                            if (!this.camerasListEmitted) {
                                this.$emit("cameras", this.cameras);
                                this.camerasListEmitted = true;
                            }
                        })
                        .catch((error) => {
                            this.notSupported = true;
                            this.$emit("notsupported", error)
                        });
                } catch (err) {
                    this.notSupported = true;
                    this.$emit('notsupported', err);
                }
            },

            /**
             * change to a different camera stream, like front and back camera on phones
             */
            changeCamera(deviceId) {
                this.stop();
                this.$emit("camera-change", deviceId);
                this.deviceId = deviceId;
                this.loadCamera();
            },

            /**
             * load the stream to the
             */
            loadSrcStream(stream) {
                if ("srcObject" in this.$refs.video) {
                    // new browsers api
                    this.$refs.video.srcObject = stream;
                } else {
                    // old broswers
                    this.source = window.HTMLMediaElement.srcObject(stream);
                }

                // Emit video start/live event
                this.$refs.video.onloadedmetadata = () => {
                    this.$emit("video-live", stream);

                    //prevent Opencv.js error.
                    this.$refs.video.width = this.width;
                    this.$refs.video.height = this.height; 
                    this.streaming = true;
                    setTimeout(this.setupCV, 0);
                };
                
                this.$emit("started", stream);
            },

            /**
             * Detection
             */
            async setupCV() {
                if (this.frame === undefined) {
                    this.cap = await new cv.VideoCapture(this.$refs.video);
                    this.frame = await new cv.Mat(this.height, this.width, cv.CV_8UC4);
                     
                    let cascadeFile = 'haarcascade_frontalface_default.xml'
                    this.createFileFromURL(cascadeFile, cascadeFile, (face) => {
                        this.faceClass = face
                    })
                    
                    console.log("cv setup complete.");
                }
                setTimeout(this.process, 0);
            },
            createFileFromURL(file, url, cb) {
                axios.get('/models/haarcascades/' + url)
                .then((resp) => {
                    let rtn = cv.FS_createDataFile('/', file, resp.data, true, false, false)
                    if (!rtn) return cb(null)
                    let classifier = new cv.CascadeClassifier()
                    rtn = classifier.load(file)
                    if (!rtn) return cb(null) 
                    cb(classifier)
                    console.log('loaded', rtn, classifier.empty(), this.faceClass)

                })
                .catch((err) => {
                    console.log('ERR',err);
                })
            },
            process(){
                let begin = Date.now();
                if(this.streaming){
                    this.cap.read(this.frame);
                    
                    this.edgeDetection();  
                
                    let delay = 1000/100 - (Date.now() - begin);
                    setTimeout(this.process, delay); 
                }
                
                
            },
            edgeDetection(){
                if(!this.inProcess){
                    this.frameGray = new cv.Mat();
                    this.msize = new cv.Size(20,100);

                    this.rectangleColor = new cv.Scalar(41, 132, 42);
                    this.inProcess = true;
                    this.faces = new cv.RectVector();
                    this.workFrame = new cv.Mat();
                    this.gray = new cv.Mat();
                    this.edged = new cv.Mat();
                    this.hierarchy = new cv.Mat();
                    this.Contours = new cv.MatVector();

                    //Color
                    this.maskColor = new cv.Mat();
                    this.hsvRoi = new cv.Mat();

                    this.lowScalar = new cv.Scalar(80, 100, 20);
                    this.highScalar = new cv.Scalar(100, 255, 255);
                }

                this.sortableContours = [];


                let dsize = new cv.Size(this.width*0.5, this.height*0.5);
                

                cv.resize(this.frame, this.workFrame, dsize, 0, 0, cv.INTER_AREA);
                cv.threshold(this.workFrame, this.workFrame, 100, 230, cv.THRESH_BINARY);
                cv.cvtColor(this.workFrame, this.hsvRoi, cv.COLOR_RGB2HSV); 

                this.low = new cv.Mat(this.hsvRoi.rows, this.hsvRoi.cols, this.hsvRoi.type(), this.lowScalar);
                this.high = new cv.Mat(this.hsvRoi.rows, this.hsvRoi.cols, this.hsvRoi.type(), this.highScalar);
                cv.inRange(this.hsvRoi, this.low, this.high, this.maskColor);

                this.bitwise = new cv.Mat();
                cv.bitwise_and(this.hsvRoi, this.hsvRoi, this.bitwise,this.maskColor)

                

                cv.findContours(this.maskColor, this.Contours, this.hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);


                for (let i = 0; i < this.Contours.size(); i++) {
                    let cnt = this.Contours.get(i);
                    let area = cv.contourArea(cnt, false);
                    let perim = cv.arcLength(cnt, false);

                    this.sortableContours.push({ areaSize: area, perimiterSize: perim, contour: cnt });
                }

                this.sortableContours = this.sortableContours.sort((item1, item2) => { return (item1.areaSize > item2.areaSize) ? -1 : (item1.areaSize < item2.areaSize) ? 1 : 0; }).slice(0, 5);

                for (let i = 0; i < this.sortableContours.length; ++i) {
                    
                    let cnt = this.sortableContours[i].contour;
                    let rect = cv.boundingRect(cnt);
                    let moments = cv.moments(cnt, false);


                    //console.log(this.sortableContours[i].areaSize);

                    if(rect.width > this.workFrame.size().width*0.65 && rect.height > this.workFrame.size().height*0.65
                        && rect.width < this.workFrame.size().width  && rect.height < this.workFrame.size().height
                    
                    ){

                        let cx = moments.m10/moments.m00;
                        let cy = moments.m01/moments.m00; 

                    
                        let point1, point2, recW, recH;
                        this.px = rect.x*2; 
                        this.py= rect.y*2;
                        this.w = rect.width*2;
                        this.h = rect.height*2;
                        
                        recW = rect.x*2 + rect.width*2;
                        recH = rect.y*2 + rect.height*2;

                        if( rect.height < 220 && rect.height > 160 ){
                            this.py -= 25;
                            recH += 10;
                        }   

                        if( rect.width > 280 && rect.width < 340){
                            this.px -= 20;
                            recW += 20;
                        }

                        point1 = new cv.Point(this.px, this.py);
                        point2 = new cv.Point(recW, recH);

                        
                        cv.rectangle(this.frame, point1, point2, this.rectangleColor, 1, cv.LINE_AA, 0);
                        

                        if(this.faceClass !== undefined){

                            cv.resize(this.frame, this.frameGray, dsize, 0, 0, cv.INTER_AREA);
                            
                            cv.cvtColor(this.frameGray, this.frameGray , cv.COLOR_RGBA2GRAY, 0);
                            
                            this.faceClass.detectMultiScale(this.frameGray, this.faces, 1.5, 5, 0, this.msize, this.msize);
                             
                            if(this.faces.size() >= 1){
                                this.center = parseInt(cx) + parseInt(cy);
                                
                                
                                for (let i=0;i<this.faces.size();i++) {

                                    let face = this.faces.get(i);
                                    let point1 = new cv.Point(face.x*2, face.y*2); 
                                    let point2 = new cv.Point(face.x*2 + face.width*2, face.y*2 + face.height*2);
                                    cv.rectangle(this.frame, point1, point2, this.rectangleColor, 1 ,cv.LINE_AA, 0);
                                }
                                
                            }else{
                                this.detectProgress = 0
                            }
                        }
                     
                     }
                     /*else{
                         this.detectProgress = 0
                     }*/
                     cnt.delete();
                  
                }

                cv.imshow(this.$refs.canvas, this.frame);
                //cv.imshow(this.$refs.canvas3, this.bitwise);
                this.bitwise.delete(); 
                this.high.delete();
                this.low.delete();
                         
            },
            clearAll(){
                this.streaming = false;
                //Clear all Instances
                this.inProcess = false;
                this.contours.delete()
                //this.faceClass.delete()
                this.frameGray.delete()
                this.hsvRoi.delete()
                this.maskColor.delete()
                this.hierarchy.delete()
                this.faces.delete()

            },
        
            async detected(){
                this.trackWindow = new cv.Rect(this.px,this.py,this.w,this.h);          
                this.roi = this.frame.roi(this.trackWindow);
                cv.imshow(this.$refs.canvas2, this.roi);
                
                this.streaming = false;
                this.reading = true;
                const canvasImage = this.$refs.canvas2.toDataURL().split(',')[1]
                const body = {
                    image: canvasImage,
                    type: this.typeDocument
                }
                
                
                try{
                    let res = await axios.post('https://wcns07epuc.execute-api.us-east-1.amazonaws.com/Prod/textdetect', body);
                    this.reading = false;
                    this.$emit("recognition", res);
                }catch{
                    this.reading = false;
                }
                
            },
            detectColor(type){

                if(type == 'normal'){
                    //Detect Color
                    this.low = new cv.Mat(this.hsvRoi.rows, this.hsvRoi.cols, this.hsvRoi.type(), this.lowScalar);
                    this.high = new cv.Mat(this.hsvRoi.rows, this.hsvRoi.cols, this.hsvRoi.type(), this.highScalar);
                    cv.inRange(this.hsvRoi, this.low, this.high, this.maskColor);

                    //Detect Contours
                    cv.findContours(this.maskColor, this.contours, this.hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

                    return this.contours;
                }

                if(type == 'electronico'){
                     //Detect Color
                    this.low = new cv.Mat(this.hsvRoi.rows, this.hsvRoi.cols, this.hsvRoi.type(), this.lowScalarMilo);
                    this.high = new cv.Mat(this.hsvRoi.rows, this.hsvRoi.cols, this.hsvRoi.type(), this.highScalarMilo);
                    cv.inRange(this.hsvRoi, this.low, this.high, this.maskColor);

                    
                    //Detect Contours
                    cv.findContours(this.maskColor, this.contoursMilo, this.hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
                    return this.contoursMilo;
                    
                }
                
                
            },
            
            /**
             * stop the selected streamed video to change camera
             */
            stopStreamedVideo(videoElem) {
                let stream = videoElem.srcObject;
                let tracks = stream.getTracks();

                tracks.forEach(track => {
                    // stops the video track
                    track.stop();
                    this.$emit("stopped", stream);

                    this.$refs.video.srcObject = null;
                    this.source = null;
                });     
                
                this.clearAll();
                
    
            },

            // stop the video   
            stop() {
                if (this.$refs.video !== null && this.$refs.video.srcObject) {
                    this.stopStreamedVideo(this.$refs.video);
                }
            },

            // start the video
            start() {
                this.loadCamera();

            },

            // resume the video
            resume() {
                if (this.$refs.video !== null && this.$refs.video.srcObject) {
                    this.$refs.video.play();
                }
            },
            changeFrontBack (newFrontCam) {
                if (newFrontCam && this.camsList.front) {
                    this.changeCamera(this.camsList.front.deviceId)
                }
                if (!newFrontCam && this.camsList.back) {
                    this.changeCamera(this.camsList.back.deviceId)
                }
            },
            /**
             * load the camera passed as index!
             */
            loadCamera() {
                getUserMedia(this.Constrains, (err, stream) => {
                    if (err !== null) {
                        if (err.name === 'NotAllowedError') {
                            this.errorMessage = 'please  reload the page and accept the permissions for camera use'
                            this.$emit('error', err);
                        } else {
                            this.notSupported = true;
                            this.$emit('error', err);
                        }
                        return;
                    }

                    if (window.ImageCapture) {
                        const mediaStreamTrack = stream.getVideoTracks()[0];
                        this.imageCapture = new ImageCapture(mediaStreamTrack)
                    }
                    this.video = this.$refs.video;
                    this.loadSrcStream(stream);
                });


            },

            /**
             * capture screenshot
             */
            capture() {
                this.$emit("preview", this.getCanvas().toDataURL(this.screenshotFormat));
                this.uploadImage(toblob(this.getCanvas().toDataURL(this.screenshotFormat)));
            },

            async uploadImage(image) {
                let res = await axios.post(this.awsUrl, this.awsConfig);
                let credentials = res.data.data.fields;
                let url = res.data.data.url;
                let imageUrl = res.data.url;

                let data = new FormData();

                Object.keys(credentials).forEach(key => data.append(key, credentials[key]));

                data.append('file', image);

                await axios({
                    method: 'post',
                    url,
                    data,
                    headers: {'Content-Type': 'multipart/form-data'},
                    onUploadProgress: (progressEvent) => {
                        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        this.$emit("progress", percentCompleted);
                    }
                });

                this.$emit("image-ready", imageUrl);

            },

            /**
             * get canvas
             */
            getCanvas() {
                let video = this.$refs.video;
                if (!this.ctx) {
                    let canvas = document.createElement("canvas");
                    canvas.height = video.videoHeight;
                    canvas.width = video.videoWidth;
                    this.canvas = canvas;

                    this.ctx = canvas.getContext("2d");
                }

                const {ctx, canvas} = this;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                return canvas;
            },
            referenceCanvas(){
                
            }
        }
    };
</script>
