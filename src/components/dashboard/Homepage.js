import React from 'react'
import Carousel from 'nuka-carousel';



const hStyle = {
    fontSize: '64px',
}

const divStyle = {
    overflow:'hidden',
    height:'550px',
    paddingTop: '0px'
}

const carouselStyle = {
        width: '100%',
        height: '800px',

}

const Homepage = () => {
    return(
        <div>
            <br/>
            <div className="container container mt-4 mb-5">
                <br/><br/><br/>
                <h3 className="display-4 text-center" style={hStyle}><strong> Welcome to <span className="topic">T</span>rans <span className="topic">G</span>lobal <span className="topic">L</span>ogistics </strong></h3>
                <hr className="bg-dark mb-4 w-25"/>
                <br/><br/><br/><br/><br/>
                <div className="row">
                    <div style={divStyle} className="col-md-6">
                        <img src={require('../../img/index1.png')} alt=""/>
                    </div>
                    <div className="col-md-6">
                        <h2><strong>Trans Global Logistics Pvt Ltd.</strong></h2>
                        <hr className="bg-dark w-25 ml-0"/>
                        <br/>
                        <p>At Trans GlobalLogistics, we combine our twenty years of experience in the industry, global expertise and professionalism to deliver 
                            importers and exporters tailor-made and fully integrated solutions ensuring you the best freight rates, transit time and fast space arrangements each and every time.
                            <br/><br/> Providing you with worldwide air and ocean freight, contract logistics and supply chain management services we help you manage your supply chain process with more 
                            efficiency and agility. <br/><br/> When you plan your cargo exchange with us, there is no room for delays and losses. Collaborating with the most reputable companies 
                            in the industry we strive to exchange your cargo, meeting all your requirements at a global or regional level. <br/><br/> Plan your cargo exchange with Trans GlobalLogistics for a faster, better and a leaner delivery.</p>
                    </div>
                </div>
                <br/><br/>
                
            </div>

            <div  >
                <Carousel style={carouselStyle}>
                    <img src={require('../../img/index3.jpg')} alt="carousel1" />
                    <img src={require('../../img/index2.jpg')} alt="carousel2" />
                    <img src={require('../../img/index4.jpg')} alt="carousel3" />
                </Carousel>
            </div>

            <br/><br/><br/><br/><hr/><br/><br/><br/>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-8">
                        <h3 className="display-4"><strong>A FEW WORDS ABOUT US</strong></h3>
                        <hr className="bg-dark w-25 ml-0"/>
                        <p className="lead">
                            Trans Global Logistics provides professional trucking and transportation services to enable our customers with the same day delivery of any cargo.
                        </p>
                        <p>
                            Our numerous services include but are not limited to transportation of oversized, rare and unusual commercial and military cargo, as well as the planning, coordination and implementation/transportation of any hazardous cargos. We even provide storage services to our clients.
                        </p>
                    </div>
                    <div className="col-md-4 mt-4">
                        <img className="card-img-top" src={require('../../img/index5.jpg')} alt="Card cap"/>
                    </div>
                </div>
           
            <br/><br/><br/><hr/><br/><br/>

            <div id="wrapper" className="animate">
                <div className="container-fluid">
                        <h3 className="display-4 text-center"><strong>OUR ADVANTAGES</strong></h3>
                        <br/><br/>
                    <div className="row">
                        <div className="col">
                        <div className="card">
                            <div className="card-body">
                            <img className="card-img-top" src={require('../../img/index6.jpg')} alt="Card cap"/>
                            <hr/>
                            <h5 className="card-title">BEST SERVICE</h5>
                            <p className="card-text">Our mission is to attract, satisfy and retain our beloved customers by providing Best in className transportation solutions and fostering a profitable, disciplined culture service.</p>
                            </div>
                        </div>
                        </div>
                        <div className="col">
                        <div className="card">
                            <div className="card-body">
                            <img className="card-img-top" src={require('../../img/index7.jpg')} alt="Card cap"/>
                            <hr/>
                            <h5 className="card-title">SAFETY AND SECURITY</h5>
                            <p className="card-text">Safety for our employees, customers, cargo and community we work in will always remain our primary focus in all the policies, procedures and programs that govern our business.</p>
                            </div>
                        </div>
                        </div>
                        <div className="col">
                        <div className="card">
                            <div className="card-body">
                            <img className="card-img-top" src={require('../../img/index8.jpg')} alt="Card cap"/>
                            <hr/>
                            <h5 className="card-title">QUALIFIED EMPLOYEES</h5>
                            <p className="card-text">Our team is comprised of some of the best and qualified managers and drivers in the logistics industry. We can match your transportation and logistic needs and preferences of cargo delivery.</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <br/><br/>
            </div>
            <div className="callUs">
                <br/><br/><br/><br/>
                <h3 className="text-center callUsNow"><strong>Make the right choice!</strong> Do you need profesional trucking services? Call us now!</h3>
            </div>

            
        </div>
    )
}

export default Homepage;
