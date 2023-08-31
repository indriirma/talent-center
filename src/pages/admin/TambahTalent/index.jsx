import { ArrowBack } from '@mui/icons-material';
import { Card, CardContent, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

function TambahTalent() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  return (
    <Grid container alignItems="center" spacing={1}>
      <Grid item>
        <ArrowBack />
      </Grid>
      <Grid item>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: '100',
            fontSize: '20px',
            marginLeft: '10px',
            verticalAlign: 'middle',
          }}
        >
          Kembali
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} sx={{ marginTop: '20px' }}>
        <Card sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: '100',
              fontSize: '20px',
              marginLeft: '10px',
              verticalAlign: 'middle',
            }}
          >
            Tambah Talent
          </Typography>
        </Card>
        <Card sx={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', marginTop: '5px' }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: '500',
              fontSize: '24px',
              marginBottom: '10px',
            }}
          >
            Talent Photo's
          </Typography>
          <CardContent>
            <Typography variant="h5">Upload Photo</Typography>
            <Divider sx={{ margin: '10px 0' }} />
            <div
              sx={{
                border: '1px dashed #ccc',
                padding: '20px',
                borderRadius: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
              ) : (
                <Typography>Drag and drop an image here</Typography>
              )}
            </div>
            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} id="image-upload" />
            <label htmlFor="image-upload" sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <IconButton color="primary" component="span">
                {/* <CloudUploadIcon /> */}
              </IconButton>
              <Typography variant="subtitle1" sx={{ marginLeft: '5px' }}>
                Upload Talent Photo's
              </Typography>
            </label>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default TambahTalent;
