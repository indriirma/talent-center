import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Typography, Avatar, Chip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AccordionComp = ({ data }) => {
  const navigate = useNavigate();
  const status = [
    {
      colorMap: '#30A952',
      textMap: 'Approved',
    },
    {
      colorMap: '#CF1D1D',
      textMap: 'Rejected',
    },
    {
      colorMap: '#F2C103',
      textMap: 'On Progress',
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
                                  {status[talent.talentRequestStatusId][1]}
                                </Typography>
                              }
                              size="small"
                              sx={{
                                backgroundColor: status[talent.talentRequestStatusId][0] || '#848484',
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
                          }}
                        >
                          <Grid item>
                            <Typography
                              variant="body2"
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
                            <Typography variant="body2" sx={{ color: '#848484' }}>
                              {talent.talentLevel} Level
                            </Typography>
                          </Grid>
                        </Grid>
                        <Typography fontWeight="bold">Position</Typography>
                        <Grid container>
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
                              <Typography sx={{ p: '2px 5px' }}>{posItem.positionName}</Typography>
                            </Box>
                          ))}
                        </Grid>
                        <Typography sx={{ mt: '1rem' }} fontWeight="bold">
                          Skill Set
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
            </Container>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};
