<template>
    <!--
    功能：
    1、自动生成n*n的矩阵数列，并随机排序
    2、自动记录游戏时长，并传回父及组件
    使用方法：
    1、template里
    <DigitForest :para="para"/>
    2、script里
    data(){
    return {
      para:{
        duration: 0,//子组件传回的数据：时长
        grade: 4 //级别最大值9、向子组件下发数据
      }
      }
    }
    3、返回值在para里，duration：游戏时长
    -->
    <div>
        <h1>{{title}}</h1>
        <div class="controlBar" @click = "startGame">
            <b class="btnstart" v-show = "btnTitle!=''">{{btnTitle}}</b>
            <b>耗时：{{showTime}}秒</b>
        </div>
        <div :style = "box">
            <div v-for = "itm in aryForms"
                 :key = "itm.id" class="forms" :class = "{formsOk:meIdx>itm}"
                 @click = "chooseMe(itm)">{{itm}}</div>
        </div>
    </div>
</template>
<script>
    //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
export default {
    name:"DigitForest",
    //组件私有数据（必须是function，而且要return对象类型）
    data () {
        return {
            title: '数字森林',
            btnTitle:'开始游戏',
            //aryForms:[],//方块数字数组
            meIdx:0,//标识当前应该点击的数组序号
            beginTime:0,
            showTime:0,
            timeId:0,//计时器ID
            bStart:false,
        }
    },
    //父组件传递过来的数据（两种方式声明：1.数组 2.对象）
     props: {
        para: {
          duration: Number,
          grade: Number
        }
    },
     //计算属性
     computed: {
         box(){
             return {
                 width:102*this.grade + "px",
                 height:102*this.grade + "px",
                 margin:"auto"
             }
         },
         aryForms(){
             return this.generateAry(this.grade).sort(()=>Math.random()-0.5);
         },
         grade(){
             let n = Math.min(9,this.para.grade);
             return n;
         }
    },
//监听
    watch: {
        grade(){
            this.meIdx = 0;
            this.bStart =false;
            this.btnTitle='开始游戏'
            clearInterval(this.timeId);
        }
    },
        //函数集，自己封装，便于开发使用
    methods: {
        //游戏开始
        startGame(){
            this.meIdx = 0;
            this.btnTitle = '';
            this.bStart = true;
            //开始计时
            this.beginTime = new Date().valueOf();
            this.timeId = setInterval(()=>{
                let nowTm = new Date().valueOf();
                this.showTime = parseFloat((nowTm - this.beginTime)/1000) ;
            },200)
        },
        //生成数组
        generateAry(n){
            let i = 0 ;
            let nn = n*n;
            let ary = [];
            while(i < nn){
                ary.push(i++);
            }
            return ary;
        },
        //点击数字，处理
        chooseMe(itm){
            if(!this.bStart)return;
            if(itm == this.meIdx){
                this.meIdx ++;
            }else{
                return;
            }
            //游戏结束
            if(itm == this.aryForms.length-1){

                clearInterval(this.timeId);
                setTimeout(()=>alert('游戏结束'),200);

                this.btnTitle = '开始游戏';
                this.bStart = false;
                this.para.duration = this.showTime;
            }
        }
    },
        //生命周期钩子：实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
    beforeCreated () {
        //console.log('component before created')
     },
        //生命周期钩子：组件实例完成创建之后调用
    created () {
        //console.log('component created');
        //let grade = this.para.grade;
       // this.aryForms = this.generateAry(grade).sort(()=>Math.random()-0.5);

    },
        //生命周期钩子：组件实例渲染完成时调用
    mounted () {
        //console.log('component mounted')

    },
    destoryed(){
        clearInterval(this.timeId);
    }

}
</script>
<style scoped>
    /**使用scss编写样式，既可提高开发效率，也方便维护
*  scoped省略后，该样式片段会应用到页面全局
*  支持import语法引入css文件
*/
    .controlBar{
        width:100%;
        height:60px;
        margin: 10px auto;
    }
    .forms{
        width: 100px;
        height:100px;
        background-color: #f40;
        display: inline-block;
        margin:1px;
        font-size:40px;
        font-weight:600;
        line-height: 100px;
        cursor: pointer;
        -webkit-border-radius:;
        -moz-border-radius:;
        border-radius:8px;
    }
    .formsOk{
        color: #FFF;
    }

    b{
        margin:20px;
        font-size:32px;
        font-weight:500;
    }

    .btnstart{
        background: #Fc0;
        -webkit-border-radius:8px;
        border-radius:8px;
        padding:10px 20px;
        cursor: pointer;
    }
</style>