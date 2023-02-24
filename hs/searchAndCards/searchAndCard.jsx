/* display cards using grid */
const Search = ({ placeholder }) => {
    return (
      <span className="search-input-wrapper">
        <input className="search-input" type="text" placeholder={placeholder} />
      </span>
    );
  };
  
  Search.propTypes = {
    placeholder: PropTypes.string,
  };
  
  const CardList = ({ cards }) => {
    return (
      <div className="page-body">
        {cards.map(({id, images: { large: imageUrl }, name, flavorText}) =>
          <div key={id} className="card-wrapper">
            <div className="card-inner">
              <img className="card-image" src={imageUrl} />
              <div>Title: {name}</div>
              <div>Description: {flavorText || "None"}</div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  CardList.propTypes = {
    cards: PropTypes.array,
  }
  
  const cardsEndpoint = "https://api.pokemontcg.io/v2/cards";
  
  const App = () => {
  
    const [cards, setCards] = React.useState([]);
    const page = React.useRef(1)
  
    const getCards = async () => {
      const response = await fetch(`${cardsEndpoint}/?pageSize=20&page=${page.current}`);
      const {data: newCards, totalCount} = await response.json();
  
      setCards(newCards);
  
    };
  
  
    React.useEffect(() => {
      getCards();
    }, []);
  
  
    return (
      <div className="page-container">
        <h1>Elder Scrolls</h1>
        <div className="search-bar">
          <Search placeholder="Search" />
        </div>
        <CardList cards={cards} / >
      </div >
    )
  }
  
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  @media (max-width: 699px) {
    .page-body {
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: minmax(100px, auto);
    }
  }
  
  @media (max-width: 480px) {
    .page-body {
      grid-template-columns: repeat(1, 1fr);
      grid-auto-rows: minmax(100px, auto);
    }
  }
  
  @media (min-width: 700px) {
  .page-body {
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: minmax(100px, auto);
  }
  }
  
  
  .page-body {
    display:grid;
    grid-gap: 20px;
  }
  
  .search-input-wrapper {
    display:flex;
    align-items: flex-end;
    justify-content: end;
  }
  /* sample styles */
  .card-wrapper {
    display: inline-block;
    /* max-width: 48%; */
    max-width: 200px;
    height: auto;
    padding: 20px;
  }
  
  .card-image {
    width:100%;
    height: calc(100%-40px);
  }