import { Box, Container, Typography, Grid, Avatar, Chip, Divider, Button } from '@mui/material';
import Navbar from '../Component/Navbar';
import { DeleteOutlineOutlined, KeyboardArrowRight, SimCardDownloadOutlined } from '@mui/icons-material';
import { DeleteAlert, SuccessAlert, WarningAlert } from 'pages/component/PopupAlert';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { fetchWishlist, removeWishlist, removeAllWishlist } from 'apis';
import { handleDownloadCVUrl } from 'pages/component/eventHandler';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const title = 'Your Request is in Process!';
  const description = 'You can check your request status at "My Request" menu';
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
  const [handleWarn, setHandleWarn] = useState(null);

  const [selectedWishId, setSelectedWishId] = useState('');

  const dataArray = Cookies.get('loginRequirement');
  const cookieData = JSON.parse(dataArray || '[]');
  const userId = cookieData.userId;

  const getDataWishlist = () => {
    if (userId !== null) {
      fetchWishlist(userId)
        .then((response) => {
          setTalentData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const navigate = useNavigate();

  const navigateToDetail = (talentId) => {
    navigate('/client/main/detail/' + talentId);
  };

  useEffect(() => {
    getDataWishlist();
  }, []);

  const handleRemoveWishlist = () => {
    removeWishlist(userId, selectedWishId)
      .then((response) => {
        if (response.status == '200') {
          getDataWishlist();
          const title = 'Wishlist removed successfully';
          const descrip = 'You can add other talent in your wishlist at "My Wishlist" menu.';
          handleSuccessAlert(title, descrip);
        } else {
          handleWarnAlert(response.status, response.message, null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveAllWishlist = () => {
    removeAllWishlist(userId)
      .then((response) => {
        if (response.status == '200') {
          getDataWishlist();
          const title = 'All wishlist removed successfully';
          const descrip = 'You can add other talent in your wishlist at "My Wishlist" menu.';
          handleSuccessAlert(title, descrip);
        } else {
          handleWarnAlert(response.status, response.message, null);
        }
      })
      .catch((error) => {
        console.log(error);
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
        handleClick={handleWarn}
      />
      <SuccessAlert title={successTitle} description={successDesc} open={isSuccessOpen} close={handleCloseSuccess} />
      <Navbar />
      {talentData.length !== 0 ? (
        <Box sx={{ maxWidth: '100vw', display: 'flex', flexDirection: 'column' }}>
          <Container sx={{ my: '3rem' }}>
            <Container sx={{ marginLeft: '50px' }}>
              <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '24px', fontStyle: 'normal' }}>
                My Wishlist
              </Typography>
            </Container>
            <Container sx={{ my: '1rem' }}>
              <Grid container sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Grid
                  container
                  sx={{
                    padding: '2rem 5rem 2rem 5rem',
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
                                  <Typography sx={{ fontFamily: 'Inter', fontWeight: '400', fontSize: '10pt' }}>{dataTalent.talentStatus}</Typography>
                                }
                                variant="outlined"
                                size="small"
                                sx={{ color: '#30A952', padding: '2' }}
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
                          <Typography fontWeight="bold" variant="body2">
                            Position
                          </Typography>
                          <Grid container>
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
                          <Typography variant="body2" sx={{ mt: '1rem' }} fontWeight="bold">
                            Skill Set
                          </Typography>
                          <Grid container>
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
                          display: { xs: 'none', sm: 'flex' },
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Divider orientation="vertical" />
                        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                          <Button
                            onClick={() => {
                              navigateToDetail(dataTalent?.talentId);
                            }}
                            startIcon={<KeyboardArrowRight />}
                            sx={{ textTransform: 'none' }}
                          >
                            See Detail
                          </Button>
                          <Button
                            onClick={() => {
                              handleDownloadCVUrl({ cvUrl: dataTalent?.talentCvUrl });
                            }}
                            startIcon={<SimCardDownloadOutlined />}
                            sx={{ color: '#848484', textTransform: 'none' }}
                          >
                            Download CV
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
                            Remove
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
                    // onClick={}
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
