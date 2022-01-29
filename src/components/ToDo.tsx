import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "../atoms";

const Li = styled.li`
  display: flex;
  align-items: center;
  margin: 7px 0px;
`;

const ToDoContent = styled.span`
  font-size: 30px;
  margin-right: 10px;
`;

const Btn = styled.button`
  margin-left: 5px;
  box-shadow: none;
  border-radius: 10px;
  font-size: 25px;
  background-color: transparent;
  color: #feca57;
  cursor: pointer;
  &:hover {
    color: #ff9f43;
  }
`;

const DelBtn = styled.button`
  border: 0;
  font-size: 25px;
  background-color: transparent;
  cursor: pointer;
`;

const Icon = styled.i`
  color: #feca57;
  transition: all 300ms ease;
  &:hover {
    transform: rotate(-10deg) scale(1.1);
    color: #ff9f43;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // event를 발생시킨 버튼의 name을 읽어오기
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      // oldToDos는 배열
      // 배열의 인덱스를 찾아서 수정하기 위해 toDo의 id가 props에서 온 id와 같은지 비교
      const targetIndex = oldToDos.findIndex((toDO) => toDO.id === id);
      // props로 온 text와 id는 그대로 유지한 채, category만 event로 읽은 name으로 교체
      const newToDo = { text, id, category: name as Categories };
      const newTodoArray = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("ToDos", JSON.stringify(newTodoArray));
      return newTodoArray;
    });
  };

  // 삭제 펑션
  const deleteToDo = (event: React.FormEvent<HTMLButtonElement>) => {
    // event를 발생시킨 버튼의 요소를 읽음
    const {
      currentTarget: { parentElement },
    } = event;

    setToDos((oldToDos) => {
      // 새 ToDo 배열은 기존 배열에서 id가 event가 발생한 버튼의 요소 id와 같지 않은 것만 저장
      const newTodoArray = oldToDos.filter(
        (todo) => todo.id !== Number(parentElement?.id)
      );
      // 삭제하고 새로만든 배열을 로컬에 저장
      const stringifiedNewToDos = JSON.stringify(newTodoArray);
      localStorage.setItem("ToDos", stringifiedNewToDos);

      return newTodoArray;
    });
  };

  return (
    <Li id={id as any}>
      <ToDoContent>{text}</ToDoContent>
      {/* && 앞의 조건이 true 이면 뒷 부분 실행
      ex) 카테고리가 "TO_DO"가 아니면 To Do 버튼 생성 */}
      {category !== Categories.TO_DO && (
        <Btn name={Categories.TO_DO} onClick={onClick}>
          To Do
        </Btn>
      )}
      {category !== Categories.DOING && (
        <Btn name={Categories.DOING} onClick={onClick}>
          Doing
        </Btn>
      )}
      {category !== Categories.DONE && (
        <Btn name={Categories.DONE} onClick={onClick}>
          Done
        </Btn>
      )}
      <DelBtn onClick={deleteToDo}>
        <Icon className="far fa-trash-alt"></Icon>
      </DelBtn>
    </Li>
  );
}

export default ToDo;
