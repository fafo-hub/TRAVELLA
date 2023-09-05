import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import UseFetch from "../../hooks/useFetch";

const List = () => {

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = UseFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 999}`
  );

  //console.log(location.state);
  const handleClick = () => {
    reFetch();
  };
  // console.log(data);
  console.log(location);

  return (
    <div>
      {loading ? (
        <>
          <div className="navheaderwrap">
            <Navbar />
            <Header type="list" />
          </div>
          <div className="loading">
            <img src="https://i.gifer.com/ZKZg.gif" alt="" />
          </div>
        </>
      ) :
        (
          <>
            {data.length === 0 ?

              <>
                <div className="navheaderwrap">
                  <Navbar />
                  <Header type="list" />
                </div>
                <div className="not-available">
                  <img src="https://static.vecteezy.com/system/resources/previews/009/796/821/original/house-not-available-on-white-background-not-available-sign-not-available-label-flat-style-vector.jpg" alt="" />
                </div>
              </>

              :
              <>
                <div className="navheaderwrap">
                  <Navbar />
                  <Header type="list" />
                </div>
                <div className="listContainer">
                  <div className="listWrapper">
                    <div className="listSearch">
                      <h1 className="lsTitle">Search</h1>
                      <div className="lsItem">
                        <label>Destination</label>
                        <input placeholder={destination} type="text" disabled />
                      </div>
                      <div className="lsItem">
                        <label>Check-in Date</label>
                        <span onClick={() => setOpenDate(!openDate)}>{`${format(
                          dates[0].startDate,
                          "MM/dd/yyyy"
                        )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                        {openDate && (
                          <DateRange
                            onChange={(item) => setDates([item.selection])}
                            minDate={new Date()}
                            ranges={dates}
                            disabled
                          />
                        )}
                      </div>
                      <div className="lsItem">
                        <label>Options</label>
                        <div className="lsOptions">
                          <div className="lsOptionItem">
                            <span className="lsOptionText">
                              Min price <small>per night</small>
                            </span>
                            <input
                              type="number"
                              onChange={(e) => setMin(e.target.value)}
                              className="lsOptionInput"
                              disabled
                            />
                          </div>
                          <div className="lsOptionItem">
                            <span className="lsOptionText">
                              Max price <small>per night</small>
                            </span>
                            <input
                              type="number"
                              onChange={(e) => setMax(e.target.value)}
                              className="lsOptionInput"
                              disabled
                            />
                          </div>
                          <div className="lsOptionItem">
                            <span className="lsOptionText">Adult</span>
                            <input
                              type="number"
                              min={1}
                              className="lsOptionInput"
                              placeholder={options.adult}
                              disabled
                            />
                          </div>
                          <div className="lsOptionItem">
                            <span className="lsOptionText">Children</span>
                            <input
                              type="number"
                              min={0}
                              className="lsOptionInput"
                              placeholder={options.children}
                              disabled
                            />
                          </div>
                          <div className="lsOptionItem">
                            <span className="lsOptionText">Room</span>
                            <input
                              type="number"
                              min={1}
                              className="lsOptionInput"
                              placeholder={options.room}
                              disabled
                            />
                          </div>
                        </div>
                      </div>
                      <button onClick={handleClick}>Search</button>
                    </div>
                    <div className="listResult">
                      {loading ? (
                        "loading"
                      ) : (
                        <>
                          {data ? data.map((item) => (
                            <SearchItem item={item} key={item._id} />
                          ))
                        :
                        (
                          <div>No data</div>
                        )
                        }
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            }
          </>)
      }
    </div>
  );
};

export default List;
