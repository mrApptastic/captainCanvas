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
	cpt.fct = ["Firkant (Fyld)","Firkant (Streg)", "Firkant", "Cirkel", "Stjerne", "Trekant"];
    cpt.col = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed ", "Indigo ", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Transparent", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
	cpt.brs = {"Hgt" : 10, "Wth" : 10, "Fil" : "Black", "Str" : "Transparent" };
	cpt.drg = false;
	cpt.drw = function(event) {
        var z = [];
        var f = document.getElementsByClassName(cpt.tl.id + "_selectedFunction")[0].value;
		var x = event.pageX - cpt.id.offsetLeft;
		var y = event.pageY - cpt.id.offsetTop;
		var w = parseInt(cpt.brs.Wth);
		var h = parseInt(cpt.brs.Hgt);
        var s =  0;
        var e =  2 * Math.PI;
        if (f == "Firkant (Fyld)") {
            z.push({"Fct" : "fillRect", "X" : x, "Y" : y, "Width" : w, "Height" : h}); 
        }
        else if (f == "Firkant (Streg)") {
            z.push({"Fct" : "strokeRect", "X" : x, "Y" : y, "Width" : w, "Height" : h});
        }
        else if (f == "Firkant") {
		    z.push({"Fct" : "beginPath" });
            z.push({"Fct" : "rect", "X" : x, "Y" : y, "Width" : w, "Height" : h});
		    z.push({"Fct" : "closePath" });
		    z.push({"Fct" : "fill" });
		    z.push({"Fct" : "stroke" });
        }
        else if (f == "Cirkel") {
		    z.push({"Fct" : "beginPath" });
            z.push({"Fct" : "arc", "X" : x, "Y" : y, "Width" : w, "StartAngle" : s, "EndAngle" : e});      
		    z.push({"Fct" : "closePath" });	   
		    z.push({"Fct" : "fill" });
		    z.push({"Fct" : "stroke" });				      
        }
		else if (f == "Stjerne") {
		    let thisx = x;
			let thisy  = y;
			let spikes = 5;
			let innerRadius = w;
			let outerRadius = h;
			let rot = Math.PI / (2 * 3);
			let step = Math.PI / spikes;
			z.push({"Fct" : "beginPath" });
			z.push({"Fct" : "moveTo", "X" : x, "Y" : y - outerRadius});
			for(let i = 0; i < spikes; i++){
			    thisx = x + Math.cos(rot) * outerRadius;
				thisy = y + Math.sin(rot) * outerRadius;
				z.push({"Fct" : "lineTo", "X" : thisx, "Y" : thisy});
				rot += step;
				thisx= x + Math.cos(rot) * innerRadius;
				thisy = y + Math.sin(rot) * innerRadius;
				z.push({"Fct" : "lineTo", "X" : thisx, "Y" : thisy});
				rot += step;
			}
			z.push({"Fct" : "lineTo", "X" : x, "Y" : y - outerRadius});
			z.push({"Fct" : "closePath" });
			z.push({"Fct" : "fill" });
			z.push({"Fct" : "stroke" });
        }
        else if (f == "Trekant") {
		    z.push({"Fct" : "beginPath" });
            z.push({"Fct" : "moveTo", "X" : x, "Y" : y });
            z.push({"Fct" : "lineTo", "X" : (x + w), "Y" : y }); 
            z.push({"Fct" : "lineTo", "X" : (x + w/2), "Y" : (y + h) });      
		    z.push({"Fct" : "closePath" });	   
		    z.push({"Fct" : "fill" });
		    z.push({"Fct" : "stroke" });	
		}

        if (cpt.drg) {
            cpt.dt = cpt.dt.concat(z);
            /*
            for (let i = 0; i < z.length; i++) {                
                cpt.dt.push(z[i]);
            }
            */
        }

		cpt.dat();  

		if (!cpt.drg) {
            for (let i = 0; i < z.length; i++) {                
                cpt.drafi(z[i].Fct, z[i].X, z[i].Y, z[i].Width, z[i].Height, z[i].Value, z[i].StartAngle, z[i].EndAngle);
            }
        }
            
/*
			var rot=Math.PI/2*3;
			var x= cx;
			var y= cy;
			var step=Math.PI/spikes;
			cpt.ct.beginPath();
			cpt.ct.moveTo(cx,cy-outerRadius)
			for(i=0;i<spikes;i++){
				x=cx+Math.cos(rot)*outerRadius;
				y=cy+Math.sin(rot)*outerRadius;
				cpt.ct.lineTo(x,y)
				rot+=step
				x=cx+Math.cos(rot)*innerRadius;
				y=cy+Math.sin(rot)*innerRadius;
				cpt.ct.lineTo(x,y)
				rot+=step
			}
			cpt.ct.lineTo(cx,cy-outerRadius);
			cpt.ct.closePath();
			cpt.ct.lineWidth=5;
			cpt.ct.strokeStyle='blue';
			cpt.ct.stroke();
			cpt.ct.fillStyle='skyblue';
			cpt.ct.fill();
				
			
          
		}
        else {
            cpt.dat(); 
            cpt.drafi(f, x, y, w, h, null, s, e);
        }
        */
	};
	cpt.cls = function () {
		var fill = document.getElementsByClassName(cpt.tl.id + "_selectedFill")[0].value;
		cpt.brs.Fil = fill;
		cpt.dt.push({"Fct" : "fillStyle", "Value" : cpt.brs.Fil});
		var stroke = document.getElementsByClassName(cpt.tl.id + "_selectedStroke")[0].value;
		cpt.brs.Str = stroke;
		cpt.dt.push({"Fct" : "strokeStyle", "Value" : cpt.brs.Str});
	};
    cpt.dim = function() {
        var height = document.getElementsByClassName(cpt.tl.id + "_height")[0].value;
        var width =  document.getElementsByClassName(cpt.tl.id + "_width")[0].value;
        if (!isNaN(height)) {
            cpt.brs.Hgt = height;
        }
        if (!isNaN(width)) {
            cpt.brs.Wth = width;
        }
    };
	cpt.dat = function () {  
		cpt.ct.clearRect(0,0, cpt.id.getAttribute("width"), cpt.id.getAttribute("height"));        
		for (let i = 0; i < cpt.dt.length; i++) {
			let funky = cpt.dt[i].Fct;
            let x = cpt.dt[i].X;
            let y = cpt.dt[i].Y;
            let w = cpt.dt[i].Width;
            let h = cpt.dt[i].Height;
            let v = cpt.dt[i].Value;
            let s = cpt.dt[i].StartAngle;
            let e = cpt.dt[i].EndAngle;
			let a = cpt.dt[i].Angle;
            cpt.drafi(funky, x, y, w, h, v, s, e, a);
		} 
	};
    cpt.drafi = function (f, x, y, w, h, v, s, e, a) {
		if (f == "strokeStyle" || f == "fillStyle" || f == "shadowOffsetX" || f == "shadowOffsetY" || f == "shadowBlur" || f == "shadowColor" || f == "font" || f == "textAlign" || f == "textBaseline" || f == "globalAlpha" || f == "globalCompositeOperation" || f == "lineWidth" || f == "lineCap" || f == "lineJoin" || f == "miterLimit") {
			cpt.ct[f] = v;
		}
		else if (f == "save" || f == "restore" || f == "beginPath" || f == "closePath" || f == "fill" || f == "stroke" || f == "clip") {
			cpt.ct[f]();	
		}
        else if (f == "rotate") {
            cpt.ct[f](a);
        }
		else if (f == "moveTo" || f == "lineTo" || f == "scale" || f == "translate") {
			cpt.ct[f](x, y);		
		}
        else if (f == "addColorStop") {
            
        }
		else if (f == "fillRect" || f == "strokeRect" || f == "rect" || f == "clearRect") {
			cpt.ct[f](x, y, w, h);
		}
        else if (f == "fillText" || f == "strokeText") {
            
        }
		else if (f == "arc") {
			cpt.ct[f](x, y, w, s, e);
		}
        else if (f == "arcTo") {
            
        }
        else if (f == "quadraticCurveTo") {
            
        } 
        else if (f == "bezierCurveTo") {
            
        }   
        else if (f == "drawImage") {
            
        }
        else if (f == "putImageData") {
            
        }
        else if (f == "transform" || f == "setTransform") {
            
        }
			/*
    	if (funky == "fillRect") {
            cpt.ct[funky](x, y, w, h);
		}
		else if (funky == "strokeRect") {
			cpt.ct[funky](x, y, w, h);
		}
        else if (funky == "rect") {
            cpt.ct.beginPath();
            cpt.ct[funky](x, y, w, h);
            cpt.ct.fill();
            cpt.ct.stroke();
            cpt.ct.closePath();              
        }
        else if (funky == "arc") {
            cpt.ct.beginPath();
            cpt.ct[funky](x, y, w, s, e);
            cpt.ct.fill();
            cpt.ct.stroke();
			cpt.ct.closePath();
        }
		else if (funky == "fillStyle") {
		    cpt.ct.fillStyle = v;
		}
		else if (funky == "strokeStyle") {
		    cpt.ct.strokeStyle = v;
		}
		this.drawStar = function (cx,cy,spikes,outerRadius,innerRadius) {
			var rot=Math.PI/2*3;
			var x= cx;
			var y= cy;
			var step=Math.PI/spikes;
			cpt.ct.beginPath();
			cpt.ct.moveTo(cx,cy-outerRadius)
			for(i=0;i<spikes;i++){
				x=cx+Math.cos(rot)*outerRadius;
				y=cy+Math.sin(rot)*outerRadius;
				cpt.ct.lineTo(x,y)
				rot+=step
				x=cx+Math.cos(rot)*innerRadius;
				y=cy+Math.sin(rot)*innerRadius;
				cpt.ct.lineTo(x,y)
				rot+=step
			}
			cpt.ct.lineTo(cx,cy-outerRadius);
			cpt.ct.closePath();
			cpt.ct.lineWidth=5;
			cpt.ct.strokeStyle='blue';
			cpt.ct.stroke();
			cpt.ct.fillStyle='skyblue';
			cpt.ct.fill();
		};
		*/
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
	cpt.wjsn = function (fil) {
		var json = JSON.stringify(cpt.dt);
		cpt.down((fil ? fil : "captainCanvas")  + ".json", "data:application/json;charset=utf-8," + encodeURIComponent(json));
	};
	cpt.rsvg = function() {

	};
	cpt.wsvg = function (fil) {
		var firstLine = '<?xml version="1.0" encoding="UTF-8"><svg width="' + cpt.id.getAttribute("width") + '" height="' + cpt.id.getAttribute("height") + '">';
		var dataLines = '';
		for (let i = 0; i < cpt.dt.length; i++) {
			let funky = cpt.dt[i].Fct;
			if (funky == "fillRect") {
				dataLines += '<rect x="' + cpt.dt[i].X  + '" y="' + cpt.dt[i].Y + '" width="' + cpt.dt[i].W + '" height="' + cpt.dt[i].H + '" style="fill:rgb(0,0,0);" />';
			}
			else if (funky == "strokeRect") {
				dataLines += '<rect x="' + cpt.dt[i].X  + '" y="' + cpt.dt[i].Y + '" width="' + cpt.dt[i].W + '" height="' + cpt.dt[i].H + '" style="fill:rgb(0,0,0);" />';
			}			
		}
		var lastLine = '</svg>';
		var svg = firstLine + dataLines + lastLine;
		cpt.down((fil ? fil : "captainCanvas") + ".svg", "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg));
	};
    cpt.whtm = function (fil) {
        var name = (fil ? fil : "captainCanvas");
        var html = "<html><head><title>" 
        /*
        + name 
        + "</title></head><body><canvas id='" 
        + name 
        + "'></canvas><script>"
        + "var "
        + name
        + " = document.getElementById('"
        + name
        "').getContext('2d');"
        
        for (let i = 0; i < cpt.dt.length; i++) 
            if (!cpt.dt[i].Value) {
                html += name + "." + cpt.dt[i].Fct
                for (j in cpt.dt[i]) {
                    
                }
            }
            else {
                html += name + "." + cpt.dt[i].Fct + " = '" + cpt.dt[i].Value + "';"
            }
        } 
        */
        html += "</script></body></html>";
        cpt.down(name  + ".html", "data:text/html;charset=utf-8," + encodeURIComponent(html));
    };
	cpt.wpng = function (fil) {
		cpt.down((fil ? fil : "captainCanvas")  + ".png", "data:image/png;base64;" + cpt.id.toDataURL());
	};
	cpt.down = function (filename, txt) {
		var l = document.createElement("a");
		l.setAttribute("href", txt);
		l.setAttribute("download", filename);
		if (document.createEvent) {
			let ev = document.createEvent('MouseEvents');
			ev.initEvent('click', true, true);
			l.dispatchEvent(ev);
		}
		else {
			l.click();
		}
	};
	cpt.init = function () {
		/* Tool Box Contents */
			/* Heading */
				cpt.tl.appendChild(document.createElement("h1"));
                cpt.tl.getElementsByTagName("h1")[0].innerHTML = "V&aelig;rkt&oslash;jer:";
			/* Brush Heading */
				var brush = document.createElement("h3");
				brush.innerHTML = "Pensel:"
				cpt.tl.appendChild(brush);
			/* Selected Function */
            	var selectFuncLabel = document.createElement("label");
				selectFuncLabel.innerHTML = "Funktion: &nbsp;";
				cpt.tl.appendChild(selectFuncLabel);				
				cpt.tl.appendChild(document.createElement("select"));
				cpt.tl.getElementsByTagName("select")[0].className = cpt.tl.id + "_selectedFunction";
				var funky = cpt.fct.sort();
				for (let i = 0; i < funky.length; i++) {
					document.getElementsByClassName(cpt.tl.id + "_selectedFunction")[0].innerHTML += "<option value='" + funky[i] + "'>" + funky[i] + "</option>";
				}
                cpt.tl.appendChild(document.createElement("br"));
            /* Selected Height And Width */
            	var heightLabel = document.createElement("label");
				heightLabel.innerHTML = "H&oslash;jde: &nbsp;";
				cpt.tl.appendChild(heightLabel);
                var height = document.createElement("input");
				height.value = "20";
				height.setAttribute("type", "number");
				height.className = cpt.tl.id + "_height";
				cpt.tl.appendChild(height);
                // document.getElementsByClassName(cpt.tl.id + "_height")[0].addEventListener("change", cpt.dim);
                cpt.tl.appendChild(document.createElement("br"));
                var widthLabel = document.createElement("label");
				widthLabel.innerHTML = "Width: &nbsp;";
				cpt.tl.appendChild(widthLabel);	
                var width = document.createElement("input");
				width.value = "20";
				width.setAttribute("type", "number");
				width.className = cpt.tl.id + "_width";
				cpt.tl.appendChild(width);
                // document.getElementsByClassName(cpt.tl.id + "_width")[0].addEventListener("change", cpt.dim);
                cpt.tl.appendChild(document.createElement("br"));
            /* Selected Colours*/
                var selectColLabel = document.createElement("label");
				selectColLabel.innerHTML = "Fyldfarve: &nbsp;";
                cpt.tl.appendChild(selectColLabel);
                var colSelect = document.createElement("select")
                colSelect.className = cpt.tl.id + "_selectedFill";
                cpt.tl.appendChild(colSelect);
                for (let i = 0; i < cpt.col.length; i++) {
                    document.getElementsByClassName(cpt.tl.id + "_selectedFill")[0].innerHTML += "<option style='background: " + cpt.col[i] + " ;' value='" + cpt.col[i] + "'>" + cpt.col[i] + "</option>";
                }
				document.getElementsByClassName(cpt.tl.id + "_selectedFill")[0].getElementsByTagName("option")[cpt.col.indexOf("Black")].setAttribute("selected","");
				document.getElementsByClassName(cpt.tl.id + "_selectedFill")[0].addEventListener("change",cpt.cls);
                cpt.tl.appendChild(document.createElement("br"));
                var selectFilLabel = document.createElement("label");
				selectFilLabel.innerHTML = "Stregfarve: &nbsp;";
                cpt.tl.appendChild(selectFilLabel);
                var filSelect = document.createElement("select")
                filSelect.className = cpt.tl.id + "_selectedStroke";
                cpt.tl.appendChild(filSelect);
                for (let i = 0; i < cpt.col.length; i++) {
                    document.getElementsByClassName(cpt.tl.id + "_selectedStroke")[0].innerHTML += "<option style='background: " + cpt.col[i] + " ;' value='" + cpt.col[i] + "'>" + cpt.col[i] + "</option>";
                }
				document.getElementsByClassName(cpt.tl.id + "_selectedStroke")[0].getElementsByTagName("option")[cpt.col.indexOf("Transparent")].setAttribute("selected","");
				document.getElementsByClassName(cpt.tl.id + "_selectedStroke")[0].addEventListener("change",cpt.cls);
                cpt.tl.appendChild(document.createElement("br"));
                cpt.tl.appendChild(document.createElement("br"));
            /* Import Heading */
				var imp = document.createElement("h3");
				imp.innerHTML = "Hent fil:"
				cpt.tl.appendChild(imp);
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
            /* Export Heading */
				var exp = document.createElement("h3");
				exp.innerHTML = "Gem fil:"
				cpt.tl.appendChild(exp);
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
            /* Export SVG */
				var exportHtml = document.createElement("input");
				exportHtml.value = "Gem HTML";
				exportHtml.setAttribute("type", "button");
				exportHtml.className = cpt.tl.id + "_exportHtml";
				cpt.tl.appendChild(exportHtml);
				document.getElementsByClassName(cpt.tl.id + "_exportHtml")[0].addEventListener("click", function() {
					cpt.whtm(document.getElementsByClassName(cpt.tl.id + "_fileName")[0].value);
				});
			/* Export PNG */
				var exportPNG = document.createElement("input");
				exportPNG.value = "Gem PNG";
				exportPNG.setAttribute("type", "button");
				exportPNG.className = cpt.tl.id + "_exportPNG";
				cpt.tl.appendChild(exportPNG);
				document.getElementsByClassName(cpt.tl.id + "_exportPNG")[0].addEventListener("click", function() {
					cpt.wpng(document.getElementsByClassName(cpt.tl.id + "_fileName")[0].value);
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
            cpt.dim();
			cpt.drw(event);
		});
		cpt.id.addEventListener("mousedown", function(event) {            			
			cpt.drg = true;	
            cpt.dim();
            cpt.drw(event);
		});
		cpt.id.addEventListener("mouseup", function() {
			cpt.drg = false;	
		});
		cpt.id.addEventListener("mouseout", function() {
			cpt.drg = false;	
		});
		if (cpt.set.fit) {
			window.addEventListener("resize", cpt.ref);
		}
		cpt.ref();	
		cpt.cls();
        cpt.dim();	
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
	til lyden af endnu en sang, hvis budskab kan stille sig i kø med lignende budskaber om fr hos ligeglade og ligegyldige mennesker.
	
	Prerequisites

Following are the prerequisites for creating a VPN connection and for connecting to your organization network by using the VPN connection.

    To create a VPN connection, you must know the IP address or fully qualified domain name (FQDN) of the VPN server to which you want to connect. For example, if you work for an organization named Contoso and the Contoso VPN server is named VPN1.contoso.com and has an IP address of 10.0.0.25, you must have this information ready when you create your VPN connection to the server.

    To connect to a VPN server at your organization, you must know your user name and password. If you do not know your user name and password, you should talk to your organization Help Desk before attempting to connect to the organization network.

    To connect to a VPN server at your organization, you must have permission from your organization to do so. If you are unable to connect to your organization network by using a VPN connection, you should talk to your organization Help Desk to find out if you have permission to connect from a remote location.

    To connect to a VPN server at your organization, your computer or device must be connected to the Internet.

    If your organization requires you to use a smart card to connect with VPN, you must have a smart card reader and a smart card connected to your computer or device before you attempt to connect to your organization. If your organization uses virtual smart cards, you must have a virtual smart card installed on the computer or device.

    If you are unable to create a VPN connection by using this topic and if your computer or device is joined to your organization's domain, it is possible that your organization does not permit creation of VPN connections on your computer. If this is the case, you should talk to your organization Help Desk to find out if you have permission to create VPN connections to connect to your organization network.
	
	185.101.89.35
	*/
	
