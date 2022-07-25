//import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import useFetch from "./hooks/useFetch";

export default function DayList(){
    const days = useFetch("http://localhost:3001/days");
    
    //[days, setDays] = useState([]);
    
    //useEffect() : 어떤 상태값이 바뀌었을 때, 동작하는 함수 작성 가능
    //첫 번째 매개변수 : 함수
    //두 번째 매개변수 : 배열 -> 해당 값이 변경됐을 때만 실행, 빈 배열 전달 시 렌더링 직후 딱 한 번만 실행

    // useEffect(()=>{
    //     fetch("http://localhost:3001/days") //API 호출
    //     .then(res =>{   //res : http 응답
    //         return res.json();  
    //     })
    //     .then(data => { //데이터를 받아 바꿔 줌
    //         setDays(data);
    //     });
    // }, []);
    
    if(days.length === 0){
        return <sapn>Loading...</sapn>
    }
    
    return(
        <>
         <ul className="list_day">
            {days.map(day =>(
                <li key={day.id}>
                    <Link to={`/day/${day.day}`}>Day{day.day}</Link>
                </li>  //key : 반복되는 요소의 고유한 값
            ))}
        </ul>
        
        </>
    );
}