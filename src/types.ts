export interface INewsfeedResponse {
  items: {
    post_id: number
    source_id: number
    text: string
  }[]
  profiles: {
    id: number
    first_name: string
    last_name: string
    photo_100: string
  }[]
  groups: {
    id: number
    name: string
    photo_100: string
  }[]
  next_from: string
}

export interface IPost {
  id: number
  text: string
  owner?: {
    id: number
    name: string
    photo_100: string
  }
}
