import React from "react";
import "../styles/HomePage.css";
import axios from 'axios'

function HomePage() {




  
  return (
    <div>
      <div id="header">
        <nav>
          <div id="logo-img">
            <img src="../Images/mainlogo.png" alt="logo" />
          </div>
          <ul>
            <li>
              {/* Empty list item */}
            </li>
          </ul>
        </nav>
      </div>
      <div id="bgimg">
        <div id="login">
          <a href="/login" className="login-button">LOGIN</a>
        </div>
      </div>

      <div id="section">
        <h1>ABOUT US</h1>
        <p>
          We are a Gandhinagar based Sustainable Technology Innovation Company
          incubated at Pandit Deendayal Petroleum University and supported by
          Industries Commissionerate (IC) Department, Government of Gujarat
          under Start-up/Innovation Scheme.
        </p>
        <p>
          We invent, designs, engineers and manufactures Solar Tree which
          incorporate beautiful, efficient solar panels in sculptural forms
          designed to inspire, to generate electricity along with saving huge
          space consumption problem. We have 16 design patents in our name for
          various innovative designs of Solar Tree. We also have received
          multiple recognition and awards from various national and
          international organization in last two year including Unites Nations
          top 100 Startup of the world, Top 10 Startups of India by Bombay Stock
          Exchange and others.
        </p>
      </div>

      <div id="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.7843319984286!2d72.63441207392998!3d23.17807021051013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e81bffaf8599b%3A0xdc264d311138a75d!2sImagine%20Powertree%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1716874567071!5m2!1sen!2sin"
          width="99.8%"
          height="100%"
          title="map"
        ></iframe>
      </div>
    </div>
  );
}

export default HomePage;
