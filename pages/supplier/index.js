import React from 'react';
import axios from 'axios';

class SupplierComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      requests: []
    };
    this.catsForm = React.createRef(); 
  }

  getRequestsByCat = async () => {
    const formData = {
      // _csrf: await NextAuth.csrfToken(),
      categories: this.state.categories
    }
    const requests = await axios.get('/api/auth/requests', {params: formData });
    this.setState({requests: requests.data.requests});
  } 

  getCategories = (event) => {
    var checked = this.catsForm.current.querySelectorAll('input:checked');
    var cats = [];
    checked.forEach((item, i) => {
      cats.push(item.value);
    });
    this.setState({categories: cats});
  }

  printRequests = () => {
    console.log('printRequests',this.state.requests);
    return this.state.requests.map((item, i) => {
      return <div key={i} className="supplier__requests-request">
        {item.requests.map((item2, ii) => {
          return <div key={ii} className="supplier__request-item">
                <p className="supplier__request-item-id">{item2.id}</p>
                {item2.fields.map((item3, iii) => {
                  return <p>{item3.name}: <span>{item3.value}</span></p>
                })}
            </div>
        })}
        <p>{item.product}</p>
      </div>
    });
  }

  render() {
    
    return (
      <>
        <h1>I am supplier</h1>
        <div className="supplier__row">
          <form onChange={(event) => this.getCategories(event)} ref={this.catsForm} className="supplier__categories">
            <label>
              <input name="category" value="001" type="checkbox" />
              <span>Byggnadsvaror</span>
            </label>
            <label>
              <input name="category" value="002" type="checkbox" />
              <span>Elektronik</span>
            </label>
            <label>
              <input name="category" value="003" type="checkbox" />
              <span>Kontorsvaror</span>
            </label>
            <label>
              <input name="category" value="004" type="checkbox" />
              <span>Livsmedelsvaror</span>
            </label>
            <label>
              <input name="category" value="005" type="checkbox" />
              <span>Maskinuthyrning</span>
            </label>
            <label>
              <input name="category" value="006" type="checkbox" />
              <span>Övrigt</span>
            </label>
            <label>
              <input name="category" value="007" type="checkbox" />
              <span>Renhållning</span>
            </label>
            <label>
              <input name="category" value="008" type="checkbox" />
              <span>Tjänstebilar</span>
            </label>
            <button className="bidstacker__button" onClick={() => this.getRequestsByCat()} type="button">Get requests</button>
          </form>

          <div className="supplier__requests-panel">
            {this.printRequests()}
          </div>
        </div>
        
      </>
    )
  }
}

SupplierComponent.displayName = "DataTable"
export default SupplierComponent;