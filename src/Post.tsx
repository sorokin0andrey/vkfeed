import React, { memo } from 'react'
import { View, StyleSheet, Image, Text } from 'react-native'

import { IPost } from './types'

export default memo(({ post }: Props) => (
  <View style={styles.container}>
    {post.owner && (
      <View style={styles.ownerContainer}>
        <Image style={styles.ownerPhoto} source={{ uri: post.owner.photo_100 }} />
        <Text style={styles.ownerName}>{post.owner.name}</Text>
      </View>
    )}
    <Text style={styles.text}>{post.text}</Text>
  </View>
))

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 16,
  },

  ownerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  ownerPhoto: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  ownerName: {
    marginLeft: 16,
    fontSize: 16,
    color: '#000',
  },

  text: {
    fontSize: 18,
    color: '#000',
  },
})

interface Props {
  post: IPost
}
