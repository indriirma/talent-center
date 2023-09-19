import { Box } from "@mui/material"
import {CarouselComp} from '../Component'
import { useState } from "react"

const DashIndexes = ({activeIndex,medias})=>{
    return(        
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        bottom='10px'
        left={0}
        right={0}
        >
            {
                medias.map((dash,index)=>(
                    <Box
                        key={index}
                        width='8px'
                        height='8px'
                        borderRadius='50%'
                        backgroundColor={index===activeIndex?'#2C8AD3':'#DBDBDB'}
                        mx='2px'
                    />
                ))
            }
        </Box>
    )
}

export const Carousel = ({medias,handleClick}) =>{
    const [activeIndex,setActiveIndex] = useState(0);
    const handlePrevious =()=>{
        setActiveIndex((prevIndex)=>(prevIndex===0?medias.length-1:prevIndex-1))
    }
    const handleNext =()=>{
        setActiveIndex((nextIndex)=>(nextIndex===0?medias.length-1:nextIndex+1))
    }

    return(
       <CarouselComp medias={medias} prev={handlePrevious} next={handleNext} activeIndex={activeIndex} 
            otherComp={<DashIndexes medias={medias} activeIndex={activeIndex} /> } height={200} width={300}
            click={handleClick}
       />
    )
}