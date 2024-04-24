import React from 'react';
import { useCardFunctions } from './Cards';

function App() {
  const { drawCard, shuffleDeck, cards, isLoading } = useCardFunctions();

  return (
    <div>
      <h1>Click to Draw</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={drawCard}>Draw Card</button>
          <button onClick={shuffleDeck}>Shuffle Deck</button>
          <div>
            {cards.map((card, index) => (
              <img key={index} src={card.image} alt={card.code} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
