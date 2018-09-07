import {APPLICATION_FORM_TYPES, AUTOCOMPLETE_DICT, FUNDING_TYPES} from './constants';

export class Scholarship {
  constructor(public activities?: string[],
              public citizenship?: string[],
              public applicants?: any[],
              public city?: any,
              public country?: any,
              public cover_letter_required?: any,
              public criteria_info?: string,
              public date_created?: string,
              public deadline?: string,
              public description?: string,
              public disability?: string[],
              public financial_need?: string,
              public education_field?: any,
              public education_level?: any,
              public eligible_programs?: string[],
              public eligible_schools?: any,
              public enrollment_proof_required?: any,
              public ethnicity?: string[],
              public extra_questions?: any,
              public extra_criteria?: any,
              public female_only?: boolean,
              public form_url?: string,
              public funding_amount?: number,
              public funding_type?: string[],
              public heritage?: string[],
              public id?: number,
              public img_url?: any,
              public is_automated?: boolean,
              public language?: any,
              public local_form_location?: any,
              public metadata?: any,
              public name?: string,
              public no_essay_required?: boolean,
              public number_available_scholarships?: number,
              public owner?: any,
              public open_date?: any,
              public province?: any,
              public purpose?: any,
              public reference_letter_required?: number,
              public religion?: string[],
              public resume_required?: any,
              public scholarship_img_url?: string,
              public scholarship_url?: string,
              public slug?: string,
              public sports?: string[],
              public submission_info?: any,
              public transcript_required?: any,) {

    this.extra_questions = {};
    this.submission_info = {};
    this.metadata = {};
    this.submission_info.application_form_type = APPLICATION_FORM_TYPES[1];
    this.funding_type = [FUNDING_TYPES[0]];
    this.reference_letter_required = 0;
    this.number_available_scholarships = 1;


    this.extra_questions.funding_amount_varies = true;

    this.submission_info.web_form_entries = [
      {
        attribute_type: '',
        attribute_value: '',
        question_key: ''
      },];

    this.submission_info.web_form_parent = {
      element_type: '',
      attribute_type: '',
      attribute_value: '',
    };
    for (let key in AUTOCOMPLETE_DICT) {
      this[key] = [];
    }
  }

}



