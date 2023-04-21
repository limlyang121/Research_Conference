import React, {useState} from "react";
import { FileUploader } from "react-drag-drop-files";
import './GoogleDriveUpload.css'

const fileTypes = ["PDF"]

function GoogleDriveUpload() {
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
      setFile(file);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append("file", file);

      alert("ok")
  
    //   try {
    //     const response = await fetch("https://your-backend-api.com/upload", {
    //       method: "POST",
    //       body: formData,
    //     });
  
    //     if (response.ok) {
    //       console.log("File uploaded successfully");
    //     } else {
    //       console.log("File upload failed");
    //     }
    //   } catch (error) {
    //     console.error("Error uploading file:", error);
    //   }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        <button type="submit" disabled={!file}>
          Upload
        </button>
      </form>
    );
};

export default GoogleDriveUpload;