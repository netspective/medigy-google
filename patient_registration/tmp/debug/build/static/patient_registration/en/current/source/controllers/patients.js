// ==========================================================================
// Project:   PatientRegistration.patientsController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals PatientRegistration */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
PatientRegistration.patientsController = SC.ArrayController.create(
  SC.CollectionViewDelegate,
/** @scope PatientRegistration.patientsController.prototype */ {

  summary: function() {
    var len = this.get('length'), ret ;
    if(len && len > 0) {
      ret = len === 1 ? "1 patient" : "%@ patients".fmt(len);
    } else ret = "No patients";

    return ret;
  }.property('length').cacheable()
  ,

  collectionViewDeleteContent: function(view, content, indexes) {
    // destroy the records
    var records = indexes.map(function(idx) {
      return this.objectAt(idx);
    }, this);
    records.invoke('destroy');

    var selIndex = indexes.get('min')-1;
    if (selIndex<0) selIndex = 0;
    this.selectObject(this.objectAt(selIndex));
  }
  ,
  addPatient: function() {
	
	PatientRegistration.registrationController.openPanel();
	
    //var patient;
    // create a new task in the store
    //patient = PatientRegistration.store.createRecord(PatientRegistration.Patient, {
    //  "firstName"    : "First Name", 
    //  "lastName"     : "Last Name"
    //});

    // select new task in UI
    //this.selectObject(patient);

    // activate inline editor once UI can repaint
    //this.invokeLater(function() {
    //  var contentIndex = this.indexOf(patient);
    //  var list = PatientRegistration.mainPage.getPath('mainPane.middleView.contentView');
    //  var listItem = list.itemViewForContentIndex(contentIndex);
    //  listItem.beginEditing();
    //});

    //return YES;
  }

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('patient_registration');