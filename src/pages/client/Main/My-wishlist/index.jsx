import { Box, Container, Typography, Grid, Avatar, Chip, Divider, Button } from '@mui/material';
import Navbar from '../Component/Navbar';
import { DeleteOutlineOutlined, KeyboardArrowRight, SimCardDownloadOutlined } from '@mui/icons-material';
import { DeleteAlert, SuccessAlert, WarningAlert } from 'pages/component/PopupAlert';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { fetchWishlist, removeWishlist, removeAllWishlist } from 'apis';
import { handleDownloadCVUrl } from 'pages/component/eventHandler';
import { useNavigate } from 'react-router-dom';
import { requestAllWishlist } from 'apis';

const Wishlist = () => {
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [talentData, setTalentData] = useState([]);
  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
  };
  const [successTitle, setSuccessTitle] = useState('');
  const [successDesc, setSuccessDesc] = useState('');

  const [isDeleteAlert, setIsDeleteAlert] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState('');
  const [deleteDesc, setDeleteDesc] = useState('');
  const [handleDelete, setHandleDelete] = useState(false);

  const [isWarnOpen, setIsWarnOpen] = useState(false);
  const [warnTitle, setWarnTitle] = useState('');
  const [warnDesc, setWarnDesc] = useState('');
  const [handleWarn, setHandleWarn] = useState();

  const [selectedWishId, setSelectedWishId] = useState('');
  const [countWishlist, setCountWishlist] = useState(0);

  const dataArray = Cookies.get('loginRequirement');
  const cookieData = JSON.parse(dataArray || '[]');
  const userId = cookieData.userId;

  const getDataWishlist = () => {
    if (userId !== null) {
      fetchWishlist(userId)
        .then((response) => {
          setTalentData(response.data);
          const talentIdArr = response.data.map((item) => item.talentId);
          setCountWishlist(talentIdArr.length);
        })
        .catch((error) => {
          console.error(error);
          if (userId !== undefined) handleWarnAlert(error.response.status, error.response.message, 'error');
        });
    }
  };

  const navigate = useNavigate();

  const navigateToDetail = (talentId) => {
    navigate('/client/main/detail/' + talentId);
  };

  const navigateToSignIn = () => {
    navigate('/client');
  };

  const handleWarnArr = {
    login: navigateToSignIn,
    error: () => {},
  };

  useEffect(() => {
    getDataWishlist();
  }, []);

  const handleRemoveWishlist = () => {
    removeWishlist(userId, selectedWishId)
      .then((response) => {
        if (response.status === 200) {
          getDataWishlist();
          const title = 'Wishlist removed successfully';
          const descrip = 'You can add other talent in your wishlist at "My Wishlist" menu.';
          handleSuccessAlert(title, descrip);
        } else {
          handleWarnAlert(response.status, response.message, 'error');
        }
      })
      .catch((error) => {
        console.log(error);
        handleWarnAlert(error.response.status, error.response.message, 'error');
      });
  };

  const handleRemoveAllWishlist = () => {
    removeAllWishlist(userId)
      .then((response) => {
        if (response.status === 200) {
          getDataWishlist();
          const title = 'All wishlist removed successfully';
          const descrip = 'You can add other talent in your wishlist at "My Wishlist" menu.';
          handleSuccessAlert(title, descrip);
        }
      })
      .catch((error) => {
        console.log(error);
        handleWarnAlert(error.response.status, error.response.message, 'error');
      });
  };

  const handleRequest = async () => {
    const wishlist = talentData.map((item) => ({ wishlistId: item.wishlistId }));
    await requestAllWishlist(userId, wishlist)
      .then((response) => {
        if (response.status === 200) {
          const title = 'Your Request is in Process!';
          const description = 'You can check your request status at "My Request" menu';
          handleSuccessAlert(title, description);
        } else {
          let title = response.response.data.status;
          let message = response.response.data.message;
          const match = message.match(/\[(.*?)\]/);
          let talents = '';
          if (match) {
            const wishIds = match[1].split(',').map(Number);
            talentData.forEach((talent) => {
              wishIds.forEach((wish, idx) => {
                if (talent.wishlistId === wish) {
                  if (idx !== 0) {
                    talents += ' and ';
                  }
                  talents += talent.talentName;
                }
              });
            });
          }
          if (message.substr(-13) === 'not available') {
            console.log(message);
            title = 'Talent ' + talents + ' No Longer Available';
            message = 'You can choose other talent to replace them';
          } else if (message.substr(-25) === 'not found or unauthorized') {
            title = 'Talent ' + talents + ' Not Found or Unauthorized';
            message = 'You can choose other talent in main page';
          }
          handleWarnAlert(title, message, 'error');
        }
        getDataWishlist();
      })
      .catch((error) => {
        console.error('error fetching API : ' + error);
        handleWarnAlert(error.response.status, error.response.message, 'error');
      });
  };

  const handleDeleteAlert = (title, desc, handle) => {
    setDeleteTitle(title);
    setDeleteDesc(desc);
    setHandleDelete(handle);
    setIsDeleteAlert(true);
  };

  const handleSuccessAlert = (title, descrip) => {
    setSuccessTitle(title);
    setSuccessDesc(descrip);
    setIsSuccessOpen(true);
  };

  const handleWarnAlert = (title, descrip, handle) => {
    setWarnTitle(title);
    setWarnDesc(descrip);
    setHandleWarn(handle);
    setIsWarnOpen(true);
  };

  const warnLogin = () => {
    const title = 'Access Forbidden!';
    const descrip = 'You should login first!';
    handleWarnAlert(title, descrip, 'login');
  };

  return (
    <>
      <DeleteAlert
        open={isDeleteAlert}
        close={() => {
          setIsDeleteAlert(false);
        }}
        title={deleteTitle}
        description={deleteDesc}
        deleteClick={handleDelete ? handleRemoveWishlist : handleRemoveAllWishlist}
      />
      <WarningAlert
        title={warnTitle}
        description={warnDesc}
        open={isWarnOpen}
        close={() => {
          setIsWarnOpen(false);
        }}
        handleClick={handleWarnArr[handleWarn]}
      />
      <SuccessAlert title={successTitle} description={successDesc} open={isSuccessOpen} close={handleCloseSuccess} />
      <Navbar countWishlist={countWishlist} />
      {talentData.length !== 0 ? (
        <Box sx={{ maxWidth: '100vw', display: 'flex', flexDirection: 'column' }}>
          <Container sx={{ my: '3rem' }}>
            <Container sx={{ marginLeft: '50px' }}>
              <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '24px', fontStyle: 'normal' }}>
                My Wishlist
              </Typography>
            </Container>
            <Container sx={{ my: '1rem' }}>
              <Grid container>
                <Grid
                  container
                  sx={{
                    padding: '2rem 3rem 2rem 3rem',
                    width: '100%',
                    display: 'flex',
                    justifyContent: { xs: 'space-between', sm: 'flex-end' },
                    gap: '2rem',
                    boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.1)',
                    borderRadius: '15px',
                  }}
                >
                  {talentData.map((dataTalent, index) => (
                    <Grid key={index} container>
                      <Grid
                        container
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'noWrap',
                          flexGrow: '1',
                          width: 'auto',
                        }}
                      >
                        <Grid item>
                          <Avatar alt="talent photo" src={dataTalent?.talentPhotoUrl} sx={{ width: 70, height: 70 }} />
                        </Grid>
                        <Grid item sx={{ mx: '2rem' }}>
                          <Grid container sx={{ mb: '0.2rem', gap: '0.5rem', alignItems: 'center' }}>
                            <Grid item>
                              <Chip
                                label={
                                  <Typography sx={{ fontFamily: 'Inter', fontWeight: '400', fontSize: '10pt' }}>
                                    {dataTalent?.talentAvailability === false ? 'Not Available' : 'Available'}
                                  </Typography>
                                }
                                variant="outlined"
                                size="small"
                                sx={{ color: dataTalent?.talentAvailability === false ? 'red' : '#30A952', padding: '2' }}
                              />
                            </Grid>
                            <Grid item>
                              <Typography
                                fontWeight="bold"
                                color="primary"
                                fontSize="14pt"
                                sx={{
                                  color: '#2C8AD3',
                                  fontFamily: 'Poppins',
                                }}
                              >
                                {dataTalent.talentName}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            sx={{
                              mb: '0.75rem',
                              gap: '0.5rem',
                              alignItems: 'center',
                              display: { xs: 'none', sm: 'flex' },
                            }}
                          >
                            <Grid item>
                              <Typography variant="body2" sx={{ color: '#848484' }}>
                                {dataTalent.experience} Year of Experience
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Box sx={{ width: '4px', height: '4px', backgroundColor: '#848484', borderRadius: '100%' }} />
                            </Grid>
                            <Grid item>
                              <Typography variant="body2" sx={{ color: '#848484' }}>
                                {dataTalent.talentLevel} Level
                              </Typography>
                            </Grid>
                          </Grid>
                          <Typography fontWeight="bold" variant="body2" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            Position
                          </Typography>
                          <Grid container sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            {dataTalent.position.map((item, index) => (
                              <Box
                                sx={{
                                  mr: '0.5rem',
                                  backgroundColor: '#E4EEF6',
                                  borderRadius: '3px',
                                  mb: '1.5',
                                }}
                                width="fit-content"
                                key={index}
                              >
                                <Typography variant="body2" sx={{ p: '2px 5px' }}>
                                  {item?.positionName}
                                </Typography>
                              </Box>
                            ))}
                          </Grid>
                          <Typography variant="body2" sx={{ mt: '1rem', display: { xs: 'none', sm: 'flex' } }} fontWeight="bold">
                            Skill Set
                          </Typography>
                          <Grid container sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            {dataTalent.skillSet.map((item, index) => (
                              <Box
                                sx={{
                                  mr: '0.5rem',
                                  backgroundColor: '#E4EEF6',
                                  borderRadius: '3px',
                                  mb: '1.5',
                                }}
                                width="fit-content"
                                key={index}
                              >
                                <Typography variant="body2" sx={{ p: '2px 5px' }}>
                                  {item?.skillsetName}
                                </Typography>
                              </Box>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Divider orientation="vertical" sx={{ display: { xs: 'none', sm: 'block' } }} />
                        <Container sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, alignItems: 'flex-start' }}>
                          <Button
                            onClick={() => {
                              navigateToDetail(dataTalent?.talentId);
                            }}
                            startIcon={<KeyboardArrowRight />}
                            sx={{ textTransform: 'none' }}
                          >
                            <Typography sx={{ fontFamily: 'Inter', fontWeight: '400', fontSize: { xs: '8pt', sm: '12pt' } }}>See Detail</Typography>
                          </Button>
                          <Button
                            onClick={() => {
                              handleDownloadCVUrl({
                                cvUrl: dataTalent?.talentCvUrl,
                                warn: warnLogin,
                                talentName: dataTalent?.talentName,
                                success: handleSuccessAlert,
                              });
                            }}
                            startIcon={<SimCardDownloadOutlined />}
                            sx={{ color: '#848484', textTransform: 'none' }}
                          >
                            <Typography sx={{ fontFamily: 'Inter', fontWeight: '400', fontSize: { xs: '8pt', sm: '12pt' } }}>Download CV</Typography>
                          </Button>
                          <Button
                            onClick={() => {
                              setSelectedWishId(dataTalent?.wishlistId);
                              const title = 'Remove Talent ' + dataTalent?.talentName + ' from your Wishlist';
                              const descrip = 'Are you sure you want to remove your wishlist?';
                              handleDeleteAlert(title, descrip, true);
                            }}
                            startIcon={<DeleteOutlineOutlined />}
                            sx={{ color: 'red', textTransform: 'none' }}
                          >
                            <Typography sx={{ fontFamily: 'Inter', fontWeight: '400', fontSize: { xs: '8pt', sm: '12pt' } }}>Remove</Typography>
                          </Button>
                        </Container>
                      </Grid>
                      {/* ditampilkan jika bukan data terakhir */}
                      {index !== talentData.length - 1 && (
                        <Container
                          sx={{
                            display: { xs: 'none', sm: 'flex' },
                            flexDirection: 'column',
                            marginTop: '30px',
                          }}
                        >
                          <Divider sx={{ m: '2', mt: '3' }} />
                        </Container>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Container>
            <Container>
              <Grid
                container
                sx={{
                  padding: '1rem',
                  width: '100%',
                  display: 'flex',
                  justifyContent: { xs: 'space-between', sm: 'flex-end' },
                  gap: '2rem',
                  boxShadow: '0px 5px 20px 0px rgba(0,0,0,0.1)',
                  borderRadius: '15px',
                }}
              >
                <Grid item>
                  <Button
                    onClick={() => {
                      const title = 'Remove All your Wishlist';
                      const descrip = 'Are you sure you want to remove all of your wishlist?';
                      handleDeleteAlert(title, descrip, false);
                    }}
                    startIcon={<DeleteOutlineOutlined />}
                    sx={{ color: 'red', textTranform: 'none' }}
                  >
                    Remove All
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleRequest}
                    sx={{
                      backgroundColor: '#2C8AD3',
                      color: 'white',
                      textTransform: 'none',
                      paddingLeft: '25px',
                      paddingRight: '25px',
                    }}
                  >
                    Request Talent
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Container>
        </Box>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" gap="20px" justifyContent="center" width="100%" style={{ height: '100vh' }}>
          <Box
            sx={{
              width: { xs: '150px', md: '310px' },
              md: { xs: '150px', md: '310px' },
            }}
          >
            <img src="" style={{ width: '100%', height: 'auto' }} />
          </Box>
          <Typography>Your wishlist is currently empty, but don't worry! We're here to help you discover your dream team.</Typography>
        </Box>
      )}
    </>
  );
};
export default Wishlist;
