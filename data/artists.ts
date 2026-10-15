export interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string;
  image: string;
  featured: boolean;
  genres: string[];
  featuredTracks: string[];
  instagram?: string;
}

export const artistsData: Artist[] = [
  {
    id: "slum-denizens",
    name: "Slum Denizens",
    slug: "slum-denizens",
    bio: "Slum Denizens is a project blending different genres of electronic and non-electronic music.",
    image: "/images/artists/slum-denizens-square.png",
    featured: true,
    genres: ["Electronic", "Experimental", "Eurodance", "Funk", "Reggae", "Psytrance"],
    featuredTracks: ["groove-solution", "my-electric-toothbrush"]
  },
  {
    id: "lee-and-the-lips",
    name: "Lee & the Lips",
    slug: "lee-and-the-lips",
    bio: "Centered around guitarist Lee Wilson, Lee &amp; the Lips is a classic rock band drawing inspiration from the legendary sounds of the 60s, 70s and 80s. Lee & the Lips delivers a nostalgic yet fresh take on classic rock, while not afraid to branch out into other genres like jazz, reggae or even classical.",
    image: "/images/artists/lee-and-the-lips.jpg",
    featured: true,
    genres: ["Rock", "Classic Rock", "Classical"],
    featuredTracks: ["seven-knots"]
  },
  {
    id: "paranoia",
    name: "Paranoia",
    slug: "paranoia",
    bio: "Detroit Alternative Rock/Metal. Guitar/Vocals - @codsby.fm | Drums - @rob_turpin_",
    image: "/images/artists/paranoia.jpg",
    featured: true,
    genres: ["Alternative Rock", "Metal", "Hard Rock"],
    featuredTracks: ["deadbeat"],
    instagram: "https://www.instagram.com/paranoia.313/"
  }
];