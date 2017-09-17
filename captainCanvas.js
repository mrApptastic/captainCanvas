
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
	cpt.fct = ["Firkant (Fyld)","Firkant (Streg)", "Firkant", "Cirkel", "Stjerne", "Trekant", "Trekant (Ret)", "Rhombe", "Trapezoid", "Ellipse", "Smiley", "Hjerte", "Linie", "Figur"];
    cpt.col = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGrey", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "DarkOrange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkSlateGrey", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DimGrey", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Grey", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed ", "Indigo ", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGray", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSlateGrey", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "RebeccaPurple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "SlateGrey", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Transparent", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
	cpt.brs = {"Slc" : "Firkant", "Hgt" : 10, "Wth" : 10, "Fil" : "Black", "Str" : "Transparent", "LastX" : null, "LastY" : null, "Step" : 0, "Buff" : [] };
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
            z.push({"Fct" : "lineTo", "X" : (x + w) - (w / 5), "Y" : y }); 
            z.push({"Fct" : "lineTo", "X" : (x + w), "Y" : (y + h) });
            z.push({"Fct" : "lineTo", "X" : x + (w / 5), "Y" : (y + h) });       
		    z.push({"Fct" : "closePath" });	   
		    z.push({"Fct" : "fill" });
		    z.push({"Fct" : "stroke" });          
        }
        else if (f == "Trapezoid") {
            z.push({"Fct" : "beginPath" });
            z.push({"Fct" : "moveTo", "X" : x + (w / 5), "Y" : y });
            z.push({"Fct" : "lineTo", "X" : (x + w) - (w / 5), "Y" : y }); 
            z.push({"Fct" : "lineTo", "X" : (x + w), "Y" : (y + h) });
            z.push({"Fct" : "lineTo", "X" : x, "Y" : (y + h) });         
		    z.push({"Fct" : "closePath" });	   
		    z.push({"Fct" : "fill" });
		    z.push({"Fct" : "stroke" });  
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
            z.push({"Fct" : "moveTo", "X" : x, "Y" : ym });
			z.push({"Fct" : "bezierCurveTo", "Cpx" : x, "Cpy" : ym - oy, "Cpx2" : xm - ox, "Cpy2" : y, "X" : xm, "Y" : y });
			z.push({"Fct" : "bezierCurveTo", "Cpx" : xm + ox, "Cpy" : y, "Cpx2" : xe, "Cpy2" : ym - oy, "X" : xe, "Y" : ym });
			z.push({"Fct" : "bezierCurveTo", "Cpx" : xe, "Cpy" : ym + oy, "Cpx2" : xm + ox, "Cpy2" : ye, "X" : xm, "Y" : ye });
			z.push({"Fct" : "bezierCurveTo", "Cpx" : xm - ox, "Cpy" : ye, "Cpx2" : x, "Cpy2" : ym + oy, "X" : x, "Y" : ym }); 
		    z.push({"Fct" : "closePath" });	   
		    z.push({"Fct" : "fill" });
		    z.push({"Fct" : "stroke" });    
        }
		else if (f == "Smiley") {
            z.push({"Fct" : "beginPath" });
            z.push({"Fct" : "arc", "X" : x, "Y" : y, "Width" : w, "StartAngle" : s, "EndAngle" : e, "Anticlockwise" : true });
            z.push({"Fct" : "moveTo", "X" : (x + w - (w * 3 / 10)), "Y" : y });
            z.push({"Fct" : "arc", "X" : x, "Y" : y, "Width" : (w / 2) + (w / 5), "StartAngle" : s, "EndAngle" : Math.PI, "Anticlockwise" : false });      
            z.push({"Fct" : "moveTo", "X" : x - (w / 5), "Y" : y - (w / 5) });
            z.push({"Fct" : "arc", "X" : x - (w * 3 / 10), "Y" :  y - (w / 5), "Width" : (w / 10), "StartAngle" : s, "EndAngle" : e, "Anticlockwise" : true });
            z.push({"Fct" : "moveTo", "X" : x + (w * 2 / 5), "Y" : (y - (w / 5)) });
            z.push({"Fct" : "arc", "X" : x + (w * 3 / 10), "Y" : y - (w / 5), "Width" : (w / 10), "StartAngle" : s, "EndAngle" : e, "Anticlockwise" : true });      
		    z.push({"Fct" : "closePath" });	   
		    z.push({"Fct" : "fill" });
		    z.push({"Fct" : "stroke" });				      
		}
		else if (f == "Hjerte") {
            let d = Math.min(w, w);
            z.push({"Fct" : "beginPath" });
            z.push({"Fct" : "moveTo", "X" : x, "Y" : y + d / 4 });
			z.push({"Fct" : "quadraticCurveTo", "Cpx" : x, "Cpy" : y, "X" : x + d / 4 , "Y" : y });
            z.push({"Fct" : "quadraticCurveTo", "Cpx" : x + d / 2, "Cpy" : y, "X" : x + d / 2, "Y" : y + d / 4 });
            z.push({"Fct" : "quadraticCurveTo", "Cpx" : x + d / 2, "Cpy" : y, "X" : x + d * 3/4, "Y" : y });
            z.push({"Fct" : "quadraticCurveTo", "Cpx" : x + d, "Cpy" : y, "X" : x + d, "Y" : y + d / 4 });
            z.push({"Fct" : "quadraticCurveTo", "Cpx" : x + d, "Cpy" : y + d / 2, "X" :x + d * 3/4, "Y" :  y + d * 3/4 });
            z.push({"Fct" : "lineTo", "X" : x + d / 2, "Y" : y + d });
            z.push({"Fct" : "lineTo", "X" : x + d / 4, "Y" : y + d * 3/4 });
            z.push({"Fct" : "quadraticCurveTo", "Cpx" : x, "Cpy" : y + d / 2, "X" : x, "Y" :  y + d / 4 });
		    z.push({"Fct" : "closePath" });	   
		    z.push({"Fct" : "fill" });
		    z.push({"Fct" : "stroke" });   
		}

        if (cpt.drg) {
            cpt.dt = cpt.dt.concat(z);
        }

		cpt.dat();  

		if (!cpt.drg) {
            for (let i = 0; i < z.length; i++) {                
                cpt.drafi(z[i].Fct, 
					z[i].X, 
					z[i].Y, 
					z[i].Width, 
					z[i].Height, 
					z[i].Value, 
					z[i].StartAngle, 
					z[i].EndAngle, 
					z[i].Angle, 
					z[i].Colour, 
					z[i].Offset, 
					z[i].Text, 
					z[i].MaxWidth, 
					z[i].Radius, 
					z[i].X2, 
					z[i].Y2, 
					z[i].Cpx, 
					z[i].Cpy, 
					z[i].Cpx2, 
					z[i].Cpy2,
					z[i].RadiusY,
					z[i].Rotation,
					z[i].Anticlockwise
				);
            }
        }
	};
	cpt.cfl = function() {
		var fill = document.getElementsByClassName(cpt.tl.id + "_selectedFill")[0].value;
		cpt.brs.Fil = fill;
		cpt.dt.push({"Fct" : "fillStyle", "Value" : cpt.brs.Fil});
	};
	cpt.cst = function() {
		var stroke = document.getElementsByClassName(cpt.tl.id + "_selectedStroke")[0].value;
		cpt.brs.Str = stroke;
		cpt.dt.push({"Fct" : "strokeStyle", "Value" : cpt.brs.Str});
	};
	cpt.clw = function() {
		var lineWidth = document.getElementsByClassName(cpt.tl.id + "_lineWidth")[0].value;
		if (!isNaN(lineWidth)) {
			cpt.dt.push({"Fct" : "lineWidth", "Value" : lineWidth});
        }
	};
	cpt.cls = function () {
		cpt.cfl();
		cpt.cst();
		cpt.clw();	
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
			cpt.drafi(
				cpt.dt[i].Fct, 
				cpt.dt[i].X, 
				cpt.dt[i].Y, 
				cpt.dt[i].Width, 
				cpt.dt[i].Height, 
				cpt.dt[i].Value, 
				cpt.dt[i].StartAngle, 
				cpt.dt[i].EndAngle, 
				cpt.dt[i].Angle, 
				cpt.dt[i].Colour, 
				cpt.dt[i].Offset, 
				cpt.dt[i].Text, 
				cpt.dt[i].MaxWidth, 
				cpt.dt[i].Radius, 
				cpt.dt[i].X2, 
				cpt.dt[i].Y2, 
				cpt.dt[i].Cpx, 
				cpt.dt[i].Cpy, 
				cpt.dt[i].Cpx2, 
				cpt.dt[i].Cpy2,
				cpt.dt[i].RadiusY,
				cpt.dt[i].Rotation,
				cpt.dt[i].Anticlockwise
			);
		} 
	};
    cpt.drafi = function (f, x, y, w, h, v, s, e, a, c, o, t, m, r, x2, y2, cx, cy, cx2, cy2, ry, rt, aw) {
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
			cpt.ct[f](x, y, w, s, e, aw);
		}
        else if (f == "arcTo") {
    		cpt.ct[f](x, y, x2, y2, r);        
        }
		else if (f == "ellipse") {
    		cpt.ct[f](x, y, r, ry, rt, s, e, aw);        
        }
        else if (f == "quadraticCurveTo") {
       		cpt.ct[f](cx, cy, x, y);          
        } 
        else if (f == "bezierCurveTo") {
			cpt.ct[f](cx, cy, cx2, cy2, x, y);             
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
				brush.innerHTML = "Pensel :"
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
            /* Selected Height, Width And Linewidth */
            	var heightLabel = document.createElement("label");
				heightLabel.innerHTML = "H&oslash;jde : &nbsp;";
				cpt.tl.appendChild(heightLabel);
                var height = document.createElement("input");
				height.value = "20";
				height.setAttribute("type", "number");
				height.className = cpt.tl.id + "_height";
				cpt.tl.appendChild(height);
                // document.getElementsByClassName(cpt.tl.id + "_height")[0].addEventListener("change", cpt.dim);
                cpt.tl.appendChild(document.createElement("br"));
                var widthLabel = document.createElement("label");
				widthLabel.innerHTML = "Bredde : &nbsp;";
				cpt.tl.appendChild(widthLabel);	
                var width = document.createElement("input");
				width.value = "20";
				width.setAttribute("type", "number");
				width.className = cpt.tl.id + "_width";
				cpt.tl.appendChild(width);
                // document.getElementsByClassName(cpt.tl.id + "_width")[0].addEventListener("change", cpt.dim);
                cpt.tl.appendChild(document.createElement("br"));
				var linewidthLabel = document.createElement("label");
				linewidthLabel.innerHTML = "Linie : &nbsp;";
				cpt.tl.appendChild(linewidthLabel);	
                var linewidth = document.createElement("input");
				linewidth.value = "1";
				linewidth.setAttribute("type", "number");
				linewidth.className = cpt.tl.id + "_lineWidth";
				cpt.tl.appendChild(linewidth);
				document.getElementsByClassName(cpt.tl.id + "_lineWidth")[0].addEventListener("change", cpt.clw);				
                cpt.tl.appendChild(document.createElement("br"));
            /* Selected Colours*/
                var selectColLabel = document.createElement("label");
				selectColLabel.innerHTML = "Fyldfarve : &nbsp;";
                cpt.tl.appendChild(selectColLabel);
                var colSelect = document.createElement("select")
                colSelect.className = cpt.tl.id + "_selectedFill";
                cpt.tl.appendChild(colSelect);
                for (let i = 0; i < cpt.col.length; i++) {
                    document.getElementsByClassName(cpt.tl.id + "_selectedFill")[0].innerHTML += "<option style='background: " + cpt.col[i] + " ;' value='" + cpt.col[i] + "'>" + cpt.col[i] + "</option>";
                }
				document.getElementsByClassName(cpt.tl.id + "_selectedFill")[0].getElementsByTagName("option")[cpt.col.indexOf("Black")].setAttribute("selected","");
				document.getElementsByClassName(cpt.tl.id + "_selectedFill")[0].addEventListener("change",cpt.cfl);
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
				document.getElementsByClassName(cpt.tl.id + "_selectedStroke")[0].addEventListener("change",cpt.cst);
                cpt.tl.appendChild(document.createElement("br"));
                cpt.tl.appendChild(document.createElement("br"));
            /* Import Heading */
				var imp = document.createElement("h3");
				imp.innerHTML = "Hent fil : "
				cpt.tl.appendChild(imp);
			/* Import JSON */
				var importJSONLabel = document.createElement("label");
				importJSONLabel.innerHTML = "Hent JSON : &nbsp;";
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
				exp.innerHTML = "Gem fil : "
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
				exportSVG.setAttribute("disabled", "");
				exportSVG.className = cpt.tl.id + "_exportSVG";
				cpt.tl.appendChild(exportSVG);
				document.getElementsByClassName(cpt.tl.id + "_exportSVG")[0].addEventListener("click", function() {
					cpt.wsvg(document.getElementsByClassName(cpt.tl.id + "_fileName")[0].value);
				});
            /* Export HTML Canvas */
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
            cpt.brs.Slc = document.getElementsByClassName(cpt.tl.id + "_selectedFunction")[0].value;
			if (cpt.brs.Slc != "Linie" && cpt.brs.Slc != "Figur") {
				cpt.dim();
				cpt.drw(event);
			}
			else if (cpt.brs.Slc == "Linie") {
				if (cpt.brs.LastX != null || cpt.brs.LastY != null) {
					let x = event.pageX - cpt.id.offsetLeft;
					let y = event.pageY - cpt.id.offsetTop;
					cpt.dim();
					cpt.dat();					  
					cpt.drafi("lineTo", x, y);
					cpt.drafi("closePath");
					cpt.drafi("stroke");
				}
			}
            else if (cpt.brs.Slc == "Figur") {
                if (cpt.brs.LastX != null || cpt.brs.LastY != null) {
					let x = event.pageX - cpt.id.offsetLeft;
					let y = event.pageY - cpt.id.offsetTop;
					cpt.dim();
					cpt.dat();
                    for (let i = 0; i < cpt.brs.Buff.length; i++) {
                        cpt.drafi(cpt.brs.Buff[i].Fct, 
					        cpt.brs.Buff[i].X, 
					        cpt.brs.Buff[i].Y
				        );
                    }					  
					cpt.drafi("lineTo", x, y);
					cpt.drafi("closePath");
					cpt.drafi("stroke");
                    if (cpt.brs.Buff.length > 0) {
                        if (x >= (cpt.brs.Buff[1].X - 5) && x <= (cpt.brs.Buff[1].X + 5) && y >= (cpt.brs.Buff[1].Y - 5) && y <= (cpt.brs.Buff[1].Y + 5)) {
                            // cpt.drafi("fillRect", x, y, 25, 25);
                            cpt.drafi("closePath");
                            cpt.drafi("fill");
                            cpt.drafi("stroke");                       
                        }
                    }
				}                
            }
		});
		cpt.id.addEventListener("mousedown", function(event) { 
			cpt.drg = true;	
            cpt.brs.Slc = document.getElementsByClassName(cpt.tl.id + "_selectedFunction")[0].value;
			if (cpt.brs.Slc != "Linie" && cpt.brs.Slc != "Figur") {				
				cpt.dim();
				cpt.drw(event);
			}
			else if (cpt.brs.Slc == "Linie") {
				let x = event.pageX - cpt.id.offsetLeft;
				let y = event.pageY - cpt.id.offsetTop;
				if (cpt.brs.LastX == null || cpt.brs.LastY == null) {
					cpt.dt.push({"Fct" : "beginPath" });
					cpt.dt.push({"Fct" : "moveTo", "X" : x, "Y" : y });
					cpt.brs.LastX = x;
					cpt.brs.LastY = y;
				}
				else {
					cpt.dt.push({"Fct" : "lineTo", "X" : x, "Y" : y });	
					cpt.dt.push({"Fct" : "stroke" });
					cpt.dim();
					cpt.dat();	
					cpt.brs.LastX = null;
					cpt.brs.LastY = null;
				}
			}
            else if (cpt.brs.Slc == "Figur") {
                let x = event.pageX - cpt.id.offsetLeft;
				let y = event.pageY - cpt.id.offsetTop;
                let reset = false;
                
                if (cpt.brs.Buff.length > 0) {
                    // console.log("x : " + x + " y : " + y + " x1 : " + cpt.brs.Buff[1].X + " y1 " + cpt.brs.Buff[1].Y);
                    if (x >= (cpt.brs.Buff[1].X - 5) && x <= (cpt.brs.Buff[1].X + 5) && y >= (cpt.brs.Buff[1].Y - 5) && y <= (cpt.brs.Buff[1].Y + 5)) {
					    cpt.brs.Buff.push({"Fct" : "lineTo", "X" : cpt.brs.Buff[1].X, "Y" : cpt.brs.Buff[1].Y });
                        cpt.brs.Buff.push({"Fct" : "closePath" });
                        cpt.brs.Buff.push({"Fct" : "stroke" });
                        cpt.brs.Buff.push({"Fct" : "fill" });	
                        cpt.dt = cpt.dt.concat(cpt.brs.Buff);
		                cpt.dat();  
                        cpt.brs.LastX = null;
                        cpt.brs.LastY = null;
                        cpt.brs.Buff = [];
                        reset = true;
                    }
                }
                if (!reset) {
                    if (cpt.brs.LastX == null || cpt.brs.LastY == null) {
					    cpt.brs.Buff.push({"Fct" : "beginPath" });
					    cpt.brs.Buff.push({"Fct" : "moveTo", "X" : x, "Y" : y });
					    cpt.brs.LastX = x;
					    cpt.brs.LastY = y;
				    }
				    else {
					    cpt.brs.Buff.push({"Fct" : "lineTo", "X" : x, "Y" : y });	
                        // cpt.brs.Buff.push({"Fct" : "moveTo", "X" : x, "Y" : y });
					    cpt.dim();
					    cpt.dat();
                        for (let i = 0; i < cpt.brs.Buff.length; i++) {
                            cpt.drafi( cpt.brs.Buff[i].Fct, 
					        cpt.brs.Buff[i].X, 
					        cpt.brs.Buff[i].Y
				            );
                        }
                        cpt.drafi("stroke");	
                        // cpt.drafi("fill");							
				    }
                }
                
            }
		});
		cpt.id.addEventListener("mouseup", function() {
			cpt.drg = false;
			if (document.getElementsByClassName(cpt.tl.id + "_selectedFunction")[0].value != "Linie") {	
				
			}
			else {
				
			}
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