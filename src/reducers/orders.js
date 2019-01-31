import { CREATE_NEW_ORDER } from '../modules/clients';
import { MOVE_ORDER_NEXT, MOVE_ORDER_BACK } from '../actions/moveOrder';
import { ADD_INGREDIENT } from '../actions/ingredients';

// Реализуйте редьюсер
// Типы экшенов, которые вам нужно обрабатывать уже импортированы
// Обратите внимание на `orders.test.js`.
// Он поможет понять, какие значения должен возвращать редьюсер.

export default (state = [], action) => {

  switch (action.type) {
    case CREATE_NEW_ORDER:
      return [
        ...state,
        {
          id: action.payload.id,
          recipe: action.payload.recipe,
          ingredients: [],
          position: 'clients'
        }
      ];

    case MOVE_ORDER_NEXT:
    var curItem = {...state.find(item => item.id === action.payload)};

      switch (curItem.position) {
        case 'clients':
          curItem.position = 'conveyor_1';
          break;
        case 'conveyor_4':
          if (curItem.recipe.length === curItem.ingredients.length)
            curItem.position = 'finish';
          break;
        default:
          curItem.position =
            'conveyor_' + (Number(curItem.position.slice(-1)) + 1);
      }

      return state.map(item => (item.id === curItem.id ? curItem : item))

    case MOVE_ORDER_BACK:
      var curItem = {...state.find(item => item.id === action.payload)};

      if (curItem.position === 'conveyor_1') return state;

      curItem.position = 'conveyor_' + (Number(curItem.position.slice(-1)) - 1);

      return state.map(item => (item.id === curItem.id ? curItem : item));

    case ADD_INGREDIENT:
      const ingrPosition = {...state.find(
        item => item.position === action.payload.from)
      }

      debugger;

      if (!~ingrPosition.recipe.indexOf(action.payload.ingredient))
        return state;

      if(ingrPosition.ingredients.includes(action.payload.ingredient)) 
        return state;

      ingrPosition.ingredients = [
        ...ingrPosition.ingredients,
        action.payload.ingredient
      ];

      return state.map(item => (ingrPosition.id === item.id ? ingrPosition : item));
    default:
      return state;
  }
};

export const getOrdersFor = (state, position) =>
  state.orders.filter(order => order.position === position);
