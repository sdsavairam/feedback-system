export interface FeedbackModel{
  id: number;
  empName: string;
  empId: string;
  projectName: string;
  comments: string;
  rating: number;
  managerReview: boolean;
  isEdit:boolean;
}
