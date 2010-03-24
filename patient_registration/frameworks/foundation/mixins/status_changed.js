// ==========================================================================
// SCUI.StatusChanged
// ==========================================================================

/**
  @namespace
  
  Implements common status observation.
  
  @author: Mike Ball
  @version: 0.5
  @since: 0.5
*/
SCUI.StatusChanged = {
  
  notifyOnContentStatusChange: YES,
  
  /**
    Override this method to do any error or success handeling in your own controllers or views...
  */
  contentStatusDidChange: function(status){
    
  },
  
  /**
    what property on this object has a status
    @property
  */
  contentKey: 'content',
  
  /**
    @private
  
    observers the content property's status (if it exists) and calls 
    statusDidChange so you have an oppertunity to take action 
    (eg display an error message) in UI when a record's status changes
  */
  _sc_content_status_changed: function(){
    var status, content;
    if(this.get('contentKey') && this.get) content = this.get(this.get('contentKey'));
    if(content && content.get) status = content.get('status');
    if(this.get('notifyOnContentStatusChange') && status && this.contentStatusDidChange) this.contentStatusDidChange(status);
  },
  
  initMixin: function(){
    if(this.get('notifyOnContentStatusChange') && this.addObserver) {
      var path;
      if(this.get('contentKey')) path = '%@.status'.fmt(this.get('contentKey'));
      if(path && this.addObserver) this.addObserver(path, this, this._sc_content_status_changed); 
    }
  }
};