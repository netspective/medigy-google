// ==========================================================================
// Project:   PatientRegistration.Patient
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals PatientRegistration */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/

// Types:
PatientRegistration.TITLE_MR = 'Mr.';
PatientRegistration.TITLE_MRS = 'Mrs.';
PatientRegistration.TITLE_MS = 'Ms.';
PatientRegistration.TITLE_DR = 'Dr.';

PatientRegistration.titleTypesAllowed = [
  PatientRegistration.TITLE_MR,
  PatientRegistration.TITLE_MRS,
  PatientRegistration.TITLE_MS,
  PatientRegistration.TITLE_DR
];

PatientRegistration.Patient = SC.Record.extend(
/** @scope PatientRegistration.Patient.prototype */ {

  	
 /**
  * The primary key for all Patient records is the "patient_id" attribute.
  */
  patientId      : SC.Record.attr(Number, { isRequired: YES }),
  title          : SC.Record.attr(String, { allowed: PatientRegistration.titleTypesAllowed }), // TODO: selection list
  firstName      : SC.Record.attr(String, { isRequired: YES }),
  middleName     : SC.Record.attr(String),

  /**
   * A string summarizing Patient name for display.
   */
  displayName: function() {
    var firstName = this.get('firstName').loc();
    var lastName = this.get('lastName').loc();
    return '%@, %@'.fmt(lastName, firstName);
  }.property('lastName', 'firstName').cacheable(),

  lastName       : SC.Record.attr(String, { isRequired: YES }),
  maidenName     : SC.Record.attr(String),
  gender         : SC.Record.attr(String, { isRequired: YES }),
  birthDate      : SC.Record.attr(Date),
  birthPlace     : SC.Record.attr(String),
  maritalStatus  : SC.Record.attr(String),
  education      : SC.Record.attr(String),
  religion       : SC.Record.attr(String),
  address        : SC.Record.attr(String),
  city           : SC.Record.attr(String),
  state          : SC.Record.attr(String),
  zipcode        : SC.Record.attr(String),
  addressType    : SC.Record.attr(String),
  phone          : SC.Record.attr(String),
  phoneType      : SC.Record.attr(String),
  email          : SC.Record.attr(String),
  emailType      : SC.Record.attr(String)

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('patient_registration');