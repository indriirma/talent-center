import { useState, useEffect } from 'react';
import { Box, Divider, Grid, Avatar, Typography, Button, Container, Stack } from '@mui/material';
import { AddOutlined, KeyboardArrowRight, SimCardDownloadOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
// import MainPageAlert from 'components/GlobalAlert';
import Cookies from 'js-cookie';
import { addToWishlist, fetchWishlist } from 'apis';
import { handleDownloadCVUrl } from 'pages/component/eventHandler';

const TalentTag = ({ tagTitle }) => {
  return (
    <Box sx={{ mr: '0.5rem', backgroundColor: '#E4EEF6', borderRadius: '3px', my: { xs: '0.25rem', md: '0' } }}>
      <Typography variant="body2" fontFamily="Inter" sx={{ padding: '2px 5px' }}>
        {tagTitle}
      </Typography>
    </Box>
  );
};

const TalentCard = ({ talentDetail, open, warn, success }) => {
  const totalPositions = talentDetail?.position?.length || 0;
  const totalSkills = talentDetail?.skillSet?.length || 0;
  const maxDisplayedItems = 2; // Ganti dengan jumlah item yang ingin ditampilkan

  const [inWishlist, setInWishlist] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const navigate = useNavigate();

  const dataArray = Cookies.get('loginRequirement');
  const cookieData = JSON.parse(dataArray || '[]');
  const userId = cookieData.userId;

  const navigateToDetail = (talentId) => {
    navigate('detail/' + talentId);
  };

  const handleAddToList = async (talentId) => {
    try {
      if (userId === undefined) {
        warn();
        return;
      }
      const success = await addToWishlist(talentId, userId);
      updateTalentInWishlist(userId);
      const successTitle = 'Talent added to wishlist!';
      const successDescription = 'You can check your talent wishlist at "My Wishlist" menu';
      success(successTitle, successDescription);
      open();
      console.log(success);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTalentInWishlist = async (userId) => {
    fetchWishlist(userId)
      .then((response) => {
        const talentIds = response.data.map((item) => item.talentId);
        setInWishlist(talentIds.includes(talentDetail?.talentId));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    updateTalentInWishlist(userId);
  }, []);

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        boxShadow: '0px 5px 20px 0px rgba(0, 0, 0, 0.10)',
        borderRadius: '10px',
        py: { xs: '1rem', sm: '0' },
      }}
      data-testid="talent-card"
    >
      {/* <MainPageAlert open={alertOpen} onClose={() => setAlertOpen(false)} str={alertMessage} severity={alertSeverity} /> */}

      <Grid
        container
        sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', flexGrow: '1', width: 'auto', mx: '2rem', my: '1rem', minHeight: '200px' }}
      >
        <Grid item>
          <Avatar
            alt="Talent Picture"
            src={talentDetail?.talentPhotoUrl}
            sx={{
              width: { xs: '40px', md: '80px' },
              height: { xs: '40px', md: '80px' },
            }}
          />
        </Grid>
        <Grid item sx={{ mx: '2rem' }}>
          <Grid container sx={{ mb: '0.1rem', gap: '0.5rem', alignItems: 'center' }}>
            <Grid item>
              <Typography
                variant="body2"
                fontFamily="Inter"
                sx={{
                  padding: '1px 4px',
                  color: talentDetail?.talentStatus === 'Available' || 'Onsite' ? 'green' : 'red',
                  border: 'solid',
                  borderWidth: '1px',
                  borderRadius: '15px',
                }}
              >
                {talentDetail?.talentStatus}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" fontWeight="Bold" fontFamily="Poppins" sx={{ color: '#2C8AD3' }}>
                {talentDetail?.talentName}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{ mb: '0.75rem', gap: '0.5rem', alignItems: 'center' }}>
            <Grid item>
              <Typography variant="body2" fontFamily="Inter" sx={{ color: '#848484' }}>
                {talentDetail?.talentExperience} Years of Experience
              </Typography>
            </Grid>
            <Grid item>
              <Box sx={{ width: '4px', height: '4px', backgroundColor: '#848484', borderRadius: '100%' }} />
            </Grid>
            <Grid item>
              <Typography variant="body2" fontFamily="Inter" sx={{ color: '#848484' }}>
                {talentDetail?.talentLevel} Level
              </Typography>
            </Grid>
          </Grid>

          <Typography fontFamily="Poppins">
            <b>Position</b>
          </Typography>
          <Grid container sx={{ mb: '0.75rem', gap: '0.5rem', alignItems: 'center' }}>
            {talentDetail?.position !== undefined && talentDetail?.position.length > 0 ? (
              talentDetail?.position.map(
                (position, index) =>
                  index < maxDisplayedItems && (
                    <TalentTag
                      key={index}
                      tagTitle={position?.positionName}
                      sx={{
                        backgroundColor: '#E4EEF6',
                        borderRadius: '3px',
                        my: { xs: '0.25rem', md: '0' },
                        '&:not(:last-child)': {
                          marginRight: '0.5rem',
                        },
                      }}
                    />
                  )
              )
            ) : (
              <Typography variant="body2" fontFamily="Inter" sx={{ padding: '2px 5px' }}>
                -
              </Typography>
            )}
            {totalPositions > maxDisplayedItems && (
              <Typography variant="body2" fontFamily="Inter" sx={{ padding: '2px 5px' }}>
                +{totalPositions - maxDisplayedItems}
              </Typography>
            )}
          </Grid>

          <Typography fontFamily="Poppins">
            <b>Skill Set</b>
          </Typography>
          <Grid container sx={{ mb: '0.75rem', gap: '0.5rem', alignItems: 'center' }}>
            {talentDetail?.skillSet !== undefined && talentDetail?.skillSet.length > 0 ? (
              talentDetail?.skillSet.map(
                (skillSet, index) =>
                  index < maxDisplayedItems && (
                    <TalentTag
                      key={index}
                      tagTitle={skillSet?.skillsetName}
                      sx={{
                        backgroundColor: '#E4EEF6',
                        borderRadius: '3px',
                        my: { xs: '0.25rem', md: '0' },
                        '&:not(:last-child)': {
                          marginRight: '0.5rem',
                        },
                      }}
                    />
                  )
              )
            ) : (
              <Typography variant="body2" fontFamily="Inter" sx={{ padding: '2px 5px' }}>
                -
              </Typography>
            )}
            {totalSkills > maxDisplayedItems && (
              <Typography variant="body2" fontFamily="Inter" sx={{ padding: '2px 5px' }}>
                +{totalSkills - maxDisplayedItems}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ flexGrow: '1', width: 'auto', mx: '2rem' }}>
        <Divider />
        <Container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', my: '1rem' }}>
          <Button
            startIcon={<SimCardDownloadOutlined />}
            onClick={() => {
              handleDownloadCVUrl({
                cvUrl: talentDetail?.talentCvUrl,
                warn: warn,
                talentName: talentDetail?.talentName,
                success: success,
                sucOpen: open,
              });
            }}
            sx={{ textTransform: 'none', fontFamily: 'Inter' }}
          >
            Download CV
          </Button>
          <Stack direction="row" spacing={2} sx={{ flexGrow: '1', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<AddOutlined />}
              onClick={() => handleAddToList(talentDetail.talentId)}
              disabled={inWishlist}
              sx={{ textTransform: 'none', borderColor: '#2C8AD3', fontFamily: 'Inter' }}
              variant="outlined"
            >
              {inWishlist ? 'In Wishlist' : 'Add to List'}
            </Button>
            <Button
              endIcon={<KeyboardArrowRight />}
              sx={{ display: { xs: 'none', sm: 'flex' }, textTransform: 'none', color: 'white', backgroundColor: '#2C8AD3', fontFamily: 'Inter' }}
              onClick={() => navigateToDetail(talentDetail?.talentId)}
            >
              See Detail
            </Button>
          </Stack>
        </Container>
        <Container sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'flex-end' }}>
          <Button
            endIcon={<KeyboardArrowRight />}
            sx={{ textTransform: 'none', color: 'white', backgroundColor: '#2C8AD3', fontFamily: 'Inter', padding: '10px' }}
          >
            See Detail
          </Button>
        </Container>
      </Grid>
    </Grid>
  );
};

export default TalentCard;
