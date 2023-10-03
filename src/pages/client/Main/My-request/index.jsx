import { Box, Container, Tab, Typography } from '@mui/material';
import Navbar from '../Component/Navbar.jsx';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { AccordionComp } from './Accordion/index.jsx';
import { InfoOutlined } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { SuccessAlert, WarningAlert } from 'pages/component/PopupAlert.jsx';
import { useNavigate } from 'react-router-dom';
import { fetchRequest } from 'apis/index.js';

const MyRequest = () => {
  const [tabValue, setTabValue] = useState('1');
  const [allRequest, setAllRequest] = useState([]);
  const [approvedReq, setApprovedReq] = useState([]);
  const [rejectedReq, setRejectedReq] = useState([]);
  const [onProgReq, setOnProgReq] = useState([]);
  const [isWarnOpen, setIsWarnOpen] = useState(false);
  const [warnTitle, setWarnTitle] = useState('');
  const [warnDesc, setWarnDesc] = useState('');
  const [handleWarn, setHandleWarn] = useState();
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successTitle, setSuccessTitle] = useState('');
  const [successDesc, setSuccessDesc] = useState('');

  const dataArray = Cookies.get('loginRequirement');
  const cookieData = JSON.parse(dataArray || '[]');
  const userId = cookieData.userId;

  const tabAtribute = [
    {
      label: 'All',
      value: '1',
    },
    {
      label: '(' + onProgReq.length + ') In Progress',
      value: '2',
    },
    {
      label: '(' + approvedReq.length + ') Approved',
      value: '3',
    },
    {
      label: '(' + rejectedReq.length + ') Rejected',
      value: '4',
    },
  ];

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteringData = (data) =>
    data.reduce((result, item) => {
      const tReqDate = format(new Date(item.talentRequestDate), 'd MMMM yyyy', { locale: id });
      const existingEntry = result.find((entry) => entry.talentRequestDate === tReqDate);
      if (existingEntry) {
        existingEntry.talentData.push(item);
      } else {
        result.push({
          talentRequestDate: tReqDate,
          talentData: [item],
        });
      }
      return result;
    }, []);

  const tabPanelData = [
    {
      value: '1',
      data: filteringData(allRequest),
    },
    {
      value: '2',
      data: filteringData(onProgReq),
    },
    {
      value: '3',
      data: filteringData(approvedReq),
    },
    {
      value: '4',
      data: filteringData(rejectedReq),
    },
  ];

  const navigate = useNavigate();

  const navigateToSignIn = () => {
    navigate('/client');
  };

  const handleWarnArr = {
    login: navigateToSignIn,
    error: () => {},
  };

  const handleWarnAlert = (title, descrip, handle) => {
    setWarnTitle(title);
    setWarnDesc(descrip);
    setHandleWarn(handle);
    setIsWarnOpen(true);
  };

  const handleSuccessAlert = (title, descrip) => {
    setSuccessTitle(title);
    setSuccessDesc(descrip);
  };

  const handleFetchReq = (status, handleSet) => {
    fetchRequest(userId, status)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          handleSet(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
        handleWarnAlert(error.response.status, error.response.message, null);
      });
  };

  const warnLogin = () => {
    const title = 'Access Forbidden!';
    const descrip = 'You should login first!';
    handleWarnAlert(title, descrip, 'login');
  };

  const getData = () => {
    if (userId !== undefined) {
      handleFetchReq(undefined, setAllRequest);
      handleFetchReq(1, setApprovedReq);
      handleFetchReq(2, setRejectedReq);
      handleFetchReq(3, setOnProgReq);
    } else {
      warnLogin();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <WarningAlert
        title={warnTitle}
        description={warnDesc}
        open={isWarnOpen}
        close={() => {
          setIsWarnOpen(false);
        }}
        handleClick={handleWarnArr[handleWarn]}
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
      <Box
        sx={{
          maxWidth: '100vw',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container sx={{ my: '3rem' }}>
          <Container sx={{ marginLeft: '50px' }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'Poppins',
                fontWeight: '700',
                fontSize: '27px',
                fontStyle: 'normal',
              }}
            >
              My Request
            </Typography>
          </Container>

          <TabContext value={tabValue}>
            <Container>
              <Box
                sx={{
                  boxShadow: '0px 0px 20px 5px rgba(0,0,0,0.1)',
                  mt: '2.5rem',
                  mb: '2',
                }}
              >
                <TabList onChange={handleChange}>
                  {tabAtribute.map((item, index) => (
                    <Tab
                      key={index}
                      label={item.label}
                      value={item.value}
                      sx={{ textTransform: 'none', width: '25%', fontFamily: 'Poppins', fontSize: '12pt' }}
                    />
                  ))}
                </TabList>
              </Box>
            </Container>

            {tabPanelData.map((item, index) => (
              <TabPanel key={index} value={item.value}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    boxShadow: '0px 5px 20px 0px rgba(0,0,0,0.1)',
                    borderRadius: '5px',
                    padding: '15px 50px',
                    mb: 3,
                    gap: '20px',
                    height: '20px',
                  }}
                >
                  <InfoOutlined sx={{ color: 'gold', mr: 1, fontSize: '2rem' }} />
                  <Typography sx={{ fontFamily: 'Poppins', fontSize: '12pt' }}>All requests are checked by Tujuh Sembilan Admin</Typography>
                </Box>
                <AccordionComp data={item.data} warn={warnLogin} sucOpen={() => setIsSuccessOpen(true)} success={handleSuccessAlert} />
              </TabPanel>
            ))}
          </TabContext>
        </Container>
      </Box>
    </>
  );
};

export default MyRequest;
