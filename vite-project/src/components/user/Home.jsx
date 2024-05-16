import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios,{AxiosError} from 'axios';


const Home = () => {
  let token=localStorage.getItem('user')
  

 const navigate =useNavigate()
  const backgroundStyle = {
    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('../data/zbHhQV.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'white',
    textAlign: 'center',
    padding: '0 20px',
  };

  async function isValid(){
     if(token){

       try{
         
         const response=await axios.get('http://localhost:3000/valid',{
           headers: {
             Authorization: `${token}`,
           }
           
         })
       }catch(error){
         console.log(error);
         navigate('/')
   
       }
     }else{
      navigate('/')
     }
  }

useEffect(()=>{
  console.log('count');
  isValid()
    // navigate('/')
},[token])


  return (
    <div className="home" style={backgroundStyle}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Welcome to Your Website</h1>
      <p style={{ fontSize: '1.5rem' }}>Where great things happen!</p>
      <section style={{ marginTop: '50px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Features</h2>
        <div className="feature-list" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="feature" style={{ margin: '0 10px' }}>
            <h3>Feature 1</h3>
            <p>Description of feature 1</p>
          </div>
          <div className="feature" style={{ margin: '0 10px' }}>
            <h3>Feature 2</h3>
            <p>Description of feature 2</p>
          </div>
          <div className="feature" style={{ margin: '0 10px' }}>
            <h3>Feature 3</h3>
            <p>Description of feature 3</p>
          </div>
        </div>
      </section>
      <section className="about" style={{ marginTop: '50px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>About Us</h2>
        <p style={{ fontSize: '1.25rem' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
      </section>
      <footer style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center' }}>
        <p style={{ fontSize: '1rem' }}>&copy; 2024 Your Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
