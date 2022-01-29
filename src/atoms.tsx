import { atom, selector } from "recoil";

// enum은 열겨형으로 이름이 있는 상수들의 집합. 단순 type보다 더욱 명확한 구분을 해줌
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

// 로컬에서 가져오기
const localStorageTodos = localStorage.getItem("ToDos");
const parsedToDos = JSON.parse(localStorageTodos as any);
export const toDoState = atom<IToDo[]>({
  key: "toDoState",
  default: parsedToDos?.length > 0 ? parsedToDos : [],
});

// Recoil에서 데이터를 저장하는 atom
// export const toDoState = atom<IToDo[]>({
//   key: "toDo",
//   default: [],
// });

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
