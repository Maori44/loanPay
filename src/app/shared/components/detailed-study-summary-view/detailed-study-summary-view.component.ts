import { Component, Input, OnInit } from '@angular/core';
import { StudyService } from 'src/app/utilities/_services/study.service';

@Component({
  selector: 'app-detailed-study-summary-view',
  templateUrl: './detailed-study-summary-view.component.html',
  styleUrls: ['./detailed-study-summary-view.component.css']
})
export class DetailedStudySummaryViewComponent implements OnInit {

  @Input() csstudyGuid: any;
  tempData: any;
  csArmsInterventionsModelData: any;
  csConditionOrDiseaseModelData: any;
  csContactModelData: any;
  csCriteriaModelData: any;
  csDetailsModelsData: any;
  csInterventionOrTreatmentModelData: any;
  csLocationModelData: any;
  csOutcomeMeasuresData: any;
  csPhaseModelData: any;
  genderName: any;
  genderNameEnum: any;
  constructor(private studyService: StudyService) { }

  ngOnInit() {
    this.getStudyData();
  }

  getStudyData(){
    if (this.csstudyGuid) {
      let obj = {
        guid: this.csstudyGuid
      }
      this.studyService.GetStudyData(obj).subscribe(res => {
        if (res) {
          this.tempData = res.data;
          this.csArmsInterventionsModelData = this.tempData.csArmsInterventionsModel;
          this.csConditionOrDiseaseModelData = this.tempData.csConditionOrDiseaseModel;
          this.csContactModelData = this.tempData.csContactModel;
          this.csCriteriaModelData = this.tempData.csCriteriaModel;
          this.csDetailsModelsData = this.tempData.csDetailsModels;
          this.csInterventionOrTreatmentModelData = this.tempData.csInterventionOrTreatmentModel;
          this.csLocationModelData = this.tempData.csLocationModel;
          this.csOutcomeMeasuresData = this.tempData.csOutcomeMeasures;
          this.csPhaseModelData = this.tempData.csPhaseModel;
          this.getGender(this.csDetailsModelsData);
        }
      })
    }
  }

  getGender(item:any) {
    let genderId =  item.csSexesEligible;
    this.genderName = this.genderNameEnum[genderId];
   }

}
