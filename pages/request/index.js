import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import Login from '../../components/signup-login-logout';

const inventory = [
  {
    name: 'Bygg',
    items: [
      {
        id: '0000',
        name: 'Hammare',
        fields: []
      },
      {
        id: '0001',
        name: 'Planka',
        fields: [
          {
            name: 'length',
            unit: 'm'
          }
        ]
      }
    ],
  },
  {
    name: 'Kontor',
    items: [
      {
        id: '0002',
        name: 'Papper',
        fields: []
      },
      {
        id: '0003',
        name: 'Skrivare',
        fields: [
          {
            name: 'type',
            options: ['Black and white','Colour']
          }
        ]
      }
    ]
  }
];

export default function RequestComponent(props) {
  const {session} = useSession();
  const [category, setCategory] = useState(null);
  const [requests, setRequests] = useState([{id: '687236472f364723ajkshdjshd', fields: []}]);
  const [productSelectorOpen, setProductSelectorOpen] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);

  const updateValue = (data) => {
    var _requests = requests;
    _requests.forEach((item, i) => {
      if (item.id === data.id) {
        var found = false;
        _requests[i].fields.forEach((item2, ii) => {
          if (_requests[i].fields[ii].name == data.name) {
            found = true;
            _requests[i].fields[ii].value = data.value;
          }
        });
        if (found === false) {
          _requests[i].fields.push({name: data.name, value: data.value});
        }
      }
    });
    setRequests(_requests);
  }

  const getProduct = (id) => {
    var foundItem = null;
    inventory.forEach((category, i) => {
      category.items.forEach((item, i) => {
        if (item.id === id) {
          foundItem = item;
        }
      });
    });
    return foundItem;
  }

  const updateRequestProduct = (id) => {
    var _requests = requests;
    _requests.forEach((item, i) => {
      if (_requests[i].id === currentRequestId) {
        _requests[i].product = getProduct(id);
      }
    });
    setRequests(_requests);
  }

  const updateCategory = (event) => {
    setCategory(event.target.value);
  }

  const openProductSelector = (requestId) => {
    setCurrentRequestId(requestId);
    setProductSelectorOpen(!productSelectorOpen);
  }

  const printRequestItems = () => {
    const components = []; 
    requests.forEach((item, i) => {
      components.push(<RequestItem key={'request_item_' + i} item={item} id={item.id} updateValue={updateValue} openProductSelector={openProductSelector} />);
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
    setRequests(requests.slice());
  }

  useEffect(() => {
    
  },[])

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

  const getProductId = (id) => {
    setProductSelectorOpen(false);
    updateRequestProduct(id);
  }

  /*
  if (!session) {
    return <div><Login /></div>
  } */
  
  return (
    <>
      <h1>Make a request</h1>
      <div className="requests__wrapper request">
        <form className="request__form">
          <div className="request__inner-wrapper">
             {printRequestItems()}
             <div className="request__add">
               <div onClick={addRequestItem}>
                  Lägg till en artikel <image src="/icons/plus-sign-svgrepo-com.svg" alt="plus icon" />
                </div>
              </div>
          </div>
        </form>
        <button onClick={() => sendRequest()} type="button" className="request__send">Skicka förfrågan</button>
      </div>
      <ProductSelector shown={productSelectorOpen} getProductId={getProductId} />
    </>
  )
}

const RequestItem = (props) => {
  const [productSelected, setProductSelected] = useState(false);

  const updateValue = (event) => {
    props.updateValue({
      id: props.id,
      name: event.target.name,
      value: event.target.value
    });
  }

  const prinCustomFields = () => {
    if (!props.item.product.fields) { return }
    return props.item.product.fields.map((field, i) => {
      if (field.options) {
        return <div key={i} className="request__field">
                <label>{field.name}
                  <select>
                    {field.options.map((option, ii) => {
                      return <option key={ii}>{option}</option>
                    })}
                    </select>
                </label>
            </div>
      } else {
        return <div key={i} className="request__field">
                <label>{field.name}
                  <input name={field.name} onChange={(event) => {updateValue(event)}} />
                </label>
            </div>
      }
    });
  }

  return (<div className="request__item">
      <div className="request__field request__field--product">
        <label>Produkt
          <button className="request__product-button" data-requestid={props.id} onClick={() => props.openProductSelector(props.id)} type="button">
            {props.item.product ? props.item.product.name : 'Välj produkt'}
          </button>
        </label>
      </div>
      {props.item.product && 
      <>
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
        {prinCustomFields()}
      </>}
    </div>)
}

const ProductSelector = (props) => {

  const getProductId = (event) => {
    props.getProductId(event.target.getAttribute('data-id'));
  }

  const printInventory = () => {
    return <ul onClick={(event) => getProductId(event)}>
      {inventory.map((category ,i) => {
        return <li key={i}>{category.name}
          <ul>
            {category.items.map((item ,ii) => {
               return <li data-id={item.id}>{item.name}</li>
            })}
          </ul>
        </li>
      })}
    </ul>
  }

  return <div className="inventory__tree-holder" style={{display: (props.shown ? 'block' : 'none')}}>{printInventory()}</div>
}

