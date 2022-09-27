import React from "react";
import {useState} from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(name));
  }
  return (
    <div>
      <input
        type="text"
        placeholder="search by name"
        onChange={(e) => handleChange(e)}
      ></input>
      <button onClick={(e)=>handleSubmit(e)}>Search</button>
    </div>
  );
}
