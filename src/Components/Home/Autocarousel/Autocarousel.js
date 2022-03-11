import React, { useEffect, useState } from 'react'
import "./Autocarousel.css"

const colors = [
    {
        img: "./images/banner/image4.jpg"
    },
    {
        img: "./images/banner/image5.jpg"
    },
    {
        img: "./images/banner/image6.jpg"
    }
];
const delay = 2500;

const Autocarousel = () => {

    {/* Autocarousel */ }

    const [index, setIndex] = React.useState(0);
    const timeoutRef = React.useRef(null);

    function resetTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(
            () =>
                setIndex((prevIndex) =>
                    prevIndex === colors.length - 1 ? 0 : prevIndex + 1
                ),
            delay
        );

        return () => {
            resetTimeout();
        };
    }, [index]);

    return (

        <div className="slideshow">
            <div
                className="slideshowSlider"
                style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
            >
                {colors.map((backgroundColor, index) => (
                    <img
                        src={backgroundColor.img}
                        className="slide"
                        key={index}
                        style={{ backgroundColor }}
                    ></img>
                ))}
            </div>

            <div className="slideshowDots">
                {colors.map((_, idx) => (
                    <div
                        key={idx}
                        className={`slideshowDot${index === idx ? " active" : ""}`}
                        onClick={() => {
                            setIndex(idx);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    )
}
export default Autocarousel