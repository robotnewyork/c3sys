export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
}

export interface BackCatalogTrack {
  id: string;
  title: string;
  trackNumber: number;
  audioUrl: string;
  duration: string;
  description?: string;
  streamingLinks?: StreamingLinks;
  artwork?: string;
}

export interface BackCatalogItem {
  id: string;
  title: string;
  artist: string;
  releaseDate: string;
  description: string;
  artwork: string;
  genre?: string[];
  gear?: string[];
  credits?: { name: string; role: string; }[];
  streamingLinks?: StreamingLinks;
  tracks: BackCatalogTrack[];
}

export const backCatalogData: BackCatalogItem[] = [
  {
    id: "boy-magician",
    title: "Boy Magician",
    artist: "Boy Magician",
    releaseDate: "2002-10-01",
    description: "In late 2001, Jeff Goergen, Jesse Barnes and I were in Pitchblende, which was gradually getting more experimental and rock-oriented. Meanwhile, Jeff was making songs on his electronic gear, and he and I had the desire to create a new band where the goal was to make simple electronic dance music that we would play live. Out of our live shows came this album which was completed in 2002.",
    genre: ["Electronic", "Electro", "House", "IDM", "Drum & Bass"],
    gear: ["fruity-loops", "sony-acid", "mc303", "qy70", "qy10", "rp3", "rp100", "ea1", "sp202"],
    credits: [
      { name: "Jeff Goergen", role: "Music" },
      { name: "Chad Wilson", role: "Music" },
      { name: "Jesse Barnes", role: "Guitar / Vocals" }
    ],
    artwork: "images/releases/boy-magician.jpg",
    streamingLinks: {
      spotify: "https://open.spotify.com/album/4dy7wG28HkI1Lnjc8sdCE6",
      appleMusic: "https://music.apple.com/ng/album/boy-magician/1643491663"
    },
    tracks: [
      {
        id: "boy-magician-1",
        title: "The Count",
        trackNumber: 1,
        audioUrl: "/audio/boy-magician-01-the-count.mp3",
        duration: "1:35",
        description: "Jeff created this using samples from a CD included in a box of Count Chocula cereal. It may be one of our earliest uses of the Amen break.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/the-count/1643491664",
          spotify: "https://open.spotify.com/track/2IBAtwvZkysYuYLVRVyD5q",
          youtube: "https://www.youtube.com/watch?v=uddJNlVdQFw"
        }
      },
      {
        id: "boy-magician-2", 
        title: "John Wayne",
        trackNumber: 2,
        audioUrl: "/audio/boy-magician-02-john-wayne.mp3",
        duration: "4:24",
        description: "Jeff Goergen wrote most of this track on his Korg EA-1, Yamaha QT-1/QT-70 sequencers and Roland MC-303 groovebox. Much if not all of this recording was done live off the machines with some EQing done in Sony Acid. The mix is a bit raw in spots but I still think it's one of the better tracks off the album.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/john-wayne/1643491665",
          spotify: "https://open.spotify.com/track/16BUEZPIMFHd7RBx1rp5sD",
          youtube: "https://www.youtube.com/watch?v=DoOKpvOhD7w"
        }
      },
      {
        id: "boy-magician-3", 
        title: "Buck Naked",
        trackNumber: 3,
        audioUrl: "/audio/boy-magician-03-buck-naked.mp3",
        duration: "4:32",
        description: "This is an unusual track for Boy Magician, since it has more swing than our other tracks around this time period, perhaps trying to capture the feel of artists like Basement Jaxx or Underworld. I wrote the melody on a keyboard and we probably transcribed it into the MC-303, and wrote other parts on the EA-1. The drums and bassline come from the MC-303. We used Sony Acid to sequence the track.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/buck-naked/1643491847",
          spotify: "https://open.spotify.com/track/1cZkYIG8kXAviUKND8TOzh",
          youtube: "https://www.youtube.com/watch?v=PnXTA-Q3pbA"
        }
      },
      {
        id: "boy-magician-4", 
        title: "Break 2.0",
        trackNumber: 4,
        audioUrl: "/audio/boy-magician-04-break-20.mp3",
        duration: "2:29",
        description: "Glitchy IDM track started by Jeff in Acid, and all the chops and granular edits were done directly in Acid as well.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/break-2-0/1643491848",
          spotify: "https://open.spotify.com/track/1w6aVibz9f5SLslk2XEkka",
          youtube: "https://www.youtube.com/watch?v=QQO2TOksvkg"
        }
      },
      {
        id: "boy-magician-5", 
        title: "Corrupt",
        trackNumber: 5,
        audioUrl: "/audio/boy-magician-05-corrupt.mp3",
        duration: "4:48",
        description: "The voice samples are by Jesse, and are a spoof of a Steve Irwin-esque Australian nature lover (this was made before he passed). I don't remember the exact synths used for all the parts but I'm sure it was the staple Boy Magician gear including Roland MC-303 grooveboxes, a Korg EA-1, and some Yamaha sequencers. It was sequenced in Sony Acid, and I remember putting quite a bit of time working on the panning. Of all the Boy Magician tracks to listen to on headphones, I'd recommend this one and Radio for the panning effects.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/corrupt/1643491849",
          spotify: "https://open.spotify.com/track/42dHZigOCCLGkMQJkfuP3C",
          youtube: "https://www.youtube.com/watch?v=EKNnuou7Oh4"
        }
      },
      {
        id: "boy-magician-6", 
        title: "Cylindrical (Glass Model)",
        trackNumber: 6,
        audioUrl: "/audio/boy-magician-06-cylindrical-glass-model.mp3",
        duration: "3:24",
        description: "This is a remix of Cylindrical that is more in an atmospheric drum and bass style. It doesn't feature the guitars or heavy synths. I think this is a good example of how using pretty much the same samples but sequencing them in a different way can completely change a track.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/cylindrical-glass-model-version/1643491851",
          spotify: "https://open.spotify.com/track/6IglQJsxEzvEIOCL6phRW9",
          youtube: "https://www.youtube.com/watch?v=yI2t-SVZBz4"
        }
      },
      {
        id: "boy-magician-7", 
        title: "Katana Dream Sequence",
        trackNumber: 7,
        audioUrl: "/audio/boy-magician-07-katana-dream-sequence.mp3",
        duration: "6:54",
        description: "This track started out as a simple electro-trance song called Electric, but eventually it progressed into something longer and more epic, so it was renamed Katana Dream Sequence. A Korg EA-1, Roland MC-303 groovebox, and possibly some other synths were used. We used Sony Acid to sequence the track.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/katana-dream-sequence/1643491852",
          spotify: "https://open.spotify.com/track/1koL9pQmKWLYuX56N63cnF",
          youtube: "https://www.youtube.com/watch?v=GduEYo2p-QI"
        }
      },
      {
        id: "boy-magician-8", 
        title: "Broken",
        trackNumber: 8,
        audioUrl: "/audio/boy-magician-08-broken.mp3",
        duration: "3:32",
        description: "Written on a Korg EA-1 and Roland MC-303 grooveboxes, this has the perfect subbass to bump in your car stereo. This was really fun to play live too, since the parts are perfect for tear-ups and remixing. Sequenced in Sony Acid.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/broken/1643491854",
          spotify: "https://open.spotify.com/track/19DUZbfqgHtvlBp2q5M537",
          youtube: "https://www.youtube.com/watch?v=ET4goVX7Ra0"
        }
      },
      {
        id: "boy-magician-9", 
        title: "Courtney",
        trackNumber: 9,
        audioUrl: "/audio/boy-magician-09-courtney.mp3",
        duration: "5:51",
        description: "This track wasn't included in the original 2002 release of the album, and was only added to the album when it was released to streaming in 2022. This track was made in much the same way as the rest of the album, and named after a friend of the band.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/courtney/1643491855",
          spotify: "https://open.spotify.com/track/75Dl1SWOivSDFWMtqjjxE1",
          youtube: "https://www.youtube.com/watch?v=VB4m7nc2KjA"
        }
      },
      {
        id: "boy-magician-10", 
        title: "E7+10000",
        trackNumber: 10,
        audioUrl: "/audio/boy-magician-10-e7-plus-10000.mp3",
        duration: "3:19",
        description: "Glitchy, IDM track that was made by Jeff before Break 2.0 in Acid where each measure is unique.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/e7-10000/1643491856",
          spotify: "https://open.spotify.com/track/2uzj6d69Tc4hk1uls1jtms",
          youtube: "https://www.youtube.com/watch?v=efvAx28y1Go"
        }
      },
      {
        id: "boy-magician-11", 
        title: "Terminal",
        trackNumber: 11,
        audioUrl: "/audio/boy-magician-11-terminal.mp3",
        duration: "4:31",
        description: "We played a few live Halloween shows as Boy Magician and people would always request this track as the &quot;spooky song with the laughing&quot;. Written on Roland MC-303 grooveboxes and a Korg EA-1 and sequenced in Sony Acid.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/terminal/1643491857",
          spotify: "https://open.spotify.com/track/7eLahbTX6TU3YKrSGdS1EQ",
          youtube: "https://www.youtube.com/watch?v=NoRMcsmjhAk"
        }
      },
      {
        id: "boy-magician-12", 
        title: "Radio",
        trackNumber: 12,
        audioUrl: "/audio/boy-magician-12-radio.mp3",
        duration: "3:54",
        description: "Jeff had started this IDM type track using the Korg EA-1 and MC-303, and I took the loops and resequenced them in Acid with the attempt at making the IDM track more &quot;radio&quot; friendly.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/radio/1643491858",
          spotify: "https://open.spotify.com/track/0Rb8ntK8xNG4aCyHBornJg",
          youtube: "https://www.youtube.com/watch?v=OqwuFyMZyis"
        }
      },
      {
        id: "boy-magician-13", 
        title: "Cylindrical",
        trackNumber: 13,
        audioUrl: "/audio/boy-magician-13-cylindrical.mp3",
        duration: "3:36",
        description: "Since this is the only track off the album featuring guitars, this was the most popular among people not familiar with electronic music. The guitar part was recorded by Jesse and chopped up heavily in Sony Acid. The synth parts were recorded using a Korg EA-1 and two Roland MC-303 grooveboxes.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/cylindrical/1643491859",
          spotify: "https://open.spotify.com/track/6rV9CK9MVFsw4SGAxor9o5",
          youtube: "https://www.youtube.com/watch?v=qy0SCPbi3Jc"
        }
      },
      {
        id: "boy-magician-14", 
        title: "Comit",
        trackNumber: 14,
        audioUrl: "/audio/boy-magician-14-comit.mp3",
        duration: "4:02",
        description: "Jeff created some loops using the hardware gear, which we imported into Acid and turned into a full track.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/comit/1643491860",
          spotify: "https://open.spotify.com/track/2BwaaOzLNhcQ9116PF9SNf",
          youtube: "https://www.youtube.com/watch?v=8tr0-j77x5U"
        }
      },
      {
        id: "boy-magician-15", 
        title: "Relentless",
        trackNumber: 15,
        audioUrl: "/audio/boy-magician-15-relentless.mp3",
        duration: "4:31",
        description: "This was our first attempt at a drum and bass song and was written after all the other tracks were mostly finished. While We had started listening to a lot of drum and bass, especially Dieselboy's ProjectHUMAN album and the artists featured on that. We also got to try out a new piece of gear, a Boss (Roland) DR-202 sampler, which we used for a lot of the drums on this track, the Amen break in particular.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/relentless/1643491861",
          spotify: "https://open.spotify.com/track/2V2yGxVU056NklejuvWAhN",
          youtube: "https://www.youtube.com/watch?v=OY-WZy3OC8E"
        }
      },
      {
        id: "boy-magician-16", 
        title: "Katana Dream Sequence (Freaky G Mix)",
        trackNumber: 16,
        audioUrl: "/audio/boy-magician-16-katana-dream-sequence-freaky-g.mp3",
        duration: "4:27",
        description: "This is a remix of Katana Dream Sequence meant to close out the album. This version cuts to the chase a little bit quicker, and also has a really mellow, relaxing ending. Jeff had started this remix since, if memory serves, he didn't like listening to the full 7 minute version of Katana Dream Sequence. I had started a piece in sonata form called Katana Sonata, using the strings from Katana Dream Sequence. The first movement was called Prelude and started with all the strings coming in softly and building up. I basically just reversed that movement and blended it with the end of what is now this Freaky G remix to come up with a perfect mellow ending to the album. I believe this uses the same tracks as the original Katana Dream Sequence; it was just re-sequenced in Sony Acid with added effects and the string changes mentioned above. There might have been a few new drum layers added from either Fruity Loops or a Roland MC-303.",
        streamingLinks: {
          appleMusic: "https://music.apple.com/ng/song/katana-dream-sequence-freaky-g-version/1643491862",
          spotify: "https://open.spotify.com/track/7fQ0myF39c0EMcxnuqy3gM",
          youtube: "https://www.youtube.com/watch?v=GcLhgwuerr0"
        }
      }
    ]
  },
  {
    id: "locked",
    title: "Locked",
    artist: "Skepsys",
    releaseDate: "2008-07-24",
    description: "Released under Rinseproof Records.",
    genre: ["Drum & Bass"],
    gear: ["fruity-loops", "sony-acid", "ms2000r"],
    credits: [
      { name: "Jeff Goergen", role: "Music" },
      { name: "Chad Wilson", role: "Music" }
    ],
    streamingLinks: {
      spotify: "https://open.spotify.com/track/08PGA9Zm5BwYkWNKRFIwjq",
      appleMusic: "https://music.apple.com/us/album/locked/286750948?i=286750999",
      youtube: "https://www.youtube.com/watch?v=gWDUGRqtQk4&list=OLAK5uy_lrarmUMzRoNL6Zbcjb3UOYW1hj5sWRQF8"
    },
    artwork: "/images/releases/locked.jpg",
    tracks: [
      {
        id: "locked-1",
        title: "Locked",
        trackNumber: 1,
        audioUrl: "/audio/skepsys-locked.mp3",
        duration: "6:09",
        description: ""
      }
    ]
  },
  {
    id: "dance-breakz",
    title: "Dance Breaks",
    artist: "Skepsys",
    releaseDate: "2008-07-24",
    genre: ["Drum & Bass"],
    gear: ["fruity-loops", "sony-acid", "ms2000r", "microq"],
    credits: [
      { name: "Jeff Goergen", role: "Music" },
      { name: "Chad Wilson", role: "Music" }
    ],
    description: "Released under Rinseproof Records. The song was written around 2004 and finally released in July 2008. It was made using Fruity Loops, Sony Acid, various VSTs, a Korg MS-2000R and probably a Waldorf Micro-Q and some other hardware synths.",
    artwork: "images/releases/dance-breakz.jpg",
    streamingLinks: {
      spotify: "https://open.spotify.com/track/4a5VnbiqIRTcDUXi7iAknG",
      appleMusic: "https://music.apple.com/us/album/dance-breaks-single/286631233",
      youtube: "https://www.youtube.com/watch?v=-n5Gi9n2FFY&list=RD-n5Gi9n2FFY&start_radio=1"
    },
    tracks: [
      {
        id: "dance-breakz-1",
        title: "Dance Breaks",
        trackNumber: 1,
        audioUrl: "/audio/skepsys-dance-breaks.mp3",
        duration: "4:20",
        description: ""
      }
    ]
  },
  {
    id: "brainfart",
    title: "Brainfart",
    artist: "Pitchblende",
    releaseDate: "2000-01-01",
    genre: ["Electronic", "Techno"],
    gear: ["fruity-loops", "sony-acid", "rebirth", "goldwave", "soundforge"],
    credits: [
      { name: "Jeff Goergen", role: "Music" },
      { name: "Chad Wilson", role: "Music" }
    ],
    description: "Although not officially released, this was the second album (after the mostly unlistenable Product of Boredom) we completed as Pitchblende circa 1999-2000. Unfortunately, some of the track names have been lost to time.",
    artwork: "images/releases/pitchblende-brainfart.jpg",
    tracks: [{
      id: "calming",
      title: "Calming (Army of Darkness)",
      trackNumber: 1,
      audioUrl: "/audio/pitchblende-brainfart-01-calming-army-of-darkness.mp3",
      duration: "3:20",
      description: "Written by Jeff Goergen in Rebirth circa 1999, containing samples from the movie Army of Darkness. If I remember correctly, samples were downloaded from the Internet, and probably added to the Rebirth track using Goldwave, a Windows sound editor."
      },
      {
      id: "brainfart-02",
      title: "Track 2",
      trackNumber: 2,
      audioUrl: "/audio/pitchblende-brainfart-02.mp3",
      duration: "3:47",
      description: "A track I made circa 1999-2000 with Acid using the preset loops that came with the program."
      },
      {
      id: "mint-dance-remix",
      title: "Mint (Dance Remix)",
      trackNumber: 3,
      audioUrl: "/audio/pitchblende-brainfart-03-mint-dance-remix.mp3",
      duration: "4:28",
      description: "Dance remix of Mint made using Acid Pro and Soundforge, with samples from Office Space."
      },
      {
      id: "goblins-cry",
      title: "Goblin's Cry",
      trackNumber: 4,
      audioUrl: "/audio/pitchblende-brainfart-04-goblins-cry.mp3",
      duration: "4:02",
      description: "This was one of the first tracks I made using Sonic Foundry's ACID program. All of the sounds are from the sample packs included with ACID. I was basically learning the software and working on sequencing."
      },
      {
      id: "fucking-workout",
      title: "Fucking Workout",
      trackNumber: 5,
      audioUrl: "/audio/pitchblende-brainfart-05-fucking-workout.mp3",
      duration: "3:14",
      description: "Made using Sonic Foundry ACID with samples found on the Internet. The idea for this track was to spoof a German workout video."
      },
      {
      id: "cancun",
      title: "Cancun",
      trackNumber: 6,
      audioUrl: "/audio/pitchblende-brainfart-06-cancun.mp3",
      duration: "2:59",
      description: "One of our earliest examples of chopping samples, made in Sonic Foundry Acid."
      },
      {
      id: "brown-banana-man",
      title: "Brown Banana Man",
      trackNumber: 7,
      audioUrl: "/audio/pitchblende-brainfart-07-brown-banana-man.mp3",
      duration: "1:51",
      description: "This was the first track I made using Sonic Foundry ACID. All of the sounds are from the sample packs included with ACID. I was basically learning the software and working on sequencing."
      },
      {
      id: "brainfart-08",
      title: "Track 8",
      trackNumber: 8,
      audioUrl: "/audio/pitchblende-brainfart-08.mp3",
      duration: "4:11",
      description: "Made in Sonic Foundry Acid."
      },
      {
      id: "wacman",
      title: "Wac-man",
      trackNumber: 9,
      audioUrl: "/audio/pitchblende-brainfart-09-wacman.mp3",
      duration: "4:17",
      description: "Inspired by Pac-Man, this track was made for an online contest using Sonic Foundry ACID."
      },
      {
      id: "brainfart-10",
      title: "Track 10",
      trackNumber: 10,
      audioUrl: "/audio/pitchblende-brainfart-10.mp3",
      duration: "5:00",
      description: "Made using Sonic Foundry Acid based on preset loops and possibly some custom ones made in Fruity Loops."
      },
      {
      id: "brainfart-11",
      title: "Track 11",
      trackNumber: 11,
      audioUrl: "/audio/pitchblende-brainfart-11.mp3",
      duration: "2:22",
      description: "Made using Sonic Foundry Acid based on preset loops."
      },
      {
      id: "brainfart-12",
      title: "Track 12",
      trackNumber: 12,
      audioUrl: "/audio/pitchblende-brainfart-12.mp3",
      duration: "5:32",
      description: "Made using Sonic Foundry Acid based on preset loops."
      },
      {
      id: "jive-turkey",
      title: "Jive Turkey",
      trackNumber: 13,
      audioUrl: "/audio/pitchblende-brainfart-13-jive-turkey.mp3",
      duration: "2:30",
      description: "Made using Sonic Foundry Acid based on preset loops."
      },
      {
      id: "brainfart-14",
      title: "Track 14",
      trackNumber: 14,
      audioUrl: "/audio/pitchblende-brainfart-14.mp3",
      duration: "3:44",
      description: "Made using Sonic Foundry Acid using preset loops as well as custom loops made in Fruity Loops."
      },
      {
      id: "brainfart-15",
      title: "Track 15",
      trackNumber: 15,
      audioUrl: "/audio/pitchblende-brainfart-15.mp3",
      duration: "5:21",
      description: "Made using Sonic Foundry Acid based on preset loops."
      },
      {
      id: "mint",
      title: "Mint",
      trackNumber: 16,
      audioUrl: "/audio/pitchblende-brainfart-16-mint.mp3",
      duration: "4:56",
      description: "Very similar to the Dance Remix, but without the unlicensed samples."
      },
      {
      id: "don-the-iguana",
      title: "Don the Iguana",
      trackNumber: 17,
      audioUrl: "/audio/pitchblende-brainfart-17-don-the-iguana.mp3",
      duration: "3:47",
      description: "Made by Jeff Goergen in Rebirth with StarCraft samples added using Goldwave."
      },
      {
      id: "stitch",
      title: "Stitch",
      trackNumber: 18,
      audioUrl: "/audio/pitchblende-brainfart-18-stitch.mp3",
      duration: "2:09",
      description: "Made by Jeff Goergen probably with Rebirth and Sonic Foundry ACID."
      }
    ]
  },



  {
    id: "demo",
    title: "Demo",
    artist: "Pitchblende",
    releaseDate: "2001-01-01",
    genre: ["Rock", "Electronic"],
    gear: ["fruity-loops", "sony-acid", "xp-60", "rebirth", "sr16"],
    credits: [
      { name: "Jesse Barnes", role: "Music / Guitar / Bass / Lyrics / Vocals" },
      { name: "Ryan Burtney", role: "Lyrics / Vocals / Percussion" },
      { name: "Jeff Goergen", role: "Music / Turntables / Drum Programming / Background Vocals / Mixing" },
      { name: "Chad Wilson", role: "Music / Keys" },
      { name: "Dante", role: "Additional Vocals" }
    ],
    description: "The final album made by Pitchblende before rebranding as Station Grey Boy and dissolving shortly thereafter. This album was meant to be a demo of our burgeoning abilities as songwriters and producers, but as best I can remember was never sent out anywhere.",
    artwork: "images/releases/pitchblende-demo.jpg",
    tracks: [
      {
        id: "besser-als-alle",
        title: "Besser Als Alle (and Runt-a-Cat)",
        trackNumber: 1,
        audioUrl: "/audio/pitchblende-demo-01-besser-als-alle.mp3",
        duration: "4:42",
        description: "Our signature irreverent style feautring a mashup of metal and doo-wop."
      },
      {
        id: "nacht-von-boogieman",
        title: "Nacht Von Boogieman",
        trackNumber: 2,
        audioUrl: "/audio/pitchblende-demo-02-nacht-von-boogieman.mp3",
        duration: "4:41",
        description: "This was sort of a mashup of various song snippets that were combined into one track, inspired by Mr. Bungle. The recording process for this was one of more intense ones, with probably the most tracks recorded of any Pitchblende song, including harmonica and keg drum."
      },
      {
        id: "street-cop-chicago",
        title: "Street Cop Chicago",
        trackNumber: 3,
        audioUrl: "/audio/pitchblende-demo-03-street-cop-chicago.mp3",
        duration: "3:30",
        description: "Dirk Swift (Jean-Claude Van Damme) is a Chicago detective closing in on the Colombian cocaine underground, but little does he know that corruption reaches even the highest levels of the city government. Risking his love, his career, and his life he must expose the mayor (Danny Glover) and put an end to the drug trafficking in the city he calls home. Brought to you by the creators of Red Heat and Kickboxer 2. Street Cop Chicago was written by Jeff Goergen and Jesse Barnes around 2001 in Fruity Loops with guitar solo."
      },
      {
        id: "a-dip-in-the-rings",
        title: "A Dip In The Rings",
        trackNumber: 4,
        audioUrl: "/audio/pitchblende-demo-04-a-dip-in-the-rings.mp3",
        duration: "8:19",
        description: "The full version of A Dip in the Rings, written primarily by Jeff Goergen with probably Fruity Loops and Sonic Foundry ACID, and samples from 2001: A Space Odyssey."
      },
      {
        id: "pacify",
        title: "Pacify",
        trackNumber: 5,
        audioUrl: "/audio/pitchblende-demo-05-pacify.mp3",
        duration: "3:10",
        description: "Recorded late 2000-2001, this song was written mainly by guitarist Jesse Barnes, who also wrote vocals which I don't think were ever recorded. The drums are from &quot;Julius&quot;, our Alesis SR-16 which broke a few months later. I play keyboards (Roland XP-60 patch A-04 Nice Piano). Jeff Goergen is on the turntables providing light scratches that I think fit well. The synth is probably from Rebirth and added in post-production. Jesse also recorded the bass part."
      },
      {
        id: "ambio-piston",
        title: "Ambio Piston",
        trackNumber: 6,
        audioUrl: "/audio/pitchblende-demo-06-ambio-piston.mp3",
        duration: "3:46",
        description: "Starting from mergering a guitar riff with a Rebirth loop, with 303 lines added from the Roland XP-60 played live. I believe we may have recorded this in Jesse's grandma's house."
      },
      {
        id: "german-disko-sex",
        title: "German Disko Sex",
        trackNumber: 7,
        audioUrl: "/audio/pitchblende-demo-07-german-disko-sex.mp3",
        duration: "2:13",
        description: "Another irreverent comedic track featuring Roland XP-60, guitars and DJ scratching."
      },
      {
        id: "shades",
        title: "Shades",
        trackNumber: 8,
        audioUrl: "/audio/pitchblende-demo-08-shades.mp3",
        duration: "3:34",
        description: "Recorded circa 2001 in the dormer of Jesse's grandma's house featuring Jeff Goergen (drum programming, Rebirth, production and turntables), Jesse Barnes (guitar) and myself on keys. Some 303 lines come from Rebirth, but also from Roland XP-60."
      },
      {
        id: "saucers-over-china",
        title: "Saucers Over China",
        trackNumber: 9,
        audioUrl: "/audio/pitchblende-demo-09-saucers-over-china.mp3",
        duration: "3:17",
        description: "Made using Sonic Foundry Acid by Jeff Goergen. Drum patterns could have been made in Fruity Loops or from Alesis SR-16. Voice samples from Jesse Barnes. It's possible this was written originally on Yamaha QY-10 or QY-70 before transferring over to Acid."
      },
      {
        id: "invalid-boot-sector",
        title: "Invalid Boot Sector",
        trackNumber: 10,
        audioUrl: "/audio/pitchblende-demo-10-invalid-boot-sector.mp3",
        duration: "4:06",
        description: "Created by Jeff Goergen, likely with Rebirth, and/or a Yamaha QY10 or QY70 sequencer and probably tracked in Sony Acid."
      },
      {
        id: "do-not-listen-to-me",
        title: "Do Not Listen To Me",
        trackNumber: 11,
        audioUrl: "/audio/pitchblende-demo-11-do-not-listen-to-me.mp3",
        duration: "2:16",
        description: "Experimental electronic track possibly created with Yamaha QY10/QY70 sequencer or perhaps directly in Fruity Loops or Sonic Foundry Acid, with maybe Rebirth generating the bassline. Sampling may have come from BOSS SP-202 Dr. Sample or in Acid."
      },
      {
        id: "rusted-model",
        title: "Rusted Model",
        trackNumber: 12,
        audioUrl: "/audio/pitchblende-demo-12-rusted-model.mp3",
        duration: "3:13",
        description: "I believe this was mostly created by Jeff Goergen, but I don't recall what specific gear was used."
      },
      {
        id: "glowstix-ghetto-version",
        title: "Glowstix (Ghetto Version)",
        trackNumber: 13,
        audioUrl: "/audio/pitchblende-demo-13-glowstix-ghetto-version.mp3",
        duration: "6:36",
        description: "Inspired by Detroit Ghetto Tech, this version of Glowstix features samples from DJ Assault and DJ Godfather."
      },
      {
        id: "blacklight-school-house-roxx-remix",
        title: "Blacklight (School House Roxx Remix)",
        trackNumber: 14,
        audioUrl: "/audio/pitchblende-demo-14-blacklight-school-house-roxx-remix.mp3",
        artwork: "/images/releases/blacklight.jpg",
        duration: "2:58",
        description: "This was a rave song we made in early 2001 for a show we played at our high school called &quot;School House Roxx&quot; and various bands would play on two different stages. Because our band had a lot of equipment and a lot of material we could play, we were the &quot;house band&quot; and on our own makeshift stage in between the other two, and played in between sets. This was a remix we did especially for this show and it sounded pretty good on the PA system we rented."
      },
      {
        id: "rain",
        title: "Rain",
        trackNumber: 15,
        audioUrl: "/audio/pitchblende-demo-15-rain.mp3",
        duration: "4:33",
        description: "One of the first real trance songs written by Pitchblende, started by Jeff Goergen in Rebirth. Over time some recordings were lost, but this version is mostly intact with minor audio hiccups."
      },
      {
        id: "a-dip-in-the-rings-quick-dip-remix",
        title: "A Dip In The Rings (Quick Dip Remix)",
        trackNumber: 16,
        audioUrl: "/audio/pitchblende-demo-16-a-dip-in-the-rings-quick-dip-remix.mp3",
        duration: "3:13",
        description: "A remix of A Dip in the Rings, shortening up the length of the original."
      },
      {
        id: "secret-track",
        title: "Secret Track (Bucora Rangers #1)",
        trackNumber: 17,
        audioUrl: "/audio/pitchblende-demo-17-secret-track.mp3",
        duration: "4:00",
        description: "A comedy sketch featuring the Bucora Rangers, a group of superheroes who protect the city of Bucora from evil-doers."
      }
    ]
  },
];