// Author: Andrew Jarombek
// Date: 12/28/2017
// Populate the song database

db.user.insertMany([
    {"username": "A"},
    {"username": "practically_everyone"},
    {"username": "dottyTheHorse"},
    {"username": "lilyThePillowPet"},
    {"username": "grandmasBlanket"},
    {"username": "anonymous"}
]);

let A = db.user.findOne({"username":"A"})._id;
let practically_everyone = db.user.findOne({"username":"practically_everyone"})._id;
let dottyTheHorse = db.user.findOne({"username":"dottyTheHorse"})._id;
let lilyThePillowPet = db.user.findOne({"username":"lilyThePillowPet"})._id;
let grandmasBlanket = db.user.findOne({"username":"grandmasBlanket"})._id;
let anonymous = db.user.findOne({"username":"anonymous"})._id;

db.song.insertMany([
    {
        "title": "Bound 2",
        "artist": "Kanye West",
        "album": "Yeezus",
        "type": "aj",
        "release_date": new Date('2013-08-28'),
        "comments": [
            {
                "username": "A",
                "user_id": A,
                "date": new Date('2017-12-31'),
                "content": "This song means the world to me"
            },
            {
                "username": "practically_everyone",
                "user_id": practically_everyone,
                "date": new Date('2017-12-31'),
                "content": "Clearly one of the greatest music videos of all time"
            },
            {
                "username": "A",
                "user_id": A,
                "date": new Date('2019-04-30'),
                "content": "If she is the sweet person looking over the code I made for her, I'm sorry if I'm wrong about her " +
                    "reasons for not speaking to me.  If I'm wrong, let me try my best to give her some advice.  I know she is " +
                    "a very selfless person who doesn't want to be a burden on anyone.  However, I'm a man who loves her and " +
                    "thinks she doesn't want to speak to me.  Sometimes its good to be a bit selfish with the things you want."
            },
            {
                "username": "grandmasBlanket",
                "user_id": grandmasBlanket,
                "date": new Date('2019-04-30'),
                "content": "He is doing fine on his own.  Try and find the strength to be a bit selfish.  Tell him that " +
                    "you care.  Let him tell you that he cares.  Allow him to listen to your challenges, accomplishments, fears, " +
                    "and joys.  Let him give you Dotty to snuggle with and give him StarB to hold.  Finally, let him send you " +
                    "off back into the stars as you search for your answers.  If you still want to, try and find the strength " +
                    "a month or so later to come back and be a bit selfish again.  There is nothing weak about that.  It just " +
                    "shows how much you care."
            }
        ]
    },
    {
        "title": "Enchanted",
        "artist": "Taylor Swift",
        "album": "Speak Now",
        "type": "a",
        "release_date": new Date('2010-10-25'),
        "best_lyric": "These are the words I held back as I was leaving too soon, I was enchanted to meet you",
        "comments": []
    },
    {
        "title": "Back to December",
        "artist": "Taylor Swift",
        "album": "Speak Now",
        "type": "aj",
        "release_date": new Date('2010-10-25'),
        "best_lyric": "I go back to december all the time",
        "comments": [
            {
                "username": "A",
                "user_id": A,
                "date": new Date('2017-12-31'),
                "content": "Mistakes and Apologies go in both directions, along with forgiveness and love."
            }
        ]
    },
    {
        "title": "Innocent",
        "artist": "Taylor Swift",
        "album": "Speak Now",
        "type": "a",
        "release_date": new Date('2010-10-25'),
        "best_lyric": "It's alright, just wait and see your string of lights is still bright to me",
        "comments": [
            {
                "username": "A",
                "user_id": A,
                "date": new Date('2017-12-31'),
                "content": "Don’t be too hard on yourself about past mistakes or past experiences.  You have a beautiful" +
                            " heart and it shows.  The same goes for future mistakes.  It’s all just part of" +
                            " learning, and all those who know how big your heart is will forgive it."
            },
            {
                "username": "A",
                "user_id": A,
                "date": new Date('2017-12-31'),
                "content": "I’m sorry too."
            }
        ]
    },
    {
        "title": "A Thousand Years",
        "artist": "Christina Perri",
        "type": "j",
        "release_date": new Date('2011-10-18'),
        "best_lyric": "Darling, don't be afraid I have loved you for a thousand years, I'll love you for a thousand more",
        "comments": [
            {
                "username": "A",
                "user_id": A,
                "date": new Date('2017-12-31'),
                "content": "A song about everlasting love.  I feel all warm inside every time I listen."
            },
            {
                "username": "anonymous",
                "user_id": anonymous,
                "date": new Date('2017-12-31'),
                "content": "Real love lasts a lifetime.  The truest of love persists even when the two spend a " +
                            "long time apart.  That is unconditional."
            }
        ]
    },
    {
        "title": "And I Am Telling You I'm Not Going",
        "artist": "Jennifer Hudson",
        "type": "j",
        "release_date": new Date('2006-12-05'),
        "comments": []
    },
    {
        "title": "Anytime You Need a Friend",
        "artist": "Mariah Carey",
        "type": "a",
        "best_lyric": "Just remember to keep the faith and love will be there to light the way",
        "release_date": new Date('1994-05-31'),
        "comments": []
    },
    {
        "title": "Big Girls Don't Cry",
        "artist": "Fergie",
        "type": "j",
        "best_lyric": "I'll be your best friend, and you'll be mine Valentine Yes, you can hold my hand if you want to" +
                    " 'Cause I want to hold yours too We'll be playmates and lovers, and share our secret worlds",
        "release_date": new Date('2007-05-22'),
        "comments": [
            {
                "username": "dottyTheHorse",
                "user_id": dottyTheHorse,
                "date": new Date('2017-12-31'),
                "content": "Such a beautiful song.  About a girl who deeply cares for someone but needs to find out who" +
                        " she is and love herself before she can be with him.  She may not feel like a big girl, but there" +
                        " is nothing weak about someone who realizes there is something they need to fix about themselves" +
                        " and takes action to achieve it.  Even more, they are able to leave the one they love to accomplish" +
                        " this goal.  That in itself is incredibly hard.  She is clearly an amazing person and the answers" +
                        " she seeks could be around any corner.  The guy she sings this song to would be a fool if he didn’t" +
                        " open the door to his secret world for her once she has her answers :)."
            },
            {
                "username": "grandmasBlanket",
                "user_id": grandmasBlanket,
                "date": new Date('2017-12-31'),
                "content": "When you miss someone like a child misses a blanket, chances are the other person misses you the same."
            },
            {
                "username": "lilyThePillowPet",
                "user_id": lilyThePillowPet,
                "date": new Date('2017-12-31'),
                "content": "The man this song is about must feel incredibly proud of this woman.  He understands she needs " +
                        "her time to herself but tries expressing how he feels about her on rare special occasions.  " +
                        "Hopefully this will only help her on her quest."
            }
        ]
    },
    {
        "title": "Thinkin Bout You",
        "artist": "Frank Ocean",
        "album": "Channel Orange",
        "type": "j",
        "release_date": new Date('2012-04-17'),
        "comments": [
            {
                "username": "A",
                "user_id": A,
                "date": new Date('2017-12-31'),
                "content": "I do think far ahead.  It is beautiful."
            }
        ]
    }
]);

let bound2Id = db.song.findOne({"title":"Bound 2"})._id;

db.artist.insertMany([
    {
        "name": "Kanye West",
        "genre": "Hip-Hop/Rap",
        "albums": [
            {
                "title": "Yeezus",
                "release_date": new Date('2013-08-28'),
                "songs": [
                    {
                        "name": "Bound 2",
                        "song_id": bound2Id
                    }
                ]
            }
        ]
    }
]);