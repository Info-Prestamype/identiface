<template>
    <div class="identiface">
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
            <canvas ref="canvas" 
                :width="width"
                :height="height"
                >
            </canvas>
            <canvas ref="canvas2" class="canvasroi">
            </canvas>
             <canvas ref="canvas3" class="canvasroi">
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

<style scoped>
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

    canvas{
        display: block;
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

    video{
        display: none;
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
</style>

<script>
    import axios from 'axios'
    import getUserMedia from './getusermedia'
    import toblob from 'canvas-to-blob'
    import * as cv from 'opencv.js'

    export default {
        name: "identiface",
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
                
                if(this.streaming){
                    this.cap.read(this.frame); 
                    this.recognition();
                    cv.imshow(this.$refs.canvas, this.frame);
                    //delete instancied every frame

                    setTimeout(this.process, 60);
                }
                
            },

            recognition(){
                
                if(!this.inProcess){
                    //instance one time

                    this.frameGray = new cv.Mat()
                    this.faces = new cv.RectVector();
                    this.hsvRoi = new cv.Mat();
                    this.maskColor = new cv.Mat();
                    this.contours = new cv.MatVector();
                    this.contoursMilo = new cv.MatVector();
                    this.hierarchy = new cv.Mat();
                    this.rectangleColor = new cv.Scalar(255, 0, 0);

                    //min and max size of face detected for blue dni
                    this.msize = new cv.Size(120,120)

                    //dni blue color
                    this.lowScalar = new cv.Scalar(80, 100, 20);
                    this.highScalar = new cv.Scalar(100, 255, 255);

                    //milo green color
                    this.lowScalarMilo = new cv.Scalar(40, 100, 20);
                    this.highScalarMilo = new cv.Scalar(70, 255, 255);
                        
                    
                    let w = this.width,
                    h = this.height;
                
                    this.trackWindow = new cv.Rect(w*0.1, h*0.1, w*0.9-w*0.1,h*0.9-h*0.1); 

                    
                    this.inProcess = true;
                
                }

                this.colorRec = new cv.Scalar(232, 81, 81, 255);
                
                //Def Region of interest 
                this.roi = this.frame.roi(this.trackWindow);
                
                //convert the roi to hsv
                cv.cvtColor(this.roi, this.hsvRoi, cv.COLOR_RGB2HSV);

  
              
                let dniArea = this.detectColor('normal');
                let miloArea = this.detectColor('electronico');

                //console.log(dniArea.size(), miloArea.size())
                //Show detected Color 

                if(dniArea.size() > miloArea.size()){
                     this.detectPhoto(this.contours,'normal');
                }else{ 
                    this.detectPhoto(this.contoursMilo,'electronico');
                }

                
                let bitwise = new cv.Mat(); 
                cv.bitwise_and(this.hsvRoi, this.hsvRoi, bitwise,this.maskColor)
                cv.imshow(this.$refs.canvas2, bitwise);
                
                
                //Reference Rectangle
                cv.rectangle(this.frame, new cv.Point(this.width*0.1, this.height*0.1), new cv.Point(this.width*0.9,this.height*0.9), this.colorRec, 2);
                
                
            },
            detectPhoto(contours, type){
       

                for (let i = 0; i < contours.size(); ++i) {
                    
                    let cnt = contours.get(i);
                    let area = cv.contourArea(cnt, false); 
                    console.log(area)

                    if(area > 15000) {
                        let rect = cv.boundingRect(cnt);
                        let point1 = new cv.Point(rect.x, rect.y);
                        let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
                        cv.rectangle(this.roi, point1, point2, this.rectangleColor, 2, cv.LINE_AA, 0);

                        
                        if(rect.width < this.trackWindow.width-1 &&
                            rect.width > this.trackWindow.width-80
            
                        ){
                            if(this.faceClass !== undefined){
                                
                                if(type === 'normal'){
                                    let rect = new cv.Rect(0, 0, this.trackWindow.width*0.35,this.trackWindow.height*0.6);
                                    let roiFaceNormal = this.roi.roi(rect);
                                    

                                    cv.cvtColor(roiFaceNormal, this.frameGray , cv.COLOR_RGBA2GRAY, 0);
    
                                    this.faceClass.detectMultiScale(this.frameGray, this.faces, 1.7, 3, 0, this.msize, this.msize);

                                    for (let i=0;i<this.faces.size();i++) {
                                        let face = this.faces.get(i); 
                                        let point1 = new cv.Point(face.x, face.y); 
                                        let point2 = new cv.Point(face.x + face.width, face.y + face.height);
                                        
                                        if(face.y <= this.trackWindow.height*0.6 && face.x + face.width<=this.trackWindow.width*0.35){
                                            this.colorRec = new cv.Scalar(45, 206, 17, 255);

                                            this.typeDocument = 'normal'
                                            this.detected();
                                        }
                                    }
                                }
                                
                            }   
                        }                    
                    }   
                }
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
            async sendToRecognition(){
                
                
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
            }
        }
    };
</script>
