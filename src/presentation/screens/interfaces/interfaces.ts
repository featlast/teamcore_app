export interface Answer {
  answer_id: string;
  answer: string;
}

export interface Question {
  question_id: string;
  question: string;
  answers: Answer[];
}

export interface FormData {
  [key: string]: string;
}
