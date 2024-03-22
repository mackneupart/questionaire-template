import React, { useState } from "react";

interface SingleQuestionProps {
  handleSingleQuestion: (SingleQuestion: {
    question: string;
    options: string[];
    type: "single";
  }) => void;
}

function SingleQuestion({ handleSingleQuestion }: SingleQuestionProps) {
  const [options, setOptions] = useState([{ id: 1, text: "" }]);
  const [question, setQuestion] = useState("");

  const handleOptionTextChange =
    (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const updatedOptions = options.map((option) =>
        option.id === id ? { ...option, text: event.target.value } : option
      );
      setOptions(updatedOptions);
    };

  const addOption = () => {
    const newOption = {
      id: options.length + 1,
      text: "",
    };
    setOptions([...options, newOption]);
  };
  const handleSave = () => {
    const q: {
      question: string;
      options: string[];
      type: "single";
    } = {
      question: "",
      options: [],
      type: "single",
    };

    options.map((option) => {
      q.options.push(option.text);
    });
    q.question = question;
    console.log(q);
    handleSingleQuestion(q);
    setOptions([{ id: 1, text: "" }]);
    setQuestion("");
  };

  const handleQuestionTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion(event.currentTarget.value);
  };

  return (
    <>
      <form>
        <div className="question-input">
          <label htmlFor="question">Single-choice Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={question}
            onChange={handleQuestionTextChange}
          />
        </div>
        {options.map((option) => (
          <div key={option.id} className="option-input">
            <input type="radio" id={`radio${option.id}`} name="options" />
            <input
              type="text"
              id={`option${option.id}`}
              name={`option${option.id}`}
              value={option.text}
              onChange={handleOptionTextChange(option.id)}
            />
          </div>
        ))}
      </form>
      <button className="add-icon" onClick={addOption}>
        +
      </button>{" "}
      <br></br>
      <button onClick={handleSave}>save</button>
    </>
  );
}

export default SingleQuestion;
