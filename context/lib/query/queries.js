import useGET from './queryHooks/useGET';
import usePOST from './queryHooks/usePOST';
import usePUT from './queryHooks/usePUT';
import usePATCH from './queryHooks/usePATCH';
import useDELETE from './queryHooks/useDELETE';

export const queries = {
    get:({ query})=>({fnName, params, baseQuery, useData, useDispatch})=>{ 
        const url = baseQuery+ query(params)
       return  useGET(fnName, params, url, useData, useDispatch )
    } ,
    // post:()=> {},
    // put:()=> {},
    // patch:()=> {},
    // delete:()=> {},
};

export default  queries  