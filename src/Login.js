import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import SucessPage from './SucessPage'
import styled from 'styled-components'

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
                        <h1>Login</h1>
                                <Link to='/'> Back Home</Link>
                                <form onSubmit={this.onSubmit}>
                                    <EmailLogin>
                                        <label>Email</label>
                                        {this.state.loginErrors.email ? <p>{this.state.loginErrors.email}</p>:null}
                                        {this.state.loginErrors.emailnotfound ?<p>{this.state.loginErrors.emailnotfound}</p>:null}
                                        <input id="email" type="email" onChange={this.onChange} value={this.state.email}></input>
                                    </EmailLogin>
                                    <PasswordLogin>
                                        <label>Password</label>
                                        {this.state.loginErrors.passwordincorrect ? <p>{this.state.loginErrors.passwordincorrect}</p>:null}
                                        <input id="password" type="password" onChange={this.onChange} value={this.state.password}></input>
                                    </PasswordLogin>
                                    <ButtonLogin>
                                        <button>Sign In</button>
                                    </ButtonLogin>
                                </form> 
                    </ContainerFornLogin>
                }
            </div>
        )
    }
}

export default Login

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
export const ButtonLogin = styled.div`
margin-top:10px;
display:flex;
justify-content:center;
`
