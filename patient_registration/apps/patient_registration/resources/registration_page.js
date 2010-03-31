// ==========================================================================
// PatientRegistration.registrationPage
// ==========================================================================
/*globals sc_require SCUI */
sc_require('core');
sc_require('views/patient');

/** @static
    
  @extends SC.Page
  @author Jeremy Hulick
  
  Registration Panel
  
*/
PatientRegistration.registrationPage = SC.Page.create({  
  
  panel : SC.PanelPane.create({
    
    layout : { centerX: 0, centerY: 0, height: 450, width: 900 },
    
    contentView : SC.View.design({
      layout     : { left: 0, right: 0, top: 0, bottom: 0},
      childViews : 'patientManager closeButton'.w(),
      
      patientManager : SC.View.design({
        layout     : { left: 10, right: 10, top: 10, bottom: 45},
        classNames : ['bordered-view'],
        childViews : 'patientDetailView'.w(),
        
        patientDetailView : PatientRegistration.PatientView.design({
          layout         : { top: 0, left: 0, bottom: 0, right: 0 },
          contentBinding : 'PatientRegistration.patientController'
        })

      }),
      
      patientsCount : SC.LabelView.design({
        layout       : { left: 10, width: 250, bottom: 8, height: 24 },
        controlSize  : SC.SMALL_CONTROL_SIZE,
        textAlign    : SC.ALIGN_LEFT,
        valueBinding : 'PatientRegistration.patientsController.summary' 
      }),
      
      closeButton : SC.ButtonView.design({
        layout        : { width: 80, height: 30, right: 10, bottom: 8 },
        localize      : YES,
        titleMinWidth : 0,
        keyEquivalent : 'return',
        isDefault     : YES,
        theme         : 'capsule',
        title         : "Close",
        target        : 'PatientRegistration.registrationController',
        action        : 'closePanel'
      })
      
    })

  }),

  patientInformation: SC.outlet('panel.contentView.patientManager.patientDetailView')
  
});