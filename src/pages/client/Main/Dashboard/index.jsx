import React, { useState, useEffect } from 'react';
import SideBar from './Sidebar';
import { Box, Stack, Grid, Pagination, ToggleButtonGroup, ToggleButton, Typography, Button, Drawer, LinearProgress } from '@mui/material';
import SortYear from './SortYear';
import ProfileCard from './ProfileCard';
import { FilterAltOutlined, ArrowDropDownOutlined, Close } from '@mui/icons-material';
import { fetchTalentList } from 'apis';
import Cookies from 'js-cookie';
import { SuccessAlert, WarningAlert } from 'pages/component/PopupAlert';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../Component/Navbar';

const EntriesToggleButtonGroup = ({ value, onChange }) => {
  const entries = [10, 20, 50];

  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChange} aria-label="entries per page">
      {entries.map((entry) => (
        <ToggleButton
          key={entry}
          value={entry}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#2C8AD3',
              color: '#FDFDFD',
            },
            fontFamily: 'Inter',
            border: 'none',
            borderRadius: '0',
          }}
        >
          {entry}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

const Main = () => {
  const bg_not_find_data = `${process.env.PUBLIC_URL}/resource/image/not-found-data.svg`;

  const { state } = useLocation();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState();
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedPositions, setSelectedPositions] = useState([]);
  const [selectedSkillsets, setSelectedSkillsets] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [totalTalents, setTotalTalents] = useState(0);
  const [displayedTalents, setDisplayedTalents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const [successTitle, setSuccessTitle] = useState('');
  const [successDesc, setSuccessDesc] = useState('');
  const warnTitle = 'Access Forbidden!';
  const warnDescription = 'You should login first!';

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate('/client');
  };

  const handleCloseWarn = () => {
    setIsWarning(false);
  };

  const handleOpenWarn = () => {
    setIsWarning(true);
  };

  const handleClosePopup = () => {
    setIsModalOpen(false);
  };

  const handleOpenPopup = () => {
    setIsModalOpen(true);
  };

  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (newpage) => {
    setCurrentPage(newpage);
  };

  const handleFilterChange = (value, setFilterChange) => {
    setFilterChange(value);
  };

  const dataArray = Cookies.get('loginRequirement');
  const cookieData = JSON.parse(dataArray || '[]');
  const userId = cookieData.userId;

  useEffect(() => {
    console.log(state);
    setIsLoading(true);
    fetchTalentList(currentPage, entriesPerPage, sortBy, selectedLevels, selectedPositions, selectedExperience, selectedSkillsets)
      .then((response) => {
        console.log(response);
        setDisplayedTalents(response.data.content);
        setTotalTalents(response.data.totalElements);
        setTotalPage(response.data.totalPages);
      })
      .catch((error) => {
        // Handle error
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false when data fetching is done
      });
  }, [currentPage, entriesPerPage, selectedExperience, selectedLevels, selectedPositions, selectedSkillsets, sortBy]);

  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = Math.min(startIndex + entriesPerPage, totalTalents);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  const handleSuccessText = (title, description) => {
    setSuccessTitle(title);
    setSuccessDesc(description);
  };

  return (
    <>
      <WarningAlert title={warnTitle} description={warnDescription} open={isWarning} close={handleCloseWarn} handleClick={navigateToSignIn} />
      <SuccessAlert title={successTitle} description={successDesc} open={isModalOpen} close={handleClosePopup} />
      <Box sx={{ maxWidth: '100vw', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Stack direction="row" sx={{ backgroundColor: 'white' }}>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, py: 6, px: 4, boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.10)' }}>
            <SideBar
              selectedPositions={selectedPositions}
              handlePositionFilterChange={setSelectedPositions}
              selectedExperience={selectedExperience}
              handleExperienceFilterChange={setSelectedExperience}
              selectedLevels={selectedLevels}
              handleLevelFilterChange={setSelectedLevels}
              selectedSkillsets={selectedSkillsets}
              handleSkillsetFilterChange={setSelectedSkillsets}
            />
          </Box>

          <Box flex={0} sx={{ flexGrow: 1, my: 4, mx: 3 }}>
            {/* filter Mobile */}
            <Stack direction="row" sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                startIcon={<FilterAltOutlined size={20} />}
                endIcon={<ArrowDropDownOutlined />}
                onClick={handleDrawerOpen}
                sx={{
                  display: 'flex',
                  borderRadius: '8px',
                  border: '1px solid var(--grey, #848484)',
                  width: '170px',
                  textTransform: 'none',
                  color: 'black',
                }}
              >
                <Typography variant="body2" fontFamily="Inter" style={{ flexGrow: 1, textAlign: 'start' }}>
                  Filter
                </Typography>
              </Button>
              <SortYear currentPage={currentPage} talentsPerPage={entriesPerPage} totalTalents={totalTalents} />
            </Stack>
            <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
              <Button onClick={handleDrawerClose} sx={{ color: 'black', justifyContent: 'end', mt: 1, mx: 1 }}>
                <Close />
              </Button>
              <Box sx={{ my: 2, mx: 2 }}>
                <SideBar
                  selectedPositions={selectedPositions}
                  handlePositionFilterChange={setSelectedPositions}
                  selectedExperience={selectedExperience}
                  handleExperienceFilterChange={setSelectedExperience}
                  selectedLevels={selectedLevels}
                  handleLevelFilterChange={setSelectedLevels}
                  selectedSkillsets={selectedSkillsets}
                  handleSkillsetFilterChange={setSelectedSkillsets}
                />
              </Box>
            </Drawer>

            {isLoading ? ( // Render loading indicator while data is being fetched
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            ) : totalTalents !== 0 ? (
              <React.Fragment>
                {/* <Box sx={{ display: { xs: 'flex', sm: 'none' }, mt: '2.5rem' }}>
                <Typography sx={{ color: '#212121', fontFamily: 'Inter', lineHeight: 'normal' }} variant="body1">
                  Showing you {(currentPage - 1) * entriesPerPage + 1} - {endIndex} talents out of {totalTalents} total for <b>“JavaScript”</b>
                </Typography>
              </Box> */}

                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <SortYear currentPage={currentPage} talentsPerPage={entriesPerPage} totalTalents={totalTalents} />
                </Box>

                <Grid container spacing={2} alignItems="stretch" sx={{ mt: 2 }}>
                  {displayedTalents.map((talent) => (
                    <Grid item xs={12} md={6} key={talent.talentId}>
                      <ProfileCard talentDetail={talent} open={handleOpenPopup} warn={handleOpenWarn} success={handleSuccessText} />
                    </Grid>
                  ))}
                </Grid>

                <Grid
                  container
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-end', sm: 'flex-start' },
                    gap: '1.5rem',
                    mt: 3,
                  }}
                >
                  <Stack spacing={4} direction="row" alignItems="center" flexGrow={1} sx={{ background: 'none', padding: 0 }}>
                    <Typography variant="body2" fontFamily="Inter">
                      Entries
                    </Typography>
                    <EntriesToggleButtonGroup value={entriesPerPage} onChange={handleEntriesPerPageChange} />
                  </Stack>

                  <Pagination
                    shape="rounded"
                    count={totalPage}
                    // count={Math.ceil(displayedTalents.length / entriesPerPage)}
                    page={currentPage}
                    onChange={(event, newPage) => {
                      handlePageChange(newPage); // Panggil fungsi handlePageChange dengan halaman baru
                    }}
                  />
                </Grid>
              </React.Fragment>
            ) : (
              <Box display="flex" flexDirection="column" alignItems="center" gap="20px" justifyContent="center" width="100%">
                <Box sx={{ width: { xs: '150px', md: '310px' }, md: { xs: '150px', md: '310px' } }}>
                  <img src={bg_not_find_data} alt="no find data" style={{ width: '100%', height: 'auto' }} />
                </Box>
                <Typography fontFamily="Poppins" fontSize={{ xs: '1rem', md: '1.5rem' }} color="#848484">
                  Sorry, we couldn't find a suitable talent
                </Typography>
              </Box>
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Main;
