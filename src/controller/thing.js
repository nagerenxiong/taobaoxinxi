const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
    return this.display();
  }
  async addAction() {
    const user = this.model('thinkjsplus_category'); // controller 里实例化模型
    const data = await user.select();
    this.assign('category', data);
    return this.display();
  }

  async tianjiaAction() {
    const user = this.model('thinkjsplus_category'); // controller 里实例化模型
    const data = await user.select();
    this.assign('category', data);
    return this.display();
  }
  async updateAction() {
    var id=this.get().id;
    console.log(id);
    this.assign('id', id);
    return this.display();
  }
  async gupAction() {
    var id=this.get().id;
    console.log("gggggggg");
    console.log(id);
    var user = this.model('thinkjsplus_thing'); // controller 里实例化模型
    var xinxi = await user.select({where:"id='"+id+"'"});
    const dianpuListModel = this.model('thinkjsplus_category'); // controller 里实例化模型
    const dianpuList = await dianpuListModel.select();
    this.assign('dianpuList', dianpuList);
    console.log(xinxi[0])
    if(xinxi[0])
    xinxi[0]["title"]= xinxi[0]["title"].replace(/<br>/g,"\n");
    this.assign("xinxi", xinxi[0]);
    return this.display();
  }
 
  async saveAction() {
    let data = this.post();   
    data.title=data.title.replace(/\n/g,"<br>");
    console.log("data.title")
    console.log(data.title)
    if (think.isEmpty(data.id)) {
      //保存
      let res = await this.model("thinkjsplus_thing").add(data);
      if (res) {
        this.json({"succ":true});
      } else {
        this.json({"succ":false});
      }
    } else {
      //更新
      let res = await this.model("thinkjsplus_thing").update(data);
      if (res) {
        this.json({"succ":true});
      } else {
        this.json({"succ":false});
      }
    }
  }
  /**
   * 查看事情
   */
  async listAction() {

    let userinfo =await this.session('userinfo') 
    const user = this.model('thinkjsplus_thing'); // controller 里实例化模型
    const data = await user.select();
    return this.json({data:data,admin:userinfo.admin});
  }

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

  /**
   * 删除事情
   */
  async delAction() {
    let thingModel = this.model("thinkjsplus_thing");
    let posts = this.post("id");
    let delNums = thingModel.where({id: ['IN', posts]}).delete();
    if(delNums){
        this.json({"succ":true});
    }else{
        this.json({"succ":false});
    }
  }

};
