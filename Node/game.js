// backend game
// kirat's kidney game - https://gist.github.com/hkirat/7b78356bd28022aecd476d29f3e6645f, pdf - https://100x-b-mcdn.akamai.net.in/cohort-2-slides/express2.pdf

const express = require('express')
const app = express()
const port = 3000  

const team = [{    // array of object teams, initialized with team 1 with 10  players and 5 in field
    players : 10,
    in_field : 5
}]

// middleware to run post's body input
app.use(express.json());

app.get('/', function(req, res){  //get - check the stats
    let tot_players = 0;
    let players_in_field = 0;
    for(let i =0; i<team.length; i++){
        tot_players = tot_players + team[i].players
        players_in_field = players_in_field + team[i].in_field
    }
    res.json({  // js object notation
        team,
        tot_players,
        players_in_field
    })
})

app.post('/', function(req, res){  // post - adds something , here I will add 10 players
    const newTeam = req.body; // Expecting { players: X, in_field: Y }
    if (typeof newTeam.players !== 'number' || typeof newTeam.in_field !== 'number') {
        return res.status(400).json({ message: "Invalid team data" });
    }
    team.push(newTeam);
    let tot_players_updated = 0
    let players_in_field_updated = 0
    for(let i =0; i<team.length; i++){
        tot_players_updated = tot_players_updated + team[i].players
        players_in_field_updated = players_in_field_updated + team[i].in_field
    }
    res.json({  // js object notation
        team,
        tot_players_updated,
        players_in_field_updated
    })
})

app.put('/', function(req,res){ // put is to update in the existing fields
    // gets the average of tot players in field and removes that number from each team
    let tot_playersinfield1 = 0
    for(let i=0; i<team.length; i++){
        tot_playersinfield1 = tot_playersinfield1 + team[i].in_field
    }
    let avg = tot_playersinfield1 / team.length
    
    for(let i = 0; i<team.length; i++){
        team[i].players = Math.max(0, team[i].players - avg);
        team[i].in_field = Math.max(0, team[i].in_field - avg);
    }

    res.json({
        team
    })
})

app.delete('/', function(req, res){ // team with lowest players gets deleted
    if (team.length === 0) {
        return res.status(404).json({ message: "No teams to delete" });
    }

    // Find index of team with minimum players
    let minPlayers = team[0].players;
    let minIndex = 0;
    for (let i = 1; i < team.length; i++) {
        if (team[i].players < minPlayers) {
            minPlayers = team[i].players;
            minIndex = i;
        }
    }

    // Remove the team with the least players
    const removedTeam = team.splice(minIndex, 1);

    res.json({
        message: "Team deleted",
        removedTeam,
        team
    });
})

app.listen(port)