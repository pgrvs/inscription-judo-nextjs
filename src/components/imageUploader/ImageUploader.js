import React, { useState, useRef } from 'react'
import Webcam from 'react-webcam'

import styles from './ImageUploader.module.scss'
import AppareilPhoto from "@/assets/AppareilPhoto"

export default function ImageUploader({ initialBase64Image, onImageChange }) {
    const [base64Image, setBase64Image] = useState(initialBase64Image)
    const [useWebcam, setUseWebcam] = useState(false)
    const webcamRef = useRef(null)

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result.split(',')[1]
                setBase64Image(base64String)
                onImageChange({
                    "filename": 'image.' + file.name.split('.')[1],
                    "encoding": "base64",
                    "content": base64String,
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot()
        const base64String = imageSrc.split(',')[1]
        setBase64Image(base64String)
        onImageChange({
            filename: "image.png",
            encoding: "base64",
            content: base64String,
        })
    }

    return (
        <div className={styles.divPhoto}>
            <div className={styles.divImageUploader}>
                {base64Image ? (
                    <img className={styles.imageUploader} src={`data:image/png;base64,${base64Image}`} alt="Base64 Image"/>
                ):(
                    <div className={styles.divSansPhoto}>
                        <AppareilPhoto/>
                    </div>
            )}
            </div>
            {useWebcam && (
                <div className={styles.divWebcam}>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/png"
                        className={styles.webcam}
                        videoConstraints={{ width: 200, height: 267, facingMode: "user" }}
                    />
                </div>
            )}
            <div className={styles.divButtons}>
                <input
                    className={styles.inputImage}
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                />
                <button className={styles.buttonCamera} onClick={() => setUseWebcam(!useWebcam)}>
                    {useWebcam ? 'Arrêter la caméra' : 'Utiliser la caméra'}
                </button>
                {useWebcam && (
                    <button className={styles.buttonCamera} onClick={capture}><AppareilPhoto/>Capture Photo</button>
                )}
            </div>
        </div>
    )
}