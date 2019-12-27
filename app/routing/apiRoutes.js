var friendData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    app.post("/api/friends", function(req, res) {
        console.log(req.body);

        var user = req.body;
        var userScores = [];

        for(i=1; i <= 10; i++) {
            var questionNum = "question" + i.toString();
            var scoreNum = parseInt(user[questionNum]);
            userScores.push(scoreNum);
        }

        console.log(userScores);

        var diffArray = [];
        var difference = 0;

        for (var i = 0; i < friendData.length; i++) {
            
            for (var j = 0; j < friendData[i].scores.length; j++) {
                if (friendData[i].scores[j] >= userScores[j]) {
                    var qDiff = friendData[i].scores[j] - userScores[j];
                } else {
                    var qDiff = userScores[j] - friendData[i].scores[j];
                }
                difference += qDiff;
            }

            diffArray.push(difference);
            difference = 0;
        }

        console.log(diffArray);

        var lowestIndex = 0;

        for (var i = 1; i < diffArray.length; i++) {

            if (diffArray[i] < diffArray[lowestIndex]) {
                lowestIndex = i;
            }

        }

        console.log(friendData[lowestIndex]);

        res.json(friendData[lowestIndex]);
    });
}