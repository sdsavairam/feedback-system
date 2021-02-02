import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from 'src/services/storage.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FeedbackModel } from '../../models/feedback-model'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['empName', 'project', 'rating', 'comments', 'actions'];
  dataSource: MatTableDataSource<any>;
  public feedbackList: any;
  readonly FEEDBACK_LIST = "FEEDBACK_LIST";
  public modifiedComments: string;
  public modifiedRating: number;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private storageService: StorageService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getFeedbackList();
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public getFeedbackList() {
    let list = this.storageService.getLocal(this.FEEDBACK_LIST);
    this.feedbackList = list ? list : [];
    this.dataSource = new MatTableDataSource(this.feedbackList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public updateFeedback(feedback: FeedbackModel) {
    feedback.isEdit = true;
    this.modifiedComments = feedback.comments;
    this.modifiedRating = feedback.rating;
  }

  public saveFeedback(feedback: FeedbackModel) {
    if (feedback) {
      feedback.comments = this.modifiedComments;
      feedback.rating = this.modifiedRating;
      delete (feedback.isEdit);
      this.feedbackList.forEach(list => {
        if (list.id === feedback.id) {
          list = feedback;
        }
      });
      this.storageService.setLocal(this.FEEDBACK_LIST, this.feedbackList);
      this.getFeedbackList();
    }
  }

  public cancelOperation(feedback: FeedbackModel) {
    feedback.isEdit = false;
    this.modifiedComments = '';
    this.modifiedRating = 0;
  }

  public deleteFeedback(feedback: FeedbackModel) {
    if (feedback) {
      let index = this.feedbackList.indexOf(feedback);
      this.feedbackList.splice(index, 1);
      this.storageService.setLocal(this.FEEDBACK_LIST, this.feedbackList);
      this.getFeedbackList();
    }
  }

  ratingComponentClick(ratingObj: any): void {
    this.modifiedRating = ratingObj.rating;
  }
}
