

import React, { createContext, useReducer, useContext, useEffect } from 'react';
import DataCache from './DataCache';
import Provider from './layout/Provider';
import useData from './layout/useData';
import useDispatch from './layout/useDispatch';
import { queries } from './query/queries';

export const dataCache  = new DataCache()




// A utility function to create a unique cache key for each request
// const createCacheKey = (queryName, params) => `${queryName}_${JSON.stringify(params)}`;

// // Define the `createContextApiSlice` function
// export default function createContextApiSlice({ sliceName, baseUrl, endpoints }) {
//   // Create Context for state and dispatch
//   const DataContext = createContext();
//   const DispatchContext = createContext();

//   // Define reducer to manage cache state
//   const apiReducer = (state, action) => {
//     switch (action.type) {
//       case 'CACHE_RESPONSE':
//         return { ...state, [action.cacheKey]: action.data };
//       default:
//         return state;
//     }
//   };

//   // Provider component
//   function ApiProvider({ children }) {
//     const [state, dispatch] = useReducer(apiReducer, {});
//     return (
//       <DataContext.Provider value={state}>
//         <DispatchContext.Provider value={dispatch}>
//           {children}
//         </DispatchContext.Provider>
//       </DataContext.Provider>
//     );
//   }

//   // Hook to use data context
//   function useData(queryName, params) {
//     const state = useContext(DataContext);
//     const cacheKey = createCacheKey(queryName, params);
//     return state[cacheKey];
//   }

//   // Hook to use dispatch context
//   function useDispatch() {
//     return useContext(DispatchContext);
//   }

//   // Hook to fetch data based on query name and parameters
//   function useQuery(queryName, params) {
//     const data = useData(queryName, params);
//     const dispatch = useDispatch();

//     useEffect(() => {
//       // Only fetch if data not already in cache
//       if (!data) {
//         const fetchData = async () => {
//           const endpoint = endpoints[queryName];
//           const url = `${baseUrl}${endpoint(params)}`;
//           const response = await fetch(url);
//           const result = await response.json();
//           dispatch({ type: 'CACHE_RESPONSE', cacheKey: createCacheKey(queryName, params), data: result });
//         };
//         fetchData();
//       }
//     }, [queryName, params, data, dispatch]);

//     return data;
//   }

//   return {
//     [`${sliceName}Provider`]: ApiProvider,
//     [`use${sliceName}Data`]: useData,
//     [`use${sliceName}Dispatch`]: useDispatch,
//     [`use${sliceName}Query`]: useQuery,
//   };
// }

export default function createApiSlice({ slicename, baseQuery = '', endpoints }) {
    
    const hooks = Object.keys(endpoints(queries(baseQuery))).reduce((acc, key) => {

        // console.log(acc)
        // console.log(key)
        // console.log(endpoints(queries(baseQuery))[key])
       

        // const fn = endpoints(queries(baseQuery))[key]
        // console.log(fn)

        // console.log(endpoints(queries(baseQuery))[key])
        acc['use' + key.charAt(0).toUpperCase() + key.slice(1)] = ()=> endpoints(queries(baseQuery))[key](key)
        return acc;
    }, {});

    console.log(hooks)

    return { 
        [`${slicename}Provider`]: Provider,
        [`use${slicename.charAt(0).toUpperCase() + slicename.slice(1)}Data`]: useData,
        [`use${slicename.charAt(0).toUpperCase() + slicename.slice(1)}Dispatch`]: useDispatch,
        // Provider: (props) => <Provider {...props} slicename={slicename} />, useData, useDispatch,  
        hooks };
}








// import DataCache from './DataCache';
// import { createContext, useContext, useEffect, useReducer } from 'react';
// const dataCache = new DataCache(); 




// export function createContextApiSlice({slicename, baseQuery='', endpoints }){
  
  
//   const queries = {
//           get: (config) => (params) => {
//               const cacheName = config.fnName; // Automatically set from function name
//               return useGET({ ...config, cacheName }, params);
//           },
//           post: (config) => (params) => {
//               const cacheName = config.fnName;
//               return usePOST({ ...config, cacheName }, params);
//           },
//           put: (config) => (params) => {
//               const cacheName = config.fnName;
//               return usePUT({ ...config, cacheName }, params);
//           },
//           patch: (config) => (params) => {
//               const cacheName = config.fnName;
//               return usePATCH({ ...config, cacheName }, params);
//           },
//           delete: (config) => (params) => {
//               const cacheName = config.fnName;
//               return useDELETE({ ...config, cacheName }, params);
//           },
//       };

//   const hooks = Object.keys(endpoints(queries)).reduce((acc, key) => {
//     const configWithFnName = { ...endpoints(queries)[key], fnName: key };
//     acc['use' + key.charAt(0).toUpperCase() + key.slice(1)] = (params) => {
//         return configWithFnName(configWithFnName)(params);
//     };    
//     return acc;
//   }, {});


//   const reducer = (state, action) => {
//       const { type, payload, endpoint } = action;
//       switch (type) {
//           case `${slicename}/LOADING`:
//               return { ...state, [endpoint]: { loading: true, error: null, data: null } };
//           case `${slicename}/SUCCESS`:
//               return { ...state, [endpoint]: { loading: false, error: null, data: payload } };
//           case `${slicename}/ERROR`:
//               return { ...state, [endpoint]: { loading: false, error: payload, data: null } };
//           default:
//               return state;
//       }
//   };
//     const initialState = {};  
//     const DataContext = createContext(null);
//     const DispatchContext = createContext(null);

