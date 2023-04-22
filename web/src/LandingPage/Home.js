import React from 'react'
import Header from './Header.js'
import Hero from './Hero.js'
import Category from './Category.js'
import Specialists from './Specialists.js'
import Footer from './Footer.js'
import Labtestpackage from './Labtestpackage.js'
import Blog from './Blog.js'
import Faq from './Faq.js'



export default function Home() {
  return (
    <div>
        <Header/>
        <Hero/>
        <Category/>
        <br></br><br></br><br></br>

        <Blog></Blog>
        
        <Specialists/>
        <br/><br/><br/>
        {/* <Faq></Faq> */}
        {/* <Labtestpackage/> */}
        <Footer/>
    </div>
  )
}
