const Base = require('./base.js');

module.exports = class extends Base {
  indexAction() {
      return this.display();
  }

  abcdefg667099089hijklmnopqAction(){
    return this.display();
  }

  kjkdaldadsfadljAction(){
      return this.display();
  }

  async listAction() {
    const user = this.model('thinkjsplus_user'); // controller 里实例化模型
    const data = await user.select();
    console.log(data);
    return this.json(data);
  }

  async saveAction() {
    let data = this.post();
    console.log(data);
    console.log("zzzzzzzzzzzzzzzz");
    if (think.isEmpty(data.id)) {
      //保存
      let res = await this.model("thinkjsplus_user").add(data);
      if (res) {
        this.json({"succ":true});
      } else {
        this.json({"succ":false});
      }
    } else {
      //更新
      let res = await this.model("thinkjsplus_user").update(data);
      if (res) {
        this.json({"succ":true});
      } else {
        this.json({"succ":false});
      }
    }
  }

    /**
   * 删除事情
   */
  async delAction() {
    let user = this.model("thinkjsplus_user");
    let posts = this.post("id");
    let delNums = user.where({id: ['IN', posts]}).delete();
    if(delNums){
        this.json({"succ":true});
    }else{
        this.json({"succ":false});
    }
  }

  /**
   * 登录
   */
  async loginAction(){
      if (this.isPost){//判断是否发送信息给后台了，post数据过来.注意：isPost中的P是大写，js是对大小写敏感的。  
             let username = this.post('username');//获取用户名给username变量  
             let password = this.post('password');  
             let data = await this.model('thinkjsplus_user').where({username:username,password:password}).find();//到数据库中去查找看是否有数据（用户名密码同时相符）  
             if (think.isEmpty(data)){//这里我直接用isEmpty居然不能用。查了下资料需要用think.isEmpty()  
                  return this.fail(403,'账号密码错误！请重新填写');//登录不成功，返回错误信息。  
             }else{  
                  this.session('userinfo',data); 
                  return this.redirect('/index/index');//登录成功将用户信息写入session，返回到user首页。  
             }  
      }  
      return this.display();  
  }
  /**
   * 注销
   */
  async logoutAction(){  
        await this.session(null); 
        return this.redirect('/index/index');//登录成功将用户信息写入session，返回到user首页。  
  }  
};
