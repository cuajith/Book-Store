import React from 'react'
import Autocarousel from '../Home/Autocarousel/Autocarousel';
import { Typography } from "@mui/material";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./Home.css"

function Home() {
  return (
    <div>
      {/* Autocarousel */}
      <div>
        <Autocarousel />
      </div>

      {/* Banner */}
      <div className='bookstore-banner'>
        <img src="./images/banner/image2.jpg" alt="bookstore banner" />
      </div>

      {/* Footer */}
      <div>
        <section className="contact-area" id="contact">
          <div className="container">
            <div className="row" style={{ display: "flex" }}>
              
                  <div className="contact-social">
                    <ul>
                      <li><a className="hover-target" href=""><FacebookIcon/></a></li>
                      <li><a className="hover-target" href=""><LinkedInIcon/></a></li>
                    </ul>
                  </div>
              
            </div>
          </div>
        </section>

        <footer>
          <p>Copyright &copy; 2022
            
              <MenuBookIcon sx={{ mb: 1, mr: 1, ml: 2 }} /> 
           
            All Rights Reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default Home