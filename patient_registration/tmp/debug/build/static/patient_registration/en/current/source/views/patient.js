// ==========================================================================
// Project: PatientRegistration
// ==========================================================================
/*globals */

/** 

  View/edit Patient information.
  
  @extends SC.View
  @author Jeremy Hulick
*/

PatientRegistration.PatientView = SC.View.extend(
/** @scope PatientRegistration.PatientView.prototype */ {
  
  createChildViews: function() {
    
    var childViews = [];
    
    this.patientIdLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 10, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Patient ID:".loc() 
    }));
    childViews.push(this.patientIdLabel);
    this.patientIdField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 10, left: 90, height: 20, width: 300 },
      hint         : "patientId".loc()
    }));
    childViews.push(this.patientIdField);

    this.titleLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 42, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Title:".loc() 
    }));
    childViews.push(this.titleLabel);
    this.titleField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 42, left: 90, height: 20, width: 300 },
      hint         : "title".loc()
    }));
    childViews.push(this.titleField);    
    
    this.firstNameLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 74, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "First Name:".loc()
    }));
    childViews.push(this.firstNameLabel);
    this.firstNameField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 74, left: 90, height: 20, width: 300 },
      hint         : "firstName".loc()
    }));
    childViews.push(this.firstNameField);

    this.middleNameLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 106, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Middle Name:".loc()
    }));
    childViews.push(this.middleNameLabel);
    this.middleNameField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 106, left: 90, height: 20, width: 300 },
      hint         : "middleName".loc()
    }));
    childViews.push(this.middleNameField);

    this.lastNameLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 138, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Last Name:".loc()
    }));
    childViews.push(this.lastNameLabel);
    this.lastNameField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 138, left: 90, height: 20, width: 300 },
      hint         : "lastName".loc()
    }));
    childViews.push(this.lastNameField);

    this.maidenNameLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 170, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Maiden Name:".loc()
    }));
    childViews.push(this.maidenNameLabel);
    this.maidenNameField = this.createChildView(SC.TextFieldView.extend(SC.Validatable,{
      layout       : { top: 170, left: 90, height: 20, width: 300 },
      hint         : "maidenName".loc()
    }));
    childViews.push(this.maidenNameField);

    this.genderLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 202, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Gender:".loc()
    }));
    childViews.push(this.genderLabel);
    this.genderField = this.createChildView(SC.TextFieldView.extend(SC.Validatable,{
      layout       : { top: 202, left: 90, height: 20, width: 300 },
      hint         : "gender".loc()
    }));
    childViews.push(this.genderField);

    this.birthDateLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 234, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Birth Date:".loc()
    }));
    childViews.push(this.birthDateLabel);
    this.birthDateField = this.createChildView(SC.TextFieldView.extend(SC.Validatable,{
      layout       : { top: 234, left: 90, height: 20, width: 300 },
      hint         : "birthDate".loc()
    }));
    childViews.push(this.birthDateField);

    this.birthPlaceLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 266, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Birth Place:".loc()
    }));
    childViews.push(this.birthPlaceLabel);
    this.birthPlaceField = this.createChildView(SC.TextFieldView.extend(SC.Validatable,{
      layout       : { top: 266, left: 90, height: 20, width: 300 },
      hint         : "birthPlace".loc()
    }));
    childViews.push(this.birthPlaceField);

    this.maritalStatueLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 298, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Marital Status:".loc()
    }));
    childViews.push(this.maritalStatueLabel);
    this.maritalStatusField = this.createChildView(SC.TextFieldView.extend(SC.Validatable,{
      layout       : { top: 298, left: 90, height: 20, width: 300 },
      hint         : "maritalStatus".loc()
    }));
    childViews.push(this.maritalStatusField);

    this.educationLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 330, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Education:".loc()
    }));
    childViews.push(this.educationLabel);
    this.educationField = this.createChildView(SC.TextFieldView.extend(SC.Validatable,{
      layout       : { top: 330, left: 90, height: 20, width: 300 },
      hint         : "education".loc()
    }));
    childViews.push(this.educationField);

    this.religionLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 362, left: 0, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Religion:".loc()
    }));
    childViews.push(this.religionLabel);
    this.religionField = this.createChildView(SC.TextFieldView.extend(SC.Validatable,{
      layout       : { top: 362, left: 90, height: 20, width: 300 },
      hint         : "religion".loc()
    }));
    childViews.push(this.religionField);
	



    this.addressLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 10, right: 315, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Address:".loc() 
    }));
    childViews.push(this.addressLabel);
    this.addressField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 10, right: 10, height: 20, width: 300 },
      hint         : "middleName".loc()
    }));
    childViews.push(this.addressField);

    this.cityLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 42, right: 315, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "City:".loc() 
    }));
    childViews.push(this.cityLabel);
    this.cityField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 42, right: 10, height: 20, width: 300 },
      hint         : "city".loc()
    }));
    childViews.push(this.cityField);

    this.stateLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 74, right: 315, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "State:".loc() 
    }));
    childViews.push(this.stateLabel);
    this.stateField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 74, right: 10, height: 20, width: 300 },
      hint         : "state".loc()
    }));
    childViews.push(this.stateField);

    this.zipCodeLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 106, right: 315, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Zip Code:".loc() 
    }));
    childViews.push(this.zipCodeLabel);
    this.zipCodeField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 106, right: 10, height: 20, width: 300 },
      hint         : "zipCode".loc()
    }));
    childViews.push(this.zipCodeField);

    this.addressTypeLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 138, right: 315, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Address Type:".loc() 
    }));
    childViews.push(this.addressTypeLabel);
    this.addressTypeField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 138, right: 10, height: 20, width: 300 },
      hint         : "addressType".loc()
    }));
    childViews.push(this.addressTypeField);

    this.phoneLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 170, right: 315, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Phone:".loc() 
    }));
    childViews.push(this.phoneLabel);
    this.phoneField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 170, right: 10, height: 20, width: 300 },
      hint         : "phone".loc()
    }));
    childViews.push(this.phoneField);

    this.phoneTypeLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 202, right: 315, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Phone Type:".loc() 
    }));
    childViews.push(this.phoneTypeLabel);
    this.phoneTypeField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 202, right: 10, height: 20, width: 300 },
      hint         : "phoneType".loc()
    }));
    childViews.push(this.phoneTypeField);

    this.emailLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 234, right: 315, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Email:".loc() 
    }));
    childViews.push(this.emailLabel);
    this.emailField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 234, right: 10, height: 20, width: 300 },
      hint         : "email".loc()
    }));
    childViews.push(this.emailField);

    this.emailTypeLabel = this.createChildView(SC.LabelView.extend({
      layout    : { top: 266, right: 315, width: 85, height: 18 },
      textAlign : SC.ALIGN_RIGHT,
      value     : "Email Type:".loc() 
    }));
    childViews.push(this.emailTypeLabel);
    this.emailTypeField = this.createChildView(SC.TextFieldView.extend({
      layout       : { top: 266, right: 10, height: 20, width: 300 },
      hint         : "emailType".loc()
    }));
    childViews.push(this.emailTypeField);

    
    this.set('childViews', childViews);
    
  }

});; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('patient_registration');