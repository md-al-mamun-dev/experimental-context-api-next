import useDispatch from "../../layout/useDispatch";
import useData from "../../layout/useData";
import { dataCache } from "../../__createApiSlice";

export default function usePATCH(cacheName, url, queryParams = {}) {
    const dispatch = useDispatch();
  
    const patchData = async (updatedData) => {
        dispatch({ type: `${cacheName}/LOADING`, endpoint: cacheName });
        try {
            await dataCache.patchData(cacheName, url, queryParams, updatedData);
            dispatch({ type: `${cacheName}/SUCCESS`, payload: updatedData, endpoint: cacheName });
        } catch (error) {
            dispatch({ type: `${cacheName}/ERROR`, payload: error.message, endpoint: cacheName });
        }
    };
  
    const data = useData();
    return {
        data: data[cacheName]?.data,
        patchData,
        loading: data[cacheName]?.loading,
        error: data[cacheName]?.error
    };
}