import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/searchContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MyVerticallyCenteredModal from "../bootstrap/SuccessModal"
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';



const Reserve = ({ setOpen, hotelId, name }) => {
  const location = useLocation()
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [smShow, setSmShow] = useState(false);
  const [roomNo, setRoomNo] = useState([])
  const baseURL = process.env.REACT_APP_API_URL
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);

  //http://localhost:8800/api/hotels/room/64be93f499b79e9fb37218c1
  const { dates, options } = useContext(SearchContext);
  //console.log(data);
  //console.log(dates);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
 
  };
  useEffect(() => {
    //console.log(selectedRooms);
  }, [selectedRooms])

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`https://travella-ckru.onrender.com/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          //toast.success("Success")
          return res.data;
        })
      );

      setSmShow(true)

    } catch (err) { }
  };

  const notify = () => {
    toast('Success');
  }
  const Click = () => {
    handleClick()
    notify()
  }
  console.log(data);
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your room(s):</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton" disabled={selectedRooms.length == 0} >
          Reserve Now!
        </button>
        <Modal
          show={smShow}
          onHide={() => {
            setSmShow(false);
            setOpen(false);
          }}
          size="m"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">Congratulations!!!</Modal.Title>
          </Modal.Header>
          <Modal.Body>You have succesfully booked {options.room} room at <strong><em>{name}</em></strong>. <p>Thank you for your patronage, Enjoy your stay!!!.</p>  <img src={'https://i.pinimg.com/originals/d3/91/f7/d391f7e5687c2653c12119bea99cd335.gif'} alt="Emoji" className="emoji" /> </Modal.Body>
        </Modal>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Reserve;