// TextQuestion.tsx
import React, { useState } from "react";

interface TextQuestionProps {
  handleTextQuestion: (question: {
    question: string;
    options?: string[]; // Make options property optional
    type: "text-based";
  }) => void;
}

function TextQuestion({ handleTextQuestion }: TextQuestionProps) {
  const [question, setQuestion] = useState("");

  const handleQuestionTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion(event.currentTarget.value);
  };

  const handleSave = () => {
    handleTextQuestion({
      question: question,
      type: "text-based",
    });
    setQuestion("");
  };

  return (
    <>
      <form>
        <div className="question-input">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={question}
            onChange={handleQuestionTextChange}
          />
        </div>
      </form>
      <button onClick={handleSave}>Save</button>
    </>
  );
}

export default TextQuestion;
