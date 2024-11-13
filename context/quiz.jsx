// import { createContext, useContext, useReducer } from 'react';
import createContextApi from "./lib/query/createContextApi"

const quizContext = createContextApi({
                    slicename:'quiz', 
                    endpoints: (queries) => ({
                                  createQuiz: queries.post({
                                      query: ()=> '/products'
                                  }),
                                  readQuiz: queries.get({
                                      query: (id)=> `/quiz/${id}`
                                  }),
                                  readQuizs: queries.get({
                                      query: ()=> '/products'
                                  }),
                                  updateQuizs: queries.put({
                                      query: (id)=> `/quiz/${id}`
                                  }),
                                  updateQuiz: queries.patch({
                                      query: (id)=> `/quiz/${id}`
                                  }),
                                  deleteQuiz: queries.delete({
                                      query: (id)=> `/quiz/${id}`
                                  })
                                })
                              })
export const { 
    QuizProvider, 
    useQuizData, 
    useQuizDispatch 
  } = quizContext


// function createContextApi({ slicename }) {
//   const DataContext = createContext(null);
//   const DispatchContext = createContext(null);
//   const initialData = { [slicename]: {
//     isLoading: false,
//     isError: false,
//     data: [],
//     error: {
//       message: '',
//     }
//   }};
//   function reducer(state, action) {
//       switch (action.type) {
//         case 'added': {
//           return [...state, {
//             id: action.id,
//             text: action.text,
//             done: false
//           }];
//         }
//         case 'changed': {
//           return state.map(t => {
//             if (t.id === action.task.id) {
//               return action.task;
//             } else {
//               return t;
//             }
//           });
//         }
//         case 'deleted': {
//           return state.filter(t => t.id !== action.id);
//         }
//         default: {
//           throw Error('Unknown action: ' + action.type);
//         }
//       }
//     }
//   function Provider({ children }) {
//     const [data, dispatch] = useReducer(
//       reducer,
//       initialData
//     );
  
//     return (
//       <DataContext.Provider value={data}>
//         <DispatchContext.Provider
//           value={dispatch}
//         >
//           {children}
//         </DispatchContext.Provider>
//       </DataContext.Provider>
//     );
//   }
  
//   function useData() {
//     return useContext(DataContext);
//   }
  
//   function useDispatch() {
//     return useContext(DispatchContext);
//   }
//   return { [(slicename.charAt(0).toUpperCase() + slicename.slice(1))+'Provider']: Provider, ['use'+(slicename.charAt(0).toUpperCase() + slicename.slice(1))+'Data']: useData, ['use'+(slicename.charAt(0).toUpperCase() + slicename.slice(1))+'dispatch']: useDispatch }
  
// }










// import createApiSlice from "./lib/__createApiSlice";

// export const apiSlice = createApiSlice({
//         slicename:'quiz', 
//         baseQuery: 'https://fakestoreapi.com' , 
//         endpoints: (queries) => ({
//             createQuiz: queries.post({
//                 query: ()=> '/products'
//             }),
//             readQuiz: queries.get({
//                 query: (id)=> `/quiz/${id}`
//             }),
//             readQuizs: queries.get({
//                 query: ()=> '/products'
//             }),
//             updateQuizs: queries.put({
//                 query: (id)=> `/quiz/${id}`
//             }),
//             updateQuiz: queries.patch({
//                 query: (id)=> `/quiz/${id}`
//             }),
//             deleteQuiz: queries.delete({
//                 query: (id)=> `/quiz/${id}`
//             })
//         })
//     })

// export const { QuizProvider, useQuizData, useQuizDispatch, hooks } = apiSlice;
// export default QuizProvider

// export const { useCreateQuiz, useReadQuiz, useReadQuizs, useUpdateQuizs, useUpdateQuiz, useDeleteQuiz } = apiSlice.hooks