/**
 * @file 入口模块
 * @author leeight(leeight@gmail.com)
 */

define(function (require) {

    /**
     * Basic Console Compatibility
     */
    window.console = window.console || {};
    console.log = console.log || function () {};
    console.debug = console.debug || function () {};
    console.info = console.info || function () {};
    console.warn = console.warn || function () {};
    console.error = console.error || function () {};

    // /**
    //  * 引入各业务模块的Action配置
    //  * 如果期望添加action时工具自动配置，请保持requireConfigs名称不变
    //  *
    //  * @inner
    //  */
    // function requireConfigs() {
    //     require('../lostpv/config');
    //     require('../idc/config');
    //     require('../vip/config');
    //     require('../domain/config');
    //     require('../events/config');
    // }

    // requireConfigs();

    /**
     * 初始化系统启动
     */
    function init() {
        require('../userInfo').init();									//用户基本信息 【饼图】
        require('../userMap').renderMap();						//用户地域分布
        require('../topicCloud').renderCloud();				//关键词
        require('../recentUser').renderUserInfo();			 //最近参与用户
        //require('../emotionAny').renderEmotionAny();	//话题量随时间走势
        require('../emotionAve').renderEmotionAve();		//情感平均值【仪表盘】
        //require('../emotionDis').renderEmotionDis();		//地域情感值
        //require('../forwardTimeTrend').forwordTrend();  //转发时间走势
        require('../userInterct').interactTrend();				//互动微博时间走势
        require('../weiboContent').renderContent();		//微博内容
    }

    return {
        init: init
    };
});
