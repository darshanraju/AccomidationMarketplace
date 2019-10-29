import {
  FETCH_PROPERTY
} from '../actions/types';

const initialState = {
  properties: [
    {
      id: 10, 
      address: '25 Hollywood Street',
      suburb: 'canley',
      postcode: 2005,
      no_guests: 5,
      no_beds: 4,
      no_bathrooms: 6,
      price: 55,
    },
    {
      id: 2,
      address: '5 John Street',
      suburb: 'canley',
      postcode: 2005,
      no_guests: 5,
      no_beds: 4,
      no_bathrooms: 6,
      price: 20,
    },
    {
      id: 3,
      address: '2 George Street',
      price: 50,
      suburb: 'canley',
      postcode: 2005,
      no_guests: 5,
      no_beds: 4,
      no_bathrooms: 6,
    },
    {
      id: 4,
      address: '25 Bird Road',
      price: 155,
      suburb: 'canley',
      postcode: 2005,
      no_guests: 5,
      no_beds: 4,
      no_bathrooms: 6,
    },
    {
      id: 5,
      address: '10 Pen Street',
      price: 95,
      suburb: 'canley',
      postcode: 2005,
      no_guests: 5,
      no_beds: 4,
      no_bathrooms: 6,
    }
  ],
  selectedProperty: 1
}

export default (uProperties = initialState, action) => {
  switch(action.type) {
    case FETCH_PROPERTY:
      let newState = { ...uProperties };
      newState.properties.push(action.payload.data);
      newState.selectedProperty = newState.properties.length - 1;
      return newState;
    default:
      return uProperties;
  }
}