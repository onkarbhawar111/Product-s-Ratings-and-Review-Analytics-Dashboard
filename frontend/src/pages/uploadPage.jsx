import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../features/upload/uploadSlice";
import { Button, Container, Typography, CircularProgress, Alert } from "@mui/material";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'

const UploadPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.upload);
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return alert("Select file first");
    dispatch(uploadFile(file));
    navigate('/dashboard')
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Upload Sales Data
      </Typography>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <Button variant="contained" sx={{ mt: 2 }} onClick={handleUpload}>
        Upload
      </Button>

      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Upload Successful</Alert>}
    </Container>
  );
};

export default UploadPage;