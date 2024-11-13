
import { useEffect } from "react";

export default function useGET(fnName, params, url, useData, useDispatch) {

    const data = useData()


    return { data }

    // useEffect(() => {
    //     console.log(cacheName)
    //     const fetchData = async () => {
    //         dispatch({ type: `${cacheName}/LOADING`, endpoint: cacheName });
    //         try {
    //             const cachedData = await dataCache.getData(cacheName, url, '');
    //             dispatch({ type: `${cacheName}/SUCCESS`, payload: cachedData, endpoint: cacheName });
    //         } catch (error) {
    //             dispatch({ type: `${cacheName}/ERROR`, payload: error.message, endpoint: cacheName });
    //         }
    //     };

    //     fetchData();

    //     const handleDataUpdate = ({ key }) => {
    //         if (key === dataCache.generateCacheKey(cacheName, '')) fetchData();
    //     };

    //     dataCache.on('dataUpdate', handleDataUpdate);
    //     return () => dataCache.off('dataUpdate', handleDataUpdate);
    // }, [cacheName, url]);

    // return { data: data?.[cacheName]?.data || {}, loading: data?.[cacheName]?.loading, error: data?.[cacheName]?.error };
}
