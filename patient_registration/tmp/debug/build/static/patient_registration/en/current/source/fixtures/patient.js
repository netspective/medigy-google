// ==========================================================================
// Project:   PatientRegistration.Patient Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals PatientRegistration */

sc_require('models/patient');

PatientRegistration.Patient.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  { guid: 1,
    firstName: "Michael",
    lastName: "Scott",
    gender: "male" },
  
  { guid: 2,
    firstName: "Dwight",
    lastName: "Schrute",
    gender: "male" },
  
  { guid: 3,
    firstName: "Jim",
    lastName: "Halpert",
    gender: "male"},
  
  { guid: 4,
    firstName: "Pam",
    lastName: "Beesly",
    gender: "female" },
  
  { guid: 5,
    firstName: "Ryan",
    lastName: "Howard",
    gender: "male" }

];
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('patient_registration');