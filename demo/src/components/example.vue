<template>
    <section>
        <header>
            Análisis de DNI
        </header>
        <div class="content">
            <div class="left">
                <ol>
                    <li>
                        <span>1</span>
                        <p>Acercar el DNI hasta el area marcada</p>
                    </li>
                    <li>
                        <span>2</span>
                        <p class="text">
                            Mantener la posición y esperar que cargue
                            <b>Para mejorar la precisión realizar el test en areas iluminadas</b>
                        </p>

                    </li>
                </ol>
            </div>
            <div class="right">
                <template v-if="initCamera">
                    <WebCam
                            ref="webcam"
                            awsUrl="https://api.dev.prestamype.com/v1/prestajapi/post_upload_file_s3"
                            :awsConfig="{hola:'Mundo'}"
                            :device-id="deviceId"
                            :isFrontCam="frontCamera"
                            :width="888"
                            :height="500"
                            @started="onStarted"
                            @stopped="onStopped"
                            @error="onError"
                            :resolution="{width:4096,height:2160}"
                            @cameras="onCameras"
                            @camera-change="onCameraChange"
                            @image-ready="onImageReady"
                            @progress="onImageProgress"
                            @preview="onPreviewImage"
                            @recognition="OnRecognition"
                    ></WebCam>
                    <img :src="img" alt="">
                    {{error}}

                    <template v-if="!notSupport">
                        <button @click="Start">Iniciar</button>
                        <button @click="Stop">Parar</button>
                        <button @click="Capture">Foto</button>
                       <!-- <label><input type="checkbox" v-model="frontCamera">front Camera</label>-->
                    </template>

                </template>

            </div>
        </div>

    </section>
</template>

<script>
    import {WebCam} from "../../../src";

    export default {
        name: 'example',
        props: {
            msg: String
        },
        components: {
            WebCam,
        },
        data() {
            return {
                error: '',
                notSupport: false,
                initCamera: false,
                img: null,
                camera: null,
                frontCamera: true,
                deviceId: null,
                textOfDni: {},
                devices: []
            };
        },
        mounted() {
            this.initCamera = true;
        },
        computed: {
            device: function () {
                return this.devices.find(n => n.deviceId === this.deviceId);
            }
        },
        watch: {
            camera: function (id) {
                this.deviceId = id;
            },
            devices: function () {
                // Once we have a list select the first one
                let first = this.devices[0];

                if (first) {
                    this.camera = first.deviceId
                    this.deviceId = first.deviceId
                }

            }
        },
        methods: {
            onPreviewImage(preview) {
                this.img = preview;
            },
            OnRecognition(text) {
                this.textOfDni = text
            },
            onImageProgress(percent) {
                console.log(percent)
            },
            onImageReady(image) {
                console.log(image);
            },
            Capture() {
                this.$refs.webcam.capture();
            },
            onStarted(stream) {
                //console.log("On Started Event", stream);
            },
            onStopped(stream) {
                console.log("On Stopped Event", stream);
            },
            Stop() {
                this.$refs.webcam.stop();
            },
            Start() {
                this.$refs.webcam.start();
            },
            onError(error) {
                this.notSupport = true;
                this.error = error;
                console.log("On Error Event", error);
            },
            onCameras(cameras) {
                this.devices = cameras;
            },
            onCameraChange(deviceId) {
                this.deviceId = deviceId;
                this.camera = deviceId;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
    .content{
        display: flex;
        position: relative;
        justify-content: space-between;
        align-items: flex-start;
        width: 1300px;
        margin: 120px auto;
    }
    
    ol{
        padding-left: 0;
        text-align: left;
        margin-right: 20px;
    }

    ol span{
        width: 46px;
        height: 46px;
        border-radius: 50px;
        background: #0EBFB8;
        color: #fff;
        font-weight: 500;
        font-size: 24px;
        line-height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;
    }
    
    ol p{
        color: #0EBFB8;
        font-size: 12px;
        font-weight: bold;
    }
    ol p b{
        font-size: 10px;
        line-height: 16px;
        /* or 160% */
        font-weight: normal;
        letter-spacing: 0.75px;
        display: block;

        color: rgba(19, 19, 71, 0.6);
    }

    li{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 28px;
    }

    body {
        margin: 0;

    }

    header {
        width: 100%;
        background: #0EBFB8;
        color: #fff;
        position: fixed;
        height: 56px;
        align-items: center;
        left: 0;
        font-size: 20px;
        font-weight: bold;
        top: 0;
        display: flex;
        justify-content: flex-start;
        padding-left: 76px;
        z-index: 3;
    }


    p {
        font-size: 10px;
        text-align: left;
    }

    h3 {
        margin: 40px 0 0;
    }


    a {
        color: #42b983;
    }
</style>
