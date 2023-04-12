import './LoggedOutHome.css'
import { useState, useEffect, useRef } from 'react';

export default function LoggedOutHome() {

    // const [currentIndex, setCurrentIndex] = useState(0);

    // const items = ['weekend dinner idea', 'home decor idea', 'new look idea', 'green thumb idea']

    // useEffect(() => {

    //     const intervalId = setInterval(() => {
    //         const nextIndex = (currentIndex + 1) % items.length;
    //         setCurrentIndex(nextIndex);
    //     }, 2000);

    //     return () => clearInterval(intervalId);
    // }, [currentIndex, items]);

    // const handleTransitionEnd = () => {
    //         const nextIndex = currentIndex > 2 ? setCurrentIndex(0) : currentIndex + 1;
    //         setCurrentIndex(nextIndex);

    // };


    return (

        <div className='logged-out-wrapper'>

            <div className="get-your-next-wrapper">
                <div className='get-your-next'>Get your next</div>
                <div className="animated-text">
                    <div className="iceberg-idea">iceberg idea
                        <div className ="splash-photos">
                            {/* <div className='photo1' style={{
                                position:'absolute', 
                                height: '350px', 
                                width: '236px', 
                                overflow: 'none', 
                                backgroundImage:'url(https://pinguin-seeds.s3.us-west-1.amazonaws.com/splash-images/SplashImages/Fishing/fishing-1-1.jpg', 
                                borderRadius: '10px', 
                                backgroundSize:'cover', 
                                backgroundRepeat:'no-repeat'}}>
                            </div>
                            <div className='photo1-1' style={{
                                position:'absolute', 
                                height: '350px', 
                                width: '236px', 
                                overflow: 'none', 
                                backgroundImage:'url(https://pinguin-seeds.s3.us-west-1.amazonaws.com/splash-images/SplashImages/Fishing/fishing-1-1.jpg', 
                                borderRadius: '10px', 
                                backgroundSize:'cover', 
                                backgroundRepeat:'no-repeat'}}>
                            </div> */}
                            <div className='photo3'>
                                
                            </div>
                            <div className='photo4'>
                                
                            </div>
                            <div className='photo5'>
                                
                            </div>
                            <div className='photo6'>
                                
                            </div>
                            <div className='photo7'>
                                
                            </div>
                        </div>
                    </div>
                    <div className="orca-avoiding">orca avoiding idea</div>
                    <div className="fishing-idea">fishing idea</div>
                    <div className="ice-sliding">ice sliding idea</div>
                </div>
            </div>

            <div className='pinguinlogo-splash'></div>
        </div>

    )
}