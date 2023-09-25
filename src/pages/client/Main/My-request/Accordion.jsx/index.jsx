import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, Typography, Avatar, Chip } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccordionComp = ({ data }) => {
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
            <Container>
              {item.talentData.map((talent, talentIndex) => (
                <React.Fragment key={talentIndex}>
                  <Grid container sx={{}}>
                    <Grid container>
                      <Grid item>
                        <Avatar />
                      </Grid>
                      <Grid item>
                        <Grid container>
                          <Grid item>
                            <Chip label={<Typography></Typography>} />
                          </Grid>
                        </Grid>
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
