define(['alg','config'],function (alg,config){
　　　　var light = { 
                    starLightData : {
                        para : [],
                        lightArr : []
                    },
				    creatLight : function(x,y,r,color,n,callback){
                                 
                                var _t = this,
                                    o = config,
                                    num = Math.min(Math.max(o.minLightNumber,n),o.maxLightNumber),
                                    angle = 360/num,
                                    d = [];
                                      
                                    while(num>0){
                                        num--;
                                        
                                        //计算光线基点
                                        var a1 = angle*num + o.space*angle/(2*(o.space+1))  , a2 = angle*(num+1) - o.space*angle/(2*(o.space+1)),

                                        x1 = alg.getCosVal(x,r,a1);
                                        y1 = alg.getSinVal(y,r,a1);

                                        x2 = alg.getCosVal(x,r,a2);
                                        y2 = alg.getSinVal(y,r,a2);

                                        randomLong = alg.getRandomArbitrary(o.minLightLong, o.maxLightLong),
  
                                        data = {
                                            'x1' : x1,
                                            'y1' : y1,
                                            'x2' : x2,
                                            'y2' : y2,
                                            'x3' : 0,
                                            'y3' : 0,
                                            'a1' : a1,
                                            'a2' : a2,
                                            'r' : r,
                                            'randomLong' : randomLong,
                                            'si' : 1
                                        };
                                        
                                        d.push(data);
                                         
                                    };

                                    var para = {
                                            'x' : x,
                                            'y' : y,
                                            'color' : color,
                                            'angle' : angle
                                        };

                                    _t.starLightData.para.push(para);

                                    _t.starLightData.lightArr.push(d);

                                    if(typeof(callback)==='function'){
                                        callback();
                                    }
  

                            },
                            drawMeteorLight : function(el){

                                   var  _t = this,
                                        x1 = alg.getCosVal(el.x,el.r,-180-el.a),
                                        y1 = alg.getSinVal(el.y,el.r,-180-el.a),

                                        x2 = alg.getCosVal(el.x,el.r,-el.a),
                                        y2 = alg.getSinVal(el.y,el.r,-el.a),

                                        x3 = alg.getCosVal(x1,el.r+el.r*el.speed*5,el.a),
                                        y3 = alg.getSinVal(y1,el.r+el.r*el.speed*5,el.a);
                                        //console.log(x3+'-----'+y3);
                                        //console.log(x1+'===='+y1+'===='+x2+'====='+y2+'====='+x3+'====='+y3)
                                        var ctx=config.el.getContext("2d");
                                        var gr = ctx.createLinearGradient((x1+x2)/2,(y1+y2)/2,x3,y3);
                                                        
                                                gr.addColorStop(0, alg.getRGBA(el.color,1));
                                                gr.addColorStop(0.3*el.alpha, alg.getRGBA(el.color,0.5));
                                                gr.addColorStop(0.8*el.alpha, alg.getRGBA(el.color,0));

                                                ctx.beginPath();
                                                 
                                                ctx.strokeStyle = alg.getRGBA(el.color,0);
                                                ctx.moveTo(x1,y1);
                                                ctx.lineTo(x2,y2);
                                                ctx.lineTo(x3,y3);
                                                ctx.lineTo(x1,y1);
                                                
                                                ctx.stroke();
                                                
                                                ctx.fillStyle = gr;
                                                 
                                                ctx.fill();

                            },
                            drawLight : function(){
                                        var _t = this, o=config, ctx= config.el.getContext("2d");
                                        _t.starLightData.lightArr.forEach(function(e,i){
                                        
                                        var para = _t.starLightData.para[i];
                                          
                                          e.forEach(function(el,idx){
                                                
                                                //控制光线长度,显示闪烁效果
                                                if(el.randomLong>=config.maxLightLong){
                                                         el.si = -1/2;
                                                }else if(el.randomLong<=config.minLightLong){
                                                         el.si = 1/2;
                                                } 
                                                el.randomLong = el.randomLong + el.si;
                                                
                                                //根据星星位置绘制光线
                                                el.x3 = alg.getCosVal(para.x,el.r+el.randomLong,el.a2-para.angle/(2*(o.space+1)));
 
                                                el.y3 = alg.getSinVal(para.y,el.r+el.randomLong,el.a2-para.angle/(2*(o.space+1)));
                                                
                                                
                                                var gr = ctx.createLinearGradient((el.x1+el.x2)/2,(el.y1+el.y2)/2,el.x3,el.y3);
                                                        
                                                gr.addColorStop(0, alg.getRGBA(para.color,1));
                                                gr.addColorStop(0.3, alg.getRGBA(para.color,0.5));
                                                gr.addColorStop(0.8, alg.getRGBA(para.color,0));

                                                ctx.beginPath();
                                                 
                                                ctx.strokeStyle = alg.getRGBA(para.color,0);
                                                ctx.moveTo(el.x1,el.y1);
                                                ctx.lineTo(el.x2,el.y2);
                                                ctx.lineTo(el.x3,el.y3);
                                                ctx.lineTo(el.x1,el.y1);
                                                
                                                ctx.stroke();
                                                
                                                ctx.fillStyle = gr;
                                                 
                                                ctx.fill();

                                          });
                                            
                                        });
 
                                    },
                            moveLight: function(el,idx){
                                var _t = this;
                                _t.starLightData.para[idx].x = el.x;
                                _t.starLightData.para[idx].y = el.y;

                                _t.starLightData.lightArr[idx].forEach(function(ele){

                                         ele.x1 = alg.getCosVal(el.x,ele.r,ele.a1);

                                         ele.y1 = alg.getSinVal(el.y,ele.r,ele.a1);
     
                                         ele.x2 = alg.getCosVal(el.x,ele.r,ele.a2);
                                                             
                                         ele.y2 = alg.getSinVal(el.y,ele.r,ele.a2);
                                                            
                                 });
                         },
		}
　　　　return light;
　　});