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
                    <div className="weekend-dinner">iceberg idea</div>
                    <div className="home-decor">orca avoiding idea</div>
                    <div className="new-look">fishing idea</div>
                    <div className="green-thumb">ice sliding idea</div>
                </div>
            </div>

            <div className='pinguinlogo-splash'></div>
        </div>

    )
}