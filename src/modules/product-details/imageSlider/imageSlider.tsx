import React, { useEffect, useRef, useState } from "react";
import "./imageSlider.scss";

const ImageSlider = ({ images }: any) => {
  let imageContainerRef: any = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prev = () => {
    const scrollDistance = imageContainerRef.current.clientWidth;
    let newIndex = currentImageIndex - 1;
    if (newIndex < 0) {
      newIndex = images.length - 1;
    }
    imageContainerRef.current.scrollLeft = newIndex * scrollDistance;
    setCurrentImageIndex(newIndex);
  };

  const next = () => {
    const scrollDistance = imageContainerRef.current.clientWidth;
    let newIndex = currentImageIndex + 1;
    if (newIndex >= images.length) {
      newIndex = 0;
    }
    imageContainerRef.current.scrollLeft = newIndex * scrollDistance;
    setCurrentImageIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    const scrollDistance = imageContainerRef.current.clientWidth;
    imageContainerRef.current.scrollLeft = index * scrollDistance;
    setCurrentImageIndex(index);
  };

  useEffect(() => {
    const handleResize = () => {
      // Recalculate the current image index on resize
      const scrollDistance = imageContainerRef.current.clientWidth;
      const currentIndex = Math.round(imageContainerRef.current.scrollLeft / scrollDistance);
      setCurrentImageIndex(currentIndex);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="slider">
      <div className="prev-btn" onClick={prev}>
        &#10094;
      </div>
      <div className="slides" ref={imageContainerRef}>
        {images.map((imageUrl: any, index: number) => (
          <img key={index} src={imageUrl} alt={`Product ${index + 1}`} />
        ))}
      </div>
      <div className="next-btn" onClick={next}>
        &#10095;
      </div>
      <div className="dots">
        {images.map((_: any, index: number) => (
          <span
            key={index}
            className={index === currentImageIndex ? "dot active" : "dot"}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
