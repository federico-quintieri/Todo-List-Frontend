export function Card({ titolo, scadenza, callbackDelete }) {
  return (
    <div className="card">
      <span className="titolo">
        {titolo}
        <span className="scadenza">{scadenza}</span>
        <span onClick={callbackDelete} className="delete">Delete</span>
      </span>
    </div>
  );
}
