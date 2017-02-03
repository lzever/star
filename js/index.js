define(['config','star', 'meteor', 'light','alg','tree'], function (config, star, meteor, light, alg, tree){

/*!
 *
 *  @author zhenhui
 *  @星空
 *  
 */  
     
    var starrySkyFn = function(id,opt){
            var _t= this;
            _t.option = config;
             
            //如果传了其他参数则浅拷贝
            if(opt){
                    for(var key in _t.option){
                        if(opt[key]!=="undefined"){
                            _t.option[key] = opt[key];
                        }
                    }
            }
  
            config.el=document.getElementById(id);
            
            _t.ctx= config.el.getContext("2d");
             
            _t.ctx.translate(config.el.width/2,config.el.height/2);
            _t.drawInit();
    }
    
    starrySkyFn.prototype = {
                            drawInit : function(){
                                        var _t= this,
                                            o = _t.option,
                                            elWidth = config.el.offsetWidth,
                                            elHeight = config.el.offsetHeight;

                                        
                                        
                                        while(o.starNumber>0){
                                            //获取随机周长
                                            var r = alg.getRandomArbitrary(o.minStar,o.maxStar),
                                            //获取随机X轴
                                                x = alg.getRandomArbitrary(-elWidth/2,elWidth/2),
                                            //获取随机Y轴
                                                y = alg.getRandomArbitrary(-elHeight/2,elHeight/2),
                                            //记录数据并绘制星星
                                            data = star.createStar(x,y,r);
                                            star.starArr.push(data);

                                            //创建光线数据
                                            light.creatLight(x,y,r,data.color,Math.round(r*alg.getRandomArbitrary(1,6)/2));
                                         
                                            o.starNumber--;
                                       }

                                        
                                     
                                       _t.aminate();

                                       setTimeout(function(){
                                            meteor.creatMeteor();
                                       },1000);

                                       //tree.creatTree(200,250);

                                       _t.option.time = new Date().getTime() - _t.option.time;
                                       console.log(_t.option.time);

                            },
                            aminate : function(){
                                            var _t = this, m = _t.option.moonData;
                                            //清除星空
                                            _t.ctx.clearRect(-config.el.width/2,-config.el.height/2,config.el.width,config.el.height);

                                            //流星数量少于5个则重新创建
                                            if(meteor.meteorArr.length<config.meteorRecreate){
                                                setTimeout(function(){

                                                  if(meteor.meteorArr.length<config.meteorRecreate){
                                                    meteor.creatMeteor();
                                                  }
                                                    
                                               },alg.getRandomArbitrary(10,3000));
                                            }

                                            star.moveStar();
 
                                            meteor.moveMeteor();

                                            //tree.drawTree();

                                            _t.drawMoon(m[0],m[1],m[2],m[3]);
                                                
                                            light.drawLight();

                                            setTimeout(function(){
                                                _t.aminate();
                                            },1000/_t.option.fps);
                                             
                                        },
                             

                         drawMoon : function(x,y,r,color,callback){
                                                     
                                                    var _t = this,
                                                    gr = _t.ctx.createRadialGradient(x, y, r/2, x, y, r);
                                                    
                                                    gr.addColorStop(0, alg.getRGBA(color,0.9));

                                                    gr.addColorStop(0.99, alg.getRGBA(color,0.5));
                                                      
                                                    gr.addColorStop(1, alg.getRGBA(color,0));
                                                     
                                                    _t.ctx.beginPath();  

                                                    _t.ctx.arc(x,y,r,0,2*Math.PI); 
                                                    _t.ctx.strokeStyle = alg.getRGBA(color);
                                                    _t.ctx.stroke(); 

                                                    _t.ctx.fillStyle = gr;
                                                    _t.ctx.fillRect(-1.5*r,-1.5*r,3*r,3*r);
                                                    _t.ctx.fill();  
                                                      
                                                    if(typeof(callback)==='function'){
                                                        callback();
                                                    }
                         }

    }
 
     return {
		starrySkyFn : starrySkyFn
　　　　};

　　　　 
});