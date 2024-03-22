// Introduction.tsx
import React, { useState } from "react";
import Footer from "./Footer";
import MultipleQuestion from "./MultipleQuestion";
import SingleQuestion from "./SingleQuestion";
import TextQuestion from "./TextQuestion";

function Introduction() {
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [multi, setMulti] = useState(false);
  const [single, setSingle] = useState(false);
  const [text, setText] = useState(false);
  const [questions, setQuestions] = useState<
    {
      question: string;
      options?: string[];
      response?: string; // Add response property for text-based question
      type: "multiple" | "single" | "text-based";
    }[]
  >([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTitle: string = (
      e.currentTarget.title as unknown as HTMLInputElement
    ).value;
    setTitle(newTitle);
    const newIntroduction: string = (
      e.currentTarget.introduction as unknown as HTMLTextAreaElement
    ).value;
    setIntroduction(
      newIntroduction.replace(/\n/g, String.fromCharCode(13, 10))
    );

    (e.currentTarget.title as unknown as HTMLInputElement).value = "";
    (e.currentTarget.introduction as unknown as HTMLTextAreaElement).value = "";
  };

  const handleMultiple = () => {
    setSingle(false);
    setText(false);
    setMulti(true);
  };

  const handleSingle = () => {
    setText(false);
    setMulti(false);
    setSingle(true);
  };

  const handleText = () => {
    setMulti(false);
    setSingle(false);
    setText(true);
  };

  const handleQuestion = (questionData: {
    question: string;
    options?: string[];
    response?: string; // Include response for text-based question
    type: "multiple" | "single" | "text-based";
  }) => {
    setQuestions([...questions, questionData]);
  };

  const handleReset = () => {
    setQuestions([]);
  };

  return (
    <>
      <section className="outer-box">
        <h2>{title ? title : "Questionnaire"}</h2>
        <p>{introduction ? introduction : "Here goes the introduction"}</p>
        <hr className="line" />
        {questions.map((question, index) => (
          <div className="questions" key={index}>
            <p>{index + 1 + ". " + question.question}</p>
            {question.options?.map((option, optionIndex) => (
              <div key={optionIndex}>
                {question.type === "multiple" ? (
                  <input type="checkbox" />
                ) : (
                  <input type="radio" name={`radio${index}`} />
                )}
                <input value={option} readOnly />
              </div>
            ))}
            {question.type === "text-based" && (
              <div>
                <input
                  className="text-input"
                  type="text"
                  value={question.response}
                  placeholder="Type your response here"
                />
              </div>
            )}
          </div>
        ))}
      </section>
      <form className="intro-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="introduction">Introduction:</label>
          <textarea
            id="introduction"
            name="introduction"
            className="introduction-textbox"></textarea>
        </div>
        <div>
          <button type="submit">Save</button>
          <button onClick={handleReset} className="reset-button">
            reset
          </button>
        </div>
      </form>
      <section className="question-types">
        <p className="question-type" onClick={handleMultiple}>
          Multiple choice
        </p>
        <p className="question-type" onClick={handleSingle}>
          Single choice
        </p>
        <p className="question-type" onClick={handleText}>
          Text-based
        </p>
      </section>
      {multi && <MultipleQuestion handleMultipleQuestion={handleQuestion} />}
      {single && <SingleQuestion handleSingleQuestion={handleQuestion} />}
      {text && <TextQuestion handleTextQuestion={handleQuestion} />}
    </>
  );
}

export default Introduction;
