import React,{ useState} from 'react'
import '../App.css'

const Form = () => {
  const [name, setName]= useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword,setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const validateEmail = (email) =>{
    const regex = /^[^\s@] +@[^\s@]+\.[^\s@]+$/;
    return regex.test(email)
  }
  const validatePassword = (password) => {
    return password.length >=6;
  }
  const validatePhone = (phone) =>{
    return phone.length>=10;
  }
  const validateName = (name) =>{
    return name.length <=15;
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    let fromErrors = {};
    if(!validateEmail(email)){
      fromErrors.email = "Invalid email format"
    }
    if(!validatePassword(password)){
      fromErrors.password = "Password must be at least 6"
    }
    if(!validatePhone(phone)){
      fromErrors.phone = "Phone number should be of 10 digit"
    }
    if(!validateName(name)){
      fromErrors.name = "Name length not more than 15"
    }
    if(Object.keys(fromErrors).length>0){
      setErrors(fromErrors);
    }
    else{
      console.log("Form SUbmitted",{email,password});
      setEmail('');
      setPassword('');
    }
  }
  return (
    <>
      <form className='form' onSubmit= {handleSubmit} method='post'>
      <label className='label'>First Name:</label>
      <span><input className='user-input' type='text' name='name'  value={name} onChange={(e)=>{setName(e.target.value)}}/></span>
      {errors.name && <p style={{color:'red'}}>{errors.name}</p>}

      <br/><br/>
      <label htmlFor='email'>
        <span className='label'>Email:</span>
        <span><input className='user-input' type='text' name='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} /></span>
        {errors.email && <p style={{color:'red'}}>{errors.email}</p>}
      </label>
     <br/><br/>
     <label htmlFor='email'>
        <span className='label'>Password:</span>
        <span><input className='user-input' type='text' name='password'  value={password} onChange={(e)=>{setPassword(e.target.value)}}/></span>
        {errors.password && <p style={{color:'red'}}>{errors.password}</p>}
      </label>
      <br/><br/>
      
      <label htmlFor='email'>
        <span className='label'>Confirm Password:</span>
        <span><input className='user-input' type='text' name='password' value={ConfirmPassword} onChange={(e) =>{setConfirmPassword(e.target.value)}}/></span>
        {errors.ConfirmPassword && <p style={{color:'red'}}>{errors.ConfirmPassword}</p>}
      </label>
      <br/> <br/>
      <label htmlFor='email'>
        <span className='label'>Phone:</span>
        <span><input className='user-input' type='text' name='phone' value={phone} onChange={(e)=>{setPhone(e.target.value)}} /></span>
        {errors.phone && <p style={{color:'red'}}>{errors.phone}</p>}
      </label>
      <br/><br/>
      
      <button className='btn' type='submit'>Submit</button>
    </form>
    



    </>
  )
}

export default Form
