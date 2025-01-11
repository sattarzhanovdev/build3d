import React, { useState, useEffect } from "react";
import videos from "./utils"; 
import "./styles.css";
import intro from './videos/Malinowskiego_Hero_0-1.mp4';
import introMove from './videos/Malinowskiego_Hero_1-1.mp4';

function App() {
  const [state, setState] = useState(-1);
  const [lastState, setLastState] = useState(null); 
  const [isVideoChanging, setIsVideoChanging] = useState(false); // Состояние для плавного изменения

  const videoCount = 2;

  useEffect(() => {
    setState(-1);
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const videoIndex = Math.floor(scrollPosition / window.innerHeight);

      if (videoIndex < videoCount) {
        if (state <= 2) return setState(videoIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [videoCount]);

  useEffect(() => {
    if (state !== -1) {
      setLastState(state); // сохраняем предыдущее состояние
    }
  }, [state]);

  React.useEffect(() => {
    setTimeout(() => {
      setState(-2);
    }, 3000);
  }, []);

  // Функция для изменения видео по нажатию на кнопку
  const handleButtonClick = (newState) => {
    setState(newState)
    setTimeout(() => {
      setState(newState)
    }, 500)
    setIsVideoChanging(true); // Начинаем плавный переход
    setState(newState); // Обновляем состояние после завершения анимации
    setIsVideoChanging(false); // Заканчиваем плавный переход
  };

  return (
    <div>
      {
        videos.map((item, i) => (
          <video
            autoPlay
            muted
            key={state || i}
            className={`background-video ${i === state || state === -1 || state === -2? 'active' : ''}`} 
          >
            <source
              src={state === -1 ? intro : state === -2 ? introMove : item}
              type="video/mp4"
            />
          </video>
        ))
      }

      <div className="scroll-content">
        {Array.from({ length: state === 2 || state >= 6 ? 1 : 2 }, (_, index) => (
          <div key={index} className="scroll-section">
            {index === 0 ? (
              <div className="info">
                <h1>Malinowski housing <br /> estate</h1>
                <p>
                  A quiet place in a great neighborhood. Enjoy <br /> unlimited
                  nature and the charms of city life in<br /> Józefów.
                </p>
                <div>
                  <button onClick={() => handleButtonClick(3)}>PICK A HOUSE</button>
                  <div>
                    <span>
                      <svg
                        stroke="white"
                        fill="white"
                        strokeWidth="0"
                        viewBox="0 0 24 24"
                        className="Header___StyledCiLocationOn-sc-1r2raak-0 jngcSZ"
                        height="50%"
                        width="40px"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="Location_On">
                          <g>
                            <path d="M12,21.933a1.715,1.715,0,0,1-1.384-.691L5.555,14.5a7.894,7.894,0,1,1,12.885-.009L13.385,21.24A1.717,1.717,0,0,1,12,21.933ZM11.992,3.066A6.81,6.81,0,0,0,7.414,4.815a6.891,6.891,0,0,0-1.05,9.1l5.051,6.727a.725.725,0,0,0,.584.292h0a.732.732,0,0,0,.586-.292l5.044-6.734A6.874,6.874,0,0,0,12.81,3.113,7.277,7.277,0,0,0,11.992,3.066Z"></path>
                            <path d="M12,12.5A2.5,2.5,0,1,1,14.5,10,2.5,2.5,0,0,1,12,12.5Zm0-4A1.5,1.5,0,1,0,13.5,10,1.5,1.5,0,0,0,12,8.5Z"></path>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <p>Józefów, <br /> księdza malinowskiego 38 <br /> Poland</p>
                  </div>
                </div>
                <div className="line"></div>
                <div className="more">
                  <div>
                    <h2>0.5 km</h2>
                    <p>to shops and <br /> bus stops</p>
                  </div>
                  <div>
                    <h2>3 km</h2>
                    <p>to Warsaw ring <br /> road</p>
                  </div>
                  <div>
                    <h2>0.3 km</h2>
                    <p>to forests</p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="info"
                style={state === 2 || state === 3 || state >= 6 ? { display: "none" } : state === 4 ? { display: "block" } : null}
              >
                <h1>Select your house</h1>
                <div className="houses">
                  {[...Array(6)].map((_, i) => (
                    <div className="house" key={i} onClick={() => handleButtonClick(i + 2)}>
                      <div>
                        <p>HOUSE</p>
                        <h4>38A</h4>
                      </div>
                      <span></span>
                      <div>
                        <p>PLOT, M<sup>2</sup></p>
                        <h4>900</h4>
                      </div>
                      <div>
                        <p>HOUSE, M<sup>2</sup></p>
                        <h4>147</h4>
                      </div>
                      <div>
                        <p>PRICE, EUR</p>
                        <h4>{i < 3 ? "SOLD" : "360.000"}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {state === 2 || state >= 6 ? (
              <div className="house_more">
                <button onClick={() => handleButtonClick(4)} className={`back${index}`}>
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    height="100%"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
                    ></path>
                  </svg>
                </button>
                <div className="sides">
                  <div onClick={() => handleButtonClick(state <= 19 ? 20 : 6)}>
                    <img src="https://api.malinowskiego.com/uploads/ext_1_088169c704.jpg" alt="" />
                  </div>
                  <div onClick={() => handleButtonClick(state <= 18 ? 19 : 8)}>
                    <img src="https://api.malinowskiego.com/uploads/ext_2_f3de49256d.jpg" alt="" />
                  </div>
                  <div onClick={() => handleButtonClick(state <= 17 ? 18 : 10)}>
                    <img src="https://api.malinowskiego.com/uploads/ext_3_f55b980544.jpg" alt="" />
                  </div>
                  <div onClick={() => handleButtonClick(state <= 16 ? 17 : 12)}>
                    <img src="https://api.malinowskiego.com/uploads/ext_4_19bbf6dacf.jpg" alt="" />
                  </div>
                  <div onClick={() => {
                    handleButtonClick(state === 15 ? 16 : 14)
                  }}>
                    <img src="https://api.malinowskiego.com/uploads/int_1_e24314d5bd.jpg" alt="" />
                  </div>
                  <div onClick={() => {
                    handleButtonClick(15);
                    setLastState(15);
                  }}>
                    <img src="https://api.malinowskiego.com/uploads/int_2_b649885c84.jpg" alt="" />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;