define(['alg','config'],function (alg,config){
            
    　　　　var tree = {
                treeArr : [],
                creatTree : function(x,y){

                    var o = config,
                        treeData = {
                            power :  alg.getRandomArbitrary(o.treeMinPower,o.treeMaxPower),
                            x1 : x,
                            y1 : y,
                            x2 : x,
                            y2 : y,
                            x3 : x,
                            y3 : y,
                            root : {'leftPoint':[],'rightPoint':[]},
                            branches : [],
                            growthSpeed : alg.getRandomArbitrary(o.treeMinPower,o.treeMaxPower)*o.treeGrowthSpeed/9.8,
                            growthAngle : 0,
                            color : o.treeColor
                            
                        }
                        //计算能量值接近整除的分母
                        treeData.powerDown = parseInt((1%treeData.power/treeData.power+1/treeData.power)*1000)/100000;
                        this.treeArr.push(treeData);

                },
                treeGrowth : function(treeData){

                    var td = treeData;
                      
                    
                    td.power -= treeData.powerDown;
                    td.x1 -= td.growthSpeed/50;
                    td.x2 += td.growthSpeed/50;
                    
                    //在能量值的整数位生成分支
                    if(Math.floor(td.power*100)/100%1==0&&td.power-td.powerDown<parseInt(td.power)){
                        
                        //转换数据格式以复制值
                        var rootData =JSON.stringify({'x':td.x3,'y':td.y3}),
                            branchesData = JSON.stringify({'level':2,'x1':td.x3,'y1':td.y3,'x2':td.x3,'y2':td.y3,'x3':td.x3,'y3':td.y3,'branches':[]});
                        td.root.leftPoint.push(JSON.parse(rootData));
                        td.root.rightPoint.push(JSON.parse(rootData));

                        td.branches.push(JSON.parse(branchesData));
                        td.branches.push(JSON.parse(branchesData));

                        //随机角度
                        td.growthAngle = alg.getRandomArbitrary(19,20);
                        if(alg.getRandomArbitrary(1,3)>1){
                            td.growthAngle=-td.growthAngle;
                        }

                        //给分支再创建分支
                        if(td.power>1&&td.branches.length>2){
                            td.branches.forEach(function(el,idx){
                                var data = JSON.stringify({'level':3,'x1':el.x3,'y1':el.y3,'x2':el.x3,'y2':el.y3,'x3':el.x3,'y3':el.y3,'branches':[]});
                                el.branches.push(JSON.parse(data));
                            });
                        }
                        
                    }
                     
                    td.y3 -= td.growthSpeed/2;

                    if(td.growthAngle!==0){
                        td.x3 =td.root.leftPoint[td.root.leftPoint.length-1].x + (td.y3-td.root.leftPoint[td.root.leftPoint.length-1].y)*Math.tan(td.growthAngle);
                    }


                },
                drawTree : function(){
                    var _t = this;
                    _t.treeArr.forEach(function(el){
                         
                        if(el.power>0){
                            _t.treeGrowth(el);
                        }
 
                        _t.drawTreeRoot(el);

                        _t.drawTreeBranches(el);
                    });
                    
                },
				drawTreeRoot : function(tree){
                        var ctx=config.el.getContext("2d");
                        ctx.beginPath();
                                                 
                        ctx.strokeStyle = alg.getRGBA(tree.color,1);
                        ctx.moveTo(tree.x1,tree.y1);
                        ctx.lineTo(tree.x2,tree.y2);
 
                        //把节点生长的计算放在此处减少循环带来的性能问题
                        tree.root.leftPoint.forEach(function(el,idx){

                            if(tree.power>0){
                                el.x += tree.growthSpeed/50;
                                el.y -= tree.growthSpeed/20;
                            }
                            
                            ctx.lineTo(el.x,el.y);
                            
                        });

                        ctx.lineTo(tree.x3,tree.y3);
 
                        var rpLength = tree.root.rightPoint.length;
                        for(var i=rpLength-1;i>-1;i--){
                            if(tree.power>0){
                                tree.root.rightPoint[i].x -= tree.growthSpeed/50;
                                tree.root.rightPoint[i].y -= tree.growthSpeed/20;
                            }
                            ctx.lineTo(tree.root.rightPoint[i].x,tree.root.rightPoint[i].y);
                        }

                        ctx.lineTo(tree.x1,tree.y1);
                        ctx.stroke();
                        //ctx.fill();
                },
                drawTreeBranches : function(tree){
                            var ctx=config.el.getContext("2d"), _t = this;
                            
                            tree.branches.forEach(function(el,idx){

                                el.idx = idx;
                                _t.drawTreeBranchesFn(el,tree.growthSpeed,tree.power);


                                if(el.branches&&el.branches.length>0){

                                    el.branches.forEach(function(elb,idxb){
                                         
                                        elb.idx = idxb;
                                         
                                        _t.drawTreeBranchesFn(elb,tree.growthSpeed,tree.power);
                                    });
                                    
                                }
                            });
                        
                },
                drawTreeBranchesFn : function(el,growthSpeed,power){

                                var ctx=config.el.getContext("2d");
                                if(power>0){

                                    if(el.level===2){
                                        el.y1 -= growthSpeed/50;
                                        el.y2 -= growthSpeed/20;

                                        el.y3 -= growthSpeed/alg.getRandomArbitrary(3,6);

                                        if(el.idx%2===0){
                                            el.x3 += growthSpeed/6*Math.max(power,0.9);
                                        }else{
                                            el.x3 -= growthSpeed/6*Math.max(power,0.9);
                                        }
                                    }

                                    if(el.level===3){
                                         el.x1 -= growthSpeed/50;
                                         el.x2 += growthSpeed/50;

                                         if(el.idx%2===0){
                                            el.y3 += growthSpeed/6*Math.max(power,0.9);
                                         }else{
                                            el.y3 -= growthSpeed/6*Math.max(power,0.9);
                                         }
                                    }

                                    
                                }
                                
                                ctx.beginPath();
                                ctx.moveTo(el.x1,el.y1);
                                ctx.lineTo(el.x2,el.y2);
                                ctx.lineTo(el.x3,el.y3);
                                ctx.lineTo(el.x1,el.y1);
                                ctx.stroke();
                }
		}
　　　　return tree;
　　});