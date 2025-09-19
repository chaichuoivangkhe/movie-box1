import logo from "./logo.png";
import disneyLogo from "./DisneyLogo.svg"; // sửa lại chữ d thường
import googlePlay from "./googlePlay.svg";
import appStore from "./appStore.svg";
import screenImage from "./screenImage.svg";
import profile from "./profile.png";
import logo1 from "./logo1.png";
import logo3 from "./logo3.png"; // thêm logo3 nếu cần

export const assets = {
  logo,
  disneyLogo,
  googlePlay,
  appStore,
  screenImage,
  profile,
  logo1,
  logo3,
};

export const dummyTrailers = [
  {
    image: "https://img.youtube.com/vi/WpW36ldAqnM/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=WpW36ldAqnM",
  },
  {
    image: "https://img.youtube.com/vi/-sAOWhvheK8/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=-sAOWhvheK8",
  },
  {
    image: "https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=1pHDWnXmK7Y",
  },
  {
    image: "https://img.youtube.com/vi/umiKiW4En9g/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=umiKiW4En9g",
  },
];

const dummyCastsData = [
  {
    name: "Milla Jovovich",
    profile_path:
      "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg",
  },
  {
    name: "Dave Bautista",
    profile_path:
      "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg",
  },
  {
    name: "Arly Jover",
    profile_path:
      "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg",
  },
  {
    name: "Amara Okereke",
    profile_path:
      "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg",
  },
  {
    name: "Fraser James",
    profile_path:
      "https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg",
  },
  {
    name: "Deirdre Mullins",
    profile_path:
      "https://image.tmdb.org/t/p/original/lJm89neuiVlYISEqNpGZA5kTAnP.jpg",
  },
  {
    name: "Sebastian Stankiewicz",
    profile_path:
      "https://image.tmdb.org/t/p/original/hLN0Ca09KwQOFLZLPIEzgTIbqqg.jpg",
  },
  {
    name: "Tue Lunding",
    profile_path:
      "https://image.tmdb.org/t/p/original/qY4W0zfGBYzlCyCC0QDJS1Muoa0.jpg",
  },
  {
    name: "Jacek Dzisiewicz",
    profile_path:
      "https://image.tmdb.org/t/p/original/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg",
  },
  {
    name: "Ian Hanmore",
    profile_path:
      "https://image.tmdb.org/t/p/original/yhI4MK5atavKBD9wiJtaO1say1p.jpg",
  },
  {
    name: "Eveline Hall",
    profile_path:
      "https://image.tmdb.org/t/p/original/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg",
  },
  {
    name: "Kamila Klamut",
    profile_path:
      "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg",
  },
  {
    name: "Caoilinn Springall",
    profile_path:
      "https://image.tmdb.org/t/p/original/uZNtbPHowlBYo74U1qlTaRlrdiY.jpg",
  },
  {
    name: "Jan Kowalewski",
    profile_path:
      "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg",
  },
  {
    name: "Pawel Wysocki",
    profile_path:
      "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg",
  },
  {
    name: "Simon Lööf",
    profile_path:
      "https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg",
  },
  {
    name: "Tomasz Cymerman",
    profile_path:
      "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg",
  },
];

