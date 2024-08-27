import React, { useState, useEffect, useRef } from "react";
import "C:/Users/my lap/.vscode/vidomeet/frontend/styles/videoComponent.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import io from 'socket.io-client';

const server_url = "http://localhost:8000";
var connections = {}
const PeerConfigurations = {
    "iceServers":[
        {"urls":"stun:stun.l.google.com.19302"}
    ]
}
export default function VideoMeetComponent() {
    var socketRef = useRef();
    let socketIdRef = useRef();
    let localVideoRef = useRef();

    let [videoAvailable,setVideoAvailable] = useState(true);
    let [audioAvailable,setAudioAvailable] = useState(true);
    let [video,setVideo] = useState([]);
    let [audio,setAudio] = useState();
    let [screen,setScreen] = useState();
    let [showModal,setShowModal] = useState();
    let [messages,setMessages] = useState([]);
    let [message,setMessage] = useState("");
    let [newMessages,setNewMessages] = useState(0);
    let [screenAvailable, setScreenAvailable] = useState(false);
    let [askForUsername,setAskForUsername] = useState(true);
    let [username,setUsername] = useState("");
    const videoRef = useRef([]);
    let [videos,setVideos] = useState([]);
    // todo
    // if(isChrome === false){

    // }
    const getPermissions = async () => {
        try{
            const videoPermission = await navigator.mediaDevices.getUserMedia({video:true});
            if(videoPermission){
                setVideoAvailable(true);
            }else{
                setVideoAvailable(false);
            }
            const audioPermission = await navigator.mediaDevices.getUserMedia({audio:true});
            if(audioPermission){
                setAudioAvailable(true);
            }else{
                setAudioAvailable(false);
            }
            if(navigator.mediaDevices.getDisplayMedia){
                setScreenAvailable(true);
            }else{
                setScreenAvailable(false);
            }
            if(videoAvailable  || audioAvailable){
                const userMediaStream = await navigator.mediaDevices.getUserMedia({video : videoAvailable,audio : audioAvailable});
                if(userMediaStream){
                    window.localStream = userMediaStream;
                    if(localVideoRef.current){
                        localVideoRef.current.srcObject = userMediaStream;
                    }
                }
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        getPermissions();
    },[])
    let getUserMediaSuccess = (stream) => {

    }
    let getUserMedia = () => {
        if((video && videoAvailable) || (audio && audioAvailable)){
            navigator.mediaDevices.getUserMedia({video: video,audio: audio})
            .then(getUserMediaSuccess)
            .then((stream) => { })
            .catch((e) => console.log(e))
        }else{
            try{
                let tracks = localVideoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop())
            }catch(e){
                
            }
        }
    }
    useEffect(()=>{
        if(video !== undefined && audio !== undefined){
            getUserMedia();
        }
    },[audio,video])

    let gotMessageFromServer = (fromId,message) => {

    }
    let addMessage = () => {

    }
    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, {secure: false })
        socketRef.current.on('signal',gotMessageFromServer);
        socketRef.current.on("connect", () => {
            socketRef.current.emit("join-call",window.location.href)
            socketIdRef.current = socketRef.current.id
            socketRef.current.on("chat-message",addMessage)
            socketRef.current.on("user-left",(id) => {
                setVideo((videos)=>videos.filter((video)=>video.socketId !== id))
            })
            socketRef.current.on("user-joined",(id,clients) => {
                clients.forEach((socketListId) => {
                    connections[socketListId] = new RTCPeerConnection(peerConfigConnections)
                    connections[socketListId].onicecandidate = (event) => {
                        if(event.candidate !== null){
                            socketRef.current.emit("signal",socketListId,JSON.stringify({'ice':event.candidate}))
                        }
                    }
                    connections[socketListId].onaddstream = (event) => {
                        let videoExists = videoRef.current.find(video => video.socketId === socketListId);
                        if(videoExists){
                            setVideo(videos => {
                                const updatedVideos = videos.map(video => 
                                    video.socketId === socketListId ? {...video,stream: event.stream}:video
                                );
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            })
                        }else{
                            let newVideo = {
                                socketId: socketListId,
                                stream: event.stream,
                                autoPlay: true,
                                playsinline:true
                            }
                            setVideos(videos => {
                                const updatedVideos = [...videos,newVideo];
                                videoRef.current = updatedVideos;
                                return updatedVideos;
                            })
                        }
                    }
                    if(window.localStream !== null && window.localStream !== undefined){
                        connections[socketListId].addStream(window.localStream);
                    }else{
                        // todo blacksilence
                    }
                })
            })
        })
    }
    let getMedia = () => {
        setVideo(videoAvailable);
        setAudio(audioAvailable);
        connectToSocketServer();
    }

    let connect = () =>{ 
        setAskForUsername(false);
        getMedia();
    }
    return (
        <div>
            {
            askForUsername === true ?
            <div>
                <h2>Enter into Lobby</h2>
                <TextField id="outlined-basic" label="Username" value={username} onChange={e => setUsername(e.target.value)} variant="outlined" />
                <Button variant="contained" onClick={connect}>connect</Button>
                <div>
                    <video ref={localVideoRef}autoPlay muted></video>
                </div>
            </div>:<></>
            }
        </div>
    )
}