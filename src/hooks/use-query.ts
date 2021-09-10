import { useEffect, useState } from "react";
import data, { Item } from "../data";

const filter = (query: string): Item[] => {
  return data!.filter((item) => {
    return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  });
};

const getData = (query: string): Promise<Item[]> => {
  return new Promise((resolve,reject) => {

    // allow for a network error to make the API fail
    let mockFail:Boolean = Math.floor(Math.random()*100) % 2 === 1  ? true:false
    // 
    
    if(!mockFail){
      setTimeout(() => {
        resolve(filter(query));
      }, 200);
    }

    else{
      reject({
        status:404
      })
    }

  });
};

type MyData = null | Item[] | {status:number} 
export interface Output {
  data: MyData;
  loading: boolean;
}

const useQuery = ({ query = "" }: { query: string }): Output => {
  const [data, setData]:        [MyData,Function] = useState<MyData>(null);
  const [loading, setLoading]:  [boolean,Function] = useState<boolean>(false);
  const [success,setSucess]:    [number,Function] = useState<number>(1)

  // this can only fire once if the data is static I dont need to bother the backend
    
  useEffect(() => {
    setLoading(true);
    getData(query)
    .then((response) => {
      setData(response);
      setLoading(false);
    })
    .catch((response)=>{
      setData(response);
      setLoading(false);
      setSucess(Math.random())
    })
  }, [success]);
  // 

  return {
    data,
    loading,
  };
};

export default useQuery;
