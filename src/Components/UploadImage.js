import React, { useRef, useState } from "react";

const UploadData = () => {
    const ref = useRef();
    const [upload, setUpload] = useState({
        uploaded: false,
        files: '',
        errors: {
            fileError: false,
            fileMessage: '',
        }
    })

    const saveImage = (event) => {
        const { uploaded } = upload
        const { files } = event.target;
        const localImageUrl = window.URL.createObjectURL(files[0], [1]);
        if (files) {
            upload.uploaded = true
        }

        setUpload({ ...upload, upload: uploaded })
        console.log("url", localImageUrl)
    }


    const close = () => {
        const { uploaded } = upload

        upload.uploaded = false
        ref.current.value = ""
        setUpload({ ...upload, upload: uploaded })
    }
    
    const submit = (e) => {
        e.preventDefault();


        const { errors } = upload
        if (!upload.files) {
            errors.fileError = false;
            errors.fileMessage = '';

        } else {
            errors.fileError = true;
            errors.fileMessage = 'File is Empty';

        }
    }
    const uploadClick = e => {
        ref.current.click();
    };

    return (
        <div className="main">

            <div className="flx align-center justify-center upload-file mt2" onClick={uploadClick}>
                <a href="#" className="underline fntGreen pr1">Add File</a>
                <span>or drop profile picture here</span>
                <input type="file" hidden id="profile-pic" onChange={saveImage} ref={ref} />
                {
                    upload.errors && <span>{upload.errors.fileMessage}</span>
                }
            </div>
        </div>
    )
}
export default UploadData;