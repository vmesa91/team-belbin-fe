import Lottie from "lottie-react";
import styled from "styled-components";
import loading from '../../../public/assets/animations/Paperplane.json'
import { Typography } from "@mui/material";

const Loading = () => {
  return (
    <MainPrincipalAnimation>
        <Lottie animationData={loading}/>
        <Typography variant="h6">Cargando datos...</Typography>
    </MainPrincipalAnimation>
    
  )
}

export default Loading


const MainPrincipalAnimation = styled.div`
   
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;

   svg{
    width: 400px !important;
   }
`

