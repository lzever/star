define(function (){
　　　　var alg = {
				         getRGBA : function(color,alpha){
                            var a = typeof alpha !=='number'?1:alpha;
                            return 'rgba('+color[0]+', '+color[1]+', '+color[2]+', '+a+')';
                         },
                         getCosVal : function(a,b,c){
                            return a + b * Math.cos(c * Math.PI/180);
                         },
                         getSinVal : function(a,b,c){
                            return a + b * Math.sin(c * Math.PI/180);
                         },
                         getOppositeSide : function(val,angle){
                            return val*Math.tan(angle);
                         },
                         getAtan2Val : function(a,b){
                            return Math.atan2(a,b)*180/Math.PI;
                         },
                         getPythagoras : function(a,b){
                            return Math.pow(Math.pow(a,2)+Math.pow(b,2),1/2);
                         },
                         getRandomArbitrary : function(min, max) {
                            return Math.floor(Math.random() * (max - min) + min);
                         },
                         pythagorean : function(a,b,c){
                            return Math.pow(Math.abs(a),2)+Math.pow(Math.abs(b),2)<Math.pow(c,2);
                         }
		}
　　　　return alg;
　　});