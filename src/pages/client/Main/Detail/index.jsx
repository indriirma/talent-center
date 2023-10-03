import { Box, Container, Grid, Divider, Button, Typography } from '@mui/material';
import Navbar from '../Component/Navbar';
import { ColumnInfo, TagInfo, LabelInfo } from './Component';
import { fetchDataTalent } from 'apis';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Gallery } from './Gallery';
import { Carousel } from './Carousel';
import Cookies from 'js-cookie';
import { FileDownload } from '@mui/icons-material';
import { addToWishlist, fetchWishlist } from 'apis';
import { handleDownloadCVUrl } from 'pages/component/eventHandler';
import { styled } from '@mui/material/styles';
import { SuccessAlert, WarningAlert } from 'pages/component/PopupAlert';

const Detail = () => {
  const [dataTalent, setDataTalent] = useState({});
  const [isWishlist, setIsWishlist] = useState(false);
  const [isGalOpen, setIsGalOpen] = useState(false);
  const [galIndex, setGalIndex] = useState(0);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isWarnOpen, setIsWarnOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState('');
  const [successDesc, setSuccessDesc] = useState('');
  const [warningTitle, setWarningTitle] = useState('');
  const [warningDesc, setWarningDesc] = useState('');
  const [page, setPage] = useState('');
  const warnTitle = 'Access Forbidden!';
  const warnDescription = 'You should login first!';

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSuccessText = (title, desc) => {
    setSuccessTitle(title);
    setSuccessDesc(desc);
  };

  const handleWarningText = (title, desc) => {
    setWarningTitle(title);
    setWarningDesc(desc);
  };

  const navigateToSignIn = () => {
    navigate('/client');
  };

  const navigateToMain = () => {
    navigate('/client/main');
  };

  const handleWarnArr = {
    login: navigateToSignIn,
    main: navigateToMain,
    error: null,
  };

  const handleLoginFirst = () => {
    handleWarningText(warnTitle, warnDescription);
    setPage('login');
    setIsWarnOpen(true);
  };

  const dataArray = Cookies.get('loginRequirement');
  const cookieData = JSON.parse(dataArray || '[]');
  const userId = cookieData.userId;

  const handleSuccOpen = async () => {
    setIsSuccessOpen(true);
  };

  const updateWishlist = async (userId) => {
    fetchWishlist(userId)
      .then((response) => {
        if (response.status === 200) {
          const talentIdArr = response.data.map((item) => item.talentId);
          setIsWishlist(talentIdArr.includes(parseInt(id)));
        }
      })
      .catch((error) => {
        handleWarningText(error.response.status, error.response.massage);
        setPage('error');
        setIsWarnOpen(true);
      });
  };

  const fetchData = async () => {
    try {
      await fetchDataTalent(id).then((response) => {
        if (response.status === 200) {
          setDataTalent(response.data);
        }
      });
    } catch (error) {
      if (error.response.status === 400) {
        const title = 'Talent Not Found!';
        const descrip = 'You should choose one of Talents';
        handleWarningText(title, descrip);
        setPage('main');
        setIsWarnOpen(true);
      } else {
        handleWarningText(error.response.status, error.response.massage);
        setPage('error');
        setIsWarnOpen(true);
      }
    }
  };

  useEffect(() => {
    fetchData();
    updateWishlist(userId);
  }, [id]);

  const medias = [
    {
      type: 'img',
      url: dataTalent.talentPhotoUrl,
    },
    {
      type: 'img',
      url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    },
    {
      type: 'video',
      url: dataTalent.biographyVideoUrl,
    },
  ];

  const PositionTag = () => {
    return <>{dataTalent.position !== undefined && dataTalent.position.map((tag, index) => <TagInfo key={index} tag={tag?.positionName} />)}</>;
  };
  const SkillSetTag = () => {
    return <>{dataTalent.skillSet !== undefined && dataTalent.skillSet.map((tag, index) => <TagInfo key={index} tag={tag?.skillsetName} />)}</>;
  };

  const handleAddtoList = async () => {
    try {
      if (userId === undefined) {
        handleLoginFirst();
        return;
      }
      const success = await addToWishlist(dataTalent.talentId, userId);
      console.log(success);
      updateWishlist(userId);
      const successTitle = 'Talent added to wishlist!';
      const successDescription = 'You can check your talent wishlist at "My Wishlist" menu';
      handleSuccessText(successTitle, successDescription);
      setIsSuccessOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGalOpen = (index) => {
    setGalIndex(index);
    console.log('index gal : ', index);
    setIsGalOpen(true);
  };

  const handleGalClose = () => {
    setIsGalOpen(false);
  };

  const SkillsetComp = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  }));

  return (
    <Box sx={{ maxWidth: '100vw', display: 'flex', flexDirection: 'column' }}>
      <WarningAlert
        title={warningTitle}
        description={warningDesc}
        open={isWarnOpen}
        close={() => {
          setIsWarnOpen(false);
        }}
        handleClick={handleWarnArr[page]}
      />
      <SuccessAlert
        title={successTitle}
        description={successDesc}
        open={isSuccessOpen}
        close={() => {
          setIsSuccessOpen(false);
        }}
      />
      <Navbar />
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Container sx={{ boxShadow: '0px 5px 20px 0px rgba(0,0,0,0.10)', borderRadius: '10px', paddingTop: '20px', paddingBottom: '20px' }}>
          <Grid container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            <Grid item sx={{ m: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Carousel medias={medias} handleClick={handleGalOpen} />
              <Gallery medias={medias} open={isGalOpen} initialIndex={galIndex} close={handleGalClose} />
              <div style={{ width: '100%' }}>
                <Button
                  sx={{ textTransform: 'capitalize', fontFamily: 'Inter', my: '0.5rem', width: '100%' }}
                  variant="contained"
                  disabled={isWishlist ? true : false}
                  onClick={handleAddtoList}
                >
                  {isWishlist ? 'In Wishlist' : 'Add to list'}
                </Button>
                <Button
                  onClick={() => {
                    handleDownloadCVUrl({
                      cvUrl: dataTalent.talentCvUrl,
                      warn: handleLoginFirst,
                      talentName: dataTalent.talentName,
                      success: handleSuccessText,
                      sucOpen: handleSuccOpen,
                    });
                  }}
                  startIcon={<FileDownload />}
                  sx={{ textTransform: 'none', color: '#848484', backgroundColor: 'white', fontFamily: 'Inter', my: '0.5rem', width: '100%' }}
                >
                  Download CV
                </Button>
                <Divider sx={{ display: { xs: 'flex', sm: 'none' } }} />
              </div>
            </Grid>
            <Grid item sx={{ m: '1rem' }}>
              <Grid>
                <Grid
                  container
                  sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: '0.5rem', gap: '0.5rem', alignItems: 'center' }}
                >
                  <Grid item>
                    <Typography
                      variant="body2"
                      fontFamily="Inter"
                      sx={{
                        padding: '2px 8px',
                        color: dataTalent.talentAvailability === false ? 'red' : 'green',
                        border: 'solid',
                        borderWidth: '1px',
                        borderRadius: '15px',
                      }}
                    >
                      {dataTalent.talentAvailability === false ? 'Not Available' : 'Available'}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      variant="h6"
                      fontWeight="Bold"
                      fontFamily="Poppins"
                      sx={{
                        color: '#2C8AD3',
                      }}
                    >
                      {dataTalent.talentName}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, mb: '0.75rem', gap: '0.5rem', alignItems: 'center' }}
                >
                  <Grid item>
                    <Typography variant="body2" fontFamily="Inter" sx={{ color: '#848484' }}>
                      {dataTalent.talentExperience} Year of Experience
                    </Typography>
                  </Grid>
                  <Grid item sx={{ display: { xs: 'none', sm: 'flex' } }}>
                    <Box sx={{ height: '4px', width: '4px', backgroundColor: '#848484', borderRadius: '100%' }} />
                  </Grid>
                  <Grid item>
                    <Typography variant="body2" fontFamily="Inter" sx={{ color: '#848484' }}>
                      {dataTalent.talentLevel} Level
                    </Typography>
                  </Grid>
                </Grid>
                <ColumnInfo title={'Position'} content={<PositionTag />} />
                <SkillsetComp>
                  <ColumnInfo title={'Skill Set'} content={<SkillSetTag />} />
                </SkillsetComp>
                <ColumnInfo title={'Project Completed'} content={<LabelInfo title={'Projects'} data={dataTalent.projectCompleted} />} />
                <ColumnInfo title={'Total Request'} content={<LabelInfo title={'Requested'} data={dataTalent.totalRequested} />} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ m: '1rem' }}>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="h6"
              fontWeight="Bold"
              fontFamily="Poppins"
              sx={{
                color: '#2C8AD3',
                mt: 2,
              }}
            >
              About
            </Typography>
            <Typography
              variant="body2"
              fontFamily="Inter"
              sx={{
                my: 2,
                textAlign: 'justify',
              }}
            >
              {dataTalent.about}
              <Typography variant="body2" fontFamily="Inter" sx={{ mb: 1 }}>
                SKILL
                {dataTalent.skillSet && dataTalent.skillSet.length > 0 ? (
                  dataTalent.skillSet.map((item, index) => (
                    <Typography key={index} component="li" variant="body2" fontFamily="Inter">
                      {item?.skillsetName}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" fontFamily="Inter">
                    No skills available
                  </Typography>
                )}
                I look forward to taking in your project and building a site you are proud of
              </Typography>
            </Typography>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Detail;
