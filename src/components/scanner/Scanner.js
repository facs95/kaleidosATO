import React, { useEffect, useState, useRef } from "react";
import jsQR from "jsqr";
import { getValidateAttendee } from "../../apiURL";
import Welcome from "./Welcome";
import AttendeeInfo from "./AttendeeInfo";
import axios from "axios";
import "./scanner.scss";

function Scanner() {
  const [qrScanResult, setQrScanResult] = useState();
  const [attendeeInfo, setAttendeeInfo] = useState();
  const [attendeeName, setAttendeeName] = useState();

  const canvasRef = useRef();

  useEffect(() => {
    async function validateAttendee(address) {
      const url = getValidateAttendee(address);
      console.log(url);
      const response = await fetch(url);
      const { attendeeInfo } = await response.json();
      setAttendeeInfo(attendeeInfo);
    }
    if (qrScanResult) {
      validateAttendee(qrScanResult);
    }
  }, [qrScanResult]);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    drawVideo(canvasElement, setQrScanResult);
  }, []);

  return (
    <div className="qr-reader">
      <img
        src="https://console.kaleido.io/img/Chips_Login.svg"
        className="bg-image"
        alt=""
      />
      <div className="tile-container">
        <div className="scanner-tile">
          <h1 className="scan-qr-text">Scan QR code</h1>
          <div className="scanner-container">
            <canvas ref={canvasRef} className="scanner-canvas" hidden />
          </div>
        </div>
        <div className="attendee-tile">
          {attendeeInfo ? (
            <AttendeeInfo attendeeInfo={attendeeInfo} />
          ) : (
            <Welcome />
          )}
        </div>
      </div>
    </div>
  );
}

function drawVideo(canvasElement, callback) {
  const video = document.createElement("video");
  const canvas = canvasElement.getContext("2d");

  window.navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then(function(stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    });

  function drawLine(begin, end, color) {
    canvas.beginPath();
    canvas.moveTo(begin.x, begin.y);
    canvas.lineTo(end.x, end.y);
    canvas.lineWidth = 4;
    canvas.strokeStyle = color;
    canvas.stroke();
  }

  function tick() {
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvasElement.hidden = false;
      canvasElement.height = 300;
      canvasElement.width = 300;
      canvas.drawImage(
        video,
        0,
        0,
        canvasElement.width * 1.5,
        canvasElement.height * 1.5
      );
      canvas.filter = "blur(5px)";
      var imageData = canvas.getImageData(
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert"
      });
      if (code) {
        const borderColor = "#03CC79";
        drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          borderColor
        );
        drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          borderColor
        );
        drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          borderColor
        );
        drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          borderColor
        );
        callback(code.data);
      }
    }
    requestAnimationFrame(tick);
  }
}

export default Scanner;
