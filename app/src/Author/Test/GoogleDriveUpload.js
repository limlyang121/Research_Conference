import React, {useState} from "react";
import { FileUploader } from "react-drag-drop-files";
import './GoogleDriveUpload.css'
import { addPapersTest } from "../Axios";

const fileTypes = ["PDF"]

function GoogleDriveUpload() {
    const [file, setFile] = useState(null);

    const handleChange = (file) => {
      setFile(file);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData()
      formData.append("file", file)



      let response = await addPapersTest(formData);
      // alert(response)

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