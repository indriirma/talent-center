import {Typography,Grid,Box,IconButton} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material"; 

export const TagInfo =({tag})=>{   
    return(
        <Box sx={{ mr:'0.5rem',backgroundColor:'#E4EEF6',
        borderRadius:'3px',my:{xs:'0.25rem',md:'0'}}}>
            <Typography
            variant="body2"
            fontFamily="Inter"
            sx={{padding:'2px 5px'}}>
                {tag}
            </Typography>
        </Box>
    )
}

export const LabelInfo=(props)=>{
    const { title, data } = props;
    return(
        <Typography
            variant="body2"
            fontFamily="Inter"
        >
            {data+" "+title}
        </Typography>
    )
}
    
export const ColumnInfo =({title,content})=>{
    return(
        <>
            <Typography
                fontFamily="Poppins"
                display="flex"
                sx={{
                    justifyContent:{
                        xs:'center',
                        sm:'flex-start'
                    }
                }}
            >
                {title}
            </Typography>
            <Grid
                container
                sx={{display:'flex',flexDirection:{xs:'column',
                sm:'row'},mb:'0.75rem',gap:'0.1rem',
                alignItems:'center'}}
            >
                {content}
            </Grid>
        </>
    )
} 

export const CarouselComp = ({medias,prev,next,activeIndex,otherComp,height,width,click=null}) =>{ 
        
    return(
        <Box
            position='relative'
            width={width}
            height={height}
            overflow='hidden'
            sx={{
                borderRadius:'10px'
            }}                          
        >
            {Array.isArray(medias) && medias.length > 0 ? (
            medias.map((media,index)=>(
                <Box
                    key={index}
                    display={index===activeIndex?'block':'none'}
                    position='absolute'
                    style={{cursor:'pointer'}}
                    width='100%'
                    height='100%'
                    onClick={()=>click(index)}
                >
                    <MediaBox media={media} alter="photo" index={index} />                    
                </Box> 
            ))):(
                <Box 
                    display = 'none'
                    position='absolute'
                    style={{ cursor:'pointer' }}
                    width='100%'
                    height='100%' 
                >
                    No media available
                </Box>
            )}
            <IconButton
                onClick={prev}
                disabled={medias.length==0?true:false}
                style={{
                    position:'absolute',
                    top:'50%',
                    left:'0',
                    color:'white',
                    transform:'none'
                }}
            >
                <ChevronLeft/>
            </IconButton>
            <IconButton
                onClick={next}
                disabled={medias.length===0?true:false}
                style={{
                    position:'absolute',
                    top:'50%',
                    right:'0',
                    transform:'none',
                    color:'white'
                }}
            >
                <ChevronRight/>
            </IconButton>
            {otherComp}
        </Box>
    )
}

export const MediaBox=({media,alter,index})=>{
    return(
        <>
            {
                media.type==='img'?(
                    <img
                        src={media.url}
                        alt={`${alter} ${index+1}`}
                        style={{
                            width:'100%',
                            objectFit:'cover'
                        }}
                    />
                ):(
                    <video
                        controls 
                        style={{
                            width:'100%',
                            height:'200px',
                            objectFit:'cover'
                        }}
                        src={media.url}
                        type="video/mp4"
                    />
                )
            }
        </>
    )
}