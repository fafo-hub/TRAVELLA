import "./featuredProperties.css";
import UseFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {

  const { data, loading, error } = UseFetch("/hotels?featured=true");

  return (
    <div className="fp">
      {loading ? (
        <>
          <div className="loadings">
            <img src="https://i.gifer.com/ZKZg.gif" alt="" />
          </div>
        </>
      ) : (
        <>
          { (data !== null && Array.isArray(data)) ? data.slice(0, 4).map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
              {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
              </div>}
            </div>
          ))
        : 
        (
          <div> No data </div>
        )
        }
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
