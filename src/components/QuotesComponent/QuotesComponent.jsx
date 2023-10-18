import React from 'react';
import './QuotesComponent.css';
const QuotesComponent = () => {
  const frasesMotivadoras = [
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "La única forma de hacer un gran trabajo es amar lo que haces.",
    "No importa lo lento que vayas, siempre y cuando no te detengas.",
    "Cree en ti mismo y todo será posible.",
    "El fracaso es solo la oportunidad de empezar de nuevo de forma más inteligente.",
    "Si te caes siete veces, levántate ocho.",
    "El único modo de hacer un gran trabajo es amar lo que haces.",
    "La perseverancia es la madre del éxito.",
    "Cada día es una nueva oportunidad para cambiar tu vida.",
    "Sé el cambio que quieres ver en el mundo."
  ];

  const fraseAleatoria = frasesMotivadoras[Math.floor(Math.random() * frasesMotivadoras.length)];

  return (
    <div className="quotes-container">
      <span className="text-quote">{fraseAleatoria}</span>
    </div>
  );
};

export default QuotesComponent;