export const dummyShowsData = [
  {
    _id: "324544",
    id: 324544,
    title: "In the Lost Lands",
    overview:
      "A queen sends the powerful and feared sorceress Gray Alys to the ghostly wilderness of the Lost Lands in search of a magical power, where she and her guide, the drifter Boyce, must outwit and outfight both man and demon.",
    poster_path:
      "https://image.tmdb.org/t/p/original/dDlfjR7gllmr8HTeN6rfrYhTdwX.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/op3qmNhvwEvyT7UFyPbIfQmKriB.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 14, name: "Fantasy" },
      { id: 12, name: "Adventure" },
    ],
    casts: dummyCastsData,
    release_date: "2025-02-27",
    original_language: "en",
    tagline: "She seeks the power to free her people.",
    vote_average: 6.4,
    vote_count: 15000,
    runtime: 102,
  },
  {
    _id: "1232546",
    id: 1232546,
    title: "Until Dawn",
    overview:
      "One year after her sister Melanie mysteriously disappeared, Clover and her friends head into the remote valley where she vanished in search of answers. Exploring an abandoned visitor center, they find themselves stalked by a masked killer and horrifically murdered one by one...only to wake up and find themselves back at the beginning of the same evening.",
    poster_path:
      "https://image.tmdb.org/t/p/original/juA4IWO52Fecx8lhAsxmDgy3M3.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/icFWIk1KfkWLZnugZAJEDauNZ94.jpg",
    genres: [
      { id: 27, name: "Horror" },
      { id: 9648, name: "Mystery" },
    ],
    casts: dummyCastsData,
    release_date: "2025-04-23",
    original_language: "en",
    tagline: "Every night a different nightmare.",
    vote_average: 6.405,
    vote_count: 18000,
    runtime: 103,
  },
  {
    _id: "552524",
    id: 552524,
    title: "Lilo & Stitch",
    overview:
      "The wildly funny and touching story of a lonely Hawaiian girl and the fugitive alien who helps to mend her broken family.",
    poster_path:
      "https://image.tmdb.org/t/p/original/mKKqV23MQ0uakJS8OCE2TfV5jNS.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
    genres: [
      { id: 10751, name: "Family" },
      { id: 35, name: "Comedy" },
      { id: 878, name: "Science Fiction" },
    ],
    casts: dummyCastsData,
    release_date: "2025-05-17",
    original_language: "en",
    tagline: "Hold on to your coconuts.",
    vote_average: 7.117,
    vote_count: 27500,
    runtime: 108,
  },
  {
    _id: "668489",
    id: 668489,
    title: "Havoc",
    overview:
      "When a drug heist swerves lethally out of control, a jaded cop fights his way through a corrupt city's criminal underworld to save a politician's son.",
    poster_path:
      "https://image.tmdb.org/t/p/original/ubP2OsF3GlfqYPvXyLw9d78djGX.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/65MVgDa6YjSdqzh7YOA04mYkioo.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 80, name: "Crime" },
      { id: 53, name: "Thriller" },
    ],
    casts: dummyCastsData,
    release_date: "2025-04-25",
    original_language: "en",
    tagline: "No law. Only disorder.",
    vote_average: 6.537,
    vote_count: 35960,
    runtime: 107,
  },
  {
    _id: "950387",
    id: 950387,
    title: "A Minecraft Movie",
    overview:
      "Four misfits find themselves struggling with ordinary problems when they are suddenly pulled through a mysterious portal into the Overworld: a bizarre, cubic wonderland that thrives on imagination. To get back home, they'll have to master this world while embarking on a magical quest with an unexpected, expert crafter, Steve.",
    poster_path:
      "https://image.tmdb.org/t/p/original/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/2Nti3gYAX513wvhp8IiLL6ZDyOm.jpg",
    genres: [
      { id: 10751, name: "Family" },
      { id: 35, name: "Comedy" },
      { id: 12, name: "Adventure" },
      { id: 14, name: "Fantasy" },
    ],
    casts: dummyCastsData,
    release_date: "2025-03-31",
    original_language: "en",
    tagline: "Be there and be square.",
    vote_average: 6.516,
    vote_count: 15225,
    runtime: 101,
  },
  {
    _id: "575265",
    id: 575265,
    title: "Mission: Impossible - The Final Reckoning",
    overview:
      "Ethan Hunt and team continue their search for the terrifying AI known as the Entity — which has infiltrated intelligence networks all over the globe — with the world's governments and a mysterious ghost from Hunt's past on their trail. Joined by new allies and armed with the means to shut the Entity down for good, Hunt is in a race against time to prevent the world as we know it from changing forever.",
    poster_path:
      "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 53, name: "Thriller" },
    ],
    casts: dummyCastsData,
    release_date: "2025-05-17",
    original_language: "en",
    tagline: "Our lives are the sum of our choices.",
    vote_average: 7.042,
    vote_count: 19885,
    runtime: 170,
  },
  {
    _id: "986056",
    id: 986056,
    title: "Thunderbolts*",
    overview:
      "After finding themselves ensnared in a death trap, seven disillusioned castoffs must embark on a dangerous mission that will force them to confront the darkest corners of their pasts.",
    poster_path:
      "https://image.tmdb.org/t/p/original/m9EtP1Yrzv6v7dMaC9mRaGhd1um.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" },
    ],
    casts: dummyCastsData,
    release_date: "2025-04-30",
    original_language: "en",
    tagline: "Everyone deserves a second shot.",
    vote_average: 7.443,
    vote_count: 23569,
    runtime: 127,
  },
  {
    _id: "734931",
    id: 734931,
    title: "Godzilla x Kong: The New Empire",
    overview:
      "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
    poster_path:
      "https://image.tmdb.org/t/p/w1280/lTpnAtn1hWXDLxEmkD28l6UyPlF.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/w1280/lTpnAtn1hWXDLxEmkD28l6UyPlF.jpg",
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
    ],
    casts: dummyCastsData,
    release_date: "2025-06-15",
    original_language: "en",
    tagline: "Two kings, one crown.",
    vote_average: 7.8,
    vote_count: 21500,
    runtime: 115,
  },
  {
    _id: "673822",
    id: 673822,
    title: "Dune: Part Two",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
    poster_path:
      "https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" },
      { id: 18, name: "Drama" },
    ],
    casts: dummyCastsData,
    release_date: "2025-07-10",
    original_language: "en",
    tagline: "Long live the fighters.",
    vote_average: 8.4,
    vote_count: 19000,
    runtime: 166,
  },
  {
    _id: "792307",
    id: 792307,
    title: "Poor Things",
    overview:
      "Brought back to life by an unorthodox scientist, a young woman runs off with a debauched lawyer on a whirlwind adventure across the continents. Free from the prejudices of her times, she grows steadfast in her purpose to stand for equality and liberation.",
    poster_path:
      "https://image.tmdb.org/t/p/original/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 10749, name: "Romance" },
      { id: 35, name: "Comedy" },
    ],
    casts: dummyCastsData,
    release_date: "2025-08-05",
    original_language: "en",
    tagline: "A tale of love, discovery and fantasy.",
    vote_average: 7.9,
    vote_count: 14300,
    runtime: 141,
  },
  {
    _id: "565770",
    id: 565770,
    title: "Blue Beetle",
    overview:
      "Recent college grad Jaime Reyes returns home full of aspirations for his future, only to find that home is not quite as he left it. As he searches to find his purpose in the world, fate intervenes when Jaime unexpectedly finds himself in possession of an ancient relic of alien biotechnology: the Scarab.",
    poster_path:
      "https://image.tmdb.org/t/p/original/mXLOHHc1Zeuwsl4xYKjKh2280oL.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/1syW9SNna38rSl9fnXwc9fP7POW.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 878, name: "Science Fiction" },
      { id: 12, name: "Adventure" },
    ],
    casts: dummyCastsData,
    release_date: "2025-05-28",
    original_language: "en",
    tagline: "Jaime Reyes is a superhero whether he likes it or not.",
    vote_average: 6.8,
    vote_count: 12600,
    runtime: 127,
  },
  {
    _id: "872585",
    id: 872585,
    title: "Oppenheimer",
    overview:
      "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
    poster_path:
      "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
    genres: [
      { id: 18, name: "Drama" },
      { id: 36, name: "History" },
      { id: 53, name: "Thriller" },
    ],
    casts: dummyCastsData,
    release_date: "2025-08-30",
    original_language: "en",
    tagline: "The world forever changes.",
    vote_average: 8.2,
    vote_count: 25400,
    runtime: 180,
  },
  {
    _id: "787699",
    id: 787699,
    title: "Wonka",
    overview:
      "Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you're lucky enough to meet Willy Wonka, anything is possible.",
    poster_path:
      "https://image.tmdb.org/t/p/original/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/9PqD3wSIjntyJDBzMNuxuKHwpUD.jpg",
    genres: [
      { id: 10751, name: "Family" },
      { id: 35, name: "Comedy" },
      { id: 14, name: "Fantasy" },
    ],
    casts: dummyCastsData,
    release_date: "2025-07-22",
    original_language: "en",
    tagline: "Every good thing in this world started with a dream.",
    vote_average: 7.2,
    vote_count: 18700,
    runtime: 116,
  },
  {
    _id: "572802",
    id: 572802,
    title: "Aquaman and the Lost Kingdom",
    overview:
      "Black Manta seeks revenge on Aquaman for his father's death. Wielding the Black Trident's power, he becomes a formidable foe. To defend Atlantis, Aquaman forges an alliance with his imprisoned brother. They must protect the kingdom.",
    poster_path:
      "https://image.tmdb.org/t/p/original/7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg",
    genres: [
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
      { id: 14, name: "Fantasy" },
    ],
    casts: dummyCastsData,
    release_date: "2025-09-12",
    original_language: "en",
    tagline: "The tide is turning.",
    vote_average: 6.5,
    vote_count: 16900,
    runtime: 124,
  },
  {
    _id: "823464",
    id: 823464,
    title: "Killers of the Flower Moon",
    overview:
      "When oil is discovered in 1920s Oklahoma under Osage Nation land, the Osage people are murdered one by one—until the FBI steps in to unravel the mystery.",
    poster_path:
      "https://image.tmdb.org/t/p/original/yKzDni7PdTUK1456aYaVTJKMpuG.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/1X7vow16X7CnCoexXh4H4F2yDJv.jpg",
    genres: [
      { id: 80, name: "Crime" },
      { id: 18, name: "Drama" },
      { id: 36, name: "History" },
    ],
    casts: dummyCastsData,
    release_date: "2025-10-05",
    original_language: "en",
    tagline: "Money. Murder. Mystery.",
    vote_average: 7.6,
    vote_count: 21300,
    runtime: 206,
  },
  {
    _id: "762373",
    id: 762373,
    title: "Last Voyage of the Demeter",
    overview:
      "The crew of the merchant ship Demeter attempts to survive the ocean voyage from Carpathia to London as they are stalked each night by a merciless presence onboard the ship.",
    poster_path:
      "https://image.tmdb.org/t/p/original/nrtbv6Cew7qC7k9GsYSf5uSmuKh.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/nrtbv6Cew7qC7k9GsYSf5uSmuKh.jpg",
    genres: [
      { id: 27, name: "Horror" },
      { id: 14, name: "Fantasy" },
      { id: 53, name: "Thriller" },
    ],
    casts: dummyCastsData,
    release_date: "2025-04-18",
    original_language: "en",
    tagline: "Evil takes flight.",
    vote_average: 7.1,
    vote_count: 13500,
    runtime: 119,
  },
  {
    _id: "624860",
    id: 624860,
    title: "Rebel Moon – Part One: A Child of Fire",
    overview:
      "When a peaceful colony on the edge of the galaxy finds itself threatened by the armies of the tyrannical Regent Balisarius, they dispatch Kora, a young woman with a mysterious past, to seek out warriors from neighboring planets to help them take a stand.",
    poster_path:
      "https://image.tmdb.org/t/p/original/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
    genres: [
      { id: 878, name: "Science Fiction" },
      { id: 28, name: "Action" },
      { id: 12, name: "Adventure" },
    ],
    casts: dummyCastsData,
    release_date: "2025-09-22",
    original_language: "en",
    tagline: "The universe has a new force rising.",
    vote_average: 6.4,
    vote_count: 17800,
    runtime: 134,
  },
];

