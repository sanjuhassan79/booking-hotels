import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../Context/SearchContext';
import useFetch from '../Hooks/useFetch';

const Reserve = ({ hotelId, setOpen }) => {
  const [selectRoomNumber, setselectRoomNumber] = useState([]);
  const navigae=useNavigate()
  const { data, loaading, error, refetch } = useFetch(
    `http://localhost:4000/hotels/room/${hotelId}`
  );
  const { dates } = useContext(SearchContext);
  //  console.log(hotelId);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    let dates = [];
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
    setselectRoomNumber(
      checked
        ? [...selectRoomNumber, value]
        : selectRoomNumber.filter((item) => item !== value)
    );
  };
  console.log(selectRoomNumber);

  const handleClick = async () => {
    try {
      await Promise.all(
        selectRoomNumber.map((roomId) => {
          const red = axios.put(
            `http://localhost:4000/rooms/availability/${roomId}`,
            { dates: alldates }
          );
          return red.data;
        })
      );
      setOpen(false);
      navigae('/')
    } catch (err) {}
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select Your Rooms:</span>
        {data?.map((item) => (
          <div className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">Max People:{item.maxPeople}</div>
              <div className="rPrice">Max People:{item.price}</div>
            </div>

            {item?.roomNumbers.map((roomNumber) => (
              <div className="room">
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
        ))}

        <button onClick={handleClick} className="rButton">
          Reserver Now
        </button>
      </div>
    </div>
  );
};

export default Reserve;
