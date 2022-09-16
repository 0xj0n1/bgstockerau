Calendar=function(e,t,a,n){if(this.activeDiv=null,this.currentDateEl=null,this.getDateStatus=null,this.timeout=null,this.onSelected=a||null,this.onClose=n||null,this.dragging=!1,this.hidden=!1,this.minYear=1970,this.maxYear=2050,this.dateFormat=Calendar._TT.DEF_DATE_FORMAT,this.ttDateFormat=Calendar._TT.TT_DATE_FORMAT,this.isPopup=!0,this.weekNumbers=!0,this.firstDayOfWeek=e,this.showsOtherMonths=!1,this.dateStr=t,this.ar_days=null,this.showsTime=!1,this.time24=!0,this.yearStep=2,this.table=null,this.element=null,this.tbody=null,this.firstdayname=null,this.monthsCombo=null,this.yearsCombo=null,this.hilitedMonth=null,this.activeMonth=null,this.hilitedYear=null,this.activeYear=null,this.dateClicked=!1,void 0===Calendar._SDN){void 0===Calendar._SDN_len&&(Calendar._SDN_len=3);for(var l=new Array,r=8;r>0;)l[--r]=Calendar._DN[r].substr(0,Calendar._SDN_len);Calendar._SDN=l,void 0===Calendar._SMN_len&&(Calendar._SMN_len=3),l=new Array;for(r=12;r>0;)l[--r]=Calendar._MN[r].substr(0,Calendar._SMN_len);Calendar._SMN=l}},Calendar._C=null,Calendar.is_ie=/msie/i.test(navigator.userAgent)&&!/opera/i.test(navigator.userAgent),Calendar.is_ie5=Calendar.is_ie&&/msie 5\.0/i.test(navigator.userAgent),Calendar.is_opera=/opera/i.test(navigator.userAgent),Calendar.is_khtml=/Konqueror|Safari|KHTML/i.test(navigator.userAgent),Calendar.getAbsolutePos=function(e){var t=0,a=0,n=/^div$/i.test(e.tagName);n&&e.scrollLeft&&(t=e.scrollLeft),n&&e.scrollTop&&(a=e.scrollTop);var l={x:e.offsetLeft-t,y:e.offsetTop-a};if(e.offsetParent){var r=this.getAbsolutePos(e.offsetParent);l.x+=r.x,l.y+=r.y}return l},Calendar.isRelated=function(e,t){var a=t.relatedTarget;if(!a){var n=t.type;"mouseover"==n?a=t.fromElement:"mouseout"==n&&(a=t.toElement)}for(;a;){if(a==e)return!0;a=a.parentNode}return!1},Calendar.removeClass=function(e,t){if(e&&e.className){for(var a=e.className.split(" "),n=new Array,l=a.length;l>0;)a[--l]!=t&&(n[n.length]=a[l]);e.className=n.join(" ")}},Calendar.addClass=function(e,t){Calendar.removeClass(e,t),e.className+=" "+t},Calendar.getElement=function(e){return Calendar.is_ie?window.event.srcElement:e.currentTarget},Calendar.getTargetElement=function(e){return Calendar.is_ie?window.event.srcElement:e.target},Calendar.stopEvent=function(e){return e||(e=window.event),Calendar.is_ie?(e.cancelBubble=!0,e.returnValue=!1):(e.preventDefault(),e.stopPropagation()),!1},Calendar.addEvent=function(e,t,a){e.attachEvent?e.attachEvent("on"+t,a):e.addEventListener?e.addEventListener(t,a,!0):e["on"+t]=a},Calendar.removeEvent=function(e,t,a){e.detachEvent?e.detachEvent("on"+t,a):e.removeEventListener?e.removeEventListener(t,a,!0):e["on"+t]=null},Calendar.createElement=function(e,t){var a=null;return a=document.createElementNS?document.createElementNS("http://www.w3.org/1999/xhtml",e):document.createElement(e),void 0!==t&&t.appendChild(a),a},Calendar._add_evs=function(el){with(Calendar)addEvent(el,"mouseover",dayMouseOver),addEvent(el,"mousedown",dayMouseDown),addEvent(el,"mouseout",dayMouseOut),is_ie&&(addEvent(el,"dblclick",dayMouseDblClick),el.setAttribute("unselectable",!0))},Calendar.findMonth=function(e){return void 0!==e.month?e:void 0!==e.parentNode.month?e.parentNode:null},Calendar.findYear=function(e){return void 0!==e.year?e:void 0!==e.parentNode.year?e.parentNode:null},Calendar.showMonthsCombo=function(){if(!(e=Calendar._C))return!1;var e,t=(e=e).activeDiv,a=e.monthsCombo;e.hilitedMonth&&Calendar.removeClass(e.hilitedMonth,"hilite"),e.activeMonth&&Calendar.removeClass(e.activeMonth,"active");var n=e.monthsCombo.getElementsByTagName("div")[e.date.getMonth()];Calendar.addClass(n,"active"),e.activeMonth=n;var l=a.style;if(l.display="block",t.navtype<0)l.left=t.offsetLeft+"px";else{var r=a.offsetWidth;void 0===r&&(r=50),l.left=t.offsetLeft+t.offsetWidth-r+"px"}l.top=t.offsetTop+t.offsetHeight+"px"},Calendar.showYearsCombo=function(e){if(!(t=Calendar._C))return!1;var t,a=(t=t).activeDiv,n=t.yearsCombo;t.hilitedYear&&Calendar.removeClass(t.hilitedYear,"hilite"),t.activeYear&&Calendar.removeClass(t.activeYear,"active"),t.activeYear=null;for(var l=t.date.getFullYear()+(e?1:-1),r=n.firstChild,i=!1,s=12;s>0;--s)l>=t.minYear&&l<=t.maxYear?(r.firstChild.data=l,r.year=l,r.style.display="block",i=!0):r.style.display="none",r=r.nextSibling,l+=e?t.yearStep:-t.yearStep;if(i){var d=n.style;if(d.display="block",a.navtype<0)d.left=a.offsetLeft+"px";else{var o=n.offsetWidth;void 0===o&&(o=50),d.left=a.offsetLeft+a.offsetWidth-o+"px"}d.top=a.offsetTop+a.offsetHeight+"px"}},Calendar.tableMouseUp=function(ev){var cal=Calendar._C;if(!cal)return!1;cal.timeout&&clearTimeout(cal.timeout);var el=cal.activeDiv;if(!el)return!1;var target=Calendar.getTargetElement(ev);ev||(ev=window.event),Calendar.removeClass(el,"active"),target!=el&&target.parentNode!=el||Calendar.cellClick(el,ev);var mon=Calendar.findMonth(target),date=null;if(mon)date=new Date(cal.date),mon.month!=date.getMonth()&&(date.setMonth(mon.month),cal.setDate(date),cal.dateClicked=!1,cal.callHandler());else{var year=Calendar.findYear(target);year&&(date=new Date(cal.date),year.year!=date.getFullYear()&&(date.setFullYear(year.year),cal.setDate(date),cal.dateClicked=!1,cal.callHandler()))}with(Calendar)return removeEvent(document,"mouseup",tableMouseUp),removeEvent(document,"mouseover",tableMouseOver),removeEvent(document,"mousemove",tableMouseOver),cal._hideCombos(),_C=null,stopEvent(ev)},Calendar.tableMouseOver=function(e){var t=Calendar._C;if(t){var a=t.activeDiv,n=Calendar.getTargetElement(e);if(n==a||n.parentNode==a?(Calendar.addClass(a,"hilite active"),Calendar.addClass(a.parentNode,"rowhilite")):((void 0===a.navtype||50!=a.navtype&&(0==a.navtype||Math.abs(a.navtype)>2))&&Calendar.removeClass(a,"active"),Calendar.removeClass(a,"hilite"),Calendar.removeClass(a.parentNode,"rowhilite")),e||(e=window.event),50==a.navtype&&n!=a){var l,r=Calendar.getAbsolutePos(a),i=a.offsetWidth,s=e.clientX,d=!0;s>r.x+i?(l=s-r.x-i,d=!1):l=r.x-s,l<0&&(l=0);for(var o=a._range,h=a._current,c=Math.floor(l/10)%o.length,u=o.length;--u>=0&&o[u]!=h;);for(;c-- >0;)d?--u<0&&(u=o.length-1):++u>=o.length&&(u=0);var C=o[u];a.firstChild.data=C,t.onUpdateTime()}var m=Calendar.findMonth(n);if(m)m.month!=t.date.getMonth()?(t.hilitedMonth&&Calendar.removeClass(t.hilitedMonth,"hilite"),Calendar.addClass(m,"hilite"),t.hilitedMonth=m):t.hilitedMonth&&Calendar.removeClass(t.hilitedMonth,"hilite");else{t.hilitedMonth&&Calendar.removeClass(t.hilitedMonth,"hilite");var v=Calendar.findYear(n);v&&v.year!=t.date.getFullYear()?(t.hilitedYear&&Calendar.removeClass(t.hilitedYear,"hilite"),Calendar.addClass(v,"hilite"),t.hilitedYear=v):t.hilitedYear&&Calendar.removeClass(t.hilitedYear,"hilite")}return Calendar.stopEvent(e)}},Calendar.tableMouseDown=function(e){if(Calendar.getTargetElement(e)==Calendar.getElement(e))return Calendar.stopEvent(e)},Calendar.calDragIt=function(e){var t,a,n=Calendar._C;if(!n||!n.dragging)return!1;Calendar.is_ie?(a=window.event.clientY+document.body.scrollTop,t=window.event.clientX+document.body.scrollLeft):(t=e.pageX,a=e.pageY),n.hideShowCovered();var l=n.element.style;return l.left=t-n.xOffs+"px",l.top=a-n.yOffs+"px",Calendar.stopEvent(e)},Calendar.calDragEnd=function(ev){var cal=Calendar._C;if(!cal)return!1;with(cal.dragging=!1,Calendar)removeEvent(document,"mousemove",calDragIt),removeEvent(document,"mouseup",calDragEnd),tableMouseUp(ev);cal.hideShowCovered()},Calendar.dayMouseDown=function(ev){var el=Calendar.getElement(ev);if(el.disabled)return!1;var cal=el.calendar;if(cal.activeDiv=el,Calendar._C=cal,300!=el.navtype)with(Calendar)50==el.navtype?(el._current=el.firstChild.data,addEvent(document,"mousemove",tableMouseOver)):addEvent(document,Calendar.is_ie5?"mousemove":"mouseover",tableMouseOver),addClass(el,"hilite active"),addEvent(document,"mouseup",tableMouseUp);else cal.isPopup&&cal._dragStart(ev);return-1==el.navtype||1==el.navtype?(cal.timeout&&clearTimeout(cal.timeout),cal.timeout=setTimeout("Calendar.showMonthsCombo()",250)):-2==el.navtype||2==el.navtype?(cal.timeout&&clearTimeout(cal.timeout),cal.timeout=setTimeout(el.navtype>0?"Calendar.showYearsCombo(true)":"Calendar.showYearsCombo(false)",250)):cal.timeout=null,Calendar.stopEvent(ev)},Calendar.dayMouseDblClick=function(e){Calendar.cellClick(Calendar.getElement(e),e||window.event),Calendar.is_ie&&document.selection.empty()},Calendar.dayMouseOver=function(e){var t=Calendar.getElement(e);return!(Calendar.isRelated(t,e)||Calendar._C||t.disabled)&&(t.ttip&&("_"==t.ttip.substr(0,1)&&(t.ttip=t.caldate.print(t.calendar.ttDateFormat)+t.ttip.substr(1)),t.calendar.tooltips.firstChild.data=t.ttip),300!=t.navtype&&(Calendar.addClass(t,"hilite"),t.caldate&&Calendar.addClass(t.parentNode,"rowhilite")),Calendar.stopEvent(e))},Calendar.dayMouseOut=function(ev){with(Calendar){var el=getElement(ev);return!(isRelated(el,ev)||_C||el.disabled)&&(removeClass(el,"hilite"),el.caldate&&removeClass(el.parentNode,"rowhilite"),el.calendar.tooltips.firstChild.data=_TT.SEL_DATE,stopEvent(ev))}},Calendar.cellClick=function(e,t){var a=e.calendar,n=!1,l=!1,r=null;if(void 0===e.navtype)Calendar.removeClass(a.currentDateEl,"selected"),Calendar.addClass(e,"selected"),(n=a.currentDateEl==e)||(a.currentDateEl=e),a.date=new Date(e.caldate),r=a.date,l=!0,(a.dateClicked=!e.otherMonth)||a._init(a.firstDayOfWeek,r);else{if(200==e.navtype)return Calendar.removeClass(e,"hilite"),void a.callCloseHandler();r=0==e.navtype?new Date:new Date(a.date),a.dateClicked=!1;var i=r.getFullYear(),s=r.getMonth();function d(e){var t=r.getDate(),a=r.getMonthDays(e);t>a&&r.setDate(a),r.setMonth(e)}switch(e.navtype){case 400:Calendar.removeClass(e,"hilite");var o=Calendar._TT.ABOUT;return void 0!==o?o+=a.showsTime?Calendar._TT.ABOUT_TIME:"":o='Help and about box text is not translated into this language.\nIf you know this language and you feel generous please update\nthe corresponding file in "lang" subdir to match calendar-en.js\nand send it back to <mishoo@infoiasi.ro> to get it into the distribution  ;-)\n\nThank you!\nhttp://dynarch.com/mishoo/calendar.epl\n',void alert(o);case-2:i>a.minYear&&r.setFullYear(i-1);break;case-1:s>0?d(s-1):i-- >a.minYear&&(r.setFullYear(i),d(11));break;case 1:s<11?d(s+1):i<a.maxYear&&(r.setFullYear(i+1),d(0));break;case 2:i<a.maxYear&&r.setFullYear(i+1);break;case 100:return void a.setFirstDayOfWeek(e.fdow);case 50:for(var h=e._range,c=e.firstChild.data,u=h.length;--u>=0&&h[u]!=c;);t&&t.shiftKey?--u<0&&(u=h.length-1):++u>=h.length&&(u=0);var C=h[u];return e.firstChild.data=C,void a.onUpdateTime();case 0:if("function"==typeof a.getDateStatus&&a.getDateStatus(r,r.getFullYear(),r.getMonth(),r.getDate()))return!1}r.equalsTo(a.date)||(a.setDate(r),l=!0)}l&&a.callHandler(),n&&(Calendar.removeClass(e,"hilite"),a.callCloseHandler())},Calendar.prototype.create=function(e){var t=null;e?(t=e,this.isPopup=!1):(t=document.getElementsByTagName("body")[0],this.isPopup=!0),this.date=this.dateStr?new Date(this.dateStr):new Date;var a=Calendar.createElement("table");this.table=a,a.cellSpacing=0,a.cellPadding=0,a.calendar=this,Calendar.addEvent(a,"mousedown",Calendar.tableMouseDown);var n=Calendar.createElement("div");this.element=n,n.className="calendar",this.isPopup&&(n.style.position="absolute",n.style.display="none"),n.appendChild(a);var l=Calendar.createElement("thead",a),r=null,i=null,s=this,d=function(e,t,a){return(r=Calendar.createElement("td",i)).colSpan=t,r.className="button",0!=a&&Math.abs(a)<=2&&(r.className+=" nav"),Calendar._add_evs(r),r.calendar=s,r.navtype=a,"&"!=e.substr(0,1)?r.appendChild(document.createTextNode(e)):r.innerHTML=e,r};i=Calendar.createElement("tr",l);var o=6;this.isPopup&&--o,this.weekNumbers&&++o,d("?",1,400).ttip=Calendar._TT.INFO,this.title=d("",o,300),this.title.className="title",this.isPopup&&(this.title.ttip=Calendar._TT.DRAG_TO_MOVE,this.title.style.cursor="move",d("&#x00d7;",1,200).ttip=Calendar._TT.CLOSE),(i=Calendar.createElement("tr",l)).className="headrow",this._nav_py=d("&#x00ab;",1,-2),this._nav_py.ttip=Calendar._TT.PREV_YEAR,this._nav_pm=d("&#x2039;",1,-1),this._nav_pm.ttip=Calendar._TT.PREV_MONTH,this._nav_now=d(Calendar._TT.TODAY,this.weekNumbers?4:3,0),this._nav_now.ttip=Calendar._TT.GO_TODAY,this._nav_nm=d("&#x203a;",1,1),this._nav_nm.ttip=Calendar._TT.NEXT_MONTH,this._nav_ny=d("&#x00bb;",1,2),this._nav_ny.ttip=Calendar._TT.NEXT_YEAR,(i=Calendar.createElement("tr",l)).className="daynames",this.weekNumbers&&((r=Calendar.createElement("td",i)).className="name wn",r.appendChild(document.createTextNode(Calendar._TT.WK)));for(var h=7;h>0;--h)(r=Calendar.createElement("td",i)).appendChild(document.createTextNode("")),h||(r.navtype=100,r.calendar=this,Calendar._add_evs(r));this.firstdayname=this.weekNumbers?i.firstChild.nextSibling:i.firstChild,this._displayWeekdays();var c=Calendar.createElement("tbody",a);for(this.tbody=c,h=6;h>0;--h){i=Calendar.createElement("tr",c),this.weekNumbers&&(r=Calendar.createElement("td",i)).appendChild(document.createTextNode(""));for(var u=7;u>0;--u)(r=Calendar.createElement("td",i)).appendChild(document.createTextNode("")),r.calendar=this,Calendar._add_evs(r)}this.showsTime?((i=Calendar.createElement("tr",c)).className="time",(r=Calendar.createElement("td",i)).className="time",r.colSpan=2,r.innerHTML=Calendar._TT.TIME||"&nbsp;",(r=Calendar.createElement("td",i)).className="time",r.colSpan=this.weekNumbers?4:3,function(){function e(e,t,a,n){var l=Calendar.createElement("span",r);if(l.className=e,l.appendChild(document.createTextNode(t)),l.calendar=s,l.ttip=Calendar._TT.TIME_PART,l.navtype=50,l._range=[],"number"!=typeof a)l._range=a;else for(var i=a;i<=n;++i){var d;d=i<10&&n>=10?"0"+i:""+i,l._range[l._range.length]=d}return Calendar._add_evs(l),l}var t=s.date.getHours(),a=s.date.getMinutes(),n=!s.time24,l=t>12;n&&l&&(t-=12);var d=e("hour",t,n?1:0,n?12:23),o=Calendar.createElement("span",r);o.appendChild(document.createTextNode(":")),o.className="colon";var h=e("minute",a,0,59),c=null;(r=Calendar.createElement("td",i)).className="time",r.colSpan=2,n?c=e("ampm",l?"pm":"am",["am","pm"]):r.innerHTML="&nbsp;",s.onSetTime=function(){var e=this.date.getHours(),t=this.date.getMinutes(),a=e>12;a&&n&&(e-=12),d.firstChild.data=e<10?"0"+e:e,h.firstChild.data=t<10?"0"+t:t,n&&(c.firstChild.data=a?"pm":"am")},s.onUpdateTime=function(){var e=this.date,t=parseInt(d.firstChild.data,10);n&&(/pm/i.test(c.firstChild.data)&&t<12?t+=12:/am/i.test(c.firstChild.data)&&12==t&&(t=0));var a=e.getDate(),l=e.getMonth(),r=e.getFullYear();e.setHours(t),e.setMinutes(parseInt(h.firstChild.data,10)),e.setFullYear(r),e.setMonth(l),e.setDate(a),this.dateClicked=!1,this.callHandler()}}()):this.onSetTime=this.onUpdateTime=function(){};var C=Calendar.createElement("tfoot",a);for((i=Calendar.createElement("tr",C)).className="footrow",(r=d(Calendar._TT.SEL_DATE,this.weekNumbers?8:7,300)).className="ttip",this.isPopup&&(r.ttip=Calendar._TT.DRAG_TO_MOVE,r.style.cursor="move"),this.tooltips=r,n=Calendar.createElement("div",this.element),this.monthsCombo=n,n.className="combo",h=0;h<Calendar._MN.length;++h){var m=Calendar.createElement("div");m.className=Calendar.is_ie?"label-IEfix":"label",m.month=h,m.appendChild(document.createTextNode(Calendar._SMN[h])),n.appendChild(m)}for(n=Calendar.createElement("div",this.element),this.yearsCombo=n,n.className="combo",h=12;h>0;--h){var v=Calendar.createElement("div");v.className=Calendar.is_ie?"label-IEfix":"label",v.appendChild(document.createTextNode("")),n.appendChild(v)}this._init(this.firstDayOfWeek,this.date),t.appendChild(this.element)},Calendar._keyEvent=function(e){if(!window.calendar)return!1;Calendar.is_ie&&(e=window.event);var t=window.calendar,a=Calendar.is_ie||"keypress"==e.type;if(e.ctrlKey)switch(e.keyCode){case 37:a&&Calendar.cellClick(t._nav_pm);break;case 38:a&&Calendar.cellClick(t._nav_py);break;case 39:a&&Calendar.cellClick(t._nav_nm);break;case 40:a&&Calendar.cellClick(t._nav_ny);break;default:return!1}else switch(e.keyCode){case 32:Calendar.cellClick(t._nav_now);break;case 27:a&&t.callCloseHandler();break;case 37:case 38:case 39:case 40:if(a){var n=t.date.getDate()-1,l=t.currentDateEl,r=null,i=37==e.keyCode||38==e.keyCode;switch(e.keyCode){case 37:--n>=0&&(r=t.ar_days[n]);break;case 38:(n-=7)>=0&&(r=t.ar_days[n]);break;case 39:++n<t.ar_days.length&&(r=t.ar_days[n]);break;case 40:(n+=7)<t.ar_days.length&&(r=t.ar_days[n])}r||(i?Calendar.cellClick(t._nav_pm):Calendar.cellClick(t._nav_nm),n=i?t.date.getMonthDays():1,l=t.currentDateEl,r=t.ar_days[n-1]),Calendar.removeClass(l,"selected"),Calendar.addClass(r,"selected"),t.date=new Date(r.caldate),t.callHandler(),t.currentDateEl=r}break;case 13:a&&(t.callHandler(),t.hide());break;default:return!1}return Calendar.stopEvent(e)},Calendar.prototype._init=function(e,t){var a=new Date;this.table.style.visibility="hidden";var n=t.getFullYear();n<this.minYear?(n=this.minYear,t.setFullYear(n)):n>this.maxYear&&(n=this.maxYear,t.setFullYear(n)),this.firstDayOfWeek=e,this.date=new Date(t);var l=t.getMonth(),r=t.getDate();t.getMonthDays();t.setDate(1);var i=(t.getDay()-this.firstDayOfWeek)%7;i<0&&(i+=7),t.setDate(-i),t.setDate(t.getDate()+1);for(var s=this.tbody.firstChild,d=(Calendar._SMN[l],new Array),o=Calendar._TT.WEEKEND,h=0;h<6;++h,s=s.nextSibling){var c=s.firstChild;this.weekNumbers&&(c.className="day wn",c.firstChild.data=t.getWeekNumber(),c=c.nextSibling),s.className="daysrow";for(var u=!1,C=0;C<7;++C,c=c.nextSibling,t.setDate(t.getDate()+1)){var m=t.getDate(),v=t.getDay();c.className="day";var p=t.getMonth()==l;if(p)c.otherMonth=!1,u=!0;else{if(!this.showsOtherMonths){c.className="emptycell",c.innerHTML="&nbsp;",c.disabled=!0;continue}c.className+=" othermonth",c.otherMonth=!0}if(c.disabled=!1,c.firstChild.data=m,"function"==typeof this.getDateStatus){var f=this.getDateStatus(t,n,l,m);!0===f?(c.className+=" disabled",c.disabled=!0):(/disabled/i.test(f)&&(c.disabled=!0),c.className+=" "+f)}c.disabled||(d[d.length]=c,c.caldate=new Date(t),c.ttip="_",p&&m==r&&(c.className+=" selected",this.currentDateEl=c),t.getFullYear()==a.getFullYear()&&t.getMonth()==a.getMonth()&&m==a.getDate()&&(c.className+=" today",c.ttip+=Calendar._TT.PART_TODAY),-1!=o.indexOf(v.toString())&&(c.className+=c.otherMonth?" oweekend":" weekend"))}u||this.showsOtherMonths||(s.className="emptyrow")}this.ar_days=d,this.title.firstChild.data=Calendar._MN[l]+", "+n,this.onSetTime(),this.table.style.visibility="visible"},Calendar.prototype.setDate=function(e){e.equalsTo(this.date)||this._init(this.firstDayOfWeek,e)},Calendar.prototype.refresh=function(){this._init(this.firstDayOfWeek,this.date)},Calendar.prototype.setFirstDayOfWeek=function(e){this._init(e,this.date),this._displayWeekdays()},Calendar.prototype.setDateStatusHandler=Calendar.prototype.setDisabledHandler=function(e){this.getDateStatus=e},Calendar.prototype.setRange=function(e,t){this.minYear=e,this.maxYear=t},Calendar.prototype.callHandler=function(){this.onSelected&&this.onSelected(this,this.date.print(this.dateFormat))},Calendar.prototype.callCloseHandler=function(){this.onClose&&this.onClose(this),this.hideShowCovered()},Calendar.prototype.destroy=function(){this.element.parentNode.removeChild(this.element),Calendar._C=null,window.calendar=null},Calendar.prototype.reparent=function(e){var t=this.element;t.parentNode.removeChild(t),e.appendChild(t)},Calendar._checkCalendar=function(e){if(!window.calendar)return!1;for(var t=Calendar.is_ie?Calendar.getElement(e):Calendar.getTargetElement(e);null!=t&&t!=calendar.element;t=t.parentNode);return null==t?(window.calendar.callCloseHandler(),Calendar.stopEvent(e)):void 0},Calendar.prototype.show=function(){for(var e=this.table.getElementsByTagName("tr"),t=e.length;t>0;){var a=e[--t];Calendar.removeClass(a,"rowhilite");for(var n=a.getElementsByTagName("td"),l=n.length;l>0;){var r=n[--l];Calendar.removeClass(r,"hilite"),Calendar.removeClass(r,"active")}}this.element.style.display="block",this.hidden=!1,this.isPopup&&(window.calendar=this,Calendar.addEvent(document,"keydown",Calendar._keyEvent),Calendar.addEvent(document,"keypress",Calendar._keyEvent),Calendar.addEvent(document,"mousedown",Calendar._checkCalendar)),this.hideShowCovered()},Calendar.prototype.hide=function(){this.isPopup&&(Calendar.removeEvent(document,"keydown",Calendar._keyEvent),Calendar.removeEvent(document,"keypress",Calendar._keyEvent),Calendar.removeEvent(document,"mousedown",Calendar._checkCalendar)),this.element.style.display="none",this.hidden=!0,this.hideShowCovered()},Calendar.prototype.showAt=function(e,t){var a=this.element.style;a.left=e+"px",a.top=t+"px",this.show()},Calendar.prototype.showAtElement=function(e,t){var a=this,n=Calendar.getAbsolutePos(e);if(!t||"string"!=typeof t)return this.showAt(n.x,n.y+e.offsetHeight),!0;this.element.style.display="block",Calendar.continuation_for_the_fucking_khtml_browser=function(){var l=a.element.offsetWidth,r=a.element.offsetHeight;a.element.style.display="none";var i=t.substr(0,1),s="l";switch(t.length>1&&(s=t.substr(1,1)),i){case"T":n.y-=r;break;case"B":n.y+=e.offsetHeight;break;case"C":n.y+=(e.offsetHeight-r)/2;break;case"t":n.y+=e.offsetHeight-r}switch(s){case"L":n.x-=l;break;case"R":n.x+=e.offsetWidth;break;case"C":n.x+=(e.offsetWidth-l)/2;break;case"r":n.x+=e.offsetWidth-l}n.width=l,n.height=r+40,a.monthsCombo.style.display="none",function(e){e.x<0&&(e.x=0),e.y<0&&(e.y=0);var t=document.createElement("div"),a=t.style;a.position="absolute",a.right=a.bottom=a.width=a.height="0px",document.body.appendChild(t);var n=Calendar.getAbsolutePos(t);document.body.removeChild(t),Calendar.is_ie?(n.y+=document.body.scrollTop,n.x+=document.body.scrollLeft):(n.y+=window.scrollY,n.x+=window.scrollX);var l=e.x+e.width-n.x;l>0&&(e.x-=l),(l=e.y+e.height-n.y)>0&&(e.y-=l)}(n),a.showAt(n.x,n.y)},Calendar.is_khtml?setTimeout("Calendar.continuation_for_the_fucking_khtml_browser()",10):Calendar.continuation_for_the_fucking_khtml_browser()},Calendar.prototype.setDateFormat=function(e){this.dateFormat=e},Calendar.prototype.setTtDateFormat=function(e){this.ttDateFormat=e},Calendar.prototype.parseDate=function(e,t){var a=0,n=-1,l=0,r=e.split(/\W+/);t||(t=this.dateFormat);var i=t.match(/%./g),s=0,d=0,o=0,h=0;for(s=0;s<r.length;++s)if(r[s])switch(i[s]){case"%d":case"%e":l=parseInt(r[s],10);break;case"%m":n=parseInt(r[s],10)-1;break;case"%Y":case"%y":(a=parseInt(r[s],10))<100&&(a+=a>29?1900:2e3);break;case"%b":case"%B":for(d=0;d<12;++d)if(Calendar._MN[d].substr(0,r[s].length).toLowerCase()==r[s].toLowerCase()){n=d;break}break;case"%H":case"%I":case"%k":case"%l":o=parseInt(r[s],10);break;case"%P":case"%p":/pm/i.test(r[s])&&o<12&&(o+=12);break;case"%M":h=parseInt(r[s],10)}if(0==a||-1==n||0==l){for(a=0,n=-1,l=0,s=0;s<r.length;++s)if(-1!=r[s].search(/[a-zA-Z]+/)){var c=-1;for(d=0;d<12;++d)if(Calendar._MN[d].substr(0,r[s].length).toLowerCase()==r[s].toLowerCase()){c=d;break}-1!=c&&(-1!=n&&(l=n+1),n=c)}else parseInt(r[s],10)<=12&&-1==n?n=r[s]-1:parseInt(r[s],10)>31&&0==a?(a=parseInt(r[s],10))<100&&(a+=a>29?1900:2e3):0==l&&(l=r[s]);if(0==a)a=(new Date).getFullYear();-1!=n&&0!=l&&this.setDate(new Date(a,n,l,o,h,0))}else this.setDate(new Date(a,n,l,o,h,0))},Calendar.prototype.hideShowCovered=function(){var e=this;Calendar.continuation_for_the_fucking_khtml_browser=function(){function t(e){var t=e.style.visibility;return t||(t=document.defaultView&&"function"==typeof document.defaultView.getComputedStyle?Calendar.is_khtml?"":document.defaultView.getComputedStyle(e,"").getPropertyValue("visibility"):e.currentStyle?e.currentStyle.visibility:""),t}for(var a=new Array("applet","iframe","select"),n=e.element,l=Calendar.getAbsolutePos(n),r=l.x,i=n.offsetWidth+r,s=l.y,d=n.offsetHeight+s,o=a.length;o>0;)for(var h=document.getElementsByTagName(a[--o]),c=null,u=h.length;u>0;){c=h[--u];var C=(l=Calendar.getAbsolutePos(c)).x,m=c.offsetWidth+C,v=l.y,p=c.offsetHeight+v;e.hidden||C>i||m<r||v>d||p<s?(c.__msh_save_visibility||(c.__msh_save_visibility=t(c)),c.style.visibility=c.__msh_save_visibility):(c.__msh_save_visibility||(c.__msh_save_visibility=t(c)),c.style.visibility="hidden")}},Calendar.is_khtml?setTimeout("Calendar.continuation_for_the_fucking_khtml_browser()",10):Calendar.continuation_for_the_fucking_khtml_browser()},Calendar.prototype._displayWeekdays=function(){for(var e=this.firstDayOfWeek,t=this.firstdayname,a=Calendar._TT.WEEKEND,n=0;n<7;++n){t.className="day name";var l=(n+e)%7;n&&(t.ttip=Calendar._TT.DAY_FIRST.replace("%s",Calendar._DN[l]),t.navtype=100,t.calendar=this,t.fdow=l,Calendar._add_evs(t)),-1!=a.indexOf(l.toString())&&Calendar.addClass(t,"weekend"),t.firstChild.data=Calendar._SDN[(n+e)%7],t=t.nextSibling}},Calendar.prototype._hideCombos=function(){this.monthsCombo.style.display="none",this.yearsCombo.style.display="none"},Calendar.prototype._dragStart=function(ev){if(!this.dragging){var posX,posY;this.dragging=!0,Calendar.is_ie?(posY=window.event.clientY+document.body.scrollTop,posX=window.event.clientX+document.body.scrollLeft):(posY=ev.clientY+window.scrollY,posX=ev.clientX+window.scrollX);var st=this.element.style;with(this.xOffs=posX-parseInt(st.left),this.yOffs=posY-parseInt(st.top),Calendar)addEvent(document,"mousemove",calDragIt),addEvent(document,"mouseup",calDragEnd)}},Date._MD=new Array(31,28,31,30,31,30,31,31,30,31,30,31),Date.SECOND=1e3,Date.MINUTE=60*Date.SECOND,Date.HOUR=60*Date.MINUTE,Date.DAY=24*Date.HOUR,Date.WEEK=7*Date.DAY,Date.prototype.getMonthDays=function(e){var t=this.getFullYear();return void 0===e&&(e=this.getMonth()),0!=t%4||0==t%100&&0!=t%400||1!=e?Date._MD[e]:29},Date.prototype.getDayOfYear=function(){var e=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0)-new Date(this.getFullYear(),0,0,0,0,0);return Math.floor(e/Date.DAY)},Date.prototype.getWeekNumber=function(){var e=new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0),t=e.getDay();e.setDate(e.getDate()-(t+6)%7+3);var a=e.valueOf();return e.setMonth(0),e.setDate(4),Math.round((a-e.valueOf())/6048e5)+1},Date.prototype.equalsTo=function(e){return this.getFullYear()==e.getFullYear()&&this.getMonth()==e.getMonth()&&this.getDate()==e.getDate()&&this.getHours()==e.getHours()&&this.getMinutes()==e.getMinutes()},Date.prototype.print=function(e){var t=this.getMonth(),a=this.getDate(),n=this.getFullYear(),l=this.getWeekNumber(),r=this.getDay(),i={},s=this.getHours(),d=s>=12,o=d?s-12:s,h=this.getDayOfYear();0==o&&(o=12);var c=this.getMinutes(),u=this.getSeconds();i["%a"]=Calendar._SDN[r],i["%A"]=Calendar._DN[r],i["%b"]=Calendar._SMN[t],i["%B"]=Calendar._MN[t],i["%C"]=1+Math.floor(n/100),i["%d"]=a<10?"0"+a:a,i["%e"]=a,i["%H"]=s<10?"0"+s:s,i["%I"]=o<10?"0"+o:o,i["%j"]=h<100?h<10?"00"+h:"0"+h:h,i["%k"]=s,i["%l"]=o,i["%m"]=t<9?"0"+(1+t):1+t,i["%M"]=c<10?"0"+c:c,i["%n"]="\n",i["%p"]=d?"PM":"AM",i["%P"]=d?"pm":"am",i["%s"]=Math.floor(this.getTime()/1e3),i["%S"]=u<10?"0"+u:u,i["%t"]="\t",i["%U"]=i["%W"]=i["%V"]=l<10?"0"+l:l,i["%u"]=r+1,i["%w"]=r,i["%y"]=(""+n).substr(2,2),i["%Y"]=n,i["%%"]="%";var C=/%./g;if(!Calendar.is_ie5)return e.replace(C,(function(e){return i[e]||e}));for(var m=e.match(C),v=0;v<m.length;v++){var p=i[m[v]];p&&(C=new RegExp(m[v],"g"),e=e.replace(C,p))}return e},Date.prototype.__msh_oldSetFullYear=Date.prototype.setFullYear,Date.prototype.setFullYear=function(e){var t=new Date(this);t.__msh_oldSetFullYear(e),t.getMonth()!=this.getMonth()&&this.setDate(28),this.__msh_oldSetFullYear(e)},window.calendar=null;