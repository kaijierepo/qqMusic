
export default class songs {
  constructor({
    id,
    mid,
    name,
    singer,
    duration,
    album,
    image,
    url
  }) {
    this.id = id,
      this.mid = mid,
      this.name = name,
      this.singer = singer,
      this.duration = duration,
      this.album = album,
      this.image = image,
      this.url = url
  }
}

export function createdSong(musicData) {
  return new songs({
    id: musicData.songid,
    mid: musicData.songmid,
    name: musicData.albumname,
    singer: filterName(musicData.singer),
    duration: musicData.interval,
    album: musicData.songname,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: ''
  })
}

export function createdRecommendSong(musicData) {
  return new songs({
    id: musicData.id,
    mid: musicData.mid,
    name: musicData.name,
    singer: filterName(musicData.singer),
    duration: musicData.interval,
    album: musicData.album.name,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
    url: ''
  })
}

export function filterName(singer) {
  let result = []
  if (!singer) {
    return ''
  }
  singer.forEach(item => {
    result.push(item.name)
  });

  return result.join('/')
}

