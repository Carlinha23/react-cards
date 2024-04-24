import React, { useState, useEffect, useRef } from 'react';

export function useCardFunctions() {
  const [deckId, setDeckId] = useState('');
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isShuffling = useRef(false);

  useEffect(() => {
    const fetchNewDeck = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await response.json();
        setDeckId(data.deck_id);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching new deck:', error);
        setIsLoading(false);
      }
    };

    fetchNewDeck();
  }, []);

  const drawCard = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
      const data = await response.json();
      if (data.remaining === 0) {
        alert('Error: no cards remaining!');
      } else {
        setCards([...cards, data.cards[0]]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error drawing card:', error);
      setIsLoading(false);
    }
  };

  const shuffleDeck = async () => {
    if (isShuffling.current) return;
    isShuffling.current = true;
    setIsLoading(true);
    try {
      await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`);
      setCards([]);
      setIsLoading(false);
      isShuffling.current = false;
    } catch (error) {
      console.error('Error shuffling deck:', error);
      setIsLoading(false);
      isShuffling.current = false;
    }
  };

  return { drawCard, shuffleDeck, cards, isLoading };
}
