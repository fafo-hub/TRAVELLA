function dayDifference(date1, date2) {
    localStorage.setItem("endDate", JSON.stringify(date2.getTime()));
    localStorage.setItem("startDate", JSON.stringify(date1.getTime()));
  
    const savedDate1 = JSON.parse(localStorage.getItem("endDate")) || null;
    const savedDate2 = JSON.parse(localStorage.getItem("startDate")) || null;
  
    const timeDiff = Math.abs(savedDate2 - savedDate1); // Calculate difference using stored values
    console.log(dates);
    console.log(date2);
    //console.log(date2.getTime());
    console.log(date1);
    //console.log(date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  
  // Make sure that 'dates' array is not empty before calling dayDifference
  //console.log(dates.length);
  const savedDates = JSON.parse(localStorage.getItem("dates"))
  //console.log(savedDates);
    // localStorage.setItem("oldDays", JSON.stringify(days));
    // const oldDays = JSON.parse(localStorage.getItem("oldDays")) || null
    //const days = dayDifference(dates[0].endDate, dates[0].startDate);
    // localStorage.setItem("oldDays", JSON.stringify(days));
    // console.log(JSON.parse(localStorage.getItem("oldDays")));

  const days = dates.length>0 ? dayDifference(dates[0].endDate, dates[0].startDate) : 1
  localStorage.setItem("oldDays", JSON.stringify(days));
    console.log(JSON.parse(localStorage.getItem("oldDays")));
  console.log(dates.length);
  sessionStorage.setItem("check", JSON.stringify(dates));
  console.log(JSON.parse(sessionStorage.getItem("check")));

  // const oldDays = dayDifference(dates[0].endDate, dates[0].startDate);
  // localStorage.setItem("days", JSON.stringify(oldDays));

  //const days = JSON.parse(localStorage.getItem("days")) || null
 // console.log(oldDays, days);
  // useEffect(() => {
  //   localStorage.setItem("dates", JSON.stringify(dates[0].startDate));
  // }, [dates[0].startDate]);
  // console.log(JSON.parse(localStorage.getItem("dates")));
  //console.log(dates[0].startDate);

//   {loading ? (
//     "loading"
//   ) :

// {
//     data.length === 0 ? (
//     <>
//        <div className="navheaderwrap">
//   <Navbar />
//   <Header type="list" />
//   </div>
//   <div className="not-available">
//     <img src="https://static.vecteezy.com/system/resources/previews/009/796/821/original/house-not-available-on-white-background-not-available-sign-not-available-label-flat-style-vector.jpg" alt="" />
//   </div>
//     </>) :

{/* <div className="navheaderwrap">
<Navbar />
<Header type="list" />
</div>
<div className="listContainer">
  <div className="listWrapper">
    <div className="listSearch">
      <h1 className="lsTitle">Search</h1>
      <div className="lsItem">
        <label>Destination</label>
        <input placeholder={destination} type="text"  disabled/>
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
          {data.map((item) => (
            <SearchItem item={item} key={item._id} />
          ))}
        </>
      )}
    </div>
  </div>
</div>  */}