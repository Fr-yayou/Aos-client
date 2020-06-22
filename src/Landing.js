import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Landing = () =>(
    <LandingContainer>
        <SignUpContainer>
            <Link to='/register'>S'inscrire</Link>
        </SignUpContainer>
        <LogInContainer>
            <Link to='/login'>Se connecter</Link>
        </LogInContainer>
    </LandingContainer>
)

export default Landing

export const LandingContainer = styled.div`
display:flex;
justify-content:center
`
export const LogInContainer = styled.div`
margin:10px
`
export const SignUpContainer = styled.div`
margin:10px
`