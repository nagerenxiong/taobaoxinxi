
module.exports = class extends think.Controller{
  
  async getXinxiAction(){
    let data = this.post();
    console.log(data);
    var title=data.title;
    var dianpu=data.dianpu;
    var shangpinId=data.shangpinId;
    var user = this.model('thinkjsplus_thing'); // controller 里实例化模型
    var xinxiById = await user.select({where:"shangpinId like '%"+shangpinId+"%' and category_name='"+dianpu+"'"});
    if(!think.isEmpty(xinxiById)){
      console.log("xinxiById")
      console.log(xinxiById)
      return this.json(xinxiById);
    }
    else{
      var xinxiByTitle = await user.select({where:"title like '%"+title+"%' and category_name='"+dianpu+"'"});
      if(!think.isEmpty(xinxiByTitle)){
        // console.log("xinxiByTitle")
        // console.log(xinxiByTitle)
        // var fTitle=xinxiByTitle[0].title;
        // var fTitleArry=fTitle.split("<br>");
        // var dijige=0;
        // for (let i = 0; i < fTitleArry.length; i++) {
        //   if(title==fTitleArry[i]){
        //     dijige=i;
        //   }
        // }
        var fshangpinI=xinxiByTitle[0]["shangpinId"];
        if(fshangpinI.indexOf(shangpinId)<0){
          shangpinId=fshangpinI+shangpinId+"\n";
          let res = await user.where("title like '%"+title+"%' ").update({"shangpinId":shangpinId});
        }
        
        return this.json(xinxiByTitle);
      }
      else{
        console.log(2222222222);
        return this.json([]);
      }
    }
  } 

};
