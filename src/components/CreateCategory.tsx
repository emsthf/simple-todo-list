import React, { KeyboardEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState } from "../atoms";

const AddForm = styled.form`
  width: 220px;
  height: 33px;
  padding: 5px;
  margin-bottom: 10px;
  background-color: pink;
  border-radius: 5px;
  display: flex;
`;

const CateInput = styled.input`
  width: 90%;
`;

const AddCateBtn = styled.button`
  cursor: pointer;
`;

const ErrorMsg = styled.h1`
  color: orange;
  font-style: italic;
`;

function CreateCategory() {
  const setToDos = useSetRecoilState(categoryState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleValid = ({}) => {};

  return (
    <AddForm onSubmit={handleSubmit(handleValid)}>
      <CateInput
        type="text"
        {...register("addCategory", { required: "Can't add blanks" })}
        placeholder="Add Category"
      />
      <AddCateBtn>
        <i className="fas fa-plus"></i>
      </AddCateBtn>
      <ErrorMsg>{}</ErrorMsg>
    </AddForm>
  );
}

export default CreateCategory;
