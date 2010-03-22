// ==========================================================================
// Project:   PatientRegistration.registrationController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals PatientRegistration */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
PatientRegistration.registrationController = SC.ObjectController.create(
/** @scope PatientRegistration.registrationController.prototype */ {

  	openPanel: function(){
      var panel = PatientRegistration.getPath('registrationPage.panel');
      if(panel) {
        // Scroll to/select logged in user and open User Manager
        //var currentUser = CoreTasks.get('currentUser');
        //Tasks.usersController.selectObject(currentUser);
        panel.append();
      }
    },
    
    closePanel: function(){
      var panel = PatientRegistration.getPath('registrationPage.panel');
      if(panel) {
        panel.remove();
        panel.destroy();
      }
      if(PatientRegistration.get('autoSave')) PatientRegistration.saveData();
    }

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('patient_registration');