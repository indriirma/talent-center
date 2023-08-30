import { Search as SearchIcon } from '@mui/icons-material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { AppBar, Autocomplete, Box, Button, Chip, Container, IconButton, TextField, Toolbar, Typography } from '@mui/material';
// import { popularTagsOption, tagsApi } from 'apis';
import { useEffect, useState } from 'react';
// // import Footer from '../components/FooterLanding';
// import ModalRegist from '../components/ModalRegist';
// import ModalSignIn from '../components/ModalSignIn';

const TitleWelcome = () => {
  const titleText = ['Welcome to Talent Center 79', 'Find a Talent That Suits Your Requirements', 'Build the Perfect Team For the Brighter Future'];
  const [TitleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prevIndex) => (prevIndex + 1) % titleText.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      display="flex"
      position="relative"
      width="100%"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height={{ md: '143px' }}
      sx={{ mt: '50px' }}
    >
      <Typography
        sx={{
          fontFamily: 'Poppins',
          color: 'white',
          fontSize: '2.25rem',
          fontWeight: 700,
        }}
      >
        {titleText[TitleIndex]}
      </Typography>
    </Box>
  );
};

export default function Landing() {
  const [tags, setTags] = useState([]);
  const [popularTags, setPopularTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagsChange = (event, newTags) => {
    setSelectedTags(newTags);
  };

  const [signInModal, setSignInModal] = useState(false);
  const [registModal, setRegistModal] = useState(false);

  const handleCloseSignIn = () => setSignInModal(false);
  const handleOpenSignIn = () => setSignInModal(true);

  const handleCloseRegist = () => setRegistModal(false);
  const handleOpenRegist = () => setRegistModal(true);

  const handleSignInHereClick = () => {
    handleCloseRegist(); // Close the RegisterLayout dialog
    handleOpenSignIn(); // Open the SignInLayout dialog
  };

  const handleRegisterHereClick = () => {
    handleCloseSignIn();
    handleOpenRegist();
  };

  useEffect(() => {
    async function fetchTags() {
      try {
        const tagsData = await tagsApi.getTagsOptionLists();
        setTags(tagsData);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }

    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchPopularTags() {
      try {
        const tagsData = await popularTagsOption.getPopularTagsOptionLists();
        setPopularTags(tagsData);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    }

    fetchPopularTags();
  }, []);
  console.log('popular', popularTags);
  console.log('tag', tags);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        fit="stretch-to-view"
        sx={{
          background: `url(${process.env.PUBLIC_URL}/resource/image/meet1.png)`,
          backgroundColor: 'hsla(0,0%,0%,.7)',
          backgroundBlendMode: 'multiply',
          backgroundSize: 'cover',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'start',
          width: '100%',
          height: { md: '100vh' },
        }}
      >
        <AppBar
          position="relative"
          sx={{
            top: 0,
            height: { md: '106px' },
            borderRadius: 0,
            m: 0,
            padding: { md: '25px 50px' },
            backgroundColor: { md: 'transparent' },
            backgroundImage: 'unset',
            boxShadow: 0,
            justifyContent: 'space-between',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Toolbar>
            <img loading="lazy" style={{ height: '40px', width: '61px' }} src="/resource/image/logotujuhsembilan 1.png" />
            <Typography fontFamily="Poppins" sx={{ pl: '10px', fontSize: '1rem' }}>
              Talent Center
            </Typography>
          </Toolbar>
          <Toolbar>
            <Box>
              <Button
                variant="text"
                sx={{ color: 'white', px: { md: '25px' }, py: '7px', textTransform: 'none', fontSize: '12px' }}
                onClick={handleOpenRegist}
              >
                {' '}
                Register{' '}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  color: 'white',
                  borderRadius: '25px',
                  borderColor: 'white',
                  px: { md: '25px' },
                  py: '7px',
                  textTransform: 'none',
                  fontSize: '12px',
                }}
                onClick={handleOpenSignIn}
              >
                Sign In
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Container display="flex" justifyContent="center" alignItems="center" flexDirection="column" flex={1}>
          <TitleWelcome />
          <Autocomplete
            multiple
            freeSolo
            id="auto-complete-search-popular-tags"
            sx={{ p: 0, mt: '3%', ml: '10%' }}
            disablePortal
            options={tags}
            getOptionLabel={(option) => option.skillsetName}
            value={selectedTags}
            onChange={handleTagsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Try &ldquo;JavaScript&rdquo;"
                type="text"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  style: {
                    color: 'hsla(0, 0%, 77%, 1)',
                    fontFamily: 'Inter',
                    fontSize: '1.125rem',
                    padding: 0,
                    height: '100%',
                  },
                  maxLength: 255,
                }}
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  sx: {
                    alignItems: 'center',
                    backgroundColor: 'hsla(0, 0%, 99%, 1)',
                    borderRadius: '36px',
                    height: { md: '65px', xs: '48px' },
                    padding: { md: '18px 36px !important', xs: '9.5px 36px !important' },
                    gap: '10px',
                    width: { md: '884px', xs: '328px' },
                  },
                  endAdornment: (
                    <IconButton>
                      <SearchIcon sx={{ color: 'hsla(0,0%,77%,1)' }} size="24px" />
                    </IconButton>
                  ),
                }}
              />
            )}
            renderTags={(tags, getTagProps) =>
              tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.skillsetName}
                  {...getTagProps({ index })}
                  sx={{
                    background: 'hsla(207, 50%, 93%, 1)',
                    color: 'hsla(0, 0%, 13%, 1)',
                    fontFamily: 'Inter',
                    fontSize: '1.125rem',
                  }}
                  style={{ margin: 0, borderRadius: '3px' }}
                  deleteIcon={<HighlightOffOutlinedIcon fontSize="17px" style={{ color: 'hsla(0, 0%, 52%, 1)' }} />}
                />
              ))
            }
          />
          <Box
            display="flex"
            gap={{ md: '20px', xs: '16px' }}
            alignItems="center"
            justifyContent="center"
            width="100%"
            flexDirection={{ md: 'row', xs: 'column' }}
            mb={{ xs: '95px' }}
            mt={{ md: '15px' }}
          >
            <Typography color="white" fontFamily="Inter" fontSize={{ md: '1.125rem', xs: '.875rem' }} fontWeight="600">
              Popular
            </Typography>
            <Box display="flex" flexWrap={{ xs: 'wrap' }} gap={{ md: '20px' }} rowGap={{ xs: '12px' }} columnGap={{ xs: '16px' }}>
              {Array.isArray(popularTags) &&
                popularTags.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.skillsetName}
                    sx={{
                      background: 'white',
                      color: 'black',
                      fontFamily: 'Inter',
                      fontSize: '1rem',
                    }}
                    style={{ margin: 0, borderRadius: '3px' }}
                  />
                ))}
              <Box flexGrow={50} />
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />
      <ModalRegist openModal={registModal} closeModal={handleCloseRegist} onSignInClick={handleSignInHereClick} />
      <ModalSignIn openModal={signInModal} closeModal={handleCloseSignIn} onRegisterClick={handleRegisterHereClick} />
    </Box>
  );
}
