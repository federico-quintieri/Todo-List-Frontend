// Componente che fa il form
import { Card } from "./Card";
import { useState } from "react";

const oggettoPartenza = {
  nome: "",
  scadenza: "",
};

// Il mio array di oggetti di partenza deve essere preso dal database ...

export function Form() {
  // Imposto lo state con l'oggetto di partenza
  const [objInput, setObjInput] = useState(oggettoPartenza);
  // Settiamo uno state array vuoto
  const [arrAct, setArrAct] = useState([]);

  // Faccio delle callback per sincronizzare gli input ad evento onChange
  const inputSync = (event) => {
    const { value, name } = event.target;

    // Facciamo copia oggetto precedente modificando la prop name con il value
    setObjInput((prev_obj) => {
      const newObject = {
        ...prev_obj,
        [name]: value,
      };
      return newObject;
    });
  };

  // Faccio callback che aggiunge oggetto state ad array state
  const addObjState = (event) => {
    event.preventDefault();
    setArrAct((prev_arr) => {
      // Faccio copia array state precedente e aggiungo oggetto state
      const newArray = [...prev_arr, objInput];
      return newArray;
    });
  };

  // Faccio callback che cancella obj da arrState
  const deleteObjState = (indexToDelete) => {
    // Filter per fare un array nuovo senza l'index passato come parametro
    setArrAct((prev_array) => {
      const newArray = prev_array.filter(
        (_, currIndex) => indexToDelete !== currIndex
      );
      return newArray;
    });
  };

  return (
    <div>
      <h1>Add activity</h1>
      <form onSubmit={addObjState}>
        <div className="form-div">
          <label htmlFor="name">
            Insert the name of what you wanna do
            <input
              id="name"
              type="text"
              className="form-label"
              name="nome"
              value={objInput.nome}
              onChange={inputSync}
            />
          </label>
          <p>{objInput.nome}</p>
        </div>
        <div className="form-div">
          <label htmlFor="scadenza">
            Insert the date where it ends
            <input
              id="scadenza"
              type="date"
              className="form-label"
              name="scadenza"
              value={objInput.scadenza}
              onChange={inputSync}
            />
          </label>
          <p>{objInput.scadenza}</p>
        </div>
        <button type="submit">Add activity</button>
      </form>
      {/* Map dell'array state */}
      {arrAct.map((currObj, currIndex) => (
        <Card
          key={currIndex}
          titolo={currObj.nome}
          scadenza={currObj.scadenza}
          callbackDelete={() => deleteObjState(currIndex)}
        />
      ))}
    </div>
  );
}