//     function Provider({ children }) {
//         const [data, dispatch] = useReducer(
//           reducer,
//           initialState
//         );
      
//         return (
//           <DataContext.Provider value={data}>
//             <DispatchContext.Provider value={dispatch}>
//               {children}
//             </DispatchContext.Provider>
//           </DataContext.Provider>
//         );
//       }
    
//     function useData() {
//         return useContext(DataContext);
//     }
    
//     function useDispatch() {
//         return useContext(DispatchContext);
//     }

//     const useGET = (cacheName, url, queryParams = {}) => {
//       const data = useData();
//       const dispatch = useDispatch();

//       useEffect(() => {
//           const fetchData = async () => {
//               dispatch({ type: `${slicename}/LOADING`, endpoint: cacheName });
//               try {
//                   const cachedData = await dataCache.getData(cacheName, url, queryParams);
//                   dispatch({ type: `${slicename}/SUCCESS`, payload: cachedData, endpoint: cacheName });
//               } catch (error) {
//                   dispatch({ type: `${slicename}/ERROR`, payload: error.message, endpoint: cacheName });
//               }
//           };

//           fetchData();

//           const handleDataUpdate = ({ key }) => {
//               if (key === dataCache.generateCacheKey(cacheName, queryParams)) fetchData();
//           };

//           dataCache.on('dataUpdate', handleDataUpdate);

//           return () => dataCache.off('dataUpdate', handleDataUpdate);
//       }, [cacheName, url, queryParams]);

//       return { data: data[cacheName]?.data, loading: data[cacheName]?.loading, error: data[cacheName]?.error };
//   };
    
//   const usePOST = (cacheName, url, queryParams = {}) => {
//     const dispatch = useDispatch();

//     const postData = async (newData) => {
//         dispatch({ type: `${slicename}/LOADING`, endpoint: cacheName });
//         try {
//             await dataCache.postData(cacheName, url, queryParams, newData);
//             dispatch({ type: `${slicename}/SUCCESS`, payload: newData, endpoint: cacheName });
//         } catch (error) {
//             dispatch({ type: `${slicename}/ERROR`, payload: error.message, endpoint: cacheName });
//         }
//     };

//     const data = useData();
//     return { data: data[cacheName]?.data, postData, loading: data[cacheName]?.loading, error: data[cacheName]?.error };
// };
    
// const usePUT = (cacheName, url, queryParams = {}) => {
//   const dispatch = useDispatch();

//   const putData = async (updatedData) => {
//       // Get the current state data
//       const currentState = useData()[cacheName]?.data;

//       // Optimistically update the data in the context
//       dispatch({ type: `${slicename}/SUCCESS`, payload: updatedData, endpoint: cacheName });

//       try {
//           await dataCache.putData(cacheName, url, queryParams, updatedData);
//           // If successful, the state remains updated with no further action needed
//       } catch (error) {
//           // Revert to the previous state in case of error
//           dispatch({ type: `${slicename}/SUCCESS`, payload: currentState, endpoint: cacheName });
//           dispatch({ type: `${slicename}/ERROR`, payload: error.message, endpoint: cacheName });
//       }
//   };

//   const data = useData();
//   return {
//       data: data[cacheName]?.data,
//       putData,
//       error: data[cacheName]?.error
//   };
// };


// const usePATCH = (cacheName, url, queryParams = {}) => {
//   const dispatch = useDispatch();

//   const patchData = async (updatedData) => {
//       dispatch({ type: `${slicename}/LOADING`, endpoint: cacheName });
//       try {
//           await dataCache.patchData(cacheName, url, queryParams, updatedData);
//           dispatch({ type: `${slicename}/SUCCESS`, payload: updatedData, endpoint: cacheName });
//       } catch (error) {
//           dispatch({ type: `${slicename}/ERROR`, payload: error.message, endpoint: cacheName });
//       }
//   };

//   const data = useData();
//   return {
//       data: data[cacheName]?.data,
//       patchData,
//       loading: data[cacheName]?.loading,
//       error: data[cacheName]?.error
//   };
// };

// const useDELETE = (cacheName, url, queryParams = {}) => {
//   const dispatch = useDispatch();

//   const deleteData = async () => {
//       const currentState = useData()[cacheName]?.data;

//       // Optimistically remove data
//       dispatch({ type: `${slicename}/SUCCESS`, payload: null, endpoint: cacheName });

//       try {
//           await dataCache.deleteData(cacheName, url, queryParams);
//           // If successful, the state remains null with no further action needed
//       } catch (error) {
//           // Revert to previous state if delete fails
//           dispatch({ type: `${slicename}/SUCCESS`, payload: currentState, endpoint: cacheName });
//           dispatch({ type: `${slicename}/ERROR`, payload: error.message, endpoint: cacheName });
//       }
//   };

//   const data = useData();
//   return {
//       data: data[cacheName]?.data,
//       deleteData,
//       error: data[cacheName]?.error
//   };
// };

//     return { Provider, useData, useDispatch, hooks }
// }

// export function fetchBaseQuery({ baseQuery }){
//     return baseQuery
// }