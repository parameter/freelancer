import React, { FC, useEffect, useState } from "react";

const Branding = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [mouseStartY, setMouseStartY] = useState(40);
    const [mouseCurrentY, setMouseCurrentY] = useState(40);
    const [handleY, setHandleY] = useState(50);
    const [dist, setDist] = useState(0);
    const circle = React.createRef();
    const slider = React.createRef();

    useEffect(() => {
        
    },[]);

    const start = (event) => {
        setIsDragging(true);
        setDist(0);
        slider.current.classList.add('active');
        
        var rect = circle.current.getBoundingClientRect();
        var y = event.clientY - rect.top;

        setMouseStartY(y);
    }

    const end = (event) => {
        setIsDragging(false);
        setDist(0);
        slider.current.classList.remove('active');
    }

    const move = (event) => {
        if(!isDragging) return;
        event.preventDefault();
        var rect = circle.current.getBoundingClientRect();
        var y = event.clientY - rect.top;
        setMouseCurrentY(y);
    }

    const calcHandlePos = () => {
        var y = mouseCurrentY - 18;
        if (y < 8) {
            y = 8;
        }
        if (y > 68) {
            y = 68;
        }
        return y + 'px'
    }

    return (
      <div onMouseUp={end} onMouseLeave={end} className="base__branding">
        <div ref={circle} onMouseUp={end} onTouchEnd={end} onMouseMove={move} onTouchMove={move} className="base__branding-logo">
            <div className="base__branding-logo-slider">
                <div onMouseDown={start} onTouchStart={start} style={{top: calcHandlePos()}} ref={slider} draggable className="base__branding-logo-slider-handle"></div>
            </div>
        </div>
        <h1>parameter</h1>
      </div>
    );
};

export default Branding;