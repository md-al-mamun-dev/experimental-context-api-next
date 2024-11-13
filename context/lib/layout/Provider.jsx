import { createContext, useContext, useReducer } from 'react';
import { createReducer } from './reducers';


export const DataContext = createContext(null);
export const DispatchContext = createContext(null);

export default function Provider({ children, slicename }) {
    const [data, dispatch] = useReducer(createReducer(slicename), initialState);

    return (
        <DataContext.Provider value={data}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </DataContext.Provider>
    );
}