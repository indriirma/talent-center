import{Box,Container,Grid,IconButton,InputAdornment,TextField,Typography,Autocomplete, Button} from '@mui/material';
import Navbar from './Modals';
import {useState,useEffect} from 'react';
import axios from 'axios'; 
import { SearchOutlined } from '@mui/icons-material';
import Footer from './Footer'

const PopularTags=({tagTitle}) =>{
    return(
        <>
            <Grid item sx={{mx:'0.5rem', my:{xs:'0.5rem',sm:'0'},
            px:'0.75rem',display:'flex',alignItems:'center',backgroundColor:'white',borderRadius:"3px"}} >
                <Button sx={{color:'black',padding:'5px 0px'}}>
                    <Typography fontFamily="Inter" variant='body2'>
                        {tagTitle}
                    </Typography>
                </Button>
            </Grid>
        </>
    )
}

const LandingPage=()=>{
    const background = `${process.env.PUBLIC_URL}/resource/image/bg-landing-page.svg`

    const sentences = [
        'Welcome to\nTalent Center 79',
        'Find a Talent\nThat Suits Your Requirements',
        'Build the Perfect Team\nFor the Brighter Future'
    ];
    const [index,setIndex] = useState(0);
    const [sentence,setSentence] = useState(sentences[index]);
    const [showTitle,setShowTitle] = useState(true);
    useEffect(()=>{
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
    },[index,sentences])
    const [popularTags, setPopularTags] = useState([{}]);
    useEffect(()=>{
        axios.get('localhost:8080//api/tag-management/popular-tags-option-lists')
        .then(response=>{
            setPopularTags(response.data);
        })
        .catch(error=>{
            alert('Error in Popular Tags : ',error);
        })
    },[]);

    const [tags,setTags] = useState([{}]);
    useEffect(()=>{
        axios.get('localhost:8080//api/tag-management/tags-option-lists')
        .then(response=>{
            setTags(response.data);
        })
        .catch(error=>{
            alert('Error in Tags : ',error)
        })
    },[])


    return(
        <Box sx={{minHeight:'100vh',maxHeight:'fit-content',maxWidth:'100vw',display:'flex',flexDirection:'column',backgroundImage:`url(${background})`, backgroundColor:'dimgray',backgroundBlendMode:'multiply',backgroundSize:'cover',color:'white',backgroundPosition:'center' }}> 
            <Navbar/>
            <Container sx={{minHeight:'85vh',display:'flex',flex:'auto',alignItems:'center',justifyContent:'center'}}>
                <Grid container sx={{minWidth:'fit-content'}}>
                    <Grid container direction="column">
                        <Grid item justifyContent="center">
                            <Typography variant='h4' whiteSpace='pre-line' textAlign="center"
                            sx={{transition:'opacity 0.1s ease-in-out, transform 0.1s ease-in-out', opacity:showTitle?1:0}}>
                                {sentence}
                            </Typography>
                        </Grid>
                        <Grid item justifyContent="center" sx={{display:'flex'}}>
                            <Autocomplete
                            multiple id="tags-standard" options={tags.map((option)=>option.tagsName)}
                            renderInput={(params)=>
                                <TextField
                                    {...params.inputProps}
                                    placeholder="Try &quot;Javascript&quot;"
                                    inputProps={{
                                        ...params?.inputProps,
                                        endAdornment:(
                                            <InputAdornment position='end'>
                                                <IconButton edge="end">
                                                    <SearchOutlined sx={{color:'#C4C4C4'}} />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx:{width:{xs:'90vw',sm:'60vw'},backgroundColor:'white',borderRadius:'25px'}
                                    }}
                                    InputProps={{...params.inputProps, fontFamily:"Inter",maxLength:"255",autoFocus:true}}
                                    sx={{
                                        input:{width:'90%', color:'black',':focus':{width:'90%'}},
                                    }}
                                />
                            }
                            ChipProps={{sx:{color:'white',backgroundColor:'#142851',fontFamily:"Inter","& .MuiChip-deleteIcon":{color:'white'}}}}
                            sx={{
                                mt:'2rem',
                                "& .MuiAutocomplete-hasPopupIcon":{
                                    paddingRight:"1rem!important"
                                },
                                "& .MuiAutocomplete-hasClearIcon":{
                                    paddingRight:"1rem!important"
                                },
                                "& .MuiAutocomplete-inputRoot":{
                                    paddingRight:"1rem!important"
                                },                            
                            }}
                            />
                        </Grid>
                        <Grid item alignItems='center' justifyContent='center' sx={{
                            display:'flex', mt:'2rem', flexDirection:{xs:'column',sm:'row'},flexWrap:'wrap'
                        }} >
                            <Typography fontFamily="Poppins" variant='body1' sx={{mr:'1rem'}}>Popular</Typography>
                            <div style={{display:'flex',flexWrap:'wrap',justifyContent:"center"}}>
                                {
                                    popularTags.map((tag)=>{
                                        return(
                                            <PopularTags tagTitle={tag?.tagsName} key={tag?.tagsKey} />
                                        )
                                    })
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </Box>
    );

}
export default LandingPage;
