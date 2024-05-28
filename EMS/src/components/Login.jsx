


import React from 'react'
import '../styles/style.css'


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password:''

    })
    const handleSubmit = (event) =>{
        event.preventDefault()
        
        .then(result => console.log(result))
        .catch(result => console.log(err))
        
    }
return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>Email:</strong></label>
                    <input type="email" autoComplete='off' placeholder="Enter Email" name="email" 
                    onChange={(e) => setValues({...values, email : e.target.value })}className='form-control rounded-0' />
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" placeholder="Enter Password" name="password" 
                     onChange={(e) => setValues({...values, password : e.target.value })}className='form-control rounded-0' />
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log In </button>
                <div className='mb-1'>
                    <input type="checkbox" name="tick" id="tick" className='me-2' />                   
                     <label htmlFor="password">Agree with terms & conditions</label>
                   
                </div>
            </form>
        </div>

      
    </div>
  )
}

export default Login