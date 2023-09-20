import { Box, Container, Grid, Divider, Button, Typography } from '@mui/material';
import Navbar from '../Component/Navbar';
import { ColumnInfo, TagInfo, LabelInfo } from './Component';
import { fetchDataTalent } from 'apis';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Gallery } from './Gallery';
import { Carousel } from './Carousel';
import Cookies from 'js-cookie';
import { FileDownload } from '@mui/icons-material';
import { addToWishlist, fetchWishlist } from 'apis';
import { handleDownloadCV } from 'pages/component/eventHandler';
import { styled } from '@mui/material/styles';

const Detail = () => {
  const [dataTalent, setDataTalent] = useState({});
  const [isWishlist, setIsWishlist] = useState(false);
  const [isGalOpen, setIsGalOpen] = useState(false);
  const [galIndex, setGalIndex] = useState(0);

  const { id } = useParams();

  const dataArray = Cookies.get('loginRequirement');
  const cookieData = JSON.parse(dataArray || '[]');
  const userId = cookieData.userId;

  const updateWishlist = async (userId) => {
    fetchWishlist(userId)
      .then((response) => {
        const talentIdArr = response.data.map((item) => item.talentId);
        setIsWishlist(talentIdArr.includes(parseInt(id)));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchData = async () => {
    try {
      const temp = await fetchDataTalent(id);
      setDataTalent(temp);
    } catch (error) {
      console.error('Error fetching data : ', error);
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
      type: 'video',
      url: dataTalent.biographyVideoUrl,
    },
    {
      type: 'img',
      url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
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
      if (userId !== null) {
        if (!dataTalent.talentId) {
          console.error('Talent ID is missing or invalid');
          return;
        }
        const success = await addToWishlist(dataTalent.talentId, userId);
        console.log(success);
        updateWishlist(userId);
      } else {
        console.error('You should login first');
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleGalOpen = (index) => {
    setGalIndex(index);
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
                    handleDownloadCV({ talentId: dataTalent.talentId, talentName: dataTalent.talentName });
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
                        color: dataTalent.talentStatus === 'Onsite' ? 'green' : 'red',
                        border: 'solid',
                        borderWidth: '1px',
                        borderRadius: '15px',
                      }}
                    >
                      {dataTalent.talentStatus}
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
                <ColumnInfo title={'Total Request'} content={<LabelInfo title="Requested" data={dataTalent.totalRequested} />} />
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
