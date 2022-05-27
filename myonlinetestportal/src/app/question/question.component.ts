import { getInstructionStatements, getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from 'src/assets/service/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  public name:string="";
  public questionList:any=[];
  public currentQuestion:number=0;
  public points: number=0;
  counter=60;
  correctAnswer:number=0;
  incorrectAnswer:number=0;
  constructor(private questionService: QuestionService) { }
  ngOnInit(): void {
    this.name=localStorage.getItem("name")!;
    this.getAllQuestions();
}
getAllQuestions(){
  this.questionService.getQuestionJson()
  .subscribe(res =>{
    this.questionList=res.questions;
  })  
}
nextQuestion(){
  this.currentQuestion++;
}
prevQuestion(){
  this.currentQuestion--;
}
answer(currentQno:number,option:any){
  if(option.correct){
    this.points+=1;
    this.incorrectAnswer++;
    this.currentQuestion++;
  }
  else
  {
    this.points-=1;
    this.currentQuestion++;
    this.incorrectAnswer++;
  }
}
}
