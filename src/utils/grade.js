import { useSelector } from "react-redux";

export const getGradeByMarks = (mark) => {
  if(mark >= 85) return 'A+'
  else if(mark >= 75) return 'A'
  else if(mark >= 70) return 'A-'
  else if(mark >= 65) return 'B+'
  else if(mark >= 60) return 'B'
  else if(mark >= 55) return 'B-'
  else if(mark >= 50) return 'C+'
  else if(mark >= 45) return 'C'
  else if(mark >= 40) return 'C-'
  else if(mark >= 35) return 'D+'
  else if(mark >= 30) return 'D'
  else if(mark >= 0) return 'E'
  else return '-'
};

export const getGPAByMarks = (mark) => {
  if(mark >= 85) return 4.0
  else if(mark >= 75) return 4.0
  else if(mark >= 70) return 3.70
  else if(mark >= 65) return 3.30
  else if(mark >= 60) return 3.30
  else if(mark >= 55) return 2.70
  else if(mark >= 50) return 2.30
  else if(mark >= 45) return 2.00
  else if(mark >= 40) return 1.70
  else if(mark >= 35) return 1.30
  else if(mark >= 30) return 1.00
  else if(mark >= 0) return 0.00
  else return 0.00
};

