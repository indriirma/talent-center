import { useEffect, useState } from "react"
import { Container,Box,Typography,Button } from "@mui/material";
import RegisterModal from "./RegisterModal";

const Modals=()=>{
    const[openRegis,setOpenRegis] = useState(false);
    const handleOpenRegis=()=>setOpenRegis(!openRegis);
    useEffect(()=>{
        setOpenRegis(openRegis)
    },[openRegis])
    return(
        <Container component="main" maxWidth='xs'>
        <Box component="form" sx={{
            marginTop:8,
            display: 'flex',
            flexDirection:'column',
            alignItems:'center',
        }}>
            <Typography component="h1" variant="h3">
                Landing Page
            </Typography>
            <Button onClick={handleOpenRegis} color="primary" variant="contained">
                Register
            </Button>
            {
                openRegis&&
                <RegisterModal open={openRegis} close={setOpenRegis}/>
            }
            </Box>   
      </Container> 
    )
}
export default Modals