import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";

const AddForm = styled.form`
  display: flex;
  align-items: center;
`;

const ToDoInput = styled.input`
  height: 35px;
`;

const AddBtn = styled.button`
  border: 0;
  font-size: 40px;
  background-color: transparent;
  cursor: pointer;
`;

const Icon = styled.i`
  color: #feca57;
  transition: all 300ms ease;
  &:hover {
    transform: rotate(-90deg) scale(1.1);
    color: #ff9f43;
  }
`;

const ErrorMsg = styled.h1`
  color: orange;
  font-style: italic;
`;

// 폼 안에 들어갈 타입 설명
interface IForm {
  toDo: string;
}

function CreateToDo() {
  // recoil에 저장하는 함수
  const setToDos = useSetRecoilState(toDoState);
  // recoil에서 불러오는 함수
  const category = useRecoilValue(categoryState);
  // register는 폼에서 값 읽어오는 함수, handleSubmit은 폼에서 서브밋 하는 함수, setValue는??
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>();

  const hadleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      // 기존 배열에 새 인덱스 추가
      const allToDos = [...oldToDos, { text: toDo, id: Date.now(), category }];
      // 새 인덱스가 추가된 배열을 로컬에 저장
      const bringAllToDos = JSON.stringify(allToDos);
      localStorage.setItem("ToDos", bringAllToDos);

      return allToDos;
    });
    setValue("toDo", "");
  };

  return (
    <>
      <AddForm onSubmit={handleSubmit(hadleValid)}>
        <ToDoInput
          {...register("toDo", { required: "Please write a To Do" })}
          placeholder="Write a to do"
        />
        <AddBtn>
          <Icon className="far fa-plus-square"></Icon>{" "}
        </AddBtn>
      </AddForm>
      <ErrorMsg>{errors?.toDo?.message}</ErrorMsg>
    </>
  );
}

export default CreateToDo;
