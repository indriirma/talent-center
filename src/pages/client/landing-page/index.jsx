import{Box,Container,Grid,IconButton,InputAdornment,TextField,Typography,Autocomplete, Button, styled,Stack} from '@mui/material';
import Navbar from './Modals';
import {useState,useEffect} from 'react';  
import Footer from './Footer/Footerx';
import { fetchPopularTags } from 'apis';
import SearchBox from './SearchBox';

const PopularTags=styled('div')(({theme}) =>({
    backgroundColor: 'white',
    color:'black',
    padding: '8px',
    paddingLeft: '15px',
    paddingRight: '15px',
    textAlign: 'center',
    borderRadius: 4,
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: 600,
    '@media (max-width: 600px)': {
        padding: '6px',
        paddingLeft: '25px',
        paddingRight: '25px',
        borderRadius: '3px',
        fontSize: '12px', 
  },
}));

const LandingPage=()=>{
    const background = `${process.env.PUBLIC_URL}/resource/image/bg-landing-page.svg`

    const sentences = [
        'Welcome to\nTalent Center 79',
        'Find a Talent\nThat Suits Your Requirements',
        'Build the Perfect Team\nFor the Brighter Future'
    ];
    const [popularTags, setPopularTags] = useState([{}]);
    const [index,setIndex] = useState(0);
    const [sentence,setSentence] = useState(sentences[index]);
    const [showTitle,setShowTitle] = useState(true);
    useEffect(()=>{
        const getPopularTags = async()=>{
            try{
                const response = await fetchPopularTags();
                const temporary = response.data.sort((a,b)=>b.counter-a.counter);
                setPopularTags(temporary);    
                console.log(temporary);            
            }
            catch(error)
            {
                console.log('error fetching data : ',error);
            }            
        };
        getPopularTags();
        const interval = setInterval(()=>{
            if(index===sentences.length-1){
                setIndex(0);
            } else{
                setIndex(index+1)
            }            
            setShowTitle(false);
            setTimeout(()=>{
                setSentence(sentences[index]);
                setShowTitle(true);
            },300)
        },5000)
        return ()=>clearInterval(interval);
    },[])
     
    return(  
        <>     
        <Box sx={{minHeight:'100vh',
        maxHeight:'fit-content',
        maxWidth:'auto',display:'flex',
        flexDirection:'column',
        backgroundImage:`url(${background})`, 
        backgroundColor:'dimgray',backgroundBlendMode:'multiply',
        backgroundSize:'cover',color:'white',backgroundPosition:'center',
        '@media (maxWidth:600px)':{
            height:'800px'
        } }}> 
            <Navbar/>
            <Container sx={{Height:'100%',display:'flex',flexDirection:'column',
            alignItems:'center',justifyContent:'center'}}>
                <Typography                             
                variant="h2"
                color="white"
                align="center"
                marginBottom="50px"
                sx={{transition:'opacity 0.1s ease-in-out, transform 0.1s ease-in-out', 
                opacity:showTitle?1:0,
                fontFamily: 'Poppins',
                fontSize: '53px',
                fontWeight: 700,
                lineHeight: '80px',
                letterSpacing: '0em',
                textAlign: 'center',
                maxWidth: '650px',
                '@media (max-width: 600px)': {
                    fontSize: '32px',
                    lineHeight: '48px',
                }, 
                }}>
                    {sentence}
                </Typography> 
                <Grid container sx={{minWidth:'fit-content'}}>
                    <Grid container direction="column">
                        <Grid item justifyContent="center" marginBottom="10px" sx={{display:'flex'}}>
                          <Grid item>
                            <SearchBox/>
                            </Grid>                              
                        </Grid>
                        <Grid marginBottom={30}>
                            <Grid container mt={3} sx={{justifyContent: 'center'}}>
                            <Grid item>
                                <Typography
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: 'white',
                                    display: { xs: 'flex', md: 'none' },
                                    justifyContent: 'center',
                                }}
                                >
                                Popular
                                </Typography>
                                <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
                                <Typography
                                    sx={{
                                    fontFamily: 'Poppins',
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: 'white',
                                    display: { xs: 'none', md: 'flex' },
                                    }}
                                >
                                    Popular
                                </Typography>
                                {popularTags.map((skill, index) => (
                                    <PopularTags key={index} sx={{ marginBottom: '10px', gap: '3px' }}>
                                    {skill.skillsetName}
                                    </PopularTags>
                                ))}
                                </Stack>
                            </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            </Box>
        <Footer/>
        </>
    );

}
export default LandingPage;
