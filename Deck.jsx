import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card'

function Deck() {
    const [deckId, setDeckId] = useState(null);
    const [card, setCard] = useState(null);
  
    useEffect(() => {
      axios.get('https://deckofcardsapi.com/api/deck/new/')
        .then(response => {
          setDeckId(response.data.deck_id);
        })
        .catch(error => console.error('Error fetching deck:', error));
    }, []);
  
    const drawCard = () => {
      if (!deckId) return;
  
      axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(response => {
          setCard(response.data.cards[0]);
        })
        .catch(error => console.error('Error drawing card:', error));
    };
  
    return (
      <div>
        <h1>Card Drawing App</h1>
        <button onClick={drawCard}>Draw Card</button>
        <div>
          {card && <Card card={card} />}
        </div>
      </div>
    );
  }

export default Deck;
