import React from 'react'
import {NavLink} from 'react-router-dom'


const Footer = () => {
    return(
        <footer className="footer bg-dark text-white">

            {/* Footer links */}
            <div className="container pt-5 pb-2">
                <div className="row">

                    <div className="col-md-3 col-lg-4 col-xl-3">
                        <h4>Trans Global Logistics</h4>
                        <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25"/>
                        <p style={{textAlign:'justify'}}> 
                            We have established a strong presence in the transportation industry. Our award-winning services earn a reputation for quality and excellence that few can rival.
                        </p>
                    </div>

                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
                        <h4>Services</h4>
                        <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25"/>
                        <p><NavLink to='/signin' className="text-white">Imports</NavLink></p>
                        <p><NavLink to='/signin' className="text-white">Exports</NavLink></p>
                        <p><NavLink to='/signin' className="text-white">Project Cargo</NavLink></p>
                        <p><NavLink to='/signin' className="text-white">Consultation</NavLink></p>
                    </div>

                    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto">
                        <h4>Useful links</h4>
                        <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25"/>
                        <p><NavLink to='/' className="text-white">Home</NavLink></p>
                        <p><NavLink to='/about' className='text-white'>About</NavLink></p>
                        <p><NavLink to='/services' className='text-white'>Services</NavLink></p>
                        <p><NavLink to='/contact' className='text-white'>Contact</NavLink></p>
                    </div>

                    <div className="col-md-4 col-lg-3 col-xl-3">
                        <h4>Contact</h4>
                        <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25"/>
                        <p><i className="fa fa-home mr-3"></i> 66/22,Fortune Terrace,Pannipitiya</p>
                        <p><i className="fa fa-envelope mr-3"></i> tgl@yahoo.com</p>
                        <p><i className="fa fa-phone mr-3"></i> + 98 765 432 11</p>
                        <p><i className="fa fa-print mr-3"></i> + 98 765 432 10</p>
                    </div>

                </div>
            </div>

            <hr className="bg-white mx-4 mt-2 mb-1"/>

            {/* Copyright */}
            <div className="container-fluid">
                <p className="text-center m-0 py-1">
                    © 2019 Copyright <a href="<?php echo base_url('Homepage')?>" className="text-white">TRANS GLOBAL LOGISTICS</a>
                </p>
            </div>

        </footer>
    )
}

export default Footer;
