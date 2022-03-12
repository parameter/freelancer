import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import Login from '../../components/signup-login-logout';

export default function requestComponent(props) {
  const {session} = useSession();
  const [requestItems, setRequestItems] = useState(0);
  const [category, setCategory] = useState(null);
  const [requests, setRequests] = useState([]);

  const updateValue = (data) => {
    requests.forEach((item, i) => {
      if (item.id === data.id) {
        var found = false;
        requests[i].fields.forEach((item2, ii) => {
          if (requests[i].fields[ii].name == data.name) {
            found = true;
            requests[i].fields[ii].value = data.value;
          }
        });
        if (found === false) {
          requests[i].fields.push({name: data.name, value: data.value});
        }
      }
    });
    return data;
  }

  useEffect(() => {
    console.log('WUT');
  },[])

  const updateCategory = (event) => {
    setCategory(event.target.value);
  }

  const printRequestItems = () => {
    const components = []; 
    requests.forEach((item, i) => {
      components.push(<RequestItem key={'request_item_' + i} item={item} id={item.id} updateValue={updateValue}  />);
    });

    return components;
  }

  const generateRandomString = (length = 8, charset = 'abcdefghijklmnopqrstuvwxyz0123456789') => {
    const result = [];
    
    for (let i = 0; i < length; i++) {
      result.push(charset.charAt(Math.floor(Math.random() * charset.length)));
    }
    
    return result.join('');
  }

  const addRequestItem = () => {
    requests.push({id: generateRandomString(8), fields: []});
    console.log('Add article',requests);
    setRequests(requests.slice());
  }

  const sendRequest = async () => {
    const formData = {
      // _csrf: await NextAuth.csrfToken(),
      category: category,
      requests: requests
    }

    axios.post('/api/auth/new-request', formData).then((response) => {
       console.log('ASSSSSS', response);
    });
  }

  if (!session) {
    return <div><Login /></div>
  }
  
  return (
    <>
      {console.log(requests)}
      <h1>Make a request</h1>
      <div className="requests__wrapper request">
        <form className="request__form">
          <div className="request__field">
            <label>Kategori
              <select onChange={(event) => updateCategory(event)} name="category" required="required">
                <option value="">—</option>
                <option value="001">Byggnadsvaror</option>
                <option value="002">Elektronik</option>
                <option value="003">Kontorsvaror</option>
                <option value="004">Livsmedelsvaror</option>
                <option value="005">Maskinuthyrning</option>
                <option value="006">Övrigt</option>
                <option value="007">Renhållning</option>
                <option value="008">Tjänstebilar</option>
              </select>
            </label>
          </div>
          {printRequestItems()}
        </form>
        <div className="request__add"><div onClick={addRequestItem}>Lägg till en artikel</div></div>
        <button onClick={() => sendRequest()} type="button" className="request__send">Skicka förfrågan</button>
      </div>
    </>
  )
}

const RequestItem = (props) => {

  const updateValue = (event) => {
    props.updateValue({
      id: props.id,
      name: event.target.name,
      value: event.target.value
    });
  }

  return (<>
      <div className="request__field">
        <label>Produkt
          <input name="product" onChange={(event) => {updateValue(event)}} />
        </label>
      </div>

      <div className="request__field">
        <label>Budget
          <input name="budget" onChange={(event) => {updateValue(event)}} />
        </label>
      </div>

      <div className="request__field">
        <label>Mängd
          <input name="amount" onChange={(event) => {updateValue(event)}} />
        </label>
      </div>
  </>)
}