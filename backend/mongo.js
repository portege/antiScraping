var start = new Date().getTime();
var y = db.web.find({"crawled": {$ne: 1}}).limit(5);
for(var t = 0; t < y.length(); t++){
    var criteria = {
                        "host": y[t]["host"],
                        "path": y[t]["path"],
                        "time": {"$gte": y[t]["time"],
                                  "$lt": new Date(y[t]["time"].getTime()+3*60000)
                                }
                    };
                    
        var png=db.png.count(criteria);
        var js=db.js.count(criteria);

        var score=0;
        if (js<1)
                score+=1;
        if (png<1)
                score+=2;

        db.summary.update(
                { "host": y[t]["host"] },
                {
                        $set: {"host": y[t]["host"]},
                        $inc: {"request": 1, "score": score},
                },
                { upsert: true }
        )

        var j = y[t]["_id"].valueOf();
        db.web.update(
                { "_id": ObjectId(j) },
                {
                        $set: {"crawled": 1}
                }
        )
        print("process # "+t);
        print("png: "+png+" js: "+js);
        print("host: "+y[t]["host"]+" score: "+score);
}
var end = new Date().getTime();
var time = end - start;
print(time);
