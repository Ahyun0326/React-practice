import {useEffect, useState} from "react";

export default function useFetch(url){
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch(url) //API 호출
        .then(res =>{   //res : http 응답
            return res.json();  
        })
        .then(data => { //데이터를 받아 바꿔 줌
            setData(data);
        });
    }, [url]);

    return data;

}