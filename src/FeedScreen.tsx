import React, { useContext, useCallback, useEffect, useState, memo } from 'react'
import { SafeAreaView, StyleSheet, FlatList, View, ActivityIndicator } from 'react-native'

import NavBar from './NavBar'
import { UserContext } from './context'
import { INewsfeedResponse, IPost } from './types'
import Post from './Post'

export default memo(() => {
  const { user } = useContext(UserContext)

  const [posts, setPosts] = useState<IPost[]>([])
  const [nextFrom, setNextFrom] = useState<string>('')

  const loadFeed = useCallback(() => {
    fetch(
      `https://api.vk.com/method/newsfeed.get?v=5.92&filters=post&count=25&access_token=${user?.access_token}&start_from=${nextFrom}`
    )
      .then((res) => res.json())
      .then(({ response }: { response: INewsfeedResponse }) => {
        const owners = [
          ...response.profiles.map((owner) => ({
            id: owner.id,
            name: `${owner.first_name} ${owner.last_name}`,
            photo_100: owner.photo_100,
          })),
          ...response.groups.map((owner) => ({ ...owner, id: owner.id * -1 })),
        ]
        const newPosts: IPost[] = response.items
          .filter((item) => item.text.length > 0)
          .map(({ post_id, source_id, text }) => ({
            id: post_id,
            text,
            owner: owners.find((owner) => owner.id === source_id),
          }))
        setPosts([...posts, ...newPosts])
        setNextFrom(response.next_from)
      })
  }, [user, posts, nextFrom])

  useEffect(() => {
    loadFeed()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <NavBar title='Лента' />
      {posts.length === 0 && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size='large' color='#000' />
        </View>
      )}
      {posts.length > 0 && (
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.content}
          data={posts}
          keyExtractor={(post) => String(post.id)}
          renderItem={({ item }) => <Post post={item} />}
          onEndReached={loadFeed}
        />
      )}
    </SafeAreaView>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  flatList: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
