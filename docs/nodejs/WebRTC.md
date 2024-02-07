# WebRTC

基于P2P， UDP

三个服务器：

- room服务器，房间管理，
- 信令服务器，
- 流媒体中转服务器

## 信令服务器

发起端发送 SDP（**媒体信息**）和candidate（ **网络信息**），到信令服务器，

信令服务器 转发到接收端

**媒体信息**：Session Description Protocol，是数据格式，包含编码器、分辨率之类的信息

**网络信息**：ip

信令服务器可以用websocket

## STUN

Session Traversal Utilities for NAT,NAT会话穿越应用程序，可以让NAT后的客户端找到公网地址

## TURN

Traversal Using Relays around NAT,是STUN/RFC5389的一个拓展，服务器中转，当打洞失败时，可以作为中继

## ICE

ICE是一组穿透方法而不是协议，它融合了STUN和TURN，ICE使得两个NAT后设备通信更加便捷，ICE使用STUN进行打洞，若失败，则使用TURN进行中转。

![STUN and TRUN](/images/STUN-TRUN.png)

## WebRTC api

mediaStream， RTCPeerConnection

## 连接过程

媒体协商 + 网络协商

双方都创建PeerConnection， 一方发送offer SDP， 另一方应答answer SDP，最后双方再交换ICE candidate。

1. 发送端请求本地流，`MediaDevices.getUserMedia`
2. 发送端实例 `RTCPeerConnection` ，加入本地媒体流 `RTCPeerConnection.addTrack()` (Since addStream is deprecating)
3. **发送端创建offer**， `RTCPeeConnection.createOffer()`，拿到sdp
4. 发送端配置sdp， `RTCPeerConnection.setLocalDescription()`，本地端
5. 之后发送端请求STUN 服务器创建 ice candidates， `onIceCandidate`事件
6. 发送端 请求信令服务器 传输 offer 到 接收端.
7. 接收端 接收 offer，调用 `RTCPeerConnection.setR emoteDescription()` 记录远端的description
8. 接收端 获取本地流, 将每个media tracks 挂到peer connection，`RTCPeerConnection.addTrack()`
9. **接收端创建answer**，`RTCPeerConnection.createAnswer()`
10. 接收端 设置本地端description，调用 `RTCPeerConnection.setLocalDescription()`. 接收端有两端端信息
11. 接收端 通过信令服务器发送answer 到发送端.
12. 发送端 收到answer
13. 发送端 调用 `RTCPeerConnection.setRemoteDescription()` 设置远端的 description， 发送端也知道两端信息

网络协商

1. 发送端请求STUN服务器，监听`onIceCandidate`事件获取candidate，
2. 通过信令服务器发送candidate 到接收端
3. 接收端 `peerConnection.addIceCandidate` 到接收端的ice层
4. 接收端同样请求STUN，发送给发送端
5. candidate成功连接`peerConnection.onTrack`收到对方流，开始p2p
6. 无法打通，借助TURN中转

结束通话

1. 结束track， `videoElem.srcObject.getTracks().forEach(...stop())`
2. 清除peerConnection的事件回调
3. 关闭连接`peerConnection.close()`

![连接过程](/images/webrtc-diagram.png)

![webrtc1](/images/webrtc1.png)
![webrtc2](/images/webrtc2.png)
