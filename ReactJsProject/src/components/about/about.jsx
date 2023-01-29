import React from 'react';
import parasIMG from './Paras_img.png';
import hassanIMG from './ID.png';

const AboutComponent = () => {



    return (
    <div className="container mt-4">
        <div className=" rounded shadow" style={{backgroundColor : "#AED0FF"}}>
            <p className="py-2 fs-1 fw-bold text-center" >About us</p>
        </div>

        <div className="rounded shadow bg-white">
            <p className="px-5 pt-4 fs-5" >
                Welcome to Risto, the official restaurant reservation page for all of your dining needs. Our page was created as a final project for a subject at Hochschule Fulda by a dedicated team of 6 individuals, with 3 members working on the backend and 3 members focusing on the frontend.
            </p>
            <p className="px-5 pt-4 fs-5" >
                We utilize the latest technologies, including React and NodeJS, to provide a seamless and efficient experience for our users. Our goal is to make reserving a table at any restaurant as easy and convenient as possible through Risto.
            </p>
            <p className="px-5 pt-4 fs-5 pb-4" >
                Thank you for choosing Risto for your dining needs. We are proud to have developed this web page as a final work of a subject at Hochschule Fulda and hope you enjoy using it.
            </p>
            <div className='px-5'>
                <hr></hr>
            </div>
            <p className='fw-bold fs-2 px-5 text-center mt-4'>Meet our team</p>
            <div className='d-flex flex-row'>
                <div className='col-6'>
                    <p className='fw-bold fs-4 px-5 text-center'>Frontend team</p>
                    
                    <div class="card m-5">
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src="https://avatars.githubusercontent.com/u/87797326?v=4" class="img-fluid rounded-start" 
                            alt="..."></img>
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title ms-2">Noman</h5>
                                <p class="card-text">Frontend leader.</p>
                                <a className='btn btn-primary' href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/Noman.html">See more</a>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="card m-5">
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src={parasIMG} class="img-fluid rounded-start" 
                            alt="..."></img>
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title ms-2">Paras</h5>
                                <p class="card-text">Github master and member from the frontend team.</p>
                                <a className='btn btn-primary' href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/Paras-CV.html">See more</a>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="card m-5">
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src={hassanIMG} class="img-fluid rounded-start" 
                            alt="..."></img>
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title ms-2">Hassan</h5>
                                <p class="card-text">Member from the frontend team.</p>
                                <a className='btn btn-primary' href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/aboutHassan.html">See more</a>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className='col-6'>
                    <p className='fw-bold fs-4 px-5 text-center'>Backend team</p>

                    <div class="card m-5">
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src="https://avatars.githubusercontent.com/u/74145538?v=4" class="img-fluid rounded-start" 
                            alt="..."></img>
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title ms-2">Luis</h5>
                                <p class="card-text">Team leader and member from the backend team.</p>
                                <a className='btn btn-primary' href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/Luis-site.html">See more</a>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="card m-5">
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src="https://avatars.githubusercontent.com/u/74461667?v=4" class="img-fluid rounded-start" 
                            alt="..."></img>
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title ms-2">Jesús</h5>
                                <p class="card-text">Backend leader.</p>      
                                <a className='btn btn-primary' href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/ABOUT_Jesus.html">See more</a>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="card m-5">
                        <div class="row g-0">
                            <div class="col-md-4">
                            <img src="https://avatars.githubusercontent.com/u/95298592?v=4" class="img-fluid rounded-start" 
                            alt="..."></img>
                            </div>
                            <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title ms-2">Vichitar</h5>
                                <p class="card-text">Member from the backend team.</p>
                                <a className='btn btn-primary' href="http://team3gdsdweb.s3-website-us-east-1.amazonaws.com/personal_webpages/Vichitar_About_Page.html">See more</a>
                            </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>


            <br></br>
            <br></br>
            <br></br>
        </div>
      </div>
    );
};

export default AboutComponent;
