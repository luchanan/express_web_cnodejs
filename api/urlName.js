// 全局接口名
const urlName = {
    index: 'topics',
    topicDetail: 'topic/{0}',
    tokenLogin: 'accesstoken',
    addTopic: 'topics',
    updateTopic: 'topics/update',
    topicCollect: 'topic_collect/collect',
    topicCancel: 'topic_collect/de_collect',
    userCollectTopic: 'topic_collect/{0}',
    addReplyTopic: 'topic/{0}/replies',
    likeReplyTopic: 'reply/{0}/ups',
    getUserInfo: 'user/{0}',
    messageCount: 'message/count',
    messageList: 'messages',
    messageReadAll: 'message/mark_all',
    messageReadOne: 'message/mark_one/{0}'
}
module.exports = urlName
