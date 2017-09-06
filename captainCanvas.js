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
	cpt.fct = ["Firkant (Fyld)","Firkant (Streg)", "Firkant", "Cirkel", "Stjerne", "Trekant", "Trekant (Ret)", "Rhombe", "Trapezoid", "Ellipse"];
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
            let innerRadius = w;
			let outerRadius = h;
            let spikes = 5;
            let rot = Math.PI / 2 * 3;
			let thisx = x;
			let thisy = y;
			let step = Math.PI / spikes;
			z.push({"Fct" : "beginPath" });
            z.push({"Fct" : "moveTo", "X" : x, "Y" : y - outerRadius});
			for(let i = 0; i < spikes; i++){
				thisx = x + Math.cos(rot) * outerRadius;
				thisy = y + Math.sin(rot) * outerRadius;
				z.push({"Fct" : "lineTo", "X" : thisx, "Y" : thisy});
				rot += step
				thisx=x + Math.cos(rot) * innerRadius;
				thisy=y + Math.sin(rot) * innerRadius;
				z.push({"Fct" : "lineTo", "X" : thisx, "Y" : thisy});
				rot += step
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
        else if (f == "Trekant (Ret)") {
		    z.push({"Fct" : "beginPath" });
            z.push({"Fct" : "moveTo", "X" : x, "Y" : y });
            z.push({"Fct" : "lineTo", "X" : (x + w), "Y" : (y + h) }); 
            z.push({"Fct" : "lineTo", "X" : x, "Y" : (y + h) });      
		    z.push({"Fct" : "closePath" });	   
		    z.push({"Fct" : "fill" });
		    z.push({"Fct" : "stroke" });	
        }
        else if (f == "Rhombe") {
  		    z.push({"Fct" : "beginPath" });
            z.push({"Fct" : "moveTo", "X" : x, "Y" : y });
            z.push({"Fct" : "lineTo", "X" : (x + w) - w/5, "Y" : y }); 
            z.push({"Fct" : "lineTo", "X" : (x + w), "Y" : (y + h) });
            z.push({"Fct" : "lineTo", "X" : x + w/5, "Y" : (y + h) });       
		    z.push({"Fct" : "closePath" });	   
		    z.push({"Fct" : "fill" });
		    z.push({"Fct" : "stroke" });          
        }
        else if (f == "Trapezoid") {
            
        }
        else if (f == "Ellipse") {
            let kappa = .5522848;
            let ox = (w / 2) * kappa;
            let oy = (h / 2) * kappa;
            let xe = x + w;
            let ye = y + h;
            let xm = x + w / 2;
            let ym = y + h / 2; 
            z.push({"Fct" : "beginPath" });
            z.push({"Fct" : "moveTo", "X" : x, "Y" : y });
            /*
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);  
  */    
		    z.push({"Fct" : "closePath" });	   
		    z.push({"Fct" : "fill" });
		    z.push({"Fct" : "stroke" });    
            /*
              var kappa = .5522848,
      ox = (w / 2) * kappa, // control point offset horizontal
      oy = (h / 2) * kappa, // control point offset vertical
      xe = x + w,           // x-end
      ye = y + h,           // y-end
      xm = x + w / 2,       // x-middle
      ym = y + h / 2;       // y-middle

  ctx.beginPath();
  ctx.moveTo(x, ym);
  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  ctx.closePath(); 
  ctx.stroke();

  */
        }

        if (cpt.drg) {
            cpt.dt = cpt.dt.concat(z);
        }

		cpt.dat();  

		if (!cpt.drg) {
            for (let i = 0; i < z.length; i++) {                
                cpt.drafi(z[i].Fct, z[i].X, z[i].Y, z[i].Width, z[i].Height, z[i].Value, z[i].StartAngle, z[i].EndAngle);
            }
        }
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
			let c = cpt.dt[i].Colour;
			let o = cpt.dt[i].Offset;
			let t = cpt.dt[i].Text;
			let m = cpt.dt[i].MaxWidth;
			let r = cpt.dt[i].Radius;
            let x2 = cpt.dt[i].X2;
            let y2 = cpt.dt[i].Y2;			
            cpt.drafi(funky, x, y, w, h, v, s, e, a, c, o, t, m, r, x2, y2);
		} 
	};
    cpt.drafi = function (f, x, y, w, h, v, s, e, a, c, o, t, m, r, x2, y2) {
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
 			cpt.ct[f](o, c);           
        }
		else if (f == "fillRect" || f == "strokeRect" || f == "rect" || f == "clearRect") {
			cpt.ct[f](x, y, w, h);
		}
        else if (f == "fillText" || f == "strokeText") {
 			cpt.ct[f](t, x, y, m); 			
        }
		else if (f == "arc") {
			cpt.ct[f](x, y, w, s, e);
		}
        else if (f == "arcTo") {
    		cpt.ct[f](x, y, x2, y2, r);        
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
        var html = '<!doctype html>\r\n<html>\r\n<head>\r\n<title>'         
        + name 
        + '</title>\r\n</head>\r\n<body>\r\n<canvas id="' 
        + name 
        + '" width="' 
        + cpt.id.getAttribute("width") 
        + '" height="' 
        + cpt.id.getAttribute("height")  
        + '"></canvas>\r\n<script>\r\n'		
        + 'var '
        + name
        + ' = document.getElementById("'
        + name
        + '").getContext("2d");\r\n';
		
		for (let i = 0; i < cpt.dt.length; i++) {	
			let p = cpt.dt[i];
			let isAtr = false;
			let add = name + '.' + p.Fct + "(";
			for (let j in p) {				
				if (p.hasOwnProperty(j)) {
					if (j != "Fct") {
						if (j == "Value") {
							add = name + "." + p.Fct + " = '" + p[j] + "';\r\n";
							isAtr = true;
							break;
						}
						else {
							add += p[j] + ',';
						}
					}
				}				
			}
			if (!isAtr) {
				if (add.indexOf(',') != -1) {
					add = add.slice(0,-1);
				}
				add += ');\r\n'
			}
			html += add;			
		}		

        html += '</script>\r\n</body>\r\n</html>';

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