const initialState = [
  {
    id: 1, 
    address: '25 Hollywood Street',
    numBathrooms: 2,
    numPeople: 5,
    price: 55,
  },
  {
    id: 2,
    address: '5 John Street',
    numBathrooms: 3,
    numPeople: 5,
    price: 20,
  },
  {
    id: 3,
    address: '2 George Street',
    numBathrooms: 3,
    numPeople: 6,
    price: 50,
  },
  {
    id: 4,
    address: '25 Bird Road',
    numBathrooms: 2,
    numPeople: 5,
    price: 155,
  },
  {
    id: 5,
    address: '10 Pen Street',
    numBathrooms: 6,
    numPeople: 15,
    price: 95,
  }
]

export default (uProperties = initialState, action) => {
  switch(action.type) {
    default:
      return uProperties;
  }
}