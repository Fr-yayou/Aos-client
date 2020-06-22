import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import SucessPage from './SucessPage'
import styled from 'styled-components'
import {AlertStyled,ButtonContainer} from './Login'

class Register extends Component{
    constructor(){
        super()
        this.state ={
            name:"",
            email:"",
            password:"",
            password2:"",
            showLogin:false,
            nameErr:null,
            emailErr:null,
            passwordErr:null,
            password2Err:null,
        }
    }

    onChange = e =>{
        this.setState({[e.target.id]: e.target.value});
    }

    onSubmit = e =>{
        e.preventDefault()

        const newUser ={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2
        }
        fetch('/api/users/register',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(newUser)
        }).then(response =>{
            if(response.status === 200){
                this.setState({showLogin:true})
            }else{
                response.json().then(json =>{
                    const {name,email,password,password2} = json
                    this.setState({nameErr:name,emailErr:email, passwordErr:password,password2Err:password2})
                })
            }
        })
    }
    render(){
        return(
            <div>
                {this.state.showLogin ? <SucessPage/>:
                <ContainerFormRegister>
                    <ContainerTitle>
                        <h1>S'inscrire</h1>
                    </ContainerTitle>
                <Link to='/'>Page d'acceuil</Link>
                <form onSubmit={this.onSubmit} className="contactForm">
                    <ContainerGroup>
                        <label>Nom</label>
                        {this.state.nameErr ? <AlertStyled className="nameErr">{this.state.nameErr}</AlertStyled>:null}
                        <Input  onChange={this.onChange} value={this.state.name} type="text" id="name"></Input>
                    </ContainerGroup>
                    <ContainerGroup>
                        <label>Adresse e-mail</label>
                        {this.state.emailErr? <AlertStyled className="emailErr">{this.state.emailErr}</AlertStyled>:null}
                        <Input  onChange={this.onChange} value={this.state.email} type="text" id="email"></Input>
                    </ContainerGroup>
                    <ContainerGroup>
                        <label>Mot de passe</label>
                        {this.state.passwordErr?<AlertStyled>{this.state.passwordErr}</AlertStyled>:null}
                        <Input onChange={this.onChange} value={this.state.password} type="password" id="password"></Input>
                    </ContainerGroup>
                    <ContainerGroup>
                        <label>Confirmation Mot de passe</label>
                        {this.state.password2Err?<AlertStyled>{this.state.password2Err}</AlertStyled>:null}
                        <Input  onChange={this.onChange} value={this.state.password2} type="password" id="password2"></Input>
                    </ContainerGroup>
                    <ButtonContainer><Btn className="btnRegister">S'inscrire</Btn></ButtonContainer>
                </form>
            </ContainerFormRegister>
            }
            </div>

        )
    }
}

export default Register

export const ContainerGroup =styled.div`
display:flex;
flex-direction:column;
margin-top:10px;
`
export const ContainerFormRegister = styled.div`
margin-left:25%;
margin-right:25%;
`
export const ContainerTitle = styled.div`
display:flex;
justify-content:center;
`

export const Input = styled.input`
border:1px solid #F1F1F1;
padding: 10px 20px;
border-radius: 10px;
margin-top:5px;
outline:none;
background-color:#F1F1F1
`
export const Btn = styled.button`
border-radius: 200px;
border-style: solid;
border-width: 1px;
border-color: #e30513;
font-weight: 700;
height: 48px;
padding:10px 20px;
background-color:#e30513;
color:white;
width:40%;
outline:none;
&:hover{
    background-color:white;
    color:#e30513;
}
`