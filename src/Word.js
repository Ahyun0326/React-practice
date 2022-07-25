import { useState } from "react";


//props로 넘어온 word를 w라는 변수명으로 사용하겠다는 의미
export default function Word({word : w}){
    const [word, setWord] = useState(w);
    const [isShow, setIsShow] = useState(false);
    const [isDone, setIsDone] = useState(word.isDone);
    function toggleShow(){
        setIsShow(!isShow);
    }

    function toggleDone(){
        //setIsDone(!isDone);
        //1번째 인자 : 주소
        //2번째 인자 : 객체 -> 요청의 옵션들을 입력
        fetch(`http://localhost:3001/words/${word.id}`,{
            method: 'PUT',
            headers: {
                //Content-Type : 보내는 데이터의 타입 의미
                'Content-Type' : 'application/json',
            },
            //수정할 정보를 body에 입력
            body : JSON.stringify({ //JSON 문자열로 바꿔주기 위해 JSON.stringify 사용
                ...word,
                isDone : !isDone
            }),
        })
        //응답을 받아서 응답이 ok면
        .then(res => {
            if(res.ok){
                setIsDone(!isDone);
            }
        })
    }

    //단어 삭제 함수
    function del(){
        if(window.confirm("삭제 하시겠습니까?")){
            fetch(`http://localhost:3001/words/${word.id}`, {
                method : 'DELETE',
            }).then(res=>{
                if(res.ok){
                    setWord({id:0});
                }
            });
        }
    }

    if(word.id === 0){
        return null;
    }

    return(
        <tr className={isDone ? 'off' : ''}>
            <td>
                <input type="checkbox" checked={isDone}
                onChange={toggleDone}
                />
            </td>
            <td>{word.eng}</td>
             <td>{isShow && word.kor}</td>
            <td>
                <button onClick={toggleShow}>
                    뜻 {isShow ? '숨기기' : '보기'}
                    </button>
                <button onClick={del}className="btn_del">삭제</button>
            </td>
        </tr>
    );
}