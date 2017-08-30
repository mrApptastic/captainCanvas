var captainCanvas = function(canvas, tools, settings) {
	var cpt = this;
	cpt.id = document.getElementById(canvas);
	cpt.tl = document.getElementById(tools);
	cpt.ct = cpt.id.getContext("2d");
	cpt.dt = [];
	cpt.set = {
				"fit" : true,
				"tog" : true
			  };
	cpt.drg = false;
	cpt.drw = function(event) {
		if (cpt.drg == true) {
			var x = event.pageX - cpt.id.offsetLeft;
			var y = event.pageY - cpt.id.offsetTop;
			var w = 10;
			var h = 10;
			cpt.dt.push({"Fct" : "fillRect", "X" : x, "Y" : y, "W" : w, "H" : h});
			cpt.dat();
		}
	};
	cpt.dat = function () {
		for (let i = 0; i < cpt.dt.length; i++) {
			cpt.ct.fillRect(cpt.dt[i].X, cpt.dt[i].Y, cpt.dt[i].W, cpt.dt[i].H);
		}
	};
	cpt.tls = function () {
				
	};
	cpt.ref = function () {
		cpt.id.setAttribute("width",window.innerWidth);
		cpt.id.setAttribute("height",window.innerHeight);
		cpt.dat();		
	};
	cpt.rjsn = function(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();            
            reader.onload = function (e) {
				try {
					cpt.dt = JSON.parse(e.target.result);
					cpt.ref();
				}
				catch (e) {
					alert(e);
				}
            }            
            reader.readAsText(input.files[0]);
        }
	};
	cpt.wjsn = function(fil) {
		var json = JSON.stringify(cpt.dt);
		cpt.down((fil ? fil : "captainCanvas")  + ".json", "data:application/json;charset=utf-8," + encodeURIComponent(json));
	};
	cpt.rsvg = function() {

	};
	cpt.wsvg = function(fil) {
		var firstLine = '<?xml version="1.0" encoding="UTF-8"><svg width="' + cpt.id.getAttribute("width") + '" height="' + cpt.id.getAttribute("height") + '">';
		var dataLines = '';
		for (let i = 0; i < cpt.dt.length; i++) {
			dataLines += '<rect x="' + cpt.dt[i].X  + '" y="' + cpt.dt[i].Y + '" width="' + cpt.dt[i].W + '" height="' + cpt.dt[i].H + '" style="fill:rgb(0,0,0);" />';
		}
		var lastLine = '</svg>';
		var svg = firstLine + dataLines + lastLine;
		cpt.down((fil ? fil : "captainCanvas") + ".svg", "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
	};
	cpt.down = function (filename, txt) {
		var l = document.createElement('a');
		l.setAttribute('href', txt);
		l.setAttribute('download', filename);
		if (document.createEvent) {
			let event = document.createEvent('MouseEvents');
			event.initEvent('click', true, true);
			l.dispatchEvent(event);
		}
		else {
			l.click();
		}
	};
	cpt.init = function () {
		/* Tool Box Contents */
			/* Heading */
				cpt.tl.appendChild(document.createElement("h1"));
			/* Selected Function */
				cpt.tl.getElementsByTagName("h1")[0].innerHTML = "V&aelig;rkt&oslash;jer:";
				cpt.tl.appendChild(document.createElement("select"));
				cpt.tl.getElementsByTagName("select")[0].className = cpt.tl.id + "_selectedFunction";
				cpt.tl.appendChild(document.createElement("br"));
				cpt.tl.appendChild(document.createElement("br"));
			/* Import JSON */
				var importJSONLabel = document.createElement("label");
				importJSONLabel.innerHTML = "Hent JSON&nbsp;";
				cpt.tl.appendChild(importJSONLabel);
				var importJSON = document.createElement("input");
				importJSON.value = "Hent JSON";
				importJSON.setAttribute("type", "file");
				importJSON.className = cpt.tl.id + "_importJSON";
				cpt.tl.appendChild(importJSON);
				document.getElementsByClassName(cpt.tl.id + "_importJSON")[0].addEventListener("change", function(event) {
					cpt.rjsn(this);
				});
				cpt.tl.appendChild(document.createElement("br"));
				cpt.tl.appendChild(document.createElement("br"));
			/* Export File Name */
				var fileName = document.createElement("input");
				fileName.setAttribute("placeholder", "Filnavn");
				fileName.setAttribute("type", "text");
				fileName.className = cpt.tl.id + "_fileName";
				cpt.tl.appendChild(fileName);		
			/* Export JSON */
				var exportJSON = document.createElement("input");
				exportJSON.value = "Gem JSON";
				exportJSON.setAttribute("type", "button");
				exportJSON.className = cpt.tl.id + "_exportJSON";
				cpt.tl.appendChild(exportJSON);
				document.getElementsByClassName(cpt.tl.id + "_exportJSON")[0].addEventListener("click", function() {
					cpt.wjsn(document.getElementsByClassName(cpt.tl.id + "_fileName")[0].value);
				});
			/* Export SVG */
				var exportSVG = document.createElement("input");
				exportSVG.value = "Gem SVG";
				exportSVG.setAttribute("type", "button");
				exportSVG.className = cpt.tl.id + "_exportSVG";
				cpt.tl.appendChild(exportSVG);
				document.getElementsByClassName(cpt.tl.id + "_exportSVG")[0].addEventListener("click", function() {
					cpt.wsvg(document.getElementsByClassName(cpt.tl.id + "_fileName")[0].value);
				});
		/* Tool Box Toggler */
		if (cpt.set.tog) {
			cpt.tl.style.cssText = "position: fixed; right: 0; top: 0; z-index: 98; width: 30vw;"
			let toggler = document.createElement("span");
			let txt = document.createElement("span");
			let chk = document.createElement("input");
			toggler.id = cpt.tl.id + "_toggleBandit";
			toggler.style.cssText = "position: fixed; right: 0; bottom: 0; z-index: 99; color: rgba(155,155,155,0.8);";
			txt.innerHTML = "Gem V&aelig;rkt&oslash;jer";
			toggler.appendChild(txt);
			chk.setAttribute("type", "checkbox");
			chk.id = cpt.tl.id + "_toolToggler";			
			toggler.appendChild(chk);
			document.body.appendChild(toggler);
			document.getElementById(cpt.tl.id + "_toolToggler").addEventListener("click", function(event) {
				cpt.tl.style.display = !this.checked ?  "block" : "none";
			});			
			//<span id="toggleBandit"><span>Gem V&aelig;rkt&oslash;jer</span><input id="toolToggler" type="checkbox" /></span>
		}
		cpt.id.addEventListener("mousemove", function(event) {
			cpt.drw(event);
		});
		cpt.id.addEventListener("mousedown", function() {
			cpt.drg = true;	
		});
		cpt.id.addEventListener("mouseup", function() {
			cpt.drg = false;	
		});
		cpt.id.addEventListener("mouseout", function() {
			cpt.drg = false;	
		});
		if (cpt.set.fit) {
			window.addEventListener("resize", function() {
				cpt.ref();
			});
		}
		cpt.ref();		
	};
	cpt.init();
};
	/*
		this.id = document.getElementById(canvas);
		this.context = this.id.getContext("2d");
		this.properties = {"height" : 400, "width" : 400, "fixed" : false };
		this.tools = document.getElementById(tools);
		this.data = [];
		this.brush = {"height" : 10, "width" : 10, "colours" : ["Red", "Green", "Blue","Orange","Yellow","Purple"]};
		this.drawingFunctions = [{"Name" : "fillRect","Arguments" : ["X","Y","W","H"]},{"Name" : "strokeRect","Arguments" : ["X","Y","W","H"]}];
		this.json = false;
		this.drawing = false;
		this.draw = function(event) {
			if (this.drawing == true) {
				var x = event.pageX - this.id.offsetLeft;
				var y = event.pageY - this.id.offsetTop;
				var w = this.brush.width;
				var h = this.brush.height;
				//this.context.fillRect(x,y,w,h);
				this.data.push({"Fct" : document.getElementById(func).value, "X" : x, "Y" : y, "W" : w, "H" : h});
				// this.tools.innerHTML = JSON.stringify(Cpt.data);
				this.drawData();
			}
		};
		this.drawData = function () {
			for (var i = 0; i < this.data.length; i++) {
				// eval("this.context." + this.data[i].Fct + "(this.data[i].X,this.data[i].Y,this.data[i].W,this.data[i].H)");
				this.context.fillRect(this.data[i].X,this.data[i].Y,this.data[i].W,this.data[i].H);
			}
		};
		this.toogleTools = function (value) {
			this.tools.style.display = value != true ?  "block" : "none";
		};
		this.init = function() {
			this.id.setAttribute("width",window.innerWidth);
			this.id.setAttribute("height",window.innerHeight);
			this.drawData();
		};
		this.toolsInit = function() {
			for (var i = 0; i < this.drawingFunctions.length; i++) {
				document.getElementById(func).innerHTML += "<option value='" + this.drawingFunctions[i].Name + "'>" + this.drawingFunctions[i].Name + "</option>";
			}
		};
	};
	*/
	
