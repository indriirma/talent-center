import { ExpandMore, KeyboardArrowRight, SimCardDownloadOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Typography, Avatar, Chip, Box, Divider, Button } from '@mui/material';
import { handleDownloadCVUrl } from 'pages/component/eventHandler';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AccordionComp = ({ data, warn, success, sucOpen }) => {
  const navigate = useNavigate();
  const status = [
    {
      0: '#30A952',
      1: 'Approved',
    },
    {
      0: '#CF1D1D',
      1: 'Rejected',
    },
    {
      0: '#F2C103',
      1: 'On Progress',
    },
  ];
  return (
    <>
      {data.map((item, index) => (
        <Accordion
          key={index}
          sx={{
            backgroundColor: 'white',
            boxShadow: '0px 5px 20px 0px rgba(0,0,0,0.1)',
            borderRadius: '5px',
          }}
          defaultExpanded={true}
        >
          <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`panel${index + 1}-content`} id={`panel${index + 1}-header`}>
            <Typography
              sx={{
                fontWeight: '700',
                fontFamily: 'Poppins',
                marginLeft: '20px',
              }}
            >
              {item.talentRequestDate}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Container sx={{ my: '1rem' }}>
              {item.talentData.map((talent, talentIndex) => (
                <React.Fragment key={talentIndex}>
                  <Grid
                    container
                    sx={{
                      display: 'flex',
                      my: '1.5rem',
                      padding: { xs: '20px 30px', sm: '0px' },
                      flexDirection: { xs: 'column', sm: 'row' },
                      boxShadow: { xs: '0px 5px 20px 0px rgba(0,0,0,0.1)', sm: 'none' },
                      borderRadius: '10px',
                      py: { xs: '1rem', sm: '0' },
                    }}
                  >
                    <Grid
                      container
                      key={talentIndex}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        flexGrow: '1',
                        width: 'auto',
                      }}
                    >
                      <Grid item>
                        <Avatar
                          src={talent.talentPhotoUrl}
                          sx={{
                            width: 75,
                            height: 75,
                          }}
                        />
                      </Grid>
                      <Grid item sx={{ mx: '2rem' }}>
                        <Grid container sx={{ mb: '0.2rem', gap: '0.5rem', alignItems: 'center' }}>
                          <Grid item>
                            <Chip
                              label={
                                <Typography
                                  color="white"
                                  sx={{
                                    fontFamily: 'Inter',
                                    fontWeight: '700',
                                  }}
                                >
                                  {status[talent.talentRequestStatusId - 1][1]}
                                </Typography>
                              }
                              size="small"
                              sx={{
                                backgroundColor: status[talent.talentRequestStatusId - 1][0] || '#848484',
                                padding: 2,
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography
                              fontWeight="bold"
                              color="primary"
                              fontSize="18pt"
                              sx={{
                                color: '#2C8AD3',
                                fontFamily: 'Poppins',
                              }}
                            >
                              {talent.talentName}
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
                            <Typography
                              variant="body2"
                              fontFamily="Poppins"
                              sx={{
                                color: '#848484',
                              }}
                            >
                              {talent.talentExperience} Years of Experience
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Box
                              sx={{
                                width: '4px',
                                height: '4px',
                                backgroundColor: '#848484',
                                borderRadius: '100%',
                              }}
                            />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" fontFamily="Poppins" sx={{ color: '#848484' }}>
                              {talent.talentLevel} Level
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography fontFamily="Poppins" fontWeight="bold" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                          Position
                        </Typography>
                        <Grid container sx={{ display: { xs: 'none', sm: 'flex' } }}>
                          {talent.position.map((posItem, posIndex) => (
                            <Box
                              key={posIndex}
                              sx={{
                                mr: '0.5rem',
                                backgroundColor: '#E4EEF6',
                                borderRadius: '3px',
                                mb: 1.5,
                              }}
                              width="fit-content"
                            >
                              <Typography fontFamily="Poppins" sx={{ p: '2px 5px' }}>
                                {posItem.positionName}
                              </Typography>
                            </Box>
                          ))}
                        </Grid>
                        <Typography fontFamily="Poppins" sx={{ mt: '1rem', display: { xs: 'none', sm: 'flex' } }} fontWeight="bold">
                          Skill Set
                        </Typography>
                        <Grid container sx={{ display: { xs: 'none', sm: 'flex' } }}>
                          {talent.skillSet.map((skiItem, skiIndex) => (
                            <Box
                              key={skiIndex}
                              sx={{
                                mr: '0.5rem',
                                backgroundColor: '#E4EEF6',
                                borderRadius: '3px',
                                mb: 1.5,
                              }}
                              width="fit-content"
                            >
                              <Typography fontFamily="Poppins" sx={{ p: '2px 5px' }}>
                                {skiItem.skillsetName}
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
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                      }}
                    >
                      <Divider orientation="vertical" />
                      <Container
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <Button
                          onClick={() => {
                            navigate('/client/main/detail/' + talent.talentId);
                          }}
                          startIcon={<KeyboardArrowRight />}
                          sx={{
                            textTransform: 'none',
                          }}
                        >
                          <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '8pt', sm: '12pt' } }}>See Detail</Typography>
                        </Button>
                        <Button
                          onClick={() =>
                            handleDownloadCVUrl({
                              cvUrl: talent.talentCvUrl,
                              talentName: talent.talentName,
                              warn: warn,
                              success: success,
                              sucOpen: sucOpen,
                            })
                          }
                          startIcon={<SimCardDownloadOutlined />}
                          sx={{
                            color: '#848484',
                            textTransform: 'none',
                          }}
                        >
                          <Typography sx={{ fontFamily: 'Poppins', fontWeight: '400', fontSize: { xs: '8pt', sm: '12pt' } }}>Download CV</Typography>
                        </Button>
                      </Container>
                    </Grid>
                  </Grid>
                  {talentIndex !== item.talentData.length - 1 && <Divider sx={{ my: '1rem' }} />}
                </React.Fragment>
              ))}
            </Container>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
