import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import SucessPage from './SucessPage'
import styled from 'styled-components'
import {Btn,Input,ContainerTitle} from './Register'

class Login extends Component{
    constructor(){
        super()
        this.state ={
            email:"",
            password:"",
            showSucessPage:false,
            loginErrors:[]
        }
    }

    onChange = e =>{
        this.setState({[e.target.id]: e.target.value})
    }

    onSubmit = e =>{
        e.preventDefault()

        const userData ={
            email:this.state.email,
            password:this.state.password
        }

        fetch('/api/users/login',{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(userData)

        }).then(response =>{
            if(response.status === 200){
                this.setState({showSucessPage:true})
            }else{
                response.json().then(json =>{
                    this.setState({loginErrors:json})
                })
            }
        })
    }



    render(){
        return(
            <div>
                {this.state.showSucessPage ?<SucessPage/> :
                    <ContainerFornLogin>
                        <ContainerTitle><h1 id="title">Se connecter</h1></ContainerTitle>
                                <Link to='/'>Page d'acceuil </Link>
                                <form onSubmit={this.onSubmit}>
                                    <EmailLogin>
                                        <label>Adresse e-mail</label>
                                        {this.state.loginErrors.email ? <AlertStyled>{this.state.loginErrors.email}</AlertStyled>:null}
                                        {this.state.loginErrors.emailnotfound ?<AlertStyled className="emailNotFound">{this.state.loginErrors.emailnotfound}</AlertStyled>:null}
                                        <Input id="email" type="email" onChange={this.onChange} value={this.state.email}></Input>
                                    </EmailLogin>
                                    <PasswordLogin>
                                        <label>Mot de passe</label>
                                        {this.state.loginErrors.passwordincorrect ? <AlertStyled>{this.state.loginErrors.passwordincorrect}</AlertStyled>:null}
                                        {this.state.loginErrors.password ? <AlertStyled>{this.state.loginErrors.password}</AlertStyled>:null}
                                        <Input id="password" type="password" onChange={this.onChange} value={this.state.password}></Input>
                                    </PasswordLogin>
                                    <ButtonContainer>
                                        <Btn className="btnLogin">Validez</Btn>
                                    </ButtonContainer>
                                </form> 
                    </ContainerFornLogin>
                }
            </div>
        )
    }
}

export default Login

//styled-component//

export const ContainerFornLogin = styled.div`
margin-left:25%;
margin-right:25%;
`

export const PasswordLogin = styled.div`
display:flex;
flex-direction:column;
margin-top:10px;
`
export const EmailLogin = styled.div`
display:flex;
flex-direction:column;
margin-top:10px;
`
export const ButtonContainer = styled.div`
margin-top:10px;
display:flex;
justify-content:center;
`
export const AlertStyled = styled.div`
border: 1px solid;
margin: 10px 0px;
border-radius:10px;
padding: 10px 10px 10px 5px;
color: #D8000C;
background-color: #FFBABA
`