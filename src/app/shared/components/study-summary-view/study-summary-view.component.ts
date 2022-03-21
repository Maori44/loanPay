import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudyService } from 'src/app/utilities/_services/study.service';
import { Age } from '../../enum/age.enum';
import { decryption } from '../../genericFunctions/encryptionFun';

@Component({
  selector: 'app-study-summary-view',
  templateUrl: './study-summary-view.component.html',
  styleUrls: ['./study-summary-view.component.scss']
})
export class StudySummaryViewComponent implements OnInit {

  @Input() csstudyGuid: any;
  @Input() type: any;

  editedID: string | null;
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
  csSearchKeywordModelsData: any;
  genderNameEnum = Age;
  genderName: string;
  constructor(private studyService: StudyService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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
          this.csSearchKeywordModelsData = this.tempData.csSearchKeywordModels;

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
