import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import SucessPage from './SucessPage'
import styled from 'styled-components'

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
                    <ContainerTittle>
                        <h1>Register</h1>
                    </ContainerTittle>
                <Link to='/'>Back Home</Link>
                <form onSubmit={this.onSubmit} className="contactForm">
                    <NameRegister>
                        <label>Name</label>
                        {this.state.nameErr ? <p className="nameErr">{this.state.nameErr}</p>:null}
                        <input  onChange={this.onChange} value={this.state.name} type="text" id="name"></input>
                    </NameRegister>
                    <EmailRegister>
                        <label>Email</label>
                        {this.state.emailErr? <p className="emailErr">{this.state.emailErr}</p>:null}
                        <input  onChange={this.onChange} value={this.state.email} type="text" id="email"></input>
                    </EmailRegister>
                    <PasswordRegsiter>
                        <label>Password</label>
                        {this.state.passwordErr?<p>{this.state.passwordErr}</p>:null}
                        <input  onChange={this.onChange} value={this.state.password} type="password" id="password"></input>
                    </PasswordRegsiter>
                    <Password2Register>
                        <label>Confirm password</label>
                        {this.state.password2Err?<p>{this.state.password2Err}</p>:null}
                        <input  onChange={this.onChange} value={this.state.password2} type="password" id="password2"></input>
                    </Password2Register>
                    <ButtonRegister><button className="btnRegister">Sign up</button></ButtonRegister>
                </form>
            </ContainerFormRegister>
            }
            </div>

        )
    }
}

export default Register

export const NameRegister =styled.div`
display:flex;
flex-direction:column;
margin-top:10px;
`
export const EmailRegister =styled.div`
display:flex;
flex-direction:column;
margin-top:10px;
`
export const PasswordRegsiter =styled.div`
display:flex;
flex-direction:column;
margin-top:10px;
`
export const Password2Register =styled.div`
display:flex;
flex-direction:column;
margin-top:10px;
`
export const ButtonRegister = styled.div`
display:flex;
justify-content:center;
margin-top:10px;
`
export const ContainerFormRegister = styled.div`
margin-left:25%;
margin-right:25%;
`
export const ContainerTittle = styled.div`
display:flex;
justify-content:center;
`