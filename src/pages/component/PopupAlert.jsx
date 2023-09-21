import { CheckCircleOutlineRounded, ReportProblemOutlined, DeleteForeverOutlined } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, Typography, Box, Button } from '@mui/material';

export const SuccessAlert = ({ title, description, open, close }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
        <DialogTitle>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <CheckCircleOutlineRounded sx={{ color: '#30A952', fontSize: '90px', fontWeight: 'light' }} />
          </Box>
          <Typography fontSize="14pt" textAlign="center" fontWeight="bold" color="#848484">
            {title}
          </Typography>
          <Typography fontSize="10pt" textAlign="center" color="#848484">
            {description}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              style={{
                textTransform: 'capitalize',
                width: '20%',
                backgroundColor: '#2C8AD3',
                color: 'white',
              }}
              onClick={close}
            >
              OK
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const WarningAlert = ({ title, description, open, close, handleClick }) => {
  const handleClickFix = () => {
    close();
    handleClick();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
        <DialogTitle>
          <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
            <ReportProblemOutlined sx={{ color: 'yellow', fontSize: '90px', fontWeight: 'light' }} />
          </Box>
          <Typography fontSize="14pt" textAlign="center" fontWeight="bold" color="#848484">
            {title}
          </Typography>
          <Typography fontSize="10pt" textAlign="center" color="#848484">
            {description}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              style={{
                textTransform: 'capitalize',
                width: '20%',
                backgroundColor: '#2C8AD3',
                color: 'white',
              }}
              onClick={handleClickFix}
            >
              OK
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const DeleteAlert = ({open, close, title, description, deleteClick})=>{
  return(
      <div style={{ textAlign: 'center' }}>
      <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
        <DialogTitle>
          <Box display="flex" justifyContent="left" alignItems="center" mb={2}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#FEE4E2',
                border: '8px #FEF3F2 solid',
                display: 'flex',
                justifyContent: 'center', // Pusatkan secara horizontal
                alignItems: 'center',
              }}
            >
              <DeleteForeverOutlined fontSize="inherit" style={{ width: 18, height: 20, color: '#D92D20' }} />
            </div>
          </Box>

          <Typography fontSize={'14pt'} textAlign={'left'} fontWeight={'bold'} color={'#848484'} sx={{ fontFamily: 'Inter' }}>
            {title}
          </Typography>
          <Typography fontSize={'10pt'} textAlign={'left'} color={'#475467'} sx={{ fontFamily: 'Inter' }}>
            {description}
          </Typography>
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={() => {
              close();
            }}
            style={{
              fontFamily: 'Poppins',
              color: '#344054',
              fontSize: 14,
              background: '#FFFFFF',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
              width: '100%',
              height: '100%',
              padding: 10,
              textTransform: 'none',
              boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
              overflow: 'hidden',
              border: '1px #D0D5DD solid',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteClick();
              close(); 
            }}
            color="primary"
            style={{
              fontFamily: 'Poppins',
              color: 'white',
              fontSize: 14,
              background: '#D92D20',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 10,
              display: 'inline-flex',
              width: '100%',
              height: '100%',
              padding: 10,
              textTransform: 'none',
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
