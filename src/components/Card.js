import React, { useRef, useState, useEffect } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

const handleMouseMove = (e, index) => {
  const card = document.getElementById(`card-${index}`);
  if (!card) return;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 10;
  const rotateY = ((x - centerX) / centerX) * 10;
  card.style.setProperty("--rotateX", `${rotateX}deg`);
  card.style.setProperty("--rotateY", `${rotateY}deg`);
};

const Card = ({ data, currentPage }) => {
  const [playingAudio, setPlayingAudio] = useState(null);
  const scrollContainerRef = useRef(null);

  const allChapters = data.flatMap((book) => book.chapters || []);

  useEffect(() => {
    const scrollToCard = (page) => {
      const cardWidth = 300;
      const scrollAmount = page * cardWidth * 4;
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    };

    scrollToCard(currentPage);
  }, [currentPage]);

  const handleCardClick = (audioUrl) => {
    if (playingAudio) {
      playingAudio.pause();
    }

    const newAudio = new Audio(audioUrl);
    setPlayingAudio(newAudio);
    newAudio.play();
  };

  return (
    <div className="lg:ml-[26rem] w-full flex justify-center items-center overflow-x-hidden mb-20">
      <div
        ref={scrollContainerRef}
        className="scroll-container no-scrollbar flex space-x-4 overflow-x-auto snap-x snap-mandatory"
      >
        {allChapters.length === 0 ? (
          <div>No chapters available</div>
        ) : (
          allChapters.map((card, index) => (
            <div
              className={`card ml-5 relative rounded-xl shadow-lg transform transition-transform duration-500 ease-in-out min-w-[300px] ${card.unlockXp === "coming soon" ? "bg-gray-800" : "bg-gray-900"}`}
              key={index}
              id={`card-${index}`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onClick={() => handleCardClick(card.audioUrl)}
              style={{
                transform:
                  "perspective(1000px) rotateY(var(--rotateY, 0deg)) rotateX(var(--rotateX, 0deg))",
                marginTop: "20px",
                paddingTop: "10px",
                position: "relative",
              }}
            >
              {card.unlockXp === "coming soon" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
                  <i className="fas fa-lock text-white text-4xl"></i>
                </div>
              )}
              <img
                src={card.imageUrl}
                alt={`${card.name} image`}
                className="w-full h-auto"
              />
              <div className="card-title text-xl text-center my-2">
                {card.name}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Card;
