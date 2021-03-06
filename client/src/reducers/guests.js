const initialState = {
  countAdults: 1,
  countChildren: 0,
  countInfants: 0,
};

const guestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_ADULTS':
      return { ...state, countAdults: state.countAdults + 1 };
    case 'DECREMENT_ADULTS':
      return { ...state, countAdults: state.countAdults - 1 };
    case 'INCREMENT_CHILDREN':
      return { ...state, countChildren: state.countChildren + 1 };
    case 'DECREMENT_CHILDREN':
      return { ...state, countChildren: state.countChildren - 1 };
    case 'INCREMENT_INFANTS':
      return { ...state, countInfants: state.countInfants + 1 };
    case 'DECREMENT_INFANTS':
      return { ...state, countInfants: state.countInfants - 1 };  
    default:
      return state;
  }
};

export default guestsReducer;
