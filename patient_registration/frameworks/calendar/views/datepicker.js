// ==========================================================================
// SCUI.DatePickerView
// ==========================================================================

sc_require('core');

/** @class

  This is the Date Chooser View that creates a text field, a button that launches a calendar chooser

  @extends SC.View
  @author Evin Grano
  @version 0.1
  @since 0.1
*/

SCUI.DatePickerView = SC.View.extend(  
/** @scope SCUI.DatePickerView.prototype */ {
  classNames: ['scui-datepicker-view'],
  
  // Necessary Elements
  date: null,
  dateString: "",
  isShowingCalendar: NO,
  // Params for the textfield
  hint: "",
  dateFormat: null,
  
  // @private
  _textfield: null,
  _date_button: null,
  _calendar_popup: null,
  _calendar: null,
  _layout: {width: 195, height: 25},
  
  // display properties that should automatically cause a refresh.
  displayProperties: ['date'],
  
  init: function(){
    sc_super();
    
    // init the dateString to whatever date we're starting with (if present)
    this.set('dateString', this._genDateString(this.get('date')));
    
    // Setup default layout values
    var layout = this.get('layout');
    layout = SC.merge(this._layout, layout);
    this.set('layout', layout);
    
    // Create the reference to the calendar
    this._calendar_popup = SC.PickerPane.create({
      layout: {width: 195, height: 215},
      contentView: SC.View.design({
        childViews: 'calendar todayButton noneButton'.w(),
        calendar: SCUI.CalendarView.design({
          layout: { left: 10, top: 0},
          dateSize: {width: 25, height: 25},
          weekdayStrings: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          selectedDate: this.get('date') // init this so waking up the binding won't null out anything we had before
        }),
        todayButton: SC.View.extend(SCUI.SimpleButton, {
          classNames: ['scui-datepicker-today'],
          layout: {left: 10, bottom: 0, width: 50, height: 18},
          target: this,
          action: 'selectToday',
          render: function(context, firstTime) {
            if (firstTime) {
              context.push('Today');
            }
          }
        }),
        noneButton: SC.View.design( SCUI.SimpleButton, {
          classNames: ['scui-datepicker-none'],
          layout: {right: 10, bottom: 0, width: 50, height: 18},
          target: this,
          action: 'clearSelection',
          render: function(context, firstTime) {
            if (firstTime) {
              context.push('None');
            }
          }       
        })
      })
    });
    
    // Setup the Binding to the SelectedDate
    if (this._calendar_popup) {
      this.bind('date', '._calendar_popup.contentView.calendar.selectedDate');
      this.bind('isShowingCalendar', '._calendar_popup.isPaneAttached');
      this._calendar = this._calendar_popup.getPath('contentView.calendar');
    }
  },
  
  createChildViews: function(){
    var view, childViews = [];
    
    // First, Build the Textfield for the date chooser
    view = this._textfield = this.createChildView( 
      SC.TextFieldView.design( {
        layout: {left: 0, top: 0, right: 25, bottom: 0},
        classNames: ['scui-datechooser-text'],
        isEnabled: NO,
        valueBinding: '.parentView.dateString',
        hint: this.get('hint')
      })
    );
    childViews.push(view);
    
    // Now, set up the button to launch the Calendar Datepicker
    var that = this;
    view = this._date_button = this.createChildView( 
      SC.View.design( SCUI.SimpleButton, {
        classNames: ['scui-datechooser-button', 'calendar-icon'],
        layout: {right: 0, top: 3, width: 16, height: 16},
        target: this,
        action: 'toggle',
        isEnabledBinding: SC.binding('isEnabled', that)
      })
    );
    childViews.push(view);
    
    this.set('childViews', childViews);
    sc_super();
  },
  
  /**  
    Hides the attached menu if present.  This is called automatically when
    the button gets toggled off.
  */
  hideCalendar: function() {
    if (this._calendar_popup) {
      this._calendar_popup.remove();
      this.set('isShowingCalendar', NO);
    }
  },

  /**
    Shows the menu.  This is called automatically when the button is toggled on.
  */
  showCalendar: function() {
    // Now show the menu
    if (this._calendar_popup) {
      this._calendar_popup.popup(this._textfield); // show the menu
      this._calendar.resetToSelectedDate();
      this.set('isShowingCalendar', YES);
    }
  },
  
  toggle: function(){
    if (this.isShowingCalendar){
      this.hideCalendar();
    }
    else{
      this.showCalendar();
    }
  },
  
  selectToday: function(){
    this._calendar.set('selectedDate', SC.DateTime.create());
  },
  
  clearSelection: function(){
    this._calendar.set('selectedDate', null);
  },
  
  /**
    Standard way to generate the date string
  */
  _genDateString: function(date) {
    var fmt = this.get('dateFormat') || '%a %m/%d/%Y';
    var dateString = date ? date.toFormattedString(fmt) : "";
    return dateString;
  },
  
  _dateDidChange: function(){
    this.set('dateString', this._genDateString(this.get('date')));
    this.hideCalendar();
  }.observes('date')

}) ;
