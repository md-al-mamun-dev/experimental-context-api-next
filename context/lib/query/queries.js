import useGET from './queryHooks/useGET';
import usePOST from './queryHooks/usePOST';
import usePUT from './queryHooks/usePUT';
import usePATCH from './queryHooks/usePATCH';
import useDELETE from './queryHooks/useDELETE';

export const queries = ({baseQuery, useData, useDispatch}) => ({
    get: (config) => (params) => {
        console.log(params)
        const cacheName = params;
        const url = config['query']()
        return useGET(cacheName, baseQuery + url, useData, useDispatch);
    },
    post: (config) => (params) => {
        const cacheName = config.fnName;
        return usePOST(cacheName, baseQuery + url, useData, useDispatch);
    },
    put: (config) => (params) => {
        const cacheName = config.fnName;
        return usePUT(cacheName, baseQuery + config.url, params);
    },
    patch: (config) => (params) => {
        const cacheName = config.fnName;
        return usePATCH(cacheName, baseQuery + config.url, params);
    },
    delete: (config) => (params) => {
        const cacheName = config.fnName;
        return useDELETE(cacheName, baseQuery + config.url, params);
    },
});

export default  queries  