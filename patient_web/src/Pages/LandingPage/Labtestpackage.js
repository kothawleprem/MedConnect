import React from 'react'
import { Link } from 'react-router-dom';


export default function Labtestpackage() {
    const data = [
        { id: 1, name: "Basic Women's Health Checkup", price:1099, discount:"-22%" ,disprice:1499, img:"https://images1-fabric.practo.com/dx/labs/PRL-HWP/logo.jpg/360x240" },
        { id: 2, name: "Vitamin Deficiency Health Checkup", price:899, discount:"-25%" ,disprice:1299, img:"https://images1-fabric.practo.com/dx/labs/PRL-VDHC/logo.jpg/400x268" },
        { id: 3, name: "Young Indian Health Checkup", price:899, discount:"-22%" ,disprice:1499, img:"https://images1-fabric.practo.com/dx/labs/PRL-YIHC/logo_0gMZNaj.jpg/360x240" },

       
      ];
  return (
    <>
    <div class="container pt-50 pb-50">
            <div class="row justify-content-center">
                <div class="col-lg-6">
                    <div class="section-title text-center pb-25">
                        <h3 class="title mb-15">Popular Health Checkup Packages</h3>
                        <p>Your tests will be conducted in one of our partner labs to ensure highest accuracy of your reports.</p>
                    </div>
                </div>
            </div> 
       <div class="col-lg-8 col-md-8 ml-200">
       <div class="row justify-content-center">
               
            </div> 
                    <div class="tab-content" id="v-pills-tabContent">
                        <div class="tab-pane fade show active"   aria-labelledby="v-pills-furniture-tab">
                            <div class="product-items mt-30">
                                <div class="row product-items-active">

                                {data.map((user) => (
                                        <div class="col-md-4">
                                        <div class="single-product-items">
                                            <div class="product-item-image">
                                                <Link style={{ textDecoration: 'none' }}  to="#"><img src={user.img} alt="Product"/></Link>
                                                <div class="product-discount-tag">
                                                    <p>{user.discount}</p>
                                                </div>
                                            </div>
                                            <div class="product-item-content text-center mt-30">
                                                <h5 class="product-title"><Link style={{ textDecoration: 'none' }}  to="#">{user.name}</Link></h5>
                                                
                                                <span class="regular-price">{user.price}</span>
                                                <span class="discount-price">{user.disprice}</span>
                                                <ul className='mt-15'>
                             <Link style={{ textDecoration: 'none' }}  to="/"> <h6 style={{color:'#fe7865' }} >Book now</h6> </Link>  
                            </ul>
                                            </div>
                                           
                                        </div> 
                                    </div>
                                  ))}
                                
                                   
                                </div> 
                            </div> 
                        </div> 
                        </div> 
                        </div> 
                        </div> 



    </>
  )
}
