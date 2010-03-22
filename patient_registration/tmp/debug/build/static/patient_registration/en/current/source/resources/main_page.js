// ==========================================================================
// Project:   PatientRegistration - mainPage
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals PatientRegistration */

// This page describes the main user interface for your application.  
PatientRegistration.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({

    childViews : 'middleView topView bottomView'.w(),

    topView : SC.ToolbarView.design({
      layout         : { top: 0, left: 0, right: 0, height: 36 },
      childViews     : 'labelView addButton'.w(),
      anchorLocation : SC.ANCHOR_TOP,

      labelView : SC.LabelView.design({
	    layout      : { centerY: 0, height: 24, left: 8, width: 200 },
        controlSize : SC.LARGE_CONTROL_SIZE,
        fontWeight  : SC.BOLD_WEIGHT,
        value       :   'Patient Registration'
      }),

      addButton : SC.ButtonView.design({
        layout : { centerY: 0, height: 24, right: 12, width: 100 },
        title  :  "Add Patient",
        target : "PatientRegistration.registrationController",
        action : "openPanel"
      })
    }),

    middleView : SC.ScrollView.design({
      hasHorizontalScroller : NO,
      layout                : { top: 36, bottom: 32, left: 0, right: 0 },
      backgroundColor       : 'white',

      contentView : SC.ListView.design({
	    contentBinding   : 'PatientRegistration.patientsController.arrangedObjects',
        selectionBinding : 'PatientRegistration.patientsController.selection',
        contentValueKey  : "displayName", 
        canEditContent   : NO,
		canDeleteContent : YES,    
        rowHeight        : 21
      })
    }),

    bottomView : SC.ToolbarView.design({
      layout         : { bottom: 0, left: 0, right: 0, height: 32 },
      childViews     : 'summaryView'.w(),
      anchorLocation : SC.ANCHOR_BOTTOM,

      summaryView : SC.LabelView.design({
        layout       : { centerY: 0, height: 18, left: 20, right: 20 },
        textAlign    : SC.ALIGN_CENTER,
        valueBinding : "PatientRegistration.patientsController.summary"
      })
    })

    
  })

});
; if ((typeof SC !== 'undefined') && SC && SC.scriptDidLoad) SC.scriptDidLoad('patient_registration');