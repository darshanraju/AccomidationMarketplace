import {
  DELETE_TRIP
} from '../actions/types'

const initialState = [
  {
    id: 1,
    destination: 'Wagga Wagga',
    startDate: '25/12/19',
    endDate: '01/01/20',
  },
  {
    id: 2,
    destination: 'Bankstown',
    startDate: '25/12/19',
    endDate: '01/01/20',
  },
  {
    id: 3,
    destination: 'Kensington',
    startDate: '25/12/19',
    endDate: '01/01/20',
  },
]

export default (trips = initialState, action) => {
  let newState = { ...trips };
  switch (action.type) {

    case DELETE_TRIP:
      console.log(newState)
      return newState

    default:
      return trips;
  }
}