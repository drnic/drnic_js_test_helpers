// from http://blog.pothoven.net/2007/08/synthesizing-events-in-javascript.html
Event.simulate = function(element, eventName) {
  var event;
  targetElement = $(element);
  
  if (targetElement) {
   // check for IE
   if (window.ActiveXObject) {
       event = document.createEventObject();
       targetElement.fireEvent("on"+eventName,event);
   } else {
       switch (eventName) {
           case "abort":
           case "blur":
           case "change":
           case "error":
           case "focus":
           case "load":
           case "reset":
           case "resize":
           case "scroll":
           case "select":
           case "submit":
           case "unload":
               event = document.createEvent("HTMLEvents");
               event.initEvent(eventName, "true", "true");
               break;
           case "click":
           case "mousedown":
           case "mousemove":
           case "mouseout":
           case "mouseover":
           case "mouseup":
               event = document.createEvent("MouseEvents");
               event.initMouseEvent(eventName, true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
               break;
       }
       targetElement.dispatchEvent(event);
     }
  }
}