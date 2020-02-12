<template>
    <div class="hello">
        <template v-if="initCamera">
            <WebCam
                    ref="webcam"
                    awsUrl="https://api.dev.prestamype.com/v1/prestajapi/post_upload_file_s3"
                    :device-id="deviceId"
                    width="100%"
                    @started="onStarted"
                    @stopped="onStopped"
                    @error="onError"
                    :resolution="{width:1280,height:720}"
                    @cameras="onCameras"
                    @camera-change="onCameraChange"
                    @image-ready="onImageReady"
                    @progress="onImageProgress"
            ></WebCam>

            <template  v-if="!notSupport">
                <button @click="Start">Iniciar</button>
                <button @click="Stop">Parar</button>
                <button @click="Capture">Foto</button>
            </template>
        </template>

    </div>

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
                notSupport: false,
                initCamera: false,
                img: null,
                camera: null,
                deviceId: null,
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
                const [first, ...others] = this.devices;
                if (first) {
                    this.camera = first.deviceId;
                    this.deviceId = first.deviceId;
                }
            }
        },
        methods: {
            onImageProgress(percent){
                console.log(percent)
            },
            onImageReady(image){
                console.log(image);
            },
            Capture() {
                this.img = this.$refs.webcam.capture();
            },
            onStarted(stream) {
                //console.log("On Started Event", stream);
            },
            onStopped(stream) {
                //console.log("On Stopped Event", stream);
            },
            Stop() {
                this.$refs.webcam.stop();
            },
            Start() {
                this.$refs.webcam.start();
            },
            onError(error) {
                this.notSupport = true;
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
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
