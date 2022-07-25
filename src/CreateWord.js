import { useRef, useState } from "react";
import {useNavigate} from "react-router";
import useFetch from "./hooks/useFetch";

export default function CreateWord() {
    const days= useFetch("http://localhost:3001/days");   
    const navigate = useNavigate();    //useNavigate(): react-router에서 지원
    const [isLoading, setLoading] = useState(false);

    function onSubmit(e){
        e.preventDefault(); //버튼을 눌러도 새로고침 X

        // console.log(engRef.current.value);  //current 속성을 이용해 해당 요소에 접근
        // console.log(korRef.current.value);  //value : input에 입력된 값 얻을 수 O
        // console.log(dayRef.current.value);

        if(!isLoading){
            setLoading(true);
            fetch(`http://localhost:3001/words/`,{
                method: 'POST',
                headers: {
                    //Content-Type : 보내는 데이터의 타입 의미
                    'Content-Type' : 'application/json',
                },
                //수정할 정보를 body에 입력
                body : JSON.stringify({ //JSON 문자열로 바꿔주기 위해 JSON.stringify 사용
                    day : dayRef.current.value,
                    eng : engRef.current.value,
                    kor : korRef.current.value,
                    isDone : false,
                }),
            }).then(res => { //응답을 받아서 응답이 ok면
                if(res.ok){
                    alert("생성이 완료 되었습니다.");
                    navigate(`/day/${dayRef.current.value}`); //해당 페이지로 이동
                    setLoading(false);
                }
            });
        }
    }   

    //useRef : 돔에 접근할 수 있게 해줌
    //ex) 스크롤 위치 확인, 포커스 위치 확인
    //각 태그에 연결시키면 돔 요소가 생성된 후 접근 가능
    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);

    return(
        <form onSubmit={onSubmit}>
            <div className="input_area">
                <label>Eng</label>
                <input type = "text" placeholder="computer" ref = {engRef}/>
            </div>
            <div className="input_area">
                <label>Kor</label>
                <input type = "text" placeholder="컴퓨터" ref = {korRef}/>
            </div>
            <div className="input_area">
                <label>Day</label>
                <select ref = {dayRef}>
                    {days.map(day =>(
                        <option key={day.id} value={day.day}>
                            {day.day}
                        </option>
                    ))}
                </select>
            </div>
            <button
            style={{
                opacity: isLoading ? 0.3 : 1,
            }}
            >{isLoading ? "Saving..." : "저장"}</button>
        </form> 
    );
}