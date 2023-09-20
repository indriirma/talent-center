import { CheckCircleOutlineRounded, ReportProblemOutlined } from '@mui/icons-material';
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
