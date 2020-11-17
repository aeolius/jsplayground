document.removeEventListener('mouseover', mouseoverhighlight);
document.removeEventListener('mousemove', mousemovehandler);
document.removeEventListener('mouseout', mouseouthandler);
document.removeEventListener('click', onoffhandler);
var iframenodes = nodes = Array.prototype.slice.call(document.querySelectorAll('iframe'));
if(iframenodes.length > 0){
    iframenodes.forEach(function(item){
        item.contentDocument.removeEventListener('mouseover', mouseoverhighlight);
        item.contentDocument.removeEventListener('mousemove', mousemovehandler);
        item.contentDocument.removeEventListener('mouseout', mouseouthandler);
        item.contentDocument.removeEventListener('click', onoffhandler);
    });
}
var mousemovehandler = function mousemovehandler (event) {
	if (event.ctrlKey){
            const el = document.createElement("textarea");
	    el.value = pathOfElement(event.target);
	    el.id = "PathOfHighlightedElement";
	    el.setAttribute("readonly","");
	    el.style.position = "absolute";
	    el.style.left = "-9999px";
	    document.body.appendChild(el);
            waitForElement("textarea[id=\"PathOfHighlightedElement\"]").then(function(element){
		    element.select();
	    	    document.execCommand("copy");
         	    document.body.removeChild(element);
	    });
            var hObj = document.getElementsByClassName('highlight-wrap')[0];
            hObj.style.backgroundColor = '#ADD38C';
            hObj.style.border = '8px groove #F3BE88';
    }
}
var mouseoverhighlight = function mouseoverhighlight(event) {
    if (event.target.ownerDocument !== document){
        var parentRect = event.target.ownerDocument.defaultView.frameElement.getBoundingClientRect();
    }
    if (event.target.ownerDocument == document){
        var parentRect = document.body.getBoundingClientRect();
    }
    if(document.getElementsByClassName('highlight-wrap').length > 0) {
        var rect = event.target.getBoundingClientRect();
        var hObj = document.getElementsByClassName('highlight-wrap')[0];
        hObj.style.top=(rect.top-10-parentRect.top)+"px";
        hObj.style.width=rect.width+20+"px";
        hObj.style.height=rect.height+20+"px";
        hObj.style.left=(rect.left-10-parentRect.left)+"px";
    }else{
        var rect = event.target.getBoundingClientRect();
        var hObj = document.createElement("div");
        hObj.className = 'highlight-wrap';
        hObj.style.position='absolute';
        hObj.style.top=(rect.top-10-parentRect.top)+"px";
        hObj.style.width=rect.width+20+"px";
        hObj.style.height=rect.height+20+"px";
        hObj.style.left=(rect.left-10-parentRect.left)+"px";
        hObj.style.backgroundColor = '#F3BE88';
        hObj.style.border = '8px groove #ADD38C';
        hObj.style.opacity='0.4';
        hObj.style.cursor='default';
        hObj.style.pointerEvents='none';
        document.body.appendChild(hObj);
    }
}
var mouseouthandler = function mouseouthandler (event) {
    var hObj = document.getElementsByClassName('highlight-wrap')[0];
    hObj.style.backgroundColor = '#F3BE88';
    hObj.style.border = '8px groove #ADD38C';
}
var onoffhandler = function onoffhandler (event) {      
    if (event.ctrlKey){
        //Turn on spying with ctrl + click
        event.preventDefault();
        event.stopPropagation();
        document.removeEventListener('mouseover', mouseoverhighlight);
        document.removeEventListener('mousemove', mousemovehandler);
        document.removeEventListener('mouseout', mouseouthandler);
        var iframenodes = nodes = Array.prototype.slice.call(document.querySelectorAll('iframe'));
        if(iframenodes.length > 0){
            iframenodes.forEach(function(item){
                item.contentDocument.removeEventListener('mouseover', mouseoverhighlight);
                item.contentDocument.removeEventListener('mousemove', mousemovehandler);
                item.contentDocument.removeEventListener('mouseout', mouseouthandler);
            });
        }
        document.addEventListener('mousemove', mousemovehandler);
        document.addEventListener('mouseover', mouseoverhighlight);
        document.addEventListener('mouseout', mouseouthandler);
        if(iframenodes.length > 0){
            iframenodes.forEach(function(item){
            item.contentDocument.addEventListener('mousemove', mousemovehandler);
            item.contentDocument.addEventListener('mouseover', mouseoverhighlight);
            item.contentDocument.addEventListener('mouseout', mouseouthandler);
            });
        }
    }
    if (event.altKey){
        //Turn off spying with alt + click
        event.preventDefault();
        event.stopPropagation();
        document.removeEventListener('mouseover', mouseoverhighlight);
        document.removeEventListener('mousemove', mousemovehandler);
        document.removeEventListener('mouseout', mouseouthandler);
        var iframenodes = nodes = Array.prototype.slice.call(document.querySelectorAll('iframe'));
        if(iframenodes.length > 0){
            iframenodes.forEach(function(item){
                item.contentDocument.removeEventListener('mouseover', mouseoverhighlight);
                item.contentDocument.removeEventListener('mousemove', mousemovehandler);
                item.contentDocument.removeEventListener('mouseout', mouseouthandler);
            });
        }
        var hObj = document.getElementsByClassName('highlight-wrap')[0];
        hObj.parentNode.removeChild(hObj);
    }
}
window.addEventListener('click', onoffhandler);
if(iframenodes.length > 0){
    iframenodes.forEach(function(item){
        item.contentWindow.addEventListener('click', onoffhandler);
    });
}
function pathOfElement(element){
    var parent = element.parentElement;
    var elementString;
    var parentElementPath;
    var standardTags = ["A","ABBR","ACRONYM","ADDRESS","APPLET","AREA","ARTICLE","ASIDE","AUDIO","B","BASE","BASEFONT","BDI","BDO","BIG","BLOCKQUOTE","BODY","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIALOG","DIR","DIV","DL","DT","EM","EMBED","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","FRAME","FRAMESET","H1","H2","H3","H4","H5","H6","HEAD","HEADER","HR","HTML","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","LINK","MAP","MARK","META","METER","NAV","NOSCRIPT","OBJECT","OL","OPTGROUP","OPTION","OUTPUT","P","PARAM","PICTURE","PRE","PROGRESS","Q","RP","RT","RUBY","S","SAMP","SCRIPT","SECTION","SELECT","SMALL","SOURCE","SPAN","STRONG","STYLE","SUB","SUMMARY","SUB","SVG","TABLE","TBODY","TD","TEMPLATE","TEXTAREA","TFOOT","TH","THEAD","TIME","TITLE","TR","TRACK","U","UL","VAR","VIDEO","WBR"];

    // no parents mean we reached the top of the Document
    if(parent === null){
        if (element.ownerDocument !== document){
            parent = element.ownerDocument.defaultView.frameElement;
            elementString = "HTML";
            parentElementPath = "";           
            parentElementPath = pathOfElement(parent);
        }
        if (element.ownerDocument == document){
            elementString = "HTML";
            parentElementPath = "";
        }
    } else {
        // turn HTMLCollection object into an array
        //  using Array.prototype.slice.call
        var parentsChildren = Array.prototype.slice.call(parent.children);
        // remove children that don't match our tag, they don't matter here
        parentsChildren = parentsChildren.filter(function(child) { return child.nodeName.toLowerCase() == element.nodeName.toLowerCase();} );
        // if this tag name is unique, we don't need a position number
        if(parentsChildren.length == 1){
            elementString = element.nodeName;
            if(standardTags.indexOf(elementString)==(-1)){
                elementString = elementString.toLowerCase();
            }
        } else {
            var elementPosition = parentsChildren.indexOf(element) + 1;
			if(standardTags.indexOf(element.nodeName)==(-1)){
                elementString = element.nodeName.toLowerCase() + "(" + elementPosition + ")";
            } else {
                elementString = element.nodeName + "(" + elementPosition + ")";
			}
        }
        // recurse up the DOM, getting our ancestor Paths
        parentElementPath = pathOfElement(parent);
    }
    return parentElementPath + "/" + elementString;
}
function waitForElement(selector) {
  return new Promise(function(resolve, reject) {
    if(selector instanceof HTMLElement) {
      var element = selector;
    } else {
      var element = document.querySelector(selector);
    }
    
    if(element) {
      resolve(element);
      return;
    }

    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        var nodes = Array.from(mutation.addedNodes);
        for(var node of nodes) {
          if(node.matches && node.matches(selector)) {
            observer.disconnect();
            resolve(node);
            return;
          }
        };
      });
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
  });
}
