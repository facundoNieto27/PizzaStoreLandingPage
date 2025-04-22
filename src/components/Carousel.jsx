import { React, useState, useEffect } from "react";

function Carousel({ pizzas }) {
  const [currentPizza, setCurrentPizza] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPizza((prevPizza) => (prevPizza + 1) % pizzas.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [pizzas.length]);

  const nextPizza = () => {
    setCurrentPizza((prevPizza) => (prevPizza + 1) % pizzas.length);
  };

  const prevPizza = () => {
    setCurrentPizza(
      (prevPizza) => (prevPizza - 1 + pizzas.length) % pizzas.length
    );
  };
  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={prevPizza}>
        &#10094;
      </button>
      <div className="carousel">
        <div className="carousel-item">
          <h3 className="pizza-name">{pizzas[currentPizza].name}</h3>
          <img
            src={pizzas[currentPizza].image}
            alt={pizzas[currentPizza].name}
            className="pizza-image"
          />
          <p className="pizza-desc">{pizzas[currentPizza].description}</p>
        </div>
      </div>
      <button className="carousel-button next" onClick={nextPizza}>
        &#10095;
      </button>

      <div className="carousel-dots">
        {pizzas.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentPizza ? "active" : ""}`}
            onClick={() => setCurrentPizza(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}
export default Carousel;
