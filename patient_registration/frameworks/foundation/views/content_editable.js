// ==========================================================================
// SCUI.ContentEditableView
// ==========================================================================
/*globals NodeFilter*/
require('core');
require('panes/context_menu_pane');

/** @class

  This view provides rich text editor functionality (RTE). It's a variation of the 
  SC webView. It works be setting the body of the iframe to be ContentEditable as well
  as attaching a mouseup, keyup and paste events on the body of the iframe to detect
  the current state of text at the current mouse position

  @extends SC.WebView
  @author Mohammed Taher
  @version 0.913
  
  ==========
  = v0.913 =
  ==========
  - Improved inserHTML() function
  - Improved focus() function
  - New selectContent() function
  - Ability to attach a stylesheet to editor

  ==========
  = v0.912 =
  ==========
  - Better variable names
  - Querying indent/outdent values now works in FF
  - Slightly more optimized. (In the selectionXXXX properties, this._document/this._editor was being
    accessed multiple times, now it happens once at the beginning).
  - New helper functions. Trying to push browser code branching to such functions.
    a. _getFrame
    b. _getDocument
    c. _getSelection
    d. _getSelectedElemented
  - Reversed isOpaque value
    
*/
SCUI.ContentEditableView = SC.WebView.extend(SC.Editable,
/** @scope SCUI.ContentEditableView.prototype */ {
  
  /**
    Value of the HTML inside the body of the iframe.
  */
  value: '',
  
  /** @private */
  valueBindingDefault: SC.Binding.single(),
  
  /**
    Set to NO to prevent scrolling in the iframe.
  */  
  allowScrolling: YES,
  
  /**
    Set to NO when the view needs to be transparent.
  */
  isOpaque: YES,

  /**
    Current selected content in the iframe.
  */
  selection: '',
  
  /**
    Read-only value
    The currently selected image
  */
  selectedImage: null,
  
  /**
    Read-only value
    The currently selected hyperlink
  */  

  selectedHyperlink: null,
  
  /**
    A view can be passed that grows/shrinks in dimensions as the ContentEditableView
    changes dimensions.
  */  
  attachedView: null,
  
  /**
    Read-only value
    OffsetWidth of the body of the iframe.
  */
  offsetWidth: null,
  
  /**
    Read-only value.
    OffsetHeight of the body of the iframe.
  */
  offsetHeight: null,
  
  /**
    Set to NO to allow dimensions of the view to change according to the HTML.
  */
  hasFixedDimensions: YES,
  
  /**
    A set of values to be applied to the editor when it loads up.
    Styles can be dashed or camelCase, both are acceptable.
    
    For example,
    
    { 'color': 'blue',
      'background-color': 'red' }
    
    OR
    
    { 'color': 'orange',
      'backgroundColor': 'green' }
  */
  inlineStyle: {},
  
  /**
    If set to YES, then HTML from iframe will be saved everytime isEditing is set
    to YES
  */  
  autoCommit: NO,
  
  /**
    Set to NO to prevent automatic cleaning of text inserted into editor
  */
  cleanInsertedText: YES,
  
  /**
    strip exta \n and \r
  */
  stripCrap: NO,
  
  /**
    Decodes the following values on commit 
      -%3C (<)
      -%3E (>)
      -%20 ( )
      -%amp; (&)
      
    TODO - [MT] - Possibly combine this with the stripCrap option
  */
  decodeContent: YES,
  
  /**
    CSS to style the edit content
  */
  styleSheetCSS: '',
  
  /**
    List of menu options to display on right click
  */
	rightClickMenuOptions: [],
	
	displayProperties: ['value'],
	
	render: function(context, firstTime) {
    var value = this.get('value');
    var isOpaque = !this.get('isOpaque');
    var allowScrolling = this.get('allowScrolling') ? 'yes' : 'no';
    var frameBorder = isOpaque ? '0' : '1';
    var styleString = 'position: absolute; width: 100%; height: 100%; border: 0px; margin: 0px; padding: 0p;';
    
    if (firstTime) {
      context.push(
        '<iframe frameBorder="', frameBorder,
        '" name="', this.get('frameName'),
        '" scrolling="', allowScrolling,
        '" src="" allowTransparency="', isOpaque, 
        '" style="', styleString,
        '"></iframe>'
      );
      
    } else if (this._document) {
      if (value !== this._document.body.innerHTML) {
        this._document.body.innerHTML = value;
      }
    }
  },

  didCreateLayer: function() {
    sc_super();
    var f = this.$('iframe');
    SC.Event.add(f, 'load', this, this.editorSetup);
  },
  
  displayDidChange: function() {
    var doc = this._document;
    if (doc) {
      doc.body.contentEditable = this.get('isEnabled');
    }
    sc_super();
  },
  
  willDestroyLayer: function() {         
    var doc = this._document;
    var docBody = doc.body;
    
    SC.Event.remove(docBody, 'mouseup', this, this.mouseUp);
    SC.Event.remove(docBody, 'keyup', this, this.keyUp);
    SC.Event.remove(docBody, 'paste', this, this.paste);
    
    SC.Event.remove(doc, 'click', this, this.focus);
    SC.Event.remove(this.$('iframe'), 'load', this, this.editorSetup);
    
    sc_super();
  },
  
  editorSetup: function() {     
    // store the document property in a local variable for easy access
    this._iframe = this._getFrame();
    this._document = this._getDocument();
    if (SC.none(this._document)) {
      console.error('Curse your sudden but inevitable betrayal! Can\'t find a reference to the document object!');
      return;
    }
    
    var doc = this._document;
    var styleSheetCSS = this.get('styleSheetCSS');
    if (!(SC.none(styleSheetCSS) || styleSheetCSS === '')) {
      var head = doc.getElementsByTagName('head')[0];
      if (head) {
        var el = doc.createElement("style");
        el['type'] = "text/css";
        el.innerHTML = styleSheetCSS;
        head.appendChild(el);
        el = head = null; //clean up memory
      }
    }
    
    // set contentEditable to true... this is the heart and soul of the editor
    var value = this.get('value');
    var docBody = doc.body;
    docBody.contentEditable = true;
    
    if (!this.get('isOpaque')) {
      docBody.style.background = 'transparent';       
      // the sc-web-view adds a gray background to the WebView... removing in the
      // case isOpaque is NO
      this.$().setClass('sc-web-view', NO);
    }

    var inlineStyle = this.get('inlineStyle');
    var docBodyStyle = this._document.body.style;
    for (var key in inlineStyle) {
      if (inlineStyle.hasOwnProperty(key)) {  
        docBodyStyle[key.toString().camelize()] = inlineStyle[key];
      }
    }
    
    // we have to do this differently in FF and IE... execCommand('inserthtml', false, val) fails
    // in IE and frameBody.innerHTML is resulting in a FF bug
    if (SC.browser.msie || SC.browser.safari) {
      docBody.innerHTML = value;
    } else {
      this.insertHTML(value, NO);
    }

    // set min height beyond which ContentEditableView can't shrink if hasFixedDimensions is set to false
    if (!this.get('hasFixedDimensions')) {
      var height = this.get('layout').height;
      if (height) {
        this._minHeight = height;
      }
      
      var width = this.get('layout').width;
      if (width) {
        this._minWidth = width;
      }
    }

    // attach the required events
    SC.Event.add(docBody, 'mouseup', this, this.mouseUp);
    SC.Event.add(docBody, 'keyup', this, this.keyUp);
    SC.Event.add(docBody, 'paste', this, this.paste);    
    
    // there are certian cases where the body of the iframe won't have focus
    // but the user will be able to type... this happens when the user clicks on
    // the white space where there's no content. This event handler 
    // ensures that the body will receive focus when the user clicks on that area.
    SC.Event.add(this._document, 'click', this, this.focus);

		SC.Event.add(this._document, 'mousedown', this, this.mouseDown);
    
    // call the SC.WebView iframeDidLoad function to finish setting up
    this.iframeDidLoad();
    this.focus();
  },

	mouseDown: function(evt) {
		var menuOptions = this.get('rightClickMenuOptions');
		var numOptions = menuOptions.get('length');
		
		if (menuOptions.length > 0) {
			var pane = this.contextMenuView.create({
	      contentView: SC.View.design({}),
	      layout: { width: 200, height: (20 * numOptions) },
	      itemTitleKey: 'title',
	      itemTargetKey: 'target',
	      itemActionKey: 'action',
	      itemSeparatorKey: 'isSeparator',
	      itemIsEnabledKey: 'isEnabled',
	      items: menuOptions
	    });

	    pane.popup(this, evt);
		}
	},
	
	contextMenuView: SCUI.ContextMenuPane.extend({
		popup: function(anchorView, evt) {
	    if (!anchorView || !anchorView.isView) return NO;

	    if (evt && evt.button && (evt.which === 3 || (evt.ctrlKey && evt.which === 1))) {

	      // FIXME [JH2] This is sooo nasty. We should register this event with SC's rootResponder?
	      // After talking with charles we need to handle oncontextmenu events when we want to block
	      // the browsers context meuns. (SC does not handle oncontextmenu event.)
	      document.oncontextmenu = function() { return false; };
        
        // The way the MenuPane was being positioned didn't work when working in the context
        // of an iframe. Instead of calculating,
        //
        //          offsetX = evt.pageX - globalFrame.x;
        //          offsetY = evt.pageY - globalFrame.y;
        //
        // I'm using evt.pageX and evt.pageY only.
        //
        
	      var anchor = anchorView.isView ? anchorView.get('layer') : anchorView;

	      // Popup the menu pane
	      this.beginPropertyChanges();
	      var it = this.get('displayItems');
	      this.set('anchorElement', anchor) ;
	      this.set('anchor', anchorView);
	      this.set('preferType', SC.PICKER_MENU) ;
	      this.set('preferMatrix', [evt.pageX + 5, evt.pageY + 5, 1]) ;
	      this.endPropertyChanges();
	      this.append();
	      this.positionPane();
	      this.becomeKeyPane();

	      return YES;
	    }
	    else {
	      //document.oncontextmenu = null; // restore default browser context menu handling
	    }
	    return NO;
	  }
	}),

  keyUp: function(event) {
    SC.RunLoop.begin();
    var keyCode = event.keyCode;
    if (keyCode === 37 || keyCode === 38 || keyCode === 39 || keyCode === 40) {
      this.querySelection();
    }
    
    if (!this.get('hasFixedDimensions')) {
      this.invokeLast(this._updateLayout);
    }
    
    this.set('isEditing', YES);
    SC.RunLoop.end();
  },

  mouseUp: function() {
    this._mouseUp = true;
    SC.RunLoop.begin();
    this.querySelection();
    if (!this.get('hasFixedDimensions')) {
      this.invokeLast(this._updateLayout);
    }
    
    this.set('isEditing', YES);
    SC.RunLoop.end();
  },

  paste: function() {
    SC.RunLoop.begin();

    this.querySelection();
    if (!this.get('hasFixedDimensions')) {
      this.invokeLast(this._updateLayout);
    }
    this.set('isEditing', YES);
    
    SC.RunLoop.end();
    return YES;
  },
  
  /** @property String */
  frameName: function() {
    return this.get('layerId') + '_frame' ;
  }.property('layerId').cacheable(),
  
  editorHTML: function(key, value) {
    var doc = this._document;
    if (!doc) return NO;
    
    if (value !== undefined) {
      doc.body.innerHTML = value;
      return YES;
    } else {
      if (this.get('cleanInsertedText')) {
        return this.cleanWordHTML(doc.body.innerHTML);
      } else {
        return doc.body.innerHTML;
      }
    }
  }.property(),
  
  selectionIsBold: function(key, val) {
    var editor = this._document ;
    if (!editor) return NO;
    
    if (val !== undefined) {
      if (editor.execCommand('bold', false, val)) {
        this.set('isEditing', YES);
      }
    }
    
    return this._document.queryCommandState('bold');
  }.property('selection').cacheable(),
  
  selectionIsItalicized: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('italic', false, val)) {
        this.set('isEditing', YES);
      }
    }
    
    return doc.queryCommandState('italic');
  }.property('selection').cacheable(),
  
  selectionIsUnderlined: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('underline', false, val)) {
        this.set('isEditing', YES);
      }
    }
    
    return doc.queryCommandState('underline');
  }.property('selection').cacheable(),
  
  // FIXME: [MT] queryCommandState('justifyXXXX') always returns fasle in safari...
  // find a workaround
  selectionIsCenterJustified: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('justifycenter', false, val)) {
        this.querySelection();
        this.set('isEditing', YES);
      }
    }
    
    return doc.queryCommandState('justifycenter');
  }.property('selection').cacheable(),
  
  selectionIsRightJustified: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('justifyright', false, val)) {
        this.querySelection();
        this.set('isEditing', YES);
      }
    }
    
    return doc.queryCommandState('justifyright');
  }.property('selection').cacheable(),
  
  selectionIsLeftJustified: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('justifyleft', false, val)) {
        this.querySelection();
        this.set('isEditing', YES);
      }
    }
    
    return doc.queryCommandState('justifyleft');
  }.property('selection').cacheable(),
  
  selectionIsFullJustified: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('justifyfull', false, val)) {
        this.querySelection();
        this.set('isEditing', YES);
      }
    }
    
    return doc.queryCommandState('justifyfull');
  }.property('selection').cacheable(),
  
  selectionIsOrderedList: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('insertorderedlist', false, val)) {
        this.set('isEditing', YES);
      }
    }
    
    return doc.queryCommandState('insertorderedlist');
  }.property('selection').cacheable(),
  
  selectionIsUnorderedList: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('insertunorderedlist', false, val)) {
        this.set('isEditing', YES);
      }
    }
    
    return doc.queryCommandState('insertunorderedlist');
  }.property('selection').cacheable(),
  
  selectionIsIndented: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('indent', false, val)) {
        this.set('isEditing', YES);
      }
    }
    
    if (SC.browser.msie) {
      return doc.queryCommandState('indent');
    } else {
      var elem = this._getSelectedElemented();
      if (!SC.none(elem)) {
        if (elem.style['marginLeft'] !== '') {
          return YES;
        }
      }
      return NO;
    }
  }.property('selection').cacheable(),
  
  selectionIsOutdented: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('outdent', false, val)) {
        this.set('isEditing', YES);
      }
    }
    
    if (SC.browser.msie) {
      return doc.queryCommandState('outdent');
    } else {
      var elem = this._getSelectedElemented();
      if (!SC.none(elem)) {
        if (elem.style['marginLeft'] === '') {
          return YES;
        }
      }
      return NO;
    }
  }.property('selection').cacheable(),
  
  selectionIsSubscript: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('subscript', false, val)) {
        this.set('isEditing', YES);
      }
    }

    return doc.queryCommandState('subscript');
  }.property('selection').cacheable(),
  
  selectionIsSuperscript: function(key, val) {
    var doc = this._document ;
    if (!doc) return NO;
    
    if (val !== undefined) {
      if (doc.execCommand('superscript', false, val)) {
        this.set('isEditing', YES);
      }
    }

    return doc.queryCommandState('superscript');
  }.property('selection').cacheable(),
  
  selectionFontName: function(key, val) {
    var doc = this._document ;
    if (!doc) return '';
    
    if (val !== undefined) {
      if (doc.execCommand('fontname', false, val)) {
        this.set('isEditing', YES);
      }
    }
    
    var name = doc.queryCommandValue('fontname') || '';
    return name;
  }.property('selection').cacheable(),
  
  selectionFontSize: function(key, value) {
    var frame = this._iframe;
    var doc = this._document;
    if (!doc) return '';
    
    if (value !== undefined) {
      
      var identifier = this.get('layerId') + '-fs-identifier';
      
      // apply unique string to font size to act as identifier
      if (doc.execCommand('fontsize', false, identifier)) {
        
        // get all newly created font tags
        var fontTags = doc.getElementsByTagName('font');
        for (var i = 0, j = fontTags.length; i < j; i++) {
          var fontTag = fontTags[i];
          
          // verify using identifier
          if (fontTag.size === identifier) {
            fontTag.size = '';
            fontTag.style.fontSize = value + 'px';
            
            var iterator = document.createNodeIterator(fontTag, 
                                                       NodeFilter.SHOW_ELEMENT,
                                                       null,
                                                       false);

            // iterate over children and remove their font sizes... they're 
            // inheriting that value from the parent node
            var node = iterator.nextNode();
            while (node) {
              if (node) {
                if (node !== fontTag && node.nodeName.toLowerCase() === 'font') {
                  node.style.fontSize = '';
                }
                node = iterator.nextNode();
              }
            }
      		}
        }
        return value;
      }      
    }
    
    // a bit buggy...
    var selection = frame.contentWindow.getSelection();
    if (selection) {
      if (selection.anchorNode && selection.focusNode) {
        var aNode = selection.anchorNode;
        var fNode = selection.focusNode;
        
        if (aNode.nodeType === 3 && fNode.nodeType === 3) {
          var aParentFontSize = aNode.parentNode.style.fontSize;
          var fParentFontSize = fNode.parentNode.style.fontSize; 
          
          if (aParentFontSize === fParentFontSize) {
            if (aParentFontSize.length >= 3) {
              return aParentFontSize.substring(0, aParentFontSize.length - 2);
            }
          }
        }
      }
    }
    
    return '';
  }.property('selection').cacheable(),
  
  selectionFontColor: function(key, value) {
    var doc = this._document ;
    if (!doc) return '';
    
    // for now execute this in non IE browsers...
    if (!SC.browser.msie) {
      if (value !== undefined) {
        if (doc.execCommand('forecolor', false, value)) {
          this.set('isEditing', YES);
        }
      }
      
      var color = SC.parseColor(doc.queryCommandValue('forecolor')) || '';
      return color;
    } 
    
    return '';
  }.property('selection').cacheable(),
  
  selectionBackgroundColor: function(key, value) {
    var doc = this._document ;
    if (!doc) return '';

    // for now execute this in non IE browsers...
    if (!SC.browser.msie) {
      if (value !== undefined) {
        if (doc.execCommand('hilitecolor', false, value)) {
          this.set('isEditing', YES);
        }
      }

      var color = this._document.queryCommandValue('hilitecolor');
      if (color !== 'transparent') {
        if (SC.parseColor(color)) {
          return SC.parseColor(color);
        }
      }
    } 

    return '';
  }.property('selection').cacheable(),
  
  hyperlinkValue: function(key, value) {
    var hyperlink = this.get('selectedHyperlink');
    if (!hyperlink) return '';
        
    if (value !== undefined) {
      this.set('isEditing', YES);
      hyperlink.href = value;
      return value;
      
    } else {
      return hyperlink.href;
      
    }
  }.property('selectedHyperlink').cacheable(),
  
  hyperlinkHoverValue: function(key, value) {
    var hyperlink = this.get('selectedHyperlink');
    if (!hyperlink) return '';
        
    if (value !== undefined) {
      this.set('isEditing', YES);
      hyperlink.title = value;
      return value;
      
    } else {
      return hyperlink.title;
      
    }
  }.property('selectedHyperlink').cacheable(),
  
  /**
    imageAlignment doesn't need to be updated everytime the selection changes... only 
    when the current selection is an image
  */
  imageAlignment: function(key, value) {
    var image = this.get('selectedImage');
    if (!image) return '';
    
    if (value !== undefined) {
      this.set('isEditing', YES);
      image.align = value;
      return value;
      
    } else { 
      return image.align;
      
    }
  }.property('selectedImage').cacheable(),

  focus: function(){
    if (!SC.none(this._document)) {
      this._document.body.focus();
      this.set('selection', '');
      this.querySelection();
    }
  },
  
  querySelection: function() {
    var frame = this._iframe;
    if (!frame) return;
    
    var selection = '';
    if (SC.browser.msie) {
      selection = this._iframe.document.selection.createRange().text;
      if (SC.none(selection)) {
        selection = '';
      }
    } else {
      var frameWindow = frame.contentWindow;
      selection = frameWindow.getSelection();
    }
    
    this.propertyWillChange('selection');
    this.set('selection', selection.toString());
    this.propertyDidChange('selection');
  },
  
  createLink: function(value) {
    var doc = this._document;
    var frame = this._iframe;
    if (!(doc && frame)) return NO;
    if (SC.none(value) || value === '') return NO;
    
    /*
      HACK: [MT] - This is an interesting piece of DOM hack... The problem
      with execCommand('createlink') is it only tells you if hyperlink
      creation was successful... it doesn't return the hyperlink that was
      created. 
      
      To counter this problem, I'm creating a random string and
      assigning it as the href. If the frame.contentWindow.getSelection()
      method fails, I iterate over the children of the currently selected
      node and find the anchor tag with the crazy url and assign it as the
      currently selected hyperlink, after which I do a bit of cleanup
      and set value to the href property.
    */
    
    var radomUrl = '%@%@%@%@%@'.fmt('http://',
                                    this.get('frameName'),
                                    new Date().getTime(), 
                                    parseInt(Math.random()*100000, 0),
                                    '.com/');
    
    if (doc.execCommand('createlink', false, radomUrl)) {
      var node = frame.contentWindow.getSelection().focusNode;
      var hyperlink = node.parentNode;

      if (hyperlink.nodeName.toLowerCase() !== 'a') {
        var child;
        for (var x = 0, y = node.childNodes.length; x < y; x++) {
          child = node.childNodes[x];
          if (child.nodeName.toLowerCase() === 'a') {
            if (child.href === radomUrl) {
              hyperlink = child;
              break;
            }
          }
        }
      }
      
      hyperlink.href = value;
      
      this.set('selectedHyperlink', hyperlink);
      this.set('isEditing', YES);
      return YES;
    }
    
    return NO;
  },
  
  removeLink: function() {
    var doc = this._document;
    if (!doc) return NO;
    
    if (doc.execCommand('unlink', false, null)) {
      this.set('selectedHyperlink', null);
      this.set('isEditing', YES);
      return YES;
    }
    
    return NO;
  },
  
  // FIXME: [MT] Should do something similar to what's being done on
  // image creation (Assigning the newly created image to the selectedImage
  // property)
  insertImage: function(value) {
    var doc = this._document;
    if (!doc) return NO;
    if (SC.none(value) || value === '') return NO;
    
    if (doc.execCommand('insertimage', false, value)) {
      this.set('isEditing', YES);
      return YES;
    }

    return NO;
  },
  
  /**
    Inserts a snippet of HTML into the editor at the cursor location. If the
    editor is not in focus then it appens the HTML at the end of the document.
    
    @param {String} HTML to be inserted
    @param {Boolean} Optional boolean to determine if a single white space is to be 
    inserted after the HTML snippet. Defaults to YES. This is enabled to protect
    against certain FF bugs (e.g. If a user inserts HTML then presses space right
    away, the HTML will be removed.)
  */
  insertHTML: function(value, insertWhiteSpaceAfter) {
    var doc = this._document;
    if (!doc) return NO;
    if (SC.none(value) || value === '') return NO;
    
    if (SC.none(insertWhiteSpaceAfter) || insertWhiteSpaceAfter) {
      value += '\u00a0';
    }
        
    if (SC.browser.msie) {
      doc.selection.createRange().pasteHTML(value);       
      this.set('isEditing', YES);  
      return YES;
         
    } else {
      if (doc.execCommand('inserthtml', false, value)) {
        this.set('isEditing', YES);
        return YES;
      }
      return NO;
    }
  },
  
  /**
    Inserts a SC view into the editor by first converting the view into html
    then inserting it using insertHTML(). View objects, classes
    or path are all acceptable.

    For example,

    SC.View.design({
    })

    OR

    SC.View.create({
    })

    OR

    appName.pageName.viewName

    @param {View} SC view to be inserted
  */
  insertView: function(view) {
    if(SC.typeOf(view) === SC.T_STRING){
      // if nowShowing was set because the content was set directly, then 
      // do nothing.
      if (view === SC.CONTENT_SET_DIRECTLY) return ;

      // otherwise, if nowShowing is a non-empty string, try to find it...
      if (view && view.length>0) {
        if (view.indexOf('.')>0) {
          view = SC.objectForPropertyPath(view, null);
        } else {
          view = SC.objectForPropertyPath(view, this.get('page'));
        }
      }
    } else if (SC.typeOf(view) === SC.T_CLASS) {
      view = view.create();
    }

    var context = SC.RenderContext(view);
    context = context.begin('span');
    view.prepareContext(context, YES);
    context = context.end();
    context = context.join();

    var html;
    if (SC.browser.msie) {
      html = '<span contenteditable=false unselectable="on">' + context + '</span>';      
    } else {
      html = '<span contenteditable=false style="-moz-user-select: all">' + context + '</span>';
    }

    this.insertHTML(html);
  },
  
  /**  
    Filters out junk tags when copying/pasting from MS word. This function is called
    automatically everytime the users paste into the editor. 

    To prevent this, set cleanInsertedText to NO/false.

    @param {String} html html to be cleaned up and pasted into editor
    @returns {Boolean} if operation was successul or not 
  */
  cleanWordHTML: function(html) {
    // remove o tags
    html = html.replace(/\<o:p>\s*<\/o:p>/g, '');
    html = html.replace(/\<o:p>[\s\S]*?<\/o:p>/g, '&nbsp;');

    // remove w tags
    html = html.replace(/\s*<w:[^>]*>[\s\S]*?<\/w:[^>]*>/gi, '');
    html = html.replace(/\s*<w:[^>]*\/?>/gi, '');
    html = html.replace(/\s*<\/w:[^>]+>/gi, '');

    // remove m tags
    html = html.replace(/\s*<m:[^>]*>[\s\S]*?<\/m:[^>]*>/gi, '');
    html = html.replace(/\s*<m:[^>]*\/?>/gi, '');
    html = html.replace(/\s*<\/m:[^>]+>/gi, '');

    // remove mso- styles
    html = html.replace(/\s*mso-[^:]+:[^;"]+;?/gi, '');
    html = html.replace(/\s*mso-[^:]+:[^;]+"?/gi, '');

    // remove crappy MS styles
    html = html.replace(/\s*MARGIN: 0cm 0cm 0pt\s*;/gi, '');
    html = html.replace(/\s*MARGIN: 0cm 0cm 0pt\s*"/gi, "\"");
    html = html.replace(/\s*TEXT-INDENT: 0cm\s*;/gi, '');
    html = html.replace(/\s*TEXT-INDENT: 0cm\s*"/gi, "\"");
    html = html.replace(/\s*PAGE-BREAK-BEFORE: [^\s;]+;?"/gi, "\"");
    html = html.replace(/\s*FONT-VARIANT: [^\s;]+;?"/gi, "\"" );
    html = html.replace(/\s*tab-stops:[^;"]*;?/gi, '');
    html = html.replace(/\s*tab-stops:[^"]*/gi, '');

    // remove xml declarations
    html = html.replace(/\<\\?\?xml[^>]*>/gi, '');

    // remove lang and language tags
    html = html.replace(/\<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");
    html = html.replace(/\<(\w[^>]*) language=([^ |>]*)([^>]*)/gi, "<$1$3");

    // remove onmouseover and onmouseout events
    html = html.replace(/\<(\w[^>]*) onmouseover="([^\"]*)"([^>]*)/gi, "<$1$3");
    html = html.replace(/\<(\w[^>]*) onmouseout="([^\"]*)"([^>]*)/gi, "<$1$3");

    // remove meta and link tags
    html = html.replace(/\<(meta|link)[^>]+>\s*/gi, '');

    return html;
  },
  
  /**
    Persists HTML from editor back to value property and sets
    the isEditing flag to false
    
    @returns {Boolean} if the operation was successul or not
  */
  commitEditing: function() {
    var doc = this._document;
    if (!doc) return NO;
    
    var value = doc.body.innerHTML;
    if (this.get('cleanInsertedText')) {
      value = this.cleanWordHTML(value);
    }
    
    // Any line feed character (\n), and carriage return (\r) characters have to be encoded as &#10;
    // and &#13; so that the awesome editors rendering wouldn't break.
    if(this.get('stripCrap')){
      value = value.replace(/\r/g, '&#13;');
      value = value.replace(/\n/g, '&#10;');
    }
    
    if (this.get('decodeContent')) {
      value = value.replace(/\%3C/gi, '<');
      value = value.replace(/\%3E/gi, '>');
      value = value.replace(/\%20/gi, ' ');
      value = value.replace(/&amp;/gi, '&');
    }

    this.setIfChanged('value', value);
    this.set('isEditing', NO);
    return YES;
  },
  
  /**
    Selects the current content in editor
    
    @returns {Boolean} if the operation was successul or not
  */
  selectContent: function() {
    var doc = this._document;
    if (!doc) return NO;
    
    return doc.execCommand('selectall', false, null);
  },

  /**
    Adding an observer that checks if the current selection is an image
    or a hyperlink.
  */  
  selectionDidChange: function() {
    var node, 
        range, 
        currentImage = null, 
        currentHyperlink = null;
    
    if (SC.browser.msie) {
      var selection = this._iframe.document.selection;
      range = selection.createRange();
      
      if (range.length === 1) node = range.item();
      if (range.parentElement) node = range.parentElement(); 
      
    } else {            
      var targetIframeWindow = this._iframe.contentWindow;
      selection = targetIframeWindow.getSelection();    
      range = selection.getRangeAt(0);      
      node = range.startContainer.childNodes[range.startOffset] ;
      
      if (range.startContainer === range.endContainer) {      
        
        if (range.startContainer.parentNode.nodeName === 'A' && range.commonAncestorContiner !== node) {
          currentHyperlink = range.startContainer.parentNode;
        } else {
          currentHyperlink = null;
        }
                
      } else {
        currentHyperlink = null;
        
      }
    }
    
    if (node) {
      if (node.nodeName === 'IMG') {
        currentImage = node;
        
        if(node.parentNode.nodeName === 'A') currentHyperlink = node.parentNode;
        
      } else if (node.nodeName === 'A') {
        currentHyperlink = node;
        
      } else {
        currentImage = null;
        currentHyperlink = null;
        
      }
    }
    
    this.set('selectedImage', currentImage);
    this.set('selectedHyperlink', currentHyperlink);
    
  }.observes('selection'),

  isEditingDidChange: function() {
   if (this.get('autoCommit')) {
     this.commitEditing();
   }
  }.observes('isEditing'),
  
  /** @private */
  _updateAttachedViewLayout: function() {
    var width = this.get('offsetWidth');
    var height = this.get('offsetHeight');

    var view = this.get('attachedView');
    var layout = view.get('layout');
    layout = SC.merge(layout, { width: width, height: height });
    view.adjust(layout);
  },
  
  /** @private */
  _updateLayout: function() {
    var doc = this._document;
    if (!doc) return;
    
    var width, height;
    if (SC.browser.msie) {
      width = doc.body.scrollWidth;
      height = doc.body.scrollHeight;
    } else {
      width = doc.body.offsetWidth;
      height = doc.body.offsetHeight;
    }

    // make sure height/width doesn't shrink beyond the initial value when the
    // ContentEditableView is first created
    if (height < this._minHeight) height = this._minHeight;
    if (width < this._minWidth) width = this._minWidth;

    this.set('offsetWidth', width);
    this.set('offsetHeight', height);

    if (this.get('attachedView')) {
      this._updateAttachedViewLayout();
    }

    if (!this.get('hasFixedDimensions')) {
      var layout = this.get('layout');
      layout = SC.merge(layout, { width: width, height: height });

      this.propertyWillChange('layout');
      this.adjust(layout);
      this.propertyDidChange('layout');
    }
  },
  
  /** @private */
  _getFrame: function() {
    var frame;
    if (SC.browser.msie) {
      frame = document.frames(this.get('frameName'));
    } else {
      frame = this.$('iframe').firstObject();
    }
    
    if (!SC.none(frame)) return frame;
    return null;
  },
  
  /** @private */
  _getDocument: function() {
    var frame = this._getFrame();
    if (SC.none(frame)) return null;
    
    var editor;
    if (SC.browser.msie) {
      editor = frame.document;
    } else {
      editor = frame.contentDocument;
    }
    
    if (SC.none(editor)) return null;
    return editor;
  },
  
  /** @private */
  _getSelection: function() {
    var selection;
    if (SC.browser.msie) {
      selection = this._getDocument().selection;
    } else {
      selection = this._getFrame().contentWindow.getSelection();
    }
    return selection;
  },
  
  /** @private */
  _getSelectedElemented: function() {
    var selection = this._getSelection();
    var selectedElement;
    
    if (SC.browser.msie) {
      selectedElement = selection.createRange().parentElement();
    } else {
      var anchorNode = selection.anchorNode;
      var focusNode = selection.focusNode;
        
      if (anchorNode && focusNode) {
        if (anchorNode.nodeType === 3 && focusNode.nodeType === 3) {
          if (anchorNode.parentNode === focusNode.parentNode) {
            selectedElement = anchorNode.parentNode;
          }
        }
      }
    }
    
    return selectedElement;
  }
  
});