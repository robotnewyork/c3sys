export interface TimelineEvent {
  id: string;
  date: string; // ISO date string (YYYY-MM-DD) or year only (YYYY)
  type: 'release' | 'milestone' | 'event' | 'collaboration' | 'venue' | 'equipment' | 'live-event';
  title: string;
  description: string;
  images?: string[]; // Array of image URLs
  releaseId?: string; // Optional: link to existing release data
  artistId?: string; // Optional: link to artist
  venue?: string;
  location?: string;
  tracks?: string[]; // Array of track IDs for live events
  tags?: string[];
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'studio-built',
    date: '2020-05-04',
    type: 'milestone',
    title: 'New Studio Built',
    description: 'New studio finished and ready for action, after years of planning and construction.',
    images: ['/images/studio-build-1.jpg', '/images/studio-build-2.jpg', '/images/studio-build-3.jpg', '/images/studio-build-4.jpg', '/images/studio-build-5.jpg', '/images/studio-build-6.jpg', '/images/studio-build-7.jpg', '/images/studio-build-8.jpg', '/images/studio-build-9.jpg' ],
    tags: ['milestone']
  },
  {
    id: 'sarahs-party',
    date: '2002',
    type: 'live-event',
    title: 'Sarah\'s Party',
    description: 'Performed by Jeff Goergen & John B circa 2002 at Sarah\'s party.',
    images: [],
    tracks: ['terminal-sarahs-party', 'katana-dream-sequence-sarahs-party']
  },
  {
    id: 'joshs-party',
    date: '2002',
    type: 'live-event',
    title: 'Josh\'s Party',
    description: 'Our friend Josh hosted a Halloween party each year where we would perform.',
    images: [],
    tracks: ['john-wayne-joshs-party', 'broken-joshs-party', 'buck-naked-joshs-party']
  },
  {
    id: 'wired-frog',
    date: '2002',
    type: 'live-event',
    title: 'Boy Magician Live @ Wired Frog',
    description: 'Performed by Jeff Goergen & John B circa 2002 at Wired Frog in Eastpointe, MI.',
    images: [],
    tracks: ['buck-naked-wired-frog', 'broken-wired-frog', 'cylindrical-wired-frog']
  },
  {
    id: 'knights-columbus',
    date: '2003',
    type: 'live-event',
    title: 'Live @ Knights of Columbus 2003',
    description: 'Circa 2003 we rented out a Knights of Columbus hall in Roseville, MI to put on a show featuring our various bands. The whole show wasn\'t recorded, but this was a pre-rendered MP3 that we played live and maybe did some live EQ or additional parts while it was playing. The live set features tracks from various groups we were a part of at the time, including Rement Ipalex (Experimental), Lucid Dreams (Ambient), and Boy Magician (Dance), as well as friends\' bands Elegant Simon Two Guns and Jugglebot Initiative.',
    images: [],
    tracks: ['live-knights-columbus']
  },
  
];