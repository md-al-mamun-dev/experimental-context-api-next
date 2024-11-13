import { createContext, useContext, useReducer } from 'react';
import queries from './queries';
        

export default function createContextApi({ slicename, endpoints , baseQuery = ''}) {
    const DataContext = createContext(null);
    const DispatchContext = createContext(null);
    

    const initialData = { 
                          [slicename]: {
                                          isLoading: false,
                                          isError: false,
                                          data: [],
                                          error: {
                                                    message: '',
                                                  }
                                        }
                        };

    // function reducer(state, action) {
    //     switch (action.type) {
    //       case 'added': {
    //         return [...state, {
    //           id: action.id,
    //           text: action.text,
    //           done: false
    //         }];
    //       }
    //       case 'changed': {
    //         return state.map(t => {
    //           if (t.id === action.task.id) {
    //             return action.task;
    //           } else {
    //             return t;
    //           }
    //         });
    //       }
    //       case 'deleted': {
    //         return state.filter(t => t.id !== action.id);
    //       }
    //       default: {
    //         throw Error('Unknown action: ' + action.type);
    //       }
    //     }
    //   }
    const createReducer = (slicename) => (state, action) => {
      const { type, payload, endpoint } = action;
      switch (type) {
          case `${slicename}/LOADING`:
              return { ...state, [endpoint]: { loading: true, error: null, data: null } };
          case `${slicename}/SUCCESS`:
              return { ...state, [endpoint]: { loading: false, error: null, data: payload } };
          case `${slicename}/ERROR`:
              return { ...state, [endpoint]: { loading: false, error: payload, data: null } };
          default:
              return state;
      }
  };

  // const hooks = Object.keys(endpoints(queries)).reduce((acc, key) => {
  //   const configWithFnName = { ...endpoints(queries)[key], fnName: key };
  //   acc['use' + key.charAt(0).toUpperCase() + key.slice(1)] = (params) => {
  //       return configWithFnName(configWithFnName)(params);
  //   };    
  //   return acc;
  // }, {});

  // console.log(endpoints(queries))
  // console.log(endpoints(queries(baseQuery)))
  // console.log(queries)
  


  const reducer = createReducer(slicename)

    function Provider({ children }) {
      const [data, dispatch] = useReducer(
        reducer,
        initialData
      );
    
      return (
        <DataContext.Provider value={data}>
          <DispatchContext.Provider value={dispatch}>
            {children}
          </DispatchContext.Provider>
        </DataContext.Provider>
      );
    }
    function useData() {
      return useContext(DataContext);
    }
    
    function useDispatch() {
      return useContext(DispatchContext);
    }
  //   const hooks = Object.keys(endpoints(queries({baseQuery, useData, useDispatch}))).reduce((acc, key) => {
  //     acc['use' + key.charAt(0).toUpperCase() + key.slice(1)] = ()=> endpoints(queries({baseQuery, useData, useDispatch}))[key](key)
  //     return acc;
  //   }, {});
  // console.log(hooks)
  const endpointFunctions = endpoints(queries({ baseQuery, useData, useDispatch }));

  const hooks = Object.keys(endpointFunctions).reduce((acc, key) => {
    // Generate hook name based on the key
    const hookName = 'use' + key.charAt(0).toUpperCase() + key.slice(1);
    
    // Create a hook that calls the endpoint function with any provided arguments
    acc[hookName] = (...args) => endpointFunctions[key](...args);
    
    return acc;
  }, {});

  console.log(hooks)
    
    return { [(slicename.replace(/^./, slicename[0].toUpperCase()))+'Provider']: Provider, ['use'+(slicename.replace(/^./,slicename[0].toUpperCase()))+'Data']: useData, ['use'+(slicename.replace(/^./, slicename[0].toUpperCase()))+'dispatch']: useDispatch }
}