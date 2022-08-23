export interface Transcoding {
  url: string; //"https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls";
  preset: string; //"mp3_1_0";
  quality?: string; //"sq";
  duration: number;
  snipped?: boolean;
}
export interface ResolveJson {
  created_at?: string;
  description?: string;
  embeddable_by?: string;
  genre?: string;
  kind?: string;
  last_modified?: string;
  license?: string;
  permalink?: string;
  permalink_url?: string;
  state?: string;
  title?: string;
  track_format?: string;
  uri?: string;
  urn?: string;
  waveform_url?: string;
  display_date?: string;
  tag_list?: string;
  comment_count?: number;
  download_count?: number;
  duration?: number;
  full_duration?: number;
  id: number; // 1317984667
  likes_count?: number;
  playback_count?: number;
  reposts_count?: number;
  user_id?: number;
  commentable?: boolean;
  downloadable?: boolean;
  has_downloads_left?: boolean;
  public?: boolean;
  streamable?: boolean;
  caption?: any;
  label_name?: any;
  visuals?: any;
  purchase_title?: any;
  purchase_url?: any;
  release_date?: any;
  media: {
    transcodings: Transcoding[]; // https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls
  };
  track_authorization: string; // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI4MDg3M30.NtHZS90th2v8CbYqlPkjemw9qbZZHBl2ZBCQwFnTksk";
}
export interface Catchall {
  artwork_url: string;
  created_at: string;
  description: string;
  embeddable_by: string;
  genre: string;
  kind: string;
  last_modified: string;
  license: string;
  permalink: string;
  permalink_url: string;
  sharing: string;
  state: string;
  title: string;
  track_format: string;
  uri: string;
  urn: string;
  waveform_url: string;
  display_date: string;
  tag_list: string;
  comment_count: number;
  download_count: number;
  duration: number;
  full_duration: number;
  id: number;
  likes_count: number;
  playback_count: number;
  reposts_count: number;
  user_id: number;
  commentable: boolean;
  downloadable: boolean;
  has_downloads_left: boolean;
  public: boolean;
  streamable: boolean;
  caption: any;
  label_name: any;
  visuals: any;
  purchase_title: any;
  purchase_url: any;
  release_date: any;
  secret_token: any;
  publisher_metadata: {
    urn: string;
    artist: string;
    isrc: string;
    id: 1317984667;
    contains_music: true;
  };
  media: {
    transcodings: [
      {
        url: "https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls";
        preset: "mp3_1_0";
        quality: "sq";
        duration: number;
        snipped: boolean;
        format: { protocol: "hls"; mime_type: "audio/mpeg" };
      },
      {
        url: string;
        preset: string;
        duration: number;
        snipped: boolean;
        format: {
          protocol: "hls";
          mime_type: 'audio/ogg; codecs="opus"';
        };
        quality: "sq";
      }
    ];
  };
  station_urn: string;
  station_permalink: string;
  track_authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI4MDg3M30.NtHZS90th2v8CbYqlPkjemw9qbZZHBl2ZBCQwFnTksk";
  monetization_model: string;
  policy: string;
  user: any;
}
