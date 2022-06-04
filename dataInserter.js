/*
    Assignment - Chan Wai Pong James 180609303.
    **mongodb needed.
    **FOR INSERT ONLY
*/

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("180609303_moviedb");

    // comment this out if you want to insert in FIRST TIME
    dbo.collection('s180609303_movies').drop();
    // comment this out if you want to insert in FIRST TIME
    dbo.collection('s180609303_users').drop();
    
    /*
        { 
            movieID: , 
            title: "", 
            description: "", 
            running_time: "", 
            release_date: "", 
            certification: "",
            genre: [],
            poster: "",
            poster2: "_1.jpg",
            trailer: "",
            trailer_emb: "",
            Cast: [
                {
                    director: "",
                    writers: "",
                    actor: "",
                }
            ],
            rate: [],
        },
    */

    var movieData = [
        { 
            movieID: 1, 
            title: "The Batman", 
            description: "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.", 
            running_time: "2hrs 56mins", 
            release_date: "March 4, 2022", 
            certification: "PG-13",
            genre: ["Action", "Crime", "Drama"],
            poster: "img/poster/movieposter2.jpg",
            poster2: "img/poster/movieposter2_1.jpg",
            trailer: "https://youtu.be/mqqft2x_Aa4",
            trailer_emb: "https://www.youtube.com/embed/mqqft2x_Aa4",
            Cast: [
                {
                    director: "Matt Reeves",
                    writers: "Matt Reeves, Peter Craig, Bill Finger",
                    actor: "Robert Pattinson, Zoë Kravitz, Jeffrey Wright, Colin Farrell",
                }
            ],
            rate: [4.5, 5, 3.5, 4, 3]
        },
        { 
            movieID: 2, 
            title: "Turning Red", 
            description: "A 13-year-old girl named Meilin turns into a giant red panda whenever she gets too excited.", 
            running_time: "1hr 40mins", 
            release_date: "March 11, 2022", 
            certification: "PG",
            genre: ["Animation", "Adventure", "Comedy"],
            poster: "img/poster/movieposter1.jpg",
            poster2: "img/poster/movieposter1_1.jpg",
            trailer: "https://youtu.be/XdKzUbAiswE",
            trailer_emb: "https://www.youtube.com/embed/XdKzUbAiswE",
            Cast: [
                {
                    director: "Domee Shi",
                    writers: "Domee Shi, Julia Cho, Sarah Streicher",
                    actor: "Rosalie Chiang, Sandra Oh, Ava Morse, Hyein Park",
                }
            ],
            rate: [4.5, 5, 3, 3]
        },
        { 
            movieID: 3, 
            title: "Jurassic World Dominion", 
            description: "Four years after the destruction of Isla Nublar, dinosaurs now live--and hunt--alongside humans all over the world. This fragile balance will reshape the future and determine, once and for all, whether human beings are to remain the apex predators on a planet they now share with history's most fearsome creatures.", 
            running_time: "COMING SOON", 
            release_date: "June 10, 2022", 
            certification: "PG-13",
            genre: ["Action", "Adventure", "Sci-Fi"],
            poster: "img/poster/movieposter3.jpg",
            poster2: "img/poster/movieposter3_1.jpg",
            trailer: "https://youtu.be/fb5ELWi-ekk",
            trailer_emb: "https://www.youtube.com/embed/fb5ELWi-ekk",
            Cast: [
                {
                    director: "Colin Trevorrow",
                    writers: "Colin Trevorrow, Emily Carmichael, Derek Connolly",
                    actor: "Dichen Lachman, Bryce Dallas Howard, Chris Pratt, Daniella Pineda",
                }
            ],
            rate: [4.5, 3, 5]
        },
        { 
            movieID: 4, 
            title: "The Lost City", 
            description: "A reclusive romance novelist on a book tour with her cover model gets swept up in a kidnapping attempt that lands them both in a cutthroat jungle adventure.", 
            running_time: "1hr 52mins", 
            release_date: "March 17, 2022", 
            certification: "PG-13",
            genre: ["Action", "Adventure", "Comedy"],
            poster: "img/poster/movieposter4.jpg",
            poster2: "img/poster/movieposter4_1.jpg",
            trailer: "https://youtu.be/nfKO9rYDmE8",
            trailer_emb: "https://www.youtube.com/embed/nfKO9rYDmE8",
            Cast: [
                {
                    director: "Aaron Nee, Adam Nee",
                    writers: "Oren Uziel, Dana Fox, Adam Nee",
                    actor: "Sandra Bullock, Channing Tatum, Daniel Radcliffe, Da'Vine Joy Randolph",
                }
            ],
            rate: [5, 3.5, 4, 3]
        },
        { 
            movieID: 5, 
            title: "Lightyear", 
            description: "The story of Buzz Lightyear and his adventures to infinity and beyond.", 
            running_time: "COMING SOON", 
            release_date: "June 17, 2022", 
            certification: "COMING SOON",
            genre: ["Animation", "Adventure", "Action"],
            poster: "img/poster/movieposter5.jpg",
            poster2: "img/poster/movieposter5_1.jpg",
            trailer: "https://youtu.be/BwZs3H_UN3k",
            trailer_emb: "https://www.youtube.com/embed/BwZs3H_UN3k",
            Cast: [
                {
                    director: "Angus MacLane",
                    writers: "Pete Docter, Andrew Stanton, John Lasseter",
                    actor: "Taika Waititi, Keke Palmer, Chris Evans",
                }
            ],
            rate: [4.5, 4, 3, 3]
        },
        { 
            movieID: 6, 
            title: "The Adam Project", 
            description: "After accidentally crash-landing in 2022, time-traveling fighter pilot Adam Reed teams up with his 12-year-old self for a mission to save the future.", 
            running_time: "1h 46mins", 
            release_date: "March 11, 2022", 
            certification: "PG-13",
            genre: ["Comedy", "Adventure", "Action"],
            poster: "img/poster/movieposter6.jpg",
            poster2: "img/poster/movieposter6_1.jpg",
            trailer: "https://youtu.be/IE8HIsIrq4o",
            trailer_emb: "https://www.youtube.com/embed/IE8HIsIrq4o",
            Cast: [
                {
                    director: "Shawn Levy",
                    writers: "Jonathan Tropper, T.S. Nowlin, Jennifer Flackett",
                    actor: "Ryan Reynolds, Walker Scobell, Mark Ruffalo, Jennifer Garner",
                }
            ],
            rate: [4.5, 4, 3, 2, 4]
        },
        { 
            movieID: 7, 
            title: "Spider-Man: No Way Home", 
            description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.", 
            running_time: "2hrs 28mins", 
            release_date: "December 17, 2021", 
            certification: "PG-13",
            genre: ["Action", "Adventure", "Fantasy"],
            poster: "img/poster/movieposter7.jpg",
            poster2: "img/poster/movieposter7_1.jpg",
            trailer: "https://youtu.be/JfVOs4VSpmA",
            trailer_emb: "https://www.youtube.com/embed/JfVOs4VSpmA",
            Cast: [
                {
                    director: "Jon Watts",
                    writers: "Chris McKenna, Erik Sommers, Stan Lee",
                    actor: "Tom Holland, Zendaya, Benedict Cumberbatch, Jacob Batalon",
                }
            ],
            rate: [5, 3.5, 4, 3]
        },
        { 
            movieID: 8, 
            title: "X", 
            description: "In 1979, a group of young filmmakers set out to make an adult film in rural Texas, but when their reclusive, elderly hosts catch them in the act, the cast find themselves fighting for their lives.", 
            running_time: "1h 45mins", 
            release_date: "March 18, 2022", 
            certification: "R",
            genre: ["Horror"],
            poster: "img/poster/movieposter8.jpg",
            poster2: "img/poster/movieposter8_1.jpg",
            trailer: "https://youtu.be/Awg3cWuHfoc",
            trailer_emb: "https://www.youtube.com/embed/Awg3cWuHfoc",
            Cast: [
                {
                    director: "Ti West",
                    writers: "Ti West",
                    actor: "Mia Goth, Jenna Ortega, Brittany Snow, 	Kid Cudi",
                }
            ],
            rate: [4.5, 5, 3.5, 3]
        },
        { 
            movieID: 9, 
            title: "West Side Story", 
            description: "An adaptation of the 1957 musical, West Side Story explores forbidden love and the rivalry between the Jets and the Sharks, two teenage street gangs of different ethnic backgrounds.", 
            running_time: "2hrs 36mins", 
            release_date: "December 10, 2021", 
            certification: "PG-13",
            genre: ["Crime", "Drama", "Musical"],
            poster: "img/poster/movieposter9.jpg",
            poster2: "img/poster/movieposter9_1.jpg",
            trailer: "https://youtu.be/A5GJLwWiYSg",
            trailer_emb: "https://www.youtube.com/embed/A5GJLwWiYSg",
            Cast: [
                {
                    director: "Steven Spielberg",
                    writers: "Tony Kushner, Arthur Laurents",
                    actor: "Ansel Elgort, Rachel Zegler, Ariana DeBose, David Alvarez",
                }
            ],
            rate: [4.5, 5, 3, 4, 5, 4.5, 4, 4]
        },
        { 
            movieID: 10, 
            title: "Dune", 
            description: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while it's heir becomes troubled by visions of a dark future.", 
            running_time: "2hrs 35mins", 
            release_date: "October 1, 2021", 
            certification: "PG-13",
            genre: ["Adventure", "Drama", "Action"],
            poster: "img/poster/movieposter10.jpg",
            poster2: "img/poster/movieposter10_1.jpg",
            trailer: "https://youtu.be/8g18jFHCLXk",
            trailer_emb: "https://www.youtube.com/embed/8g18jFHCLXk",
            Cast: [
                {
                    director: "Denis Villeneuve",
                    writers: "Jon Spaihts, Denis Villeneuve, Eric Roth",
                    actor: "Timothée Chalamet, Rebecca Ferguson, Oscar Isaac, Jason Momoa",
                }
            ],
            rate: [4.5]
        },
        { 
            movieID: 11, 
            title: "Deadpool", 
            description: "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.", 
            running_time: "1hr 48mins", 
            release_date: "February 12, 2016", 
            certification: "R",
            genre: ["Action", "Adventure", "Comedy"],
            poster: "img/poster/movieposter11.jpg",
            poster2: "img/poster/movieposter11_1.jpg",
            trailer: "https://youtu.be/ONHBaC-pfsk",
            trailer_emb: "https://www.youtube.com/embed/ONHBaC-pfsk",
            Cast: [
                {
                    director: "Tim Miller",
                    writers: "Rhett Reese, Paul Wernick",
                    actor: "Ryan Reynolds, Karan Soni, Ed Skrein, Michael Benyaer",
                }
            ],
            rate: [5, 4.5, 5, 5, 4],
        },
        { 
            movieID: 12, 
            title: "Sonic the Hedgehog 2", 
            description: "When the manic Dr Robotnik returns to Earth with a new ally, Knuckles the Echidna, Sonic and his new friend Tails is all that stands in their way.", 
            running_time: "2hrs 2mins", 
            release_date: "April 8, 2022", 
            certification: "PG",
            genre: ["Comedy", "Action", "Adventure"],
            poster: "img/poster/movieposter12.jpg",
            poster2: "img/poster/movieposter12_1.jpg",
            trailer: "https://youtu.be/47r8FXYZWNU",
            trailer_emb: "https://www.youtube.com/embed/47r8FXYZWNU",
            Cast: [
                {
                    director: "Jeff Fowler",
                    writers: "Pat Casey, Josh Miller, John Whittington",
                    actor: "James Marsden, Jim Carrey, Ben Schwartz, Tika Sumpter",
                }
            ],
            rate: [4.5, 4, 3.5, 4, 3.5],
        },
        { 
            movieID: 13, 
            title: "007 - Casino Royale", 
            description: "After earning 00 status and a licence to kill, secret agent James Bond sets out on his first mission as 007. Bond must defeat a private banker funding terrorists in a high-stakes game of poker at Casino Royale, Montenegro.", 
            running_time: "2hrs 24mins", 
            release_date: "November 16, 2006", 
            certification: "PG-13",
            genre: ["Action", "Adventure", "Thriller"],
            poster: "img/poster/movieposter13.jpg",
            poster2: "img/poster/movieposter13_1.jpg",
            trailer: "https://youtu.be/36mnx8dBbGE",
            trailer_emb: "https://www.youtube.com/embed/36mnx8dBbGE",
            Cast: [
                {
                    director: "Martin Campbell",
                    writers: "Neal Purvis, Robert Wade, Paul Haggis",
                    actor: "Daniel Craig, Eva Green, Mads Mikkelsen, Judi Dench",
                }
            ],
            rate: [5, 5, 4.5, 4, 4, 3],
        },
        { 
            movieID: 14, 
            title: "007 - Skyfall", 
            description: "James Bond's loyalty to M is tested when her past comes back to haunt her. When MI6 comes under attack, 007 must track down and destroy the threat, no matter how personal the cost.", 
            running_time: "2hrs 23mins", 
            release_date: "November 9, 2012", 
            certification: "PG-13",
            genre: ["Action", "Adventure", "Thriller"],
            poster: "img/poster/movieposter14.jpg",
            poster2: "img/poster/movieposter14_1.jpg",
            trailer: "https://youtu.be/6kw1UVovByw",
            trailer_emb: "https://www.youtube.com/embed/6kw1UVovByw",
            Cast: [
                {
                    director: "Sam Mendes",
                    writers: "Neal Purvis, Robert Wade, John Logan",
                    actor: "Daniel Craig, Judi Dench, Javier Bardem, Ralph Fiennes",
                }
            ],
            rate: [5, 5, 4, 4, 4, 4],
        },
        { 
            movieID: 15, 
            title: "007 - Spectre", 
            description: "A cryptic message from James Bond's past sends him on a trail to uncover the existence of a sinister organisation named SPECTRE. With a new threat dawning, Bond learns the terrible truth about the author of all his pain in his most recent missions.", 
            running_time: "2hrs 28mins", 
            release_date: "November 6, 2015", 
            certification: "PG-13",
            genre: ["Action", "Adventure", "Thriller"],
            poster: "img/poster/movieposter15.jpg",
            poster2: "img/poster/movieposter15_1.jpg",
            trailer: "https://youtu.be/7GqClqvlObY",
            trailer_emb: "https://www.youtube.com/embed/ujmoYyEyDP8",
            Cast: [
                {
                    director: "Sam Mendes",
                    writers: "Neal Purvis, Robert Wade, John Logan",
                    actor: "Daniel Craig, Christoph Waltz, Léa Seydoux, Sean Bean",
                }
            ],
            rate: [4.5, 4, 3.5, 4, 4, 5],
        },
        { 
            movieID: 16, 
            title: "007 - No Time to Die", 
            description: "James Bond has left active service. His peace is short-lived when Felix Leiter, an old friend from the CIA, turns up asking for help, leading Bond onto the trail of a mysterious villain armed with dangerous new technology.", 
            running_time: "2hrs 43mins", 
            release_date: "October 8, 2021", 
            certification: "PG-13",
            genre: ["Action", "Adventure", "Thriller"],
            poster: "img/poster/movieposter16.jpg",
            poster2: "img/poster/movieposter16_1.jpg",
            trailer: "https://youtu.be/BIhNsAtPbPI",
            trailer_emb: "https://www.youtube.com/embed/BIhNsAtPbPI",
            Cast: [
                {
                    director: "Cary Joji Fukunaga",
                    writers: "Neal Purvis, Robert Wade, Cary Joji Fukunaga",
                    actor: "Daniel Craig, Léa Seydoux, Rami Malek, Lashana Lynch",
                }
            ],
            rate: [4.5, 4, 3.5, 3.5, 4, 5],
        },
        { 
            movieID: 17, 
            title: "Encanto", 
            description: "A Colombian teenage girl has to face the frustration of being the only member of her family without magical powers.", 
            running_time: "1hr 42mins", 
            release_date: "November 24, 2021", 
            certification: "PG",
            genre: ["Animation", "Family", "Comedy"],
            poster: "img/poster/movieposter17.jpeg",
            poster2: "img/poster/movieposter17_1.jpg",
            trailer: "https://youtu.be/CaimKeDcudo",
            trailer_emb: "https://www.youtube.com/embed/CaimKeDcudo",
            Cast: [
                {
                    director: "Jared Bush, Byron Howard, Charise Castro Smith",
                    writers: "Jared Bush, Byron Howard, Charise Castro Smith",
                    actor: "Stephanie Beatriz, María Cecilia Botero, John Leguizamo, Mauro Castillo",
                }
            ],
            rate: [3.5, 4, 4, 4.5, 4, 5],
        },
        { 
            movieID: 18, 
            title: "Free Guy", 
            description: "A bank teller discovers that he's actually an NPC inside a brutal, open world video game.", 
            running_time: "1hr 55mins", 
            release_date: "August 13, 2021", 
            certification: "PG-13",
            genre: ["Action", "Adventure", "Comedy"],
            poster: "img/poster/movieposter18.jpg",
            poster2: "img/poster/movieposter18_1.jpg",
            trailer: "https://youtu.be/X2m-08cOAbc",
            trailer_emb: "https://www.youtube.com/embed/X2m-08cOAbc",
            Cast: [
                {
                    director: "Shawn Levy",
                    writers: "Matt Lieberman, Zak Penn",
                    actor: "Ryan Reynolds, Jodie Comer, Lil Rel Howery, Joe Keery",
                }
            ],
            rate: [4, 4, 4.5, 3.5, 4],
        },
        { 
            movieID: 19, 
            title: "Avengers: Endgame", 
            description: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.", 
            running_time: "3hrs 1min", 
            release_date: "April 26, 2019", 
            certification: "PG-13",
            genre: ["Action", "Adventure", "Drama"],
            poster: "img/poster/movieposter19.jpg",
            poster2: "img/poster/movieposter19_1.jpg",
            trailer: "https://youtu.be/TcMBFSGVi1c",
            trailer_emb: "https://www.youtube.com/embed/TcMBFSGVi1c",
            Cast: [
                {
                    director: "Anthony Russo, Joe Russo",
                    writers: "Christopher Markus, Stephen McFeely, Stan Lee",
                    actor: "Robert Downey Jr, Chris Evans, Mark Ruffalo, Chris Hemsworth",
                }
            ],
            rate: [5, 5, 4.5, 4.5, 4, 5],
        },
        { 
            movieID: 20, 
            title: "Interstellar", 
            description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", 
            running_time: "2hrs 49mins", 
            release_date: "November 7, 2014", 
            certification: "PG-13",
            genre: ["Adventure", "Drama", "Sci-Fi"],
            poster: "img/poster/movieposter20.jpg",
            poster2: "img/poster/movieposter20_1.png",
            trailer: "https://youtu.be/zSWdZVtXT7E",
            trailer_emb: "https://www.youtube.com/embed/zSWdZVtXT7E",
            Cast: [
                {
                    director: "Christopher Nolan",
                    writers: "Jonathan Nolan, Christopher Nolan",
                    actor: "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
                }
            ],
            rate: [5, 5, 5, 4, 4, 4.5, 3.5, 4],
        },
    ];

    var userData = [
        {
            username: "admin",
            password: "admin",
            email: "admin@viewit.com",
            favMovie:[
                {
                    movieID: 20, 
                    title: "Interstellar", 
                },
                {
                    movieID: 19,
                    title: "Avengers: Endgame",
                }
            ],
            ratedMovie:[
                {
                    movieID: 20, 
                    title: "Interstellar",
                    rate: 4.5
                }
            ]
        },
        {
            username: "james",
            password: "180609303",
            email: "james@mail.com",
            favMovie:[
                {
                    movieID: 16, 
                    title: "007 - No Time to Die"
                },
                {
                    movieID: 10, 
                    title: "Dune",
                }
            ],
            ratedMovie:[
                {
                    movieID: 16, 
                    title: "007 - No Time to Die",
                    rate: 5
                }
            ]
        },
    ];

    /*
        { 
            movieID: , 
            rate:  
        },
    */

    dbo.collection("s180609303_movies").insertMany(movieData, function(err, res) {
        if (err) throw err;
        console.log("Movie data inserted");
        db.close();
    });

    dbo.collection("s180609303_users").insertMany(userData, function(err, res) {
        if (err) throw err;
        console.log("User data inserted");
        db.close();
    });
});