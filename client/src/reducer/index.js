const initialState = {
  recipes: [],
  diets: [],
  allRecipes: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };
    case "GET_BY_NAME": {
      return { ...state, recipes: action.payload };
    }
    case "SORT_BY_NAME": {
      let sortByName =
        action.payload === "asc"
          ? state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return 1;
              }
              if (b.title > a.title) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.title > b.title) {
                return -1;
              }
              if (b.title > a.title) {
                return 1;
              }

              return 0;
            });
      return { ...state, recipes: sortByName };
    }
    case "SORT_BY_HS": {
      let sortedByHs =
        action.payload === "ascH"
          ? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }

              return 0;
            });
      return {
        ...state,
        recipes: sortedByHs,
      };
    }
    
    case "SORT_BY_DIET": {
      let sortedByDiet = state.allRecipes.filter(({ diets }) => {
        return diets.includes(action.payload);
      });

      return {
        ...state,
        recipes: sortedByDiet,
      };
    }
    case "GET_DETAIL": {
      return {
        ...state,
        detail: [action.payload],
      };
    }
    case "CREATE_RECIPE":{
      return{...state}
    }
    default: //sin default case no renderiza
      return state;
  }
}

export default rootReducer;
