define(['alg','star','light','config'],function (alg,star,light,config){
     
　　　　var meteor = {
                            meteorArr : [],
				            creatMeteor : function(){
                                var _t= this,
                                    o = config,
                                    n = alg.getRandomArbitrary(o.meteorNumber/4,o.meteorNumber),
                                    elWidth = config.el.offsetWidth,
                                    elHeight = config.el.offsetHeight;
                                while(n>0){
                                            var r = alg.getRandomArbitrary(o.minMeteor,o.maxMeteor),
                                                x = alg.getRandomArbitrary(-elWidth/2,elWidth/2),
                                                y = alg.getRandomArbitrary(0,-elHeight),
                                                meteor = star.createStar(x,y,r);
                                                meteor.speed = meteor.speed*o.meteorSpeed;
                                                meteor.a = config.meteorAngle;
                                                meteor.alpha = 0;
                                                _t.meteorArr.push(meteor);
                                            n--;
                                 }
                                 
                                 
                            },
                            moveMeteor : function(){
                                    var _t = this;
                                    _t.meteorArr.forEach(function(elm,index){
                                                 
                                                    if(elm.alpha>=1){
                                                        elm.r -= 0.1*elm.speed/5;
                                                    }else{
                                                        elm.alpha = elm.alpha + 0.05;
                                                    }
                                                     
                                                    if(elm.r<=0){
                                                        _t.meteorArr.splice(index,1);
                                                        return;
                                                    }

                                                    elm.x -= elm.speed;
                                                    elm.y = elm.y - alg.getOppositeSide(elm.speed,elm.a);
                                                     
                                                    star.drawStar(elm.x,elm.y,elm.r,elm.color,elm.alpha);
                                                   
                                                    light.drawMeteorLight(elm);
                                                    
                                    });
                            }
		}
　　　　return meteor;
　　});