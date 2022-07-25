//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "./hooks/useFetch";

export default function CreateDay(){
    const days = useFetch("http://localhost:3001/days");
    const navigate = useNavigate();

    function addDay(){
        fetch(`http://localhost:3001/days/`,{
            method: 'POST',
            headers: {
                //Content-Type : 보내는 데이터의 타입 의미
                'Content-Type' : 'application/json',
            },
            //수정할 정보를 body에 입력
            body : JSON.stringify({ //JSON 문자열로 바꿔주기 위해 JSON.stringify 사용
                day : days.length + 1
            }),
        }).then(res => { //응답을 받아서 응답이 ok면
            if(res.ok){
                alert("생성이 완료 되었습니다.");
                navigate(`/`); //해당 페이지로 이동
            }
        });
    }

    return(
        <div>
            <h3>현재 일수 : {days.length}일</h3>
            
            <button onClick = {addDay}>
                Day 추가
            </button>
        </div>
    );
}