export const dummyDateTimeData = {
  "2025-07-24": [
    { time: "2025-07-24T01:00:00.000Z", showId: "68395b407f6329be2bb45bd1" },
    { time: "2025-07-24T03:00:00.000Z", showId: "68395b407f6329be2bb45bd2" },
    { time: "2025-07-24T05:00:00.000Z", showId: "68395b407f6329be2bb45bd3" },
  ],
  "2025-07-25": [
    { time: "2025-07-25T01:00:00.000Z", showId: "68395b407f6329be2bb45bd4" },
    { time: "2025-07-25T03:00:00.000Z", showId: "68395b407f6329be2bb45bd5" },
    { time: "2025-07-25T05:00:00.000Z", showId: "68395b407f6329be2bb45bd6" },
  ],
  "2025-07-26": [
    { time: "2025-07-26T01:00:00.000Z", showId: "68395b407f6329be2bb45bd7" },
    { time: "2025-07-26T03:00:00.000Z", showId: "68395b407f6329be2bb45bd8" },
    { time: "2025-07-26T05:00:00.000Z", showId: "68395b407f6329be2bb45bd9" },
  ],
  "2025-07-27": [
    { time: "2025-07-27T01:00:00.000Z", showId: "68395b407f6329be2bb45bda" },
    { time: "2025-07-27T03:00:00.000Z", showId: "68395b407f6329be2bb45bdb" },
    { time: "2025-07-27T05:00:00.000Z", showId: "68395b407f6329be2bb45bdc" },
  ],
};

