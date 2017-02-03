define(['alg','light','config'],function (alg,light,config){
　　　　var star = {
				starArr : [],
				drawStar : function(x,y,r,color,alpha){

                 		 var _t = this, _a = typeof alpha !=='number'?1:alpha;
                       	 var ctx=config.el.getContext("2d");
                         ctx.beginPath();
                       
                         ctx.arc(x,y,r,0,2*Math.PI);
                         ctx.stroke();

                         ctx.fillStyle = alg.getRGBA(color,_a);
                         ctx.fillRect(-1.5*r,-1.5*r,3*r,3*r);
                         ctx.fill();  
 
                },
                createStar : function(x,y,r){
                    var _t = this,
                        o = config,
                        starData = {
                            "x" : x,
                            "y" : y,
                            "r" : r,
                            'x1' : 0,
                            'y1' : 0,
                            'r1' : 80,
                            'speed' : alg.getRandomArbitrary(o.minSpeed,o.maxSpeed)/alg.getRandomArbitrary(10,1000), 
                            'a' : 0,
                            'color' : config.starColor
                        };
                        starData.r1 = alg.getPythagoras(starData.x-starData.x1,starData.y-starData.y1); 

                        starData.a = alg.getAtan2Val(y,x);
                        
                        return starData;
                            
                 },
                 moveStar : function(){
                                var _t = this;
                                _t.starArr.forEach(function(el,idx){

                                    //移动星星并绘制
                                    el.a+=el.speed;
                                                         
                                    el.x = alg.getCosVal(el.x1,el.r1,el.a);
                                    el.y = alg.getSinVal(el.y1,el.r1,el.a);
                                    _t.drawStar(el.x,el.y,el.r,el.color);

                                                        
                                    //移动光线并绘制
                                    light.moveLight(el,idx);

                                });
                            }
		}
　　　　return star;
　　});