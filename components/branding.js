import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import React, { FC, useEffect, useState } from "react";

const Branding = (props) => {
    const [isDragging, setIsDragging] = useState(false);
    const [parameterY, setParameterY] = useState(55);
    const [mouseCurrentY, setMouseCurrentY] = useState(55);
    const [handleY, setHandleY] = useState(55);
    const [dist, setDist] = useState(0);
    const circle = React.createRef();
    const slider = React.createRef();

    useEffect(() => {
        
    },[]);

    const start = (event) => {
        setIsDragging(true);
        setDist(0);
        slider.current.classList.add('active');
        
        if (event.touches) {
            return;
        } else {
            var rect = circle.current.getBoundingClientRect();
            var y = event.clientY - rect.top;
        }

        setParameterY(y);
    }

    const end = (event) => {
        setIsDragging(false);
        setDist(0);
        slider.current.classList.remove('active');
    }

    const move = (event) => {
        if (!isDragging) { return; }

        if (event.touches) {
            var touch = event.touches[0] || event.changedTouches[0];
            var realTarget = document.elementFromPoint(touch.clientX, touch.clientY);
            var offsetX = touch.clientX-realTarget.getBoundingClientRect().x;
            var offsetY = touch.clientY-realTarget.getBoundingClientRect().y;
            props.setParameterY(offsetY);
        } else {
            var rect = circle.current.getBoundingClientRect();
            var y = event.clientY - rect.top;
            setMouseCurrentY(y);
            props.setParameterY(y);
        }
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

    const setBgColor = (color) => {
        props.setCurrentBgColor(color);
    }

    const printColorDots = () => {
        return props.bgColors.map((color) => {
            return <div key={color.color} className={"base__branding-color-picker-dot" + (props.currentBgColor === color.color ? ' selected' : '')} onClick={() => setBgColor(color)} style={{backgroundColor: color.displayColor}}></div>
        })
    }

    return (
      <div onMouseUp={end} onMouseLeave={end} className="base__branding">
        <div ref={circle} onMouseLeave={end} onMouseUp={end} onTouchEnd={end} onMouseMove={move} onTouchMove={move} className="base__branding-logo">
            <div className="base__branding-logo-slider">
                <div onMouseDown={start} onTouchStart={start} onMouseUp={end} onMouseLeave={end} style={{top: calcHandlePos()}} ref={slider} className="base__branding-logo-slider-handle"></div>
            </div>
        </div>
        <h1>parameter</h1>
        <div className="base__branding-color-picker">
            {printColorDots()}
        </div>
      </div>
    );
};

export default Branding;