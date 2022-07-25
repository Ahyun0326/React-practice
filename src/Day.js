//import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "./hooks/useFetch";
import Word from "./Word";

export default function Day(){
    //dummy words
    const {day} = useParams();
  
    //단어들을 필터를 걸어 단어의 날짜 1인것만 출력
    /*
    const wordList = dummy.words.filter(word => (
        word.day === Number(day)
    ))
    */

    const words = useFetch(`http://localhost:3001/words?day=${day}`);
    
    // const [words, setWords] = useState([]);

    // useEffect(()=>{
    //     fetch(`http://localhost:3001/words?day=${day}`) //API 호출
    //     .then(res =>{   //res : http 응답
    //         return res.json();  
    //     })
    //     .then(data => { //데이터를 받아 바꿔 줌
    //         setWords(data);
    //     });
    // }, [day]);

    return(
    <>
        <h2>Day {day}</h2>
        {words.length === 0 && <span>Loading...</span>}
        <table>
            <tbody>
                {words.map(word => (
                   <Word word={word} key={word.id}/>
                ))}
            </tbody>
        </table>
    </>
    );
}