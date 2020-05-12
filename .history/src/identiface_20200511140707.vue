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

            <canvas ref="canvas2" 
                :width="width"
                :height="height"
                >
            </canvas>

            <canvas ref="canvas3" 
                :width="width"
                :height="height"
                >
            </canvas>
            <canvas ref="canvas4" 
                :width="width"
                :height="height"
                >
            </canvas>
        </template>
        <div class="progress">

        </div>
        <p class="errorMessage" v-if="errorMessage">
            {{this.errorMessage}}
        </p>
    </div>

</template>

<style scoped>
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
    import np from 'numjs'

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
               
                //recognition Setup

                maskColor: undefined, 
                lowScalar: undefined, 
                highScalar: undefined, 
                low: undefined, 
                high: undefined,
                contours: undefined,
                hierarchy: undefined,
                //detection
                frame: undefined, 
                cap: undefined,
                colorRec: undefined,
                inProcess: false,
                roi: undefined, 
                hsvRoi: undefined, 
                trackWindow: undefined,
                frame_hsv: undefined,
                //face
                frameray: undefined,
                faces: undefined,
                faceClass: undefined,
                faces: undefined,


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
                ...(this.deviceId ? {
                deviceId: { exact: this.deviceId }
                } : {}),
                facingMode
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
                    this.$refs.video.width = 888; 
                    this.$refs.video.height = 500;
                    setTimeout(this.setupCV, 0);
                };
                
                this.$emit("started", stream);
            },

            /**
             * Detection
             */
            async setupCV() {
                
                if (this.frame == undefined) {
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
                this.cap.read(this.frame); 
                
                this.recognition();
                
                cv.imshow(this.$refs.canvas, this.frame);
                setTimeout(this.process, 33); 
                
            },

            recognition(){
                if(!this.inProcess){
                    this.frameGray = new cv.Mat()
                    this.faces = new cv.RectVector();
                    this.hsvRoi = new cv.Mat();
                    this.maskColor = new cv.Mat();
                    this.contours = new cv.MatVector();
                    this.hierarchy = new cv.Mat();
                    //dni blue color
                    this.lowScalar = new cv.Scalar(100, 100, 27);
                    this.highScalar = new cv.Scalar(125, 255, 255);
                        
                    
                    let w = this.width,
                    h = this.height;
                
                    this.trackWindow = new cv.Rect(w*0.2, h*0.2, w*0.8-w*0.2,h*0.8-h*0.2); 

                    
                    this.inProcess = true;
                
                }

                let w = 888,
                    h = 500;

                this.colorRec = new cv.Scalar(232, 81, 81, 255) 
                
                //Def Region of interest 
                this.roi = this.frame.roi(this.trackWindow);
                
                //convert the roi to hsv
                cv.cvtColor(this.roi, this.hsvRoi, cv.COLOR_RGB2HSV);

                //convert the roi to grayscale 
                cv.cvtColor(this.roi, this.frameGray , cv.COLOR_RGBA2GRAY, 0);
              
                //Detect Color
                this.low = new cv.Mat(this.hsvRoi.rows, this.hsvRoi.cols, this.hsvRoi.type(), this.lowScalar);
                this.high = new cv.Mat(this.hsvRoi.rows, this.hsvRoi.cols, this.hsvRoi.type(), this.highScalar);
                cv.inRange(this.hsvRoi, this.low, this.high, this.maskColor);
                

                //Show detected Color
                /*
                let bitwise = new cv.Mat(); 
                cv.bitwise_and(this.hsvRoi, this.hsvRoi, bitwise, maskColor)
                cv.imshow(this.$refs.canvas3, bitwise);  
                */

                //Detect Contours


                cv.findContours(this.maskColor, this.contours, this.hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
                 
                for (let i = 0; i < this.contours.size(); ++i) {
                    
                    let cnt = this.contours.get(i);
                    let area = cv.contourArea(cnt, false)
                    

                    if(area > 22000) {
                        let rect = cv.boundingRect(cnt);
                        let rectangleColor = new cv.Scalar(255, 0, 0);
                        let point1 = new cv.Point(rect.x, rect.y);
                        let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
                        let msize = new cv.Size(69,69)
                        cv.rectangle(this.roi, point1, point2, rectangleColor, 2, cv.LINE_AA, 0);
                     
                        if(rect.width > this.trackWindow.width-120 && rect.width < this.trackWindow.width-1
                        ){
                            if(this.faceClass !== undefined){
                                
                                this.faceClass.detectMultiScale(this.frameGray, this.faces, 1.7, 3, 0, msize, msize);

                                for (let i=0;i<this.faces.size();i++) {
                                    let face = this.faces.get(i); 
                                    let point1 = new cv.Point(face.x, face.y); 
                                    let point2 = new cv.Point(face.x + face.width, face.y + face.height);
                                    cv.rectangle(this.roi, point1, point2, [255, 0, 0, 255]);
                                   
                                    if(face.y <= this.trackWindow.height*0.6 && face.x<=this.trackWindow.width*0.4){
                                        this.colorRec = new cv.Scalar(45, 206, 17, 255);
                                    } 
                                }
                            }   
                        }                    
                    }   
                }

                //Reference Rectangle
                cv.rectangle(this.frame, new cv.Point(w*0.2, h*0.2), new cv.Point(w*0.8,h*0.8), this.colorRec, 2);
                
                //Region  de detección Foto Frontal Dni Azul
                cv.rectangle(this.roi, new cv.Point(0, this.trackWindow.height*0.6), new cv.Point(this.trackWindow.width*0.4,0), this.colorRec, 2);

                
            },
            detectFacePosition(){
                
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

            // pause the video
            pause() {
                if (this.$refs.video !== null && this.$refs.video.srcObject) {
                    this.$refs.video.pause();
                }
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
