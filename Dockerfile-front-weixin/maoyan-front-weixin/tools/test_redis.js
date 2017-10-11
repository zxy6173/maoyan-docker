var Redis = require('ioredis');
var redis = new Redis(6379,'127.0.0.1');

redis.get('students').then(function(result){
    console.log("result",typeof result);
})

redis.sadd("users",JSON.stringify([{id:1,username:"abc",pwd:"123123"},{id:2,username:"cba",pwd:"123123"}]));
redis.sadd("students",{id:1,username:"abc",pwd:"123123"});
// redis.set("students",{id:1,username:"abc",pwd:"123123"});
// console.log(redis.hmset);
// redis.smembers("students").then(function(result){
//     console.log("result",result);
// });
