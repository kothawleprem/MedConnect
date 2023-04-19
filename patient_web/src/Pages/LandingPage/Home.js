import React from 'react'
import { useState, useEffect } from "react";

import Header from './Header.js'
import Hero from './Hero.js'
import Category from './Category.js'
import Specialists from './Specialists.js'
import Footer from './Footer.js'
import Labtestpackage from './Labtestpackage.js'
import SearchBox from '../../components/Items/SearchBox.jsx'
import SearchHeading from './SearchHeading.jsx';



export default function Home() {
  const [results, setResults] = useState([]);
  const handleSearch = (data) => {
    setResults(data);
    console.log("result landing", data);
  };

  return (
    <div>
      <Header />
      <Hero />
      <SearchHeading/>
      <center> 
      <SearchBox onSearch={handleSearch} sid="1"/>
      </center>
      <Category />
      <Specialists />
      <Labtestpackage />
      <Footer />
    </div>
  );
}