export const dummyDashboardData = {
  totalBookings: 14,
  totalRevenue: 1517000,
  totalUser: 5,
  activeShows: [
    {
      _id: "68352363e96d99513e4221a4",
      movie: dummyShowsData[0],
      showDateTime: "2025-06-30T02:30:00.000Z",
      showPrice: 59000,
      occupiedSeats: {
        A1: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
        B1: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
        C1: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
      },
    },
    {
      _id: "6835238fe96d99513e4221a8",
      movie: dummyShowsData[1],
      showDateTime: "2025-06-30T15:30:00.000Z",
      showPrice: 81000,
      occupiedSeats: {},
    },
    {
      _id: "6835238fe96d99513e4221a9",
      movie: dummyShowsData[2],
      showDateTime: "2025-06-30T03:30:00.000Z",
      showPrice: 81000,
      occupiedSeats: {},
    },
    {
      _id: "6835238fe96d99513e4221aa",
      movie: dummyShowsData[3],
      showDateTime: "2025-07-15T16:30:00.000Z",
      showPrice: 81000,
      occupiedSeats: {
        A1: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
        A2: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
        A3: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
        A4: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
      },
    },
    {
      _id: "683682072b5989c29fc6dc0d",
      movie: dummyShowsData[4],
      showDateTime: "2025-06-05T15:30:00.000Z",
      showPrice: 49000,
      occupiedSeats: {
        A1: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
        A2: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
        A3: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
        B1: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
        B2: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
        B3: "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
      },
      __v: 0,
    },
    {
      _id: "68380044686d454f2116b39a",
      movie: dummyShowsData[5],
      showDateTime: "2025-06-20T16:00:00.000Z",
      showPrice: 79000,
      occupiedSeats: {
        A1: "user_2xl7eCSUHddibk5lRxfOtw9RMwX",
        A2: "user_2xl7eCSUHddibk5lRxfOtw9RMwX",
      },
    },
  ],
};

export const dummyBookingData = [
  {
    _id: "68396334fb83252d82e17295",
    user: { name: "Thanh" },
    show: {
      _id: "68352363e96d99513e4221a4",
      movie: dummyShowsData[0],
      showDateTime: "2025-06-30T02:30:00.000Z",
      showPrice: 59000,
    },
    amount: 98000,
    bookedSeats: ["D1", "D2"],
    isPaid: false,
  },
  {
    _id: "68396334fb83252d82e17295",
    user: { name: "Huỳnh" },
    show: {
      _id: "68352363e96d99513e4221a4",
      movie: dummyShowsData[0],
      showDateTime: "2025-06-30T02:30:00.000Z",
      showPrice: 59000,
    },
    amount: 49000,
    bookedSeats: ["A1"],
    isPaid: true,
  },
  {
    _id: "68396334fb83252d82e17295",
    user: { name: "Nghi" },
    show: {
      _id: "68352363e96d99513e4221a4",
      movie: dummyShowsData[0],
      showDateTime: "2025-06-30T02:30:00.000Z",
      showPrice: 59000,
    },
    amount: 147000,
    bookedSeats: ["A1", "A2", "A3"],
    isPaid: true,
  },
];
