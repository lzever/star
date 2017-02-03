define(function (){
　　　　var config = {
                
                'meteorNumber': 10,
                'meteorAngle' : -45,
                'meteorSpeed' : 500,
                'meteorRecreate' : 5,
                "minMeteor" : 1,
                "maxMeteor" : 3,

                "starNumber" : 50,
                "minStar" : 2,
                "maxStar" : 5,
                'maxSpeed' : 7,
                'minSpeed' : 5,
                'starColor' : [255,255,255], //R,G,B

                'maxLightNumber' : 30, //光点边缘最大光线数量
                'minLightNumber' : 4, //光点边缘最小光线数量
                'maxLightLong' : 7, //光线最大长度
                'minLightLong' : 3, //光线最小长度
                'space' : 2, //光线间距


                'treeMinPower' : 3,
                'treeMaxPower' : 5,
                'treeGrowthSpeed' : 3,
                'treeColor' : [255,255,255], //R,G,B

                "time":new Date().getTime(),
                'moonData' : [0,0,60,[255,255,255]], //X,Y,R,color
                'fps' : 30
            }
　　　　return config;
　　});