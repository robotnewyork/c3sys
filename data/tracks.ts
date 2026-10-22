export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
  youtube?: string;
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  releaseId: string | null;
  duration?: string;
  trackNumber?: number;
  audioUrl?: string;
  featured: boolean;
  streamingLinks?: StreamingLinks;
  description?: string;
  gear?: string[];
  artwork?: string;
}

export const tracksData: Track[] = [
  {
    id: "seven-knots",
    title: "Seven Knots",
    artist: "Lee & the Lips",
    artistId: "lee-and-the-lips",
    releaseId: "C3LL003",
    duration: "2:59",
    trackNumber: 1,
    audioUrl: "/audio/lee_and_the_lips_seven_knots.mp3",
    artwork: "/images/releases/seven-knots.jpg",
    featured: true
  },{
    id: "groove-solution",
    title: "Groove Solution",
    artist: "Slum Denizens",
    artistId: "slum-denizens",
    releaseId: "C3SD001",
    duration: "4:06",
    trackNumber: 1,
    audioUrl: "/audio/slum_denizens_groove_solution.mp3",
    featured: false
  },
  {
    id: "my-electric-toothbrush",
    title: "My Electric Toothbrush",
    artist: "Slum Denizens",
    artistId: "slum-denizens",
    releaseId: "C3SD002",
    duration: "4:54",
    trackNumber: 1,
    audioUrl: "/audio/slum_denizens_my_electric_toothbrush.mp3",
    featured: true
  },
  {
    id: "madadayo",
    title: "Madadayo",
    artist: "Slum Denizens",
    artistId: "slum-denizens",
    releaseId: "C3SD003",
    duration: "4:52",
    trackNumber: 1,
    audioUrl: "/audio/slum_denizens_madadayo.mp3",
    featured: false
  },
  {
    id: "coming-around-again",
    title: "Coming Around Again",
    artist: "Lee & the Lips",
    artistId: "lee-and-the-lips",
    releaseId: "C3LL001A",
    duration: "4:00",
    trackNumber: 1,
    audioUrl: "/audio/lee_and_the_lips_coming_around_again.mp3",
    featured: true
  },
  {
    id: "gnossienne-no-1",
    title: "Gnossienne No. 1",
    artist: "Lee & the Lips",
    artistId: "lee-and-the-lips",
    releaseId: "C3LL002",
    duration: "4:24",
    trackNumber: 1,
    audioUrl: "/audio/lee-and-the-lips-gnossienne-no-1.mp3",
    featured: true
  },
  // Unreleased tracks for gear demonstration
  {
    id: "nepheton",
    title: "Nepheton",
    artist: "Chad Wilson",
    artistId: "chad-wilson",
    releaseId: null,
    duration: "0:37",
    audioUrl: "/audio/nepheton.mp3",
    featured: false,
    description: "A small video game loop made in 2009 in Fruity Loops using Nepheton VST for the drums (with CamelPhat FX making the beep noises), Albino VST with the square melody, Predator VST for bassline, and Discovery VST for background part.",
    gear: ["nepheton", "predator", "fruity-loops", "albino", "camelphat"]
  },
  {
    id: "robo-destructo",
    title: "Robo Destructo",
    artist: "FilterSlut & E-Lusion",
    artistId: "fse",
    releaseId: null,
    duration: "5:39",
    audioUrl: "/audio/filterslut-elusion-robo-destructo.mp3",
    featured: false,
    description: "Unreleased drum & bass track about giant robots getting loose and causing mayhem across the city. The majority of the track was made in 2004 with additional work through 2007. It was written using Fruity Loops and Sony Acid, with various VSTs and a Korg MS-2000R and probably a Waldorf Micro-Q.",
    gear: ["fruity-loops", "microq", "ms2000r", "sony-acid"]
  },
  {
    id: "bey",
    title: "Bey",
    artist: "Chad Wilson",
    artistId: "chad-wilson",
    releaseId: null,
    duration: "2:41",
    audioUrl: "/audio/bey.mp3",
    featured: false,
    description: "Down to twenty men, Lawrence scouts the enemy-held city of Daraa with Ali, but is taken, along with several Arab residents, to the Turkish Bey. For striking the Bey after he is lasciviously stripped, ogled, and prodded, Lawrence is severely beaten and then thrown out into the street. This song written in a couple of hours just in Fruity Loops 7 uses Poly6 and FM8 plugins. All the percussion samples are from Native Instruments Synthetic Drums 2 collection.",
    gear: ["fruity-loops", "synthetic-drums", "polysix", "fm8"]
  },
  {
    id: "duster",
    title: "Duster",
    artist: "FilterSlut & E-Lusion",
    artistId: "fse",
    releaseId: null,
    duration: "4:27",
    audioUrl: "/audio/filterslut-elusion-duster.mp3",
    featured: false,
    description: "Unreleased DnB/Jungle track from FilterSlut & E-Lusion, made in January 2005.This track was made using Fruity Loops and Sony Acid. I remember using V-Station for the bass and probably for the keyboard as well.",
    gear: ["fruity-loops", "sony-acid", "v-station"]
  },
  {
    id: "convex",
    title: "Convex",
    artist: "FM3",
    artistId: "fm3",
    releaseId: null,
    duration: "2:44",
    audioUrl: "/audio/fm3-convex.mp3",
    featured: false,
    description: "This is an unreleased triphop track from 2003 by FM3, a failed triphop group I was a part of. The piano is recorded live from a Roland XP-60, the rest was made in Fruity Loops and sequenced in Sony Acid.",
    gear: ["fruity-loops", "sony-acid", "xp-60"]
  },
  {
    id: "drum-fun-1",
    title: "Drum Fun 1",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "9:59",
    audioUrl: "/audio/boy-magician-drum-fun-1.mp3",
    featured: false,
    description: "We had the idea to take drum patterns from all of our Boy Magician tracks and do a quick live set using only these drums (no other sounds except our drums). We're both performing live using two MC-303s, possibly running sounds through a Korg EA-1. Maybe a Yamaha QY70 and BOSS SP-202 were used as well.",
    gear: ["mc303", "ea1", "qy70", "sp202"]
  },
  {
    id: "drum-fun-2",
    title: "Drum Fun 2",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "9:59",
    audioUrl: "/audio/boy-magician-drum-fun-2.mp3",
    featured: false,
    description: "A follow up to Drum Fun #1, this was a impromptu 10 minute live set taking the drums from our various Boy Magician tracks and and riffing on them for 10 minutes. This was made probably in 2002, on two Roland MC-303s and possibly a BOSS SP-202 Dr. Sample",
    gear: ["mc303", "ea1", "qy70", "sp202"]
  },
  {
    id: "away-u-go",
    title: "Away U Go",
    artist: "Pitchblende",
    artistId: "pitchblende",
    releaseId: null,
    duration: "1:09",
    trackNumber: 0,
    audioUrl: "/audio/pitchblende-away-u-go.mp3",
    featured: false,
    description: "One of the first tracks Jeff Goergen made using Rebirth, circa 1998-1999.",
    gear: ["rebirth"]
  },
  {
    id: "quicky",
    title: "Quicky (Booty Mix)",
    artist: "Pitchblende",
    artistId: "pitchblende",
    releaseId: null,
    duration: "1:46",
    trackNumber: 0,
    audioUrl: "/audio/pitchblende-quicky-booty-mix.mp3",
    featured: false,
    description: "One of the first tracks Jeff Goergen made using Rebirth, circa 1998-1999.",
    gear: ["rebirth"]
  },
  {
    id: "technopolk",
    title: "Technopolk",
    artist: "Pitchblende",
    artistId: "pitchblende",
    releaseId: null,
    duration: "2:34",
    trackNumber: 0,
    audioUrl: "/audio/pitchblende-technopolk.mp3",
    featured: false,
    description: "A jam Jeff and I recorded one late night around 2000-2001 with drums from the Alesis SR-16, Jeff on Casiotone 7000 and SP-202 samples, and me on the Yamaha XP-60. The idea of combining techno and polka was so stupid it had to be recorded.",
    gear: ["casiotone-7000", "xp-60", "sr16", "sp202"]
  },
  {
    id: "orbit",
    title: "Orbit",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "3:30",
    audioUrl: "/audio/boy-magician-orbit.mp3",
    featured: false,
    description: "Demo of a track written & recorded by Jeff Goergen on a Roland MC-303 and possible Korg EA-1.",
    gear: ["mc303", "ea1"]
  },
  {
    id: "orbit-extended-mix",
    title: "Orbit (Extended House Mix)",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "13:09",
    audioUrl: "/audio/boy-magician-orbit-extended-house-mix.mp3",
    featured: false,
    description: "Longer version of Orbit, written & recorded by Jeff Goergen on a Roland MC-303 and possible Korg EA-1.",
    gear: ["mc303", "ea1"]
  },
  {
    id: "time-rift",
    title: "Time Rift",
    artist: "FilterSlut & E-Lusion",
    artistId: "fse",
    artwork: "/images/artists/fse.jpg",
    releaseId: null,
    duration: "3:53",
    audioUrl: "/audio/filter-slut-elusion-time-rift.mp3",
    featured: false,
    description: "Made in 2006 using probably Cakewalk Sonar 3/4 (or possibly Cubase), which we weren't too familiar with but wanted to try out the time-stretching possibilities. Vocals by Jesse Barnes.",
    gear: ["cakewalk-sonar"]
  },
  {
    id: "racecar",
    title: "Racecar",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "3:59",
    audioUrl: "/audio/boy-magician-racecar.mp3",
    featured: false,
    description: "Written around 2004, this is one of our first real drum and bass tracks, probably using Cakewalk Sonar.",
    gear: ["cakewalk-sonar",]
  },
  {
    id: "terminal-sarahs-party",
    title: "Terminal (Live @ Sarah's Party)",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "9:37",
    audioUrl: "/audio/boy-magician-terminal-sarahs-party.mp3",
    featured: false,
    description: "Performed by Jeff Goergen & John B circa 2002.",
    gear: ["mc303", "qy70", "qy10", "ea1"]
  },
  {
    id: "katana-dream-sequence-sarahs-party",
    title: "Katana Dream Sequence (Live @ Sarah's Party)",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "15:08",
    audioUrl: "/audio/boy-magician-katana-dream-sequence-sarahs-party.mp3",
    featured: false,
    description: "Performed by Jeff Goergen & John B circa 2002.",
    gear: ["mc303", "qy70", "qy10", "ea1"]
  },
  {
    id: "buck-naked-wired-frog",
    title: "Buck Naked (Live @ Wired Frog)",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "10:42",
    audioUrl: "/audio/boy-magician-buck-naked-wired-frog.mp3",
    featured: false,
    description: "Performed by Jeff Goergen & John B live at Wired Frog in Eastpointe, MI circa 2002.",
    gear: ["mc303", "qy70", "qy10", "ea1"]
  },
  {
    id: "broken-wired-frog",
    title: "Broken (Live @ Wired Frog)",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "11:09",
    audioUrl: "/audio/boy-magician-broken-wired-frog.mp3",
    featured: false,
    description: "Performed by Jeff Goergen & John B live at Wired Frog in Eastpointe, MI circa 2002.",
    gear: ["mc303", "qy70", "qy10", "ea1"]
  },
  {
    id: "cylindrical-wired-frog",
    title: "Cylindrical (Live @ Wired Frog)",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "11:50",
    audioUrl: "/audio/boy-magician-cylindrical-wired-frog.mp3",
    featured: false,
    description: "Performed by Jeff Goergen & John B live at Wired Frog in Eastpointe, MI circa 2002.",
    gear: ["mc303", "qy70", "qy10", "ea1"]
  },
  {
    id: "live-knights-columbus",
    title: "Live @ Knights of Columbus 2003",
    artist: "Rement Ipalex / Lucid Dreams / Boy Magician",
    artistId: "various",
    releaseId: null,
    duration: "28:01",
    audioUrl: "/audio/live-knights-columbus.mp3",
    featured: false,
    description: "Circa 2003 we rented out a Knights of Columbus hall in Roseville, MI to put on a show featuring our various bands. The whole show wasn't recorded, but this was a pre-rendered MP3 that we played live and maybe did some live EQ or additional parts while it was playing. The live set features tracks from various groups we were a part of at the time, including Rement Ipalex (Experimental), Lucid Dreams (Ambient), and Boy Magician (Dance).",
    gear: ["xp-60"]
  },
  {
    id: "john-wayne-joshs-party",
    title: "John Wayne (Live @ Josh's Party)",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "8:50",
    audioUrl: "/audio/boy-magician-john-wayne-joshs-party.mp3",
    featured: false,
    description: "Performed by Jeff Goergen & Chad Wilson circa 2002.",
    gear: ["mc303", "qy70", "qy10", "ea1", "sp202"]
  },
  {
    id: "broken-joshs-party",
    title: "Broken (Live @ Josh's Party)",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "5:20",
    audioUrl: "/audio/boy-magician-broken-joshs-party.mp3",
    featured: false,
    description: "Performed by Jeff Goergen & Chad Wilson circa 2002.",
    gear: ["mc303", "qy70", "qy10", "ea1", "sp202"]
  },
  {
    id: "buck-naked-joshs-party",
    title: "Buck Naked (Live @ Josh's Party)",
    artist: "Boy Magician",
    artistId: "boy-magician",
    releaseId: null,
    duration: "9:58",
    audioUrl: "/audio/boy-magician-buck-naked-joshs-party.mp3",
    featured: false,
    description: "Performed by Jeff Goergen & Chad Wilson circa 2002.",
    gear: ["mc303", "qy70", "qy10", "ea1", "sp202"]
  },
  {
    id: "deadbeat",
    title: "Deadbeat",
    artist: "Paranoia",
    artistId: "paranoia",
    releaseId: "C3P001",
    duration: "3:42",
    trackNumber: 1,
    featured: true,
    streamingLinks: {
      appleMusic: "https://music.apple.com/us/album/deadbeat-single/6800463801",
      spotify: "https://open.spotify.com/album/1aBfdXzoYDmHmJMD3FKyz2?si=Z5MAuS_5TaiDNtwLHt7Cbg",
      youtube: "https://www.youtube.com/watch?v=vuI77MutwFs"
    },
    description: "",
    gear: ["schecter-hellraiser-c1", "boss-katana-50-mkii", "sterling-stingray-musicman", "sE7","sm58", "sm57", "md421", "beta52a", "b1", "18i20", "cubase", "ozone", "soundforge"]
  }
];