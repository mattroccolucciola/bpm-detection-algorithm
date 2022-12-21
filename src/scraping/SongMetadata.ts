export interface SongMetrics {
  [index: string]: string | number | { transcodings: Transcoding[] };
  genre: string;
  waveform_url: string;
  comment_count: number;
  likes_count: number;
  playback_count: number;
  reposts_count: number;
  title: string;
  artwork_url: string;
  permalink_url: string;
  permalink: string;
  id: number;
  track_authorization: string;
  media: {
    transcodings: Transcoding[]; // used in https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls
  };
}

/** # Song metadata for responses from soundcloud
 *
 */
export interface SongResJson {
  [index: string]: string | number | boolean | { transcodings: Transcoding[] };
  genre: string;
  title: string;
  waveform_url: string;
  comment_count: number;
  duration: number;
  id: number; // 1317984667
  likes_count: number;
  playback_count: number;
  reposts_count: number;
  release_date: string;
  media: {
    transcodings: Transcoding[]; // used in https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls
  };
  track_authorization: string; // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJnZW8iOiJVUyIsInN1YiI6IiIsInJpZCI6ImEyNWUzZjUyLTk0YjktNGNmZS05YmNkLWRjMmM1NzczNmVmNyIsImlhdCI6MTY2MTI4MDg3M30.NtHZS90th2v8CbYqlPkjemw9qbZZHBl2ZBCQwFnTksk";
  artwork_url: string;
  permalink_url: string;
  permalink: string;
  created_at: string;
  description: string;
  embeddable_by: string;
  kind: string;
  last_modified: string;
  license: string;
  state: string;
  track_format: string;
  uri: string;
  urn: string;
  display_date: string;
  tag_list: string;
  download_count: number;
  full_duration: number;
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
}

export interface Transcoding {
  url: string; //"https://api-v2.soundcloud.com/media/soundcloud:tracks:1317984667/b6705d26-a662-499e-8c4b-1e922b59475c/stream/hls";
  preset: string; //"mp3_1_0";
  duration: number;
  format: {
    protocol: string; // hls, progressive
    mime_type: string; // "audio/mpeg"
  };
  quality: string; //"sq";
  snipped: boolean;
}
