import useData from "../../layout/useData";
import useDispatch from "../../layout/useDispatch";
import { dataCache } from "../../__createApiSlice";

export default function usePUT(cacheName, url, queryParams = {}) {
    const data = useData();
    const dispatch = useDispatch();

    const putData = async (updatedData) => {
        // Get the current state data
        const currentState = useData()[cacheName]?.data;
  
        // Optimistically update the data in the context
        dispatch({ type: `${cacheName}/SUCCESS`, payload: updatedData, endpoint: cacheName });
  
        try {
            await dataCache.putData(cacheName, url, queryParams, updatedData);
            // If successful, the state remains updated with no further action needed
        } catch (error) {
            // Revert to the previous state in case of error
            dispatch({ type: `${cacheName}/SUCCESS`, payload: currentState, endpoint: cacheName });
            dispatch({ type: `${cacheName}/ERROR`, payload: error.message, endpoint: cacheName });
        }
    };
    
    return {
        data: data[cacheName]?.data,
        putData,
        error: data[cacheName]?.error
    };
}


