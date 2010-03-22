// ==========================================================================
// Project:   PatientRegistration
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals PatientRegistration */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
PatientRegistration.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  PatientRegistration.getPath('mainPage.mainPane').append() ;

  // Step 2. Set the content property on your primary controller.
  // This will make your app come alive!

  // TODO: Set the content property on your primary controller
  // ex: PatientRegistration.contactsController.set('content',PatientRegistration.contacts);

  var query = SC.Query.local(PatientRegistration.Patient, { orderBy: 'lastName, firstName' });
  var patients = PatientRegistration.store.find(query);
  PatientRegistration.patientsController.set('content', patients);

} ;

function main() { PatientRegistration.main(); }
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('patient_registration');