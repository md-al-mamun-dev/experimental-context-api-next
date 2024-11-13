import useData from "../../layout/useData";
import useDispatch from "../../layout/useDispatch";

export default function usePOST(cacheName, url, queryParams = {}) {
    const data = useData();
    const dispatch = useDispatch();

    const postData = async (newData) => {
        // Set loading to true before making the request
        dispatch({ type: `${cacheName}/LOADING`, endpoint: cacheName });

        try {
            // Optimistically update the state with new data
            dispatch({ type: `${cacheName}/SUCCESS`, payload: newData, endpoint: cacheName });

            // Send data to the server and update the cache
            await dataCache.postData(cacheName, url, queryParams, newData);

        } catch (error) {
            // Revert to initial state and set error if post fails
            dispatch({ type: `${cacheName}/ERROR`, payload: error.message, endpoint: cacheName });
        }
    };

    return {
        data: data[cacheName]?.data,
        postData,
        loading: data[cacheName]?.loading,
        error: data[cacheName]?.error
    };
}


// import useDispatch from "../layout/useDispatch";
// import useData from "../layout/useData";
// import { dataCache } from "../createContext";


// export default function usePOST(cacheName, slicename, url, queryParams = {}) {
//     const dispatch = useDispatch();
//     const data = useData();

//     const postData = async (newData) => {
//         dispatch({ type: `${slicename}/LOADING`, endpoint: cacheName });
//         try {
//             await dataCache.postData(cacheName, url, queryParams, newData);
//             dispatch({ type: `${slicename}/SUCCESS`, payload: newData, endpoint: cacheName });
//         } catch (error) {
//             dispatch({ type: `${slicename}/ERROR`, payload: error.message, endpoint: cacheName });
//         }
//     };

//     return { data: data[cacheName]?.data, postData, loading: data[cacheName]?.loading, error: data[cacheName]?.error };
// }