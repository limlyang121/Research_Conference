import React, {useState} from "react";
import { FileUploader } from "react-drag-drop-files";
import './GoogleDriveUpload.css'
import { addPapersTest, addPapersTestDownload } from "../Axios";

import { saveAs } from "file-saver"
import { Button } from "reactstrap";

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

    const download = async () => {
      let response = await addPapersTestDownload();
      alert(JSON.stringify(response))
      const contentDispositionHeader = response.headers['content-disposition'];

      const filename = contentDispositionHeader.split(';')[1].trim().split('=')[1].replace(/"/g, '');

      const blob = new Blob([response.data], { type: "application/pdf" })
      saveAs(blob, filename)

    }
  
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

        <Button onClick={async() => download()} > Download Test</Button>
      </form>
    );
};

export default GoogleDriveUpload;