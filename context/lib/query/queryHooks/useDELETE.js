import useDispatch from "../../layout/useDispatch";
import useData from "../../layout/useData";
import { dataCache } from "../../__createApiSlice";

export default function useDELETE(cacheName, url, queryParams = {}) {
    const dispatch = useDispatch();
    const data = useData();

    const deleteData = async () => {
        const currentState = useData()[cacheName]?.data;
  
        // Optimistically remove data
        dispatch({ type: `${cacheName}/SUCCESS`, payload: null, endpoint: cacheName });
  
        try {
            await dataCache.deleteData(cacheName, url, queryParams);
            // If successful, the state remains null with no further action needed
        } catch (error) {
            // Revert to previous state if delete fails
            dispatch({ type: `${cacheName}/SUCCESS`, payload: currentState, endpoint: cacheName });
            dispatch({ type: `${cacheName}/ERROR`, payload: error.message, endpoint: cacheName });
        }
    };
  
    
    return {
        data: data[cacheName]?.data,
        deleteData,
        error: data[cacheName]?.error
    };
}
