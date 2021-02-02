import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';
import { FeedbackModel } from 'src/models/feedback-model';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  @Input() updateForm;

  readonly FEEDBACK_LIST="FEEDBACK_LIST"
  feedbackList: FeedbackModel[];
  feedbackForm: FormGroup;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.initiateForm();
    this.getFeedbackList();
    this.feedbackForm.controls.rating.setValue(0);
  }

  initiateForm(){
    this.feedbackForm = new FormGroup({
      empName: new FormControl('', [Validators.required]),
      empId: new FormControl('', [Validators.required]),
      projectName: new FormControl('', [Validators.required]),
      rating: new FormControl(''),
      comments: new FormControl('', [Validators.required]),
    });
  }

  getFeedbackList(){
    let list = this.storageService.getLocal(this.FEEDBACK_LIST);
    this.feedbackList = list ? list : [];
  }

  onSubmit() {
    const newFeedback = this.feedbackForm.value;
    newFeedback.managerReview = false;
    newFeedback.id = this.feedbackList.length + 1;
    newFeedback.isEdit = false;
    this.feedbackList.push(newFeedback);
    this.storageService.setLocal(this.FEEDBACK_LIST, this.feedbackList);
    this.getFeedbackList();
    this.feedbackForm.reset();
  }

  ratingComponentClick(ratingObj: any): void {
    this.feedbackForm.controls.rating.setValue(ratingObj.rating);
  }

  resetForm() {
    this.feedbackForm.reset();
  }

}
