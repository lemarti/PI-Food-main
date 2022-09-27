import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createRecipe, getDiets } from "../actions";
import createRecipeStyle from "../CSS/CreateRecipe.module.css";
const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "A name is required";
  } else if (!/^[a-zA-Z0-9_: &()]+$/.test(input.name)) {
    errors.name = "Invalid character";
  } else if (input.name.length > 99) {
    errors.name = "name is too long";
  }
  if (!input.summary) {
    errors.summary = "A summary is required";
  } else if (input.summary.length > 500) {
    errors.summary = "the summary is too long";
  } else if (!/^[a-zA-Z0-9_: &()]+$/.test(input.summary)) {
    errors.summary = "Invalid character";
  }

  if (!input.healthScore) {
    errors.healthScore = "healthScore is required";
  } else if (isNaN(input.healthScore)) {
    errors.healthScore = "only numbers";
  } else if (input.healthScore < 0 || input.healthScore > 100) {
    errors.healthScore = "scores are from 0 and 100";
  }

  if (input.dietType.length < 1) {
    errors.dietType = "Select at least one diet type";
  }
  if (input.stepByStep.length < 100) {
    errors.stepByStep =
      "that description is too short, please explain in more detail";
  } else if (!/^[a-zA-Z0-9_: &()]+$/.test(input.stepByStep)) {
    errors.stepByStep = "Invalid character";
  }

  return errors;
};
export default function CreateRecipe() {
  let diets = useSelector((state) => state.diets);
  let dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    summary: "",
    stepByStep: "",
    healthScore: "",
    dietType: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getDiets());
  }, [dispatch]);

  function handleChange(e) {
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    
  }

  function handleSelect(e) {
    setInput({ ...input, dietType: [...input.dietType, e.target.value] });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
    dispatch(createRecipe(input));

    alert("Created succesfully");
    setInput({
      name: "",
      summary: "",
      stepByStep: "",
      healthScore: "",
      dietType: [],
    });
  }
console.log(errors)
  return (
    <div>
      <h1>Upload your own recipe!</h1>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.name && <p>{errors.name}</p>}
          <label>Summary</label>
          <input
            type="text"
            name="summary"
            value={input.summary}
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.summary && <p>{errors.summary}</p>}
          <label>Health score</label>
          <input
            type="number"
            min="0"
            
            name="healthScore"
            value={input.healthScore}
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.healthScore && <p>{errors.healthScore}</p>}
          <label>Step by step</label>
          <input
            type="text"
            name="stepByStep"
            value={input.stepByStep}
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.stepByStep && <p>{errors.stepByStep}</p>}

          <select onChange={(e) => handleSelect(e)} defaultValue={'select'}>
            <option value='select' disable="true" >
              Select a diet type
            </option>
            {diets?.map((e) => {
              return <option value={e.name}>{e.name}</option>;
            })}
          </select>
          <ul>
            <li>{input.dietType?.map((e) => e + " ,")}</li>
          </ul>
          {errors.dietType && <p>{errors.dietType}</p>}
          <button
            className={
              !!Object.keys(errors).length         //double !! cast a variable to be a boolean
                ? createRecipeStyle.hide
                : createRecipeStyle.disp
            }
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
      <Link to="/home">
        <button>volver a inicio</button>
      </Link>
    </div>
  );
}
