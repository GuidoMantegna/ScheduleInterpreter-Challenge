import { useEffect, useState, useRef } from 'react';
import Calendar from './components/Calendar';
import './Si.scss';



function Si() {

  const [data, setData] = useState('');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [date, setDate] = useState();
  const [calendar, setCalendar] = useState([]);
  const [apptAccountId, setApptAccountId] = useState([])
  const [apptVendorId, setApptVendorId] = useState([])
  const [apptRequesterId, setApptRequesterId] = useState([])
  const [apptService, setApptService] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const getData = await fetch('data.json');
    const jsonData = await getData.json();

    const events = await Object.values(jsonData.event);
    setEvents(events)
    const eventsSortedXDate = await events.map(e => e.apptDateTime).sort();
    const apptAccountId = await getUniques(events.map(e => e.apptAccountId));
    const apptVendorId = await getUniques(events.map(e => e.apptVendorId));
    const apptRequesterId = await getUniques(events.map(e => e.apptRequesterId));
    const apptService = await getUniques(events.map(e => e.apptService));

    setApptAccountId(apptAccountId)
    setApptVendorId(apptVendorId)
    setApptRequesterId(apptRequesterId)
    setApptService(apptService)

    setData(jsonData);

    const date = new Date()
    setDate(date.getMonth("2021-07-19 11:13:19"))
    setCalendar(monthCalendar(2, 2021))

    // printEvent(4, '10am')

  }

  const getUniques = (arr) => Array.from(new Set(arr))
  // Obtener el primer dia del mes en un numero (ej: lu = 1, ma = 2...)
  // let firstDay = (new Date(year, month)).getDay();

  // Pasar dia de numero a nombre
  const dayName = (num) => {
    switch (num) {
      case 1:
          return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4:
        return 'Thursday'
      case 5:
        return 'Friday'
      case 6:
        return 'Saturday'
      default:
        return 'Sunday'
    }
  }

  // Obtener la cantidad de dias del mes
  const daysInMonth = (iMonth, iYear) => 32 - new Date(iYear, iMonth, 32).getDate();

  // Hacer el calendario
  const monthCalendar = (month, year) => {
    const totaldays = daysInMonth(month, year);
    let firstDay = (new Date(year, month)).getDay();

    let arrayDays = [];
    let week = 1;

    for (let index = 1; index-1 < totaldays; index++) {
      arrayDays.push({day: dayName(firstDay), num: index, week: week});
      
      firstDay === 6 ? firstDay = 0 : firstDay ++;

      if(index%7 === 0){week++}
 
    }

    return arrayDays
  }

  // const printEvent = (num, hour) => {
  //   const day = document.getElementById(`${num}`)
  //   const hourDiv = day.querySelector('.hours');
  //   const hours = Array.from(hourDiv.childNodes)
    

  //   console.log(day)
  //   console.log(hours)
  // }

  const accountIdSelect = useRef(null);
  const vendorIdSelect = useRef(null);
  const requesterIdSelect = useRef(null);
  const serviceSelect = useRef(null);

  const handleChange = (e) => {
    const account = accountIdSelect.current.value,
    vendor = vendorIdSelect.current.value,
    requester = requesterIdSelect.current.value,
    service = serviceSelect.current.value;

    const filteredArray = events.filter(ev => {
      if((ev.apptAccountId === account || account === 'all') 
        && (ev.apptService === service || service === 'all')
        && (ev.apptRequesterId === requester || requester === 'all')
        && (ev.apptVendorId === vendor || vendor === 'all')) {
        return true
      } else {
        return false
      }
    })
    
    setFilteredEvents(filteredArray)
  }

  return (
    <>
    <div className="filters">
      <h3>Filters</h3>

      <div>
        <label>apptAccountId</label>
        <select onChange={handleChange} id="apptAccountId" ref={accountIdSelect}>
          <option>all</option>
          {apptAccountId.map(id => {
            return (
              <option key={id}>{id}</option>
            )
          })}
        </select>
      </div>

      <div>
        <label>apptVendorId</label>
        <select onChange={handleChange} id="apptVendorId" ref={vendorIdSelect}>
          <option>all</option>
          {apptVendorId.map(id => {
            return (
              <option key={id}>{id}</option>
            )
          })}
        </select>
      </div>

      <div>
        <label>apptRequesterId</label>
        <select onChange={handleChange} id="apptRequesterId" ref={requesterIdSelect}>
          <option>all</option>
          {apptRequesterId.map(id => {
            return (
              <option key={id}>{id}</option>
            )
          })}
        </select>
      </div>

      <div>
        <label>apptService</label>
        <select onChange={handleChange} id="apptService" ref={serviceSelect}>
          <option>all</option>
          {apptService.map(id => {
            return (
              <option key={id}>{id}</option>
            )
          })}
        </select>
      </div>

    </div>
    <div className="sort">
      <h3>Sort</h3>
      <div>

      </div>
    </div>
    </>
  );
}

export default Si;
