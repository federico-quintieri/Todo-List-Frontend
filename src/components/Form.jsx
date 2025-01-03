// Componente che fa il form
import { Card } from "./Card";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const oggettoPartenza = {
  nome: "",
  scadenza: "",
};

const urlAPI = "http://localhost:3000/activities";

// Faccio function che fa il fetch di dati
const fetchData = async () => {
  const response = await axios.get(urlAPI);
  return response.data;
};

export function Form() {
  // Imposto lo state con l'oggetto di partenza
  const [objInput, setObjInput] = useState(oggettoPartenza);
  // Settiamo uno state array vuoto
  const [arrAct, setArrAct] = useState([]);

  // Destrutturo risultato di useQuery richiamando chiamata API
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["mioDB"],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setArrAct(data); // Popola l'array state con i dati recuperati dal server (DB)
    },
  });

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
  const addObjState = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(urlAPI, objInput);
      console.log(response.data); // Messaggio di successo dal backend

      // Aggiorna lo stato locale con i dati del backend
      setArrAct((prev_arr) => [...prev_arr, objInput]);
      setObjInput(oggettoPartenza); // Resetta i campi del form
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  // Faccio callback che cancella obj da arrState
  const deleteObjState = async (indexToDelete) => {
    const idToDelete = arrAct[indexToDelete].id; // Assumi che ogni oggetto abbia un ID
    console.log("Deleting ID:", idToDelete); // Debug
    try {
      await axios.delete(`${urlAPI}/${idToDelete}`);
      setArrAct((prev_array) => 
        prev_array.filter((currObj) => currObj.id !== currIndex) 
      );
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
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
      {/* Map dell'array state in base a risposta da database*/}
      {isLoading && <p>Loading activities...</p>}
      {isError && <p>Error loading activities: {error.message}</p>}
      {!isLoading &&
        !isError &&
        arrAct.map((currObj, currIndex) => (
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